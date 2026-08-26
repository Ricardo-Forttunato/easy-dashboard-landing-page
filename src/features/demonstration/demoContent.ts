import type { AppLanguage } from '@/locales/i18n'

export type DemoMode = 'manual' | 'upload'

export interface DemoDatum {
  label: string
  value: number
}

interface DemoWorkflow {
  description: string
  label: string
  steps: readonly string[]
  title: string
}

interface DemoContent {
  chart: {
    categoryColumn: string
    summary: string
    tableLabel: string
    title: string
    valueColumn: string
  }
  intro: string
  privacyNote: string
  reducedMotion: string
  regionLabel: string
  statusPrefix: string
  tabsLabel: string
  visuals: {
    dragAndDrop: { alt: string; caption: string }
    fileUpload: { alt: string; caption: string }
    hero: { alt: string; caption: string }
    manualInput: { alt: string; caption: string }
  }
  workflows: Record<DemoMode, DemoWorkflow>
}

export const demoChartData: readonly DemoDatum[] = [
  { label: 'T1', value: 18 },
  { label: 'T2', value: 27 },
  { label: 'T3', value: 22 },
  { label: 'T4', value: 34 },
]

export const demoContent: Record<AppLanguage, DemoContent> = {
  pt: {
    regionLabel: 'Demonstração interativa com dados fictícios',
    intro:
      'Esta experiência usa somente dados fictícios. Explore os dois caminhos sem inserir ou enviar informações reais.',
    privacyNote:
      'Nenhum dado é solicitado, transmitido ou armazenado: os controles abaixo apenas alternam exemplos incluídos na página.',
    tabsLabel: 'Método de entrada dos dados de exemplo',
    statusPrefix: 'Exibindo o fluxo',
    reducedMotion: 'Movimento reduzido ativado: valores exibidos sem animação.',
    workflows: {
      manual: {
        label: 'Entrada manual',
        title: 'Monte o gráfico com linhas simples',
        description:
          'No produto, você informa rótulos e valores diretamente no navegador e confere a prévia antes de adicionar o gráfico ao dashboard.',
        steps: [
          'Escolha um tipo de gráfico.',
          'Preencha pares de rótulo e valor.',
          'Confira a prévia interativa.',
        ],
      },
      upload: {
        label: 'Upload de arquivo',
        title: 'Transforme uma tabela em visualização',
        description:
          'No exemplo vendas-exemplo.csv, selecione as colunas Categoria e Valor para gerar a mesma prévia sem enviar o arquivo a um servidor.',
        steps: [
          'Escolha um arquivo compatível no produto.',
          'Selecione as colunas categoria e valor.',
          'Confira o gráfico criado localmente.',
        ],
      },
    },
    chart: {
      title: 'Projetos fictícios por trimestre',
      summary:
        'Gráfico de barras de projetos fictícios por trimestre: T1 18, T2 27, T3 22 e T4 34.',
      tableLabel: 'Dados fictícios do gráfico',
      categoryColumn: 'Trimestre',
      valueColumn: 'Projetos',
    },
    visuals: {
      hero: {
        alt: 'Tela principal do EasyDashboard com prévia de gráfico e dashboard organizado',
        caption: 'Visão do produto com criação, prévia e organização de gráficos.',
      },
      manualInput: {
        alt: 'Janela do EasyDashboard para adicionar rótulos e valores manualmente',
        caption: 'Entrada manual de rótulos e valores.',
      },
      fileUpload: {
        alt: 'Janela do EasyDashboard para revisar colunas de um arquivo de exemplo',
        caption: 'Seleção das colunas de categoria e valor de um arquivo.',
      },
      dragAndDrop: {
        alt: 'Gráficos do EasyDashboard sendo reorganizados visualmente no dashboard',
        caption: 'Organização interativa dos gráficos no dashboard.',
      },
    },
  },
  en: {
    regionLabel: 'Interactive demonstration with fictional data',
    intro:
      'This experience uses fictional data only. Explore both paths without entering or sending real information.',
    privacyNote:
      'No data is requested, transmitted, or stored: the controls below only switch examples bundled with the page.',
    tabsLabel: 'Example data input method',
    statusPrefix: 'Showing the workflow',
    reducedMotion: 'Reduced motion enabled: values are displayed without animation.',
    workflows: {
      manual: {
        label: 'Manual input',
        title: 'Build a chart with simple rows',
        description:
          'In the product, you enter labels and values directly in the browser and check the preview before adding the chart to the dashboard.',
        steps: [
          'Choose a chart type.',
          'Enter label and value pairs.',
          'Review the interactive preview.',
        ],
      },
      upload: {
        label: 'File upload',
        title: 'Turn a table into a visualization',
        description:
          'In the fictional sales-example.csv, select the Category and Value columns to generate the same preview without sending the file to a server.',
        steps: [
          'Choose a compatible file in the product.',
          'Select the category and value columns.',
          'Review the chart created locally.',
        ],
      },
    },
    chart: {
      title: 'Fictional projects by quarter',
      summary: 'Bar chart of fictional projects by quarter: Q1 18, Q2 27, Q3 22, and Q4 34.',
      tableLabel: 'Fictional chart data',
      categoryColumn: 'Quarter',
      valueColumn: 'Projects',
    },
    visuals: {
      hero: {
        alt: 'EasyDashboard main screen with a chart preview and organized dashboard',
        caption: 'Product view showing chart creation, preview, and organization.',
      },
      manualInput: {
        alt: 'EasyDashboard window for manually adding labels and values',
        caption: 'Manual entry of labels and values.',
      },
      fileUpload: {
        alt: 'EasyDashboard window for reviewing columns from an example file',
        caption: 'Selection of category and value columns from a file.',
      },
      dragAndDrop: {
        alt: 'EasyDashboard charts being visually reorganized on the dashboard',
        caption: 'Interactive chart organization on the dashboard.',
      },
    },
  },
}
