# EasyDashboard landing page

Landing page bilíngue para apresentar o EasyDashboard e receber solicitações comerciais. Os dados
usados em dashboards permanecem no navegador; somente os dados preenchidos voluntariamente no
formulário de contato passam pela API.

## Desenvolvimento

Requisitos: Node.js 24 ou superior e npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Use `npm run test`, `npm run test:e2e`, `npm run lint`, `npm run typecheck` e `npm run build` para as
verificações locais.

## Configuração do contato

Configure as variáveis abaixo apenas no ambiente do servidor da Vercel. A chave da Resend é
sensível e nunca deve receber o prefixo público `VITE_`.

- `RESEND_API_KEY`: chave de API restrita ao envio de e-mail.
- `CONTACT_FROM_EMAIL`: remetente em um domínio verificado na Resend.
- `CONTACT_TO_EMAIL`: caixa que recebe os contatos; o valor operacional atual é
  `ricardo.forttunato@gmail.com`.

A API usa o e-mail validado do visitante como `replyTo`, envia apenas texto e não registra nem
persiste o corpo da solicitação na aplicação. A Vercel, a Resend e a caixa destinatária ainda podem
processar ou reter esses dados de acordo com suas configurações.

### Proteção antiabuso

A função contém um honeypot e um limitador de cinco solicitações por origem em 15 minutos. Como
instâncias serverless podem escalar ou ser substituídas, o limitador em memória é apenas uma camada
adicional. Antes de publicar, crie no Vercel Firewall uma regra de rate limit para `POST
/api/contact`, por endereço de origem, com limite de 5 solicitações em 15 minutos e resposta 429.

### Checklist de privacidade antes da publicação

- Revisar juridicamente o aviso do formulário, incluindo finalidade comercial, base legal,
  Vercel/Resend, transferência internacional, retenção, exclusão e canal de direitos LGPD.
- Confirmar a política de retenção da caixa destinatária e um processo de exclusão para pedidos do
  titular.
- Verificar na Resend a configuração de retenção aplicável ao plano. Não presumir descarte imediato:
  a desativação do armazenamento de conteúdo depende de elegibilidade e configuração específicas.
- Manter mensagens de erro genéricas e nunca inserir dados de dashboards, arquivos ou gráficos no
  formulário de contato.

O contato indicado no aviso para acesso, correção e exclusão é
`ricardo.forttunato@gmail.com`; altere o texto localizado e este documento em conjunto se o canal
operacional mudar.
