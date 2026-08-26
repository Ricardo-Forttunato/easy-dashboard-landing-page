import { z } from 'zod'

export const CONTACT_FIELD_LIMITS = {
  name: 100,
  email: 254,
  company: 150,
  message: 2_000,
} as const

export const contactRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(CONTACT_FIELD_LIMITS.name),
    email: z.string().trim().max(CONTACT_FIELD_LIMITS.email).pipe(z.email()),
    company: z.string().trim().max(CONTACT_FIELD_LIMITS.company).default(''),
    message: z.string().trim().min(1).max(CONTACT_FIELD_LIMITS.message),
    privacyAcknowledged: z.boolean().refine((value) => value),
    website: z.string().trim().max(0).default(''),
  })
  .strict()

export type ContactRequest = z.infer<typeof contactRequestSchema>
