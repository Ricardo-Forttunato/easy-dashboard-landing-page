import type { ContactRequest } from '@/features/contact/contactSchema'

export async function submitContactRequest(request: ContactRequest): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error('Contact request failed')
  }
}
