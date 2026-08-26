export const pt = {
  translation: {
    common: {
      brandName: 'EasyDashboard',
      skipToContent: 'Pular para o conteúdo principal',
    },
    navigation: {
      label: 'Navegação principal',
      overview: 'Visão geral',
      capabilities: 'Recursos',
      privacy: 'Privacidade',
      contact: 'Contato',
    },
    language: {
      label: 'Selecionar idioma',
      portuguese: 'Português',
      english: 'English',
    },
    shell: {
      eyebrow: 'Dashboards B2B no navegador',
      title: 'Transforme dados em gráficos interativos com privacidade',
      description:
        'Uma experiência simples para criar visualizações a partir de dados inseridos manualmente ou enviados por arquivo.',
      capabilitiesTitle: 'Recursos do produto',
      capabilitiesDescription:
        'A demonstração acessível mostrará como os dois métodos de entrada se transformam em gráficos interativos.',
      privacyTitle: 'Dados do dashboard permanecem no seu dispositivo',
      privacyDescription:
        'Entradas, arquivos, dados derivados e gráficos são processados no navegador e não são enviados aos nossos servidores.',
      contactTitle: 'Solicite uma demonstração',
      contactDescription:
        'O contato comercial será uma jornada separada e solicitará apenas os dados necessários para responder ao seu pedido.',
    },
    actions: {
      requestDemo: 'Solicitar demonstração',
    },
    footer: {
      label: 'Navegação do rodapé',
      tagline: 'Gráficos interativos com seus dados sob seu controle.',
      rights: 'Todos os direitos reservados.',
    },
    seo: {
      title: 'EasyDashboard | Gráficos interativos com privacidade',
      description:
        'Crie gráficos interativos com entrada manual ou arquivos, mantendo os dados do dashboard no seu navegador.',
    },
  },
} as const

type StringShape<T> = {
  [Key in keyof T]: T[Key] extends string ? string : StringShape<T[Key]>
}

export type AppDictionary = StringShape<typeof pt>
