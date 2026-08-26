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
    hero: {
      eyebrow: 'Dashboards B2B no navegador',
      title: 'Transforme seus dados em gráficos interativos — direto no navegador',
      description:
        'Crie gráficos com entrada manual ou arquivos, sem instalar programas ou depender de planilhas complexas.',
      privacy:
        'Os dados usados nos gráficos são processados localmente e nunca saem do seu dispositivo.',
      cta: 'Solicitar uma demonstração',
    },
    contact: {
      title: 'Solicite uma demonstração',
      description:
        'Conte brevemente o que você precisa. Usaremos estes dados somente para responder ao seu contato comercial.',
      formLabel: 'Solicitação de demonstração',
      name: 'Nome',
      email: 'E-mail profissional',
      company: 'Empresa (opcional)',
      message: 'Como podemos ajudar?',
      nameError: 'Informe seu nome.',
      emailError: 'Informe um e-mail válido.',
      messageError: 'Descreva brevemente como podemos ajudar.',
      acknowledgementError: 'Confirme que leu o aviso de privacidade.',
      validationSummary: 'Revise os campos destacados e tente novamente.',
      noticeTitle: 'Como tratamos os dados deste formulário',
      notice:
        'Nome, e-mail, empresa e mensagem serão usados para responder à sua solicitação comercial, com base nos procedimentos preliminares relacionados a um possível contrato realizados a seu pedido. Esses dados serão enviados à Vercel, à Resend e à caixa de entrada da EasyDashboard. Não inclua dados de dashboards, arquivos ou gráficos na mensagem.',
      rights:
        'Você pode solicitar acesso, correção ou exclusão pelo e-mail ricardo.forttunato@gmail.com. O tratamento pode envolver transferência internacional e retenção pelos provedores e pela caixa de entrada durante o atendimento.',
      acknowledgement: 'Li e compreendi como meus dados de contato serão tratados.',
      website: 'Website',
      submit: 'Enviar solicitação',
      submitting: 'Enviando solicitação…',
      success: 'Recebemos sua solicitação. Entraremos em contato em breve.',
      failure: 'Não foi possível enviar agora. Revise sua conexão e tente novamente.',
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
