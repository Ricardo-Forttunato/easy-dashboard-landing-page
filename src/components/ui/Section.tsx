import { Box, Container, Stack, Typography } from '@mui/material'
import type { PropsWithChildren } from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3'

interface SectionProps extends PropsWithChildren {
  eyebrow?: string
  headingLevel?: HeadingLevel
  id: string
  title: string
}

export function Section({ children, eyebrow, headingLevel = 'h2', id, title }: SectionProps) {
  const titleId = `${id}-title`

  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={titleId}
      sx={{ py: { xs: 7, md: 11 }, scrollMarginTop: '6rem' }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3} sx={{ maxWidth: 880 }}>
          {eyebrow ? (
            <Typography
              component="p"
              variant="overline"
              color="primary.main"
              sx={{ fontWeight: 800 }}
            >
              {eyebrow}
            </Typography>
          ) : null}
          <Typography id={titleId} component={headingLevel} variant={headingLevel}>
            {title}
          </Typography>
          {children}
        </Stack>
      </Container>
    </Box>
  )
}
