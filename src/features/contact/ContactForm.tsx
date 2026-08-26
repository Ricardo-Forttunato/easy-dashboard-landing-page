import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { type SyntheticEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PrimaryCta } from '@/components/ui/PrimaryCta'
import { StatusMessage } from '@/components/ui/StatusMessage'
import { submitContactRequest } from '@/features/contact/contactClient'
import { contactRequestSchema, type ContactRequest } from '@/features/contact/contactSchema'

type ContactField = 'name' | 'email' | 'message' | 'privacyAcknowledged'

interface ContactFormProps {
  submitRequest?: (request: ContactRequest) => Promise<void>
}

export function ContactForm({ submitRequest = submitContactRequest }: ContactFormProps) {
  const { t } = useTranslation()
  const formRef = useRef<HTMLFormElement>(null)
  const submittingRef = useRef(false)
  const [formVersion, setFormVersion] = useState(0)
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  function getFormString(formData: FormData, field: string): string {
    const value = formData.get(field)
    return typeof value === 'string' ? value : ''
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement, SubmitEvent>): Promise<void> {
    event.preventDefault()
    if (submittingRef.current) return

    const form = event.currentTarget
    const formData = new FormData(form)
    const candidate = {
      name: getFormString(formData, 'name'),
      email: getFormString(formData, 'email'),
      company: getFormString(formData, 'company'),
      message: getFormString(formData, 'message'),
      privacyAcknowledged: formData.get('privacyAcknowledged') === 'on',
      website: getFormString(formData, 'website'),
    }
    const result = contactRequestSchema.safeParse(candidate)

    if (!result.success) {
      const nextErrors: Partial<Record<ContactField, string>> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0]
        if (field === 'name') nextErrors.name = t('contact.nameError')
        if (field === 'email') nextErrors.email = t('contact.emailError')
        if (field === 'message') nextErrors.message = t('contact.messageError')
        if (field === 'privacyAcknowledged') {
          nextErrors.privacyAcknowledged = t('contact.acknowledgementError')
        }
      }
      setErrors(nextErrors)
      setStatus('idle')
      requestAnimationFrame(() => {
        const firstInvalidField = Object.keys(nextErrors)[0]
        if (firstInvalidField) {
          const field = form.elements.namedItem(firstInvalidField) as HTMLElement | null
          field?.focus()
        }
      })
      return
    }

    submittingRef.current = true
    setErrors({})
    setStatus('submitting')

    try {
      await submitRequest(result.data)
      formRef.current?.reset()
      setFormVersion((version) => version + 1)
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <Box
      ref={formRef}
      component="form"
      aria-label={t('contact.formLabel')}
      noValidate
      onSubmit={(event) => void handleSubmit(event)}
    >
      <Stack key={formVersion} spacing={3}>
        <TextField
          required
          fullWidth
          name="name"
          label={t('contact.name')}
          autoComplete="name"
          slotProps={{ htmlInput: { maxLength: 100 } }}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          required
          fullWidth
          name="email"
          type="email"
          label={t('contact.email')}
          autoComplete="email"
          slotProps={{ htmlInput: { maxLength: 254 } }}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          name="company"
          label={t('contact.company')}
          autoComplete="organization"
          slotProps={{ htmlInput: { maxLength: 150 } }}
        />
        <TextField
          required
          fullWidth
          multiline
          minRows={4}
          name="message"
          label={t('contact.message')}
          slotProps={{ htmlInput: { maxLength: 2000 } }}
          error={Boolean(errors.message)}
          helperText={errors.message}
        />

        <Box sx={{ p: 2.5, border: 1, borderColor: 'divider', borderRadius: 2 }}>
          <Typography component="h3" variant="h6" gutterBottom>
            {t('contact.noticeTitle')}
          </Typography>
          <Typography color="text.secondary">{t('contact.notice')}</Typography>
          <Typography color="text.secondary" sx={{ mt: 1.5 }}>
            {t('contact.rights')}
          </Typography>
        </Box>

        <FormControl required error={Boolean(errors.privacyAcknowledged)}>
          <FormControlLabel
            control={<Checkbox name="privacyAcknowledged" />}
            label={t('contact.acknowledgement')}
          />
          {errors.privacyAcknowledged ? (
            <FormHelperText>{errors.privacyAcknowledged}</FormHelperText>
          ) : null}
        </FormControl>

        <TextField
          name="website"
          label={t('contact.website')}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 }}
        />

        {Object.keys(errors).length > 0 ? (
          <StatusMessage severity="error">{t('contact.validationSummary')}</StatusMessage>
        ) : null}
        {status === 'success' ? (
          <StatusMessage severity="success">{t('contact.success')}</StatusMessage>
        ) : null}
        {status === 'error' ? (
          <StatusMessage severity="error">{t('contact.failure')}</StatusMessage>
        ) : null}

        <PrimaryCta
          type="submit"
          disabled={status === 'submitting'}
          sx={{ alignSelf: 'flex-start' }}
        >
          {status === 'submitting' ? t('contact.submitting') : t('contact.submit')}
        </PrimaryCta>
      </Stack>
    </Box>
  )
}
