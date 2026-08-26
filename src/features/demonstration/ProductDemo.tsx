import {
  Box,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { type SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { StatusMessage } from '@/components/ui/StatusMessage'
import { demoChartData, demoContent, type DemoMode } from '@/features/demonstration/demoContent'
import { normalizeLanguage } from '@/locales/i18n'

const modes: readonly DemoMode[] = ['manual', 'upload']

export function ProductDemo() {
  const { i18n } = useTranslation()
  const language = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)
  const content = demoContent[language]
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true })
  const [activeMode, setActiveMode] = useState<DemoMode>('manual')

  function selectMode(_event: SyntheticEvent, mode: DemoMode): void {
    setActiveMode(mode)
  }

  const activeWorkflow = content.workflows[activeMode]

  return (
    <Box component="section" role="region" aria-label={content.regionLabel}>
      <Stack spacing={3}>
        <Box>
          <Typography>{content.intro}</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {content.privacyNote}
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
          <Tabs
            value={activeMode}
            onChange={selectMode}
            aria-label={content.tabsLabel}
            selectionFollowsFocus
            variant="fullWidth"
          >
            {modes.map((mode) => (
              <Tab
                key={mode}
                id={`demo-tab-${mode}`}
                value={mode}
                label={content.workflows[mode].label}
                aria-controls={`demo-panel-${mode}`}
              />
            ))}
          </Tabs>

          {modes.map((mode) => {
            const workflow = content.workflows[mode]
            return (
              <Box
                key={mode}
                role="tabpanel"
                id={`demo-panel-${mode}`}
                aria-labelledby={`demo-tab-${mode}`}
                hidden={activeMode !== mode}
                sx={{ p: { xs: 2.5, md: 4 } }}
              >
                <Typography component="h3" variant="h6">
                  {workflow.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {workflow.description}
                </Typography>
                <Box component="ol" sx={{ m: 0, mt: 2, pl: 3 }}>
                  {workflow.steps.map((step) => (
                    <Typography component="li" key={step} sx={{ mb: 0.75 }}>
                      {step}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )
          })}
        </Paper>

        <StatusMessage>
          {content.statusPrefix} {activeWorkflow.label}
        </StatusMessage>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.4fr) minmax(260px, 0.6fr)' },
            gap: 3,
            alignItems: 'start',
          }}
        >
          <ExampleChart
            title={content.chart.title}
            summary={content.chart.summary}
            reducedMotion={prefersReducedMotion}
          />
          <TableContainer component={Paper} variant="outlined">
            <Table size="small" aria-label={content.chart.tableLabel}>
              <TableHead>
                <TableRow>
                  <TableCell>{content.chart.categoryColumn}</TableCell>
                  <TableCell align="right">{content.chart.valueColumn}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {demoChartData.map((datum) => (
                  <TableRow key={datum.label}>
                    <TableCell component="th" scope="row">
                      {datum.label}
                    </TableCell>
                    <TableCell align="right">{datum.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {prefersReducedMotion ? (
          <Typography variant="body2" color="text.secondary">
            {content.reducedMotion}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  )
}

interface ExampleChartProps {
  reducedMotion: boolean
  summary: string
  title: string
}

function ExampleChart({ reducedMotion, summary, title }: ExampleChartProps) {
  const maximumValue = Math.max(...demoChartData.map(({ value }) => value))

  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Box
        component="svg"
        role="img"
        aria-label={summary}
        data-testid="example-chart"
        data-motion={reducedMotion ? 'off' : 'on'}
        viewBox="0 0 520 280"
        sx={{
          display: 'block',
          width: '100%',
          height: 'auto',
          minHeight: 220,
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
          '& .demo-chart-bar': {
            transformBox: 'fill-box',
            transformOrigin: 'bottom',
            animation: reducedMotion ? 'none' : 'demo-bar-grow 450ms ease-out',
          },
          '@keyframes demo-bar-grow': {
            from: { transform: 'scaleY(0)' },
            to: { transform: 'scaleY(1)' },
          },
        }}
      >
        <line x1="55" y1="225" x2="490" y2="225" stroke="currentColor" strokeWidth="2" />
        {demoChartData.map((datum, index) => {
          const height = (datum.value / maximumValue) * 160
          const x = 80 + index * 105
          const y = 225 - height

          return (
            <g key={datum.label}>
              <rect
                className="demo-chart-bar"
                x={x}
                y={y}
                width="60"
                height={height}
                rx="6"
                fill="currentColor"
                color="#0B57D0"
              />
              <text x={x + 30} y={y - 10} textAnchor="middle" fill="currentColor" fontSize="16">
                {datum.value}
              </text>
              <text x={x + 30} y="252" textAnchor="middle" fill="currentColor" fontSize="16">
                {datum.label}
              </text>
            </g>
          )
        })}
      </Box>
    </Box>
  )
}
