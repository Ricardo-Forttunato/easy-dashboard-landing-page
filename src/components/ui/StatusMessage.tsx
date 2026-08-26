import { Alert, type AlertProps } from '@mui/material'

interface StatusMessageProps extends Omit<AlertProps, 'role'> {
  busy?: boolean
}

export function StatusMessage({ busy = false, severity = 'info', ...props }: StatusMessageProps) {
  const isError = severity === 'error'

  return (
    <Alert
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      aria-atomic="true"
      aria-busy={busy}
      severity={severity}
      {...props}
    />
  )
}
