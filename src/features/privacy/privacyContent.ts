import type { AppLanguage } from '@/locales/i18n'

export const privacyLinks = {
  anpdRights: 'https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares',
  anpdTransfers:
    'https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024',
  resendDpa: 'https://resend.com/legal/dpa',
  vercelDpa: 'https://vercel.com/legal/dpa',
} as const

interface PrivacyTopic {
  text: string
  title: string
}

interface PrivacyContent {
  contact: PrivacyTopic
  form: {
    acknowledgement: string
    detailsLink: string
    rights: string
    summary: string
    title: string
  }
  intro: string
  lawfulBasis: PrivacyTopic
  localProcessing: PrivacyTopic
  processors: PrivacyTopic
  processorsLinks: {
    resend: string
    vercel: string
  }
  retention: PrivacyTopic
  rights: PrivacyTopic & {
    anpdLink: string
    emailLink: string
  }
  rightsJump: string
  title: string
  transfer: PrivacyTopic & {
    anpdLink: string
  }
}

export const privacyContent: Record<AppLanguage, PrivacyContent> = {
  pt: {
    title: 'Privacidade com limites claros',
    intro:
      'O EasyDashboard separa os dados usados para experimentar o produto dos dados enviados voluntariamente para contato comercial.',
    rightsJump: 'Como exercer seus direitos LGPD',
    localProcessing: {
      title: 'Dados do dashboard ficam no navegador',
      text: 'Entradas manuais, conteúdo de arquivos, conjuntos derivados e dados de gráficos são processados no navegador do visitante. A demonstração não envia nem armazena esses dados em servidores.',
    },
    contact: {
      title: 'Exceção limitada: formulário de contato',
      text: 'A única exceção é o contato comercial voluntário: o formulário envia nome, e-mail profissional, empresa opcional, mensagem e confirmação de leitura deste aviso. Não inclua dados de dashboards ou outras informações sensíveis.',
    },
    lawfulBasis: {
      title: 'Finalidade e base legal',
      text: 'Usamos os dados do formulário somente para responder ao pedido comercial. A base legal adotada é a execução de procedimentos preliminares relacionados a um possível contrato, a pedido do titular.',
    },
    processors: {
      title: 'Quem participa do envio',
      text: 'Vercel, Resend e caixa de entrada do EasyDashboard recebem somente os dados de contato: a Vercel hospeda a função, a Resend entrega a mensagem e a caixa de entrada permite responder ao pedido.',
    },
    processorsLinks: {
      vercel: 'Aditivo de tratamento da Vercel (site externo)',
      resend: 'Aditivo de tratamento da Resend (site externo)',
    },
    transfer: {
      title: 'Transferência internacional',
      text: 'A Vercel e a Resend informam processamento principal nos Estados Unidos e uso de operadores em outros locais. A operação deve manter um mecanismo de transferência internacional compatível com a regulamentação da ANPD.',
      anpdLink: 'Regulamento de transferência internacional da ANPD (site externo)',
    },
    retention: {
      title: 'Retenção e exclusão',
      text: 'Mantemos a solicitação apenas pelo período necessário ao atendimento e às obrigações aplicáveis. Não prometemos exclusão imediata: mensagens podem permanecer na Resend, na caixa de entrada e em registros dos operadores conforme suas configurações e obrigações.',
    },
    rights: {
      title: 'Seus direitos e nosso canal',
      text: 'Você pode pedir confirmação e acesso, correção, informações sobre compartilhamento e, quando aplicável, anonimização, bloqueio, eliminação, portabilidade ou oposição. Verificaremos a identidade antes de atender ao pedido.',
      emailLink: 'Solicitar seus direitos por e-mail',
      anpdLink: 'Direitos dos titulares na ANPD (site externo)',
    },
    form: {
      title: 'Como tratamos os dados deste formulário',
      summary:
        'Este formulário envia somente os dados mínimos de contato para a Vercel, a Resend e a caixa de entrada do EasyDashboard; não inclua dados de dashboards ou informações sensíveis na mensagem.',
      rights:
        'Usaremos esses dados para responder ao seu pedido comercial. Você pode solicitar acesso, correção ou exclusão quando aplicável.',
      detailsLink: 'Ler informações completas de privacidade',
      acknowledgement:
        'Li e compreendi o aviso de privacidade e confirmo que a mensagem contém apenas dados adequados ao contato comercial.',
    },
  },
  en: {
    title: 'Privacy with clear boundaries',
    intro:
      'EasyDashboard separates data used to try the product from data voluntarily submitted for commercial contact.',
    rightsJump: 'How to exercise your LGPD rights',
    localProcessing: {
      title: 'Dashboard data stays in the browser',
      text: 'Manual entries, file contents, derived datasets, and chart data are processed in the visitor’s browser. The demonstration does not send or store this data on servers.',
    },
    contact: {
      title: 'Limited exception: contact form',
      text: 'The only exception is voluntary commercial contact: the form submits name, work email, optional company, message, and acknowledgement of this notice. Do not include dashboard data or other sensitive information.',
    },
    lawfulBasis: {
      title: 'Purpose and legal basis',
      text: 'We use form data only to answer the commercial request. The legal basis adopted is taking preliminary steps related to a possible contract at the data subject’s request.',
    },
    processors: {
      title: 'Who handles the submission',
      text: 'Vercel, Resend, and the EasyDashboard recipient mailbox receive contact data only: Vercel hosts the function, Resend delivers the message, and the mailbox enables a reply.',
    },
    processorsLinks: {
      vercel: 'Vercel Data Processing Addendum (external site)',
      resend: 'Resend Data Processing Addendum (external site)',
    },
    transfer: {
      title: 'International transfer',
      text: 'Vercel and Resend disclose primary processing in the United States and the use of processors in other locations. Operations must maintain an international-transfer mechanism compatible with ANPD regulations.',
      anpdLink: 'ANPD international-transfer regulation (external site)',
    },
    retention: {
      title: 'Retention and deletion',
      text: 'We keep a request only as long as needed to handle it and meet applicable obligations. We do not promise immediate deletion: messages may remain with Resend, the recipient mailbox, and processor records according to their settings and obligations.',
    },
    rights: {
      title: 'Your rights and our channel',
      text: 'You may request confirmation and access, correction, sharing information and, when applicable, anonymization, blocking, deletion, portability, or objection. We will verify identity before fulfilling a request.',
      emailLink: 'Request your rights by email',
      anpdLink: 'Data subject rights at ANPD (external site)',
    },
    form: {
      title: 'How we handle data from this form',
      summary:
        'This form sends only the minimum contact data to Vercel, Resend, and the EasyDashboard recipient mailbox. Do not include dashboard data or sensitive information in the message.',
      rights:
        'We use this data to answer your commercial request. You may request access, correction, or deletion when applicable.',
      detailsLink: 'Read the complete privacy information',
      acknowledgement:
        'I have read and understood the privacy notice and confirm that the message contains only data appropriate for commercial contact.',
    },
  },
}
