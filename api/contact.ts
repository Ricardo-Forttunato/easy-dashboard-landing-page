import { Resend } from 'resend'

import { contactRequestSchema, type ContactRequest } from '../src/features/contact/contactSchema'

const RATE_LIMIT_MAX_REQUESTS = 5
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000

export type ContactEmailSender = (contact: ContactRequest) => Promise<void>

interface ContactHandlerDependencies {
  sendEmail: ContactEmailSender
  rateLimiter: InMemoryContactRateLimiter
  now?: () => number
}

export class InMemoryContactRateLimiter {
  private readonly requestsBySource = new Map<string, number[]>()

  consume(source: string, now = Date.now()): boolean {
    const windowStart = now - RATE_LIMIT_WINDOW_MS
    const recentRequests = (this.requestsBySource.get(source) ?? []).filter(
      (timestamp) => timestamp > windowStart,
    )

    if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
      this.requestsBySource.set(source, recentRequests)
      return false
    }

    recentRequests.push(now)
    this.requestsBySource.set(source, recentRequests)
    return true
  }
}

function jsonResponse(
  body: Record<string, string>,
  status: number,
  headers?: HeadersInit,
): Response {
  const responseHeaders = new Headers(headers)
  responseHeaders.set('cache-control', 'no-store')

  return Response.json(body, {
    status,
    headers: responseHeaders,
  })
}

function getSource(request: Request): string {
  const forwardedFor =
    request.headers.get('x-vercel-forwarded-for') ?? request.headers.get('x-forwarded-for')
  const source = forwardedFor?.split(',')[0]?.trim()
  return source && source.length > 0 ? source : 'unknown'
}

function isTriggeredHoneypot(body: unknown): boolean {
  if (typeof body !== 'object' || body === null || !('website' in body)) return false
  return typeof body.website === 'string' && body.website.trim().length > 0
}

export function createContactHandler({
  sendEmail,
  rateLimiter,
  now = Date.now,
}: ContactHandlerDependencies) {
  return async function handleContact(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'method_not_allowed' }, 405, { allow: 'POST' })
    }

    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
      return jsonResponse({ error: 'invalid_request' }, 400)
    }

    let requestBody: unknown
    try {
      requestBody = await request.json()
    } catch {
      return jsonResponse({ error: 'invalid_request' }, 400)
    }

    if (isTriggeredHoneypot(requestBody)) {
      return jsonResponse({ error: 'try_again_later' }, 429)
    }

    const parsedRequest = contactRequestSchema.safeParse(requestBody)
    if (!parsedRequest.success) {
      return jsonResponse({ error: 'invalid_request' }, 400)
    }

    if (!rateLimiter.consume(getSource(request), now())) {
      return jsonResponse({ error: 'try_again_later' }, 429)
    }

    try {
      await sendEmail(parsedRequest.data)
      return jsonResponse({ status: 'accepted' }, 202)
    } catch {
      return jsonResponse({ error: 'delivery_unavailable' }, 502)
    }
  }
}

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing server environment variable: ${name}`)
  return value
}

const sendContactEmail: ContactEmailSender = async (contact) => {
  const resend = new Resend(requiredEnvironmentVariable('RESEND_API_KEY'))
  const result = await resend.emails.send({
    from: requiredEnvironmentVariable('CONTACT_FROM_EMAIL'),
    to: requiredEnvironmentVariable('CONTACT_TO_EMAIL'),
    replyTo: contact.email,
    subject: 'Nova solicitação de demonstração — EasyDashboard',
    text: [
      `Nome: ${contact.name}`,
      `E-mail: ${contact.email}`,
      `Empresa: ${contact.company || 'Não informada'}`,
      '',
      'Mensagem:',
      contact.message,
    ].join('\n'),
  })

  if (result.error) throw new Error('Email provider rejected the request')
}

const defaultHandler = createContactHandler({
  sendEmail: sendContactEmail,
  rateLimiter: new InMemoryContactRateLimiter(),
})

export default {
  fetch: defaultHandler,
}
