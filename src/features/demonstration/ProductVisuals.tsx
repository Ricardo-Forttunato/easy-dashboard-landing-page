import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import chartDragAndDropImage from '@/assets/easydashboard-chart-drag-and-drop.png'
import fileUploadImage from '@/assets/easydashboard-files-upload.png'
import mainScreenImage from '@/assets/easydashboard-main-screen.png'
import manualInputImage from '@/assets/easydashboard-manual-input.png'
import { demoContent } from '@/features/demonstration/demoContent'
import { normalizeLanguage } from '@/locales/i18n'

interface ProductVisualsProps {
  placement: 'details' | 'hero'
}

const detailVisuals = [
  {
    source: manualInputImage,
    contentKey: 'manualInput',
    width: 1945,
    height: 1339,
  },
  {
    source: fileUploadImage,
    contentKey: 'fileUpload',
    width: 1902,
    height: 1336,
  },
  {
    source: chartDragAndDropImage,
    contentKey: 'dragAndDrop',
    width: 1851,
    height: 1332,
  },
] as const

export function ProductVisuals({ placement }: ProductVisualsProps) {
  const { i18n } = useTranslation()
  const language = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language)
  const visualContent = demoContent[language].visuals

  if (placement === 'hero') {
    return (
      <VisualFigure
        source={mainScreenImage}
        alt={visualContent.hero.alt}
        caption={visualContent.hero.caption}
        width={1933}
        height={1342}
        priority
      />
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
        gap: 2.5,
      }}
    >
      {detailVisuals.map(({ source, contentKey, width, height }) => (
        <VisualFigure
          key={contentKey}
          source={source}
          alt={visualContent[contentKey].alt}
          caption={visualContent[contentKey].caption}
          width={width}
          height={height}
        />
      ))}
    </Box>
  )
}

interface VisualFigureProps {
  alt: string
  caption: string
  height: number
  priority?: boolean
  source: string
  width: number
}

function VisualFigure({
  alt,
  caption,
  height,
  priority = false,
  source,
  width,
}: VisualFigureProps) {
  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box
        component="img"
        src={source}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        decoding="async"
        data-visual={priority ? 'hero' : 'secondary'}
        sx={{
          display: 'block',
          width: '100%',
          height: 'auto',
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      />
      <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {caption}
      </Typography>
    </Box>
  )
}
