import { describe, expect, it, vi } from 'vitest'

import {
  createContactHandler,
  InMemoryContactRateLimiter,
  type ContactEmailSender,
} from '../../api/contact'

const validContactRequest = {
  name: 'Ana Silva',
  email: 'ana@example.com',
  company: 'Acme',
  message: 'Quero conhecer o produto.',
  privacyAcknowledged: true,
  website: '',
}

function createRequest(
  body: unknown = validContactRequest,
  { method = 'POST', sourceIp = '203.0.113.10' } = {},
): Request {
  return new Request('https://example.com/api/contact', {
    method,
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': sourceIp,
    },
    body: method === 'POST' ? JSON.stringify(body) : undefined,
  })
}

function createTestHandler(sender: ContactEmailSender = vi.fn().mockResolvedValue(undefined)) {
  return {
    handler: createContactHandler({
      sendEmail: sender,
      rateLimiter: new InMemoryContactRateLimiter(),
      now: () => 1_000_000,
    }),
    sender,
  }
}

describe('POST /api/contact', () => {
  it('accepts a valid minimum contact request without echoing personal data', async () => {
    const { handler, sender } = createTestHandler()

    const response = await handler(createRequest())

    const responseBody: unknown = await response.json()
    expect(response.status).toBe(202)
    expect(responseBody).toEqual({ status: 'accepted' })
    expect(sender).toHaveBeenCalledWith(validContactRequest)
    expect(JSON.stringify(responseBody)).not.toContain('ana@example.com')
  })

  it('rejects invalid, unacknowledged, malformed, and unknown dashboard fields', async () => {
    const { handler, sender } = createTestHandler()
    const invalidBodies = [
      { ...validContactRequest, email: 'invalid' },
      { ...validContactRequest, privacyAcknowledged: false },
      { ...validContactRequest, dashboardData: [{ label: 'Revenue', value: 10 }] },
    ]

    for (const body of invalidBodies) {
      const response = await handler(createRequest(body))
      expect(response.status).toBe(400)
      expect(await response.json()).toEqual({ error: 'invalid_request' })
    }

    const malformedResponse = await handler(
      new Request('https://example.com/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{',
      }),
    )
    expect(malformedResponse.status).toBe(400)

    const unsupportedContentResponse = await handler(
      new Request('https://example.com/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'text/plain' },
        body: JSON.stringify(validContactRequest),
      }),
    )
    expect(unsupportedContentResponse.status).toBe(400)
    expect(sender).not.toHaveBeenCalled()
  })

  it('rejects unsupported methods with the documented generic response', async () => {
    const { handler } = createTestHandler()

    const response = await handler(createRequest(undefined, { method: 'GET' }))

    expect(response.status).toBe(405)
    expect(response.headers.get('allow')).toBe('POST')
    expect(await response.json()).toEqual({ error: 'method_not_allowed' })
  })

  it('blocks honeypot submissions and more than five requests per source in 15 minutes', async () => {
    const { handler, sender } = createTestHandler()

    const honeypotResponse = await handler(
      createRequest({ ...validContactRequest, website: 'https://spam.example' }),
    )
    expect(honeypotResponse.status).toBe(429)

    for (let requestNumber = 1; requestNumber <= 5; requestNumber += 1) {
      const response = await handler(
        createRequest(validContactRequest, { sourceIp: '203.0.113.20' }),
      )
      expect(response.status).toBe(202)
    }

    const limitedResponse = await handler(
      createRequest(validContactRequest, { sourceIp: '203.0.113.20' }),
    )
    expect(limitedResponse.status).toBe(429)
    expect(await limitedResponse.json()).toEqual({ error: 'try_again_later' })
    expect(sender).toHaveBeenCalledTimes(5)
  })

  it('maps provider failures to a generic 502 response', async () => {
    const providerFailure = vi
      .fn<ContactEmailSender>()
      .mockRejectedValue(new Error('secret detail'))
    const { handler } = createTestHandler(providerFailure)

    const response = await handler(createRequest())

    const responseBody: unknown = await response.json()
    expect(response.status).toBe(502)
    expect(responseBody).toEqual({ error: 'delivery_unavailable' })
    expect(JSON.stringify(responseBody)).not.toContain('secret detail')
  })
})
