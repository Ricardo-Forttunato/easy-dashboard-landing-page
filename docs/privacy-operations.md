# Operação de privacidade do contato

Última revisão técnica: 26 de agosto de 2026.

Este documento registra o fluxo de dados do formulário, o resultado verificável da configuração de
retenção e o procedimento operacional para pedidos de titulares. Ele não substitui a aprovação do
responsável jurídico/privacidade prevista na tarefa T047.

## Limite de dados

Dados de dashboards — entradas manuais, arquivos, conjuntos derivados e gráficos — são processados
somente no navegador. Eles não devem ser incluídos no formulário de contato.

O formulário aceita apenas nome, e-mail profissional, empresa opcional, mensagem e confirmação de
leitura do aviso. A aplicação não persiste o corpo da solicitação nem deve registrá-lo em logs.

| Participante                         | Função                                | Dados recebidos                | Retenção operacional                                                                |
| ------------------------------------ | ------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------- |
| Vercel                               | Hospeda e executa a função de contato | Dados mínimos do formulário    | Conforme o DPA e os registros técnicos necessários ao serviço                       |
| Resend                               | Entrega a mensagem de contato         | Conteúdo e metadados do e-mail | Armazenamento de conteúdo considerado ativo até comprovação de desativação na conta |
| Caixa `ricardo.forttunato@gmail.com` | Recebe e responde à solicitação       | Mensagem entregue              | Deve ter uma política interna de retenção aprovada antes da publicação              |

## Verificação da retenção da Resend

Resultado efetivo desta revisão: **armazenamento de conteúdo considerado habilitado**.

O repositório não contém evidência de que a opção paga de não armazenamento foi contratada ou
ativada na conta. A documentação pública da Resend informa que a desativação exige elegibilidade,
um adicional e acionamento do suporte. O DPA da Resend informa processamento durante a vigência do
serviço e exclusão de dados de usuário/cliente em até 90 dias após o encerramento da conta. Esse
prazo de encerramento não equivale a uma promessa de exclusão imediata de cada e-mail enviado.

Antes de publicar em produção, o responsável pela conta deve:

1. obter no painel ou com o suporte da Resend a confirmação datada de conteúdo armazenado ou não;
2. registrar aqui o plano, o identificador do chamado, a data de vigência e uma captura sem chaves,
   tokens ou dados pessoais;
3. se o armazenamento continuar ativo, validar o prazo aplicável a cada mensagem e refletir esse
   prazo no aviso público;
4. definir e aprovar o prazo de retenção e a rotina de exclusão da caixa destinatária;
5. submeter o conjunto ao responsável jurídico/privacidade e registrar sua aprovação na T047.

Até esses itens serem concluídos, a configuração conservadora acima é a única afirmação permitida e
a publicação do formulário em produção permanece bloqueada.

## Processadores e transferência internacional

Os DPAs públicos de Vercel e Resend informam processamento principal nos Estados Unidos e uso de
subprocessadores em outras localidades. A operação deve confirmar e documentar o mecanismo de
transferência internacional aplicável segundo a Resolução CD/ANPD nº 19/2024 antes da publicação.

Fontes operacionais:

- [DPA da Vercel](https://vercel.com/legal/dpa)
- [DPA da Resend](https://resend.com/legal/dpa)
- [Orientação da Resend para não armazenar conteúdo](https://resend.com/docs/knowledge-base/how-do-i-ensure-sensitive-data-isnt-stored-on-resend)
- [Resolução CD/ANPD nº 19/2024](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024)

## Pedidos de titulares

Canal publicado: `ricardo.forttunato@gmail.com`.

Ao receber um pedido de confirmação, acesso, correção, informação, anonimização, bloqueio,
eliminação, portabilidade ou oposição:

1. registre um protocolo sem copiar o conteúdo pessoal para ferramentas não aprovadas;
2. confirme a identidade e o escopo por um meio proporcional ao risco;
3. localize a mensagem na caixa destinatária e, quando aplicável, nos processadores;
4. corrija ou exclua os dados alcançáveis e solicite a providência ao processador quando necessário;
5. informe ao titular o resultado, as limitações legais e os prazos aplicáveis;
6. registre apenas o protocolo, as datas, os sistemas consultados e a conclusão.

Referência para os direitos: [Direitos dos titulares na ANPD](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares).

## Aprovação para produção

- Estado técnico: conteúdo e fluxo documentados.
- Retenção Resend: armazenamento considerado ativo; confirmação específica da conta pendente.
- Retenção da caixa destinatária: pendente de definição.
- Identidade jurídica do controlador: pendente de confirmação.
- Aprovação jurídica/privacidade: pendente (T047).
- Decisão de publicação: **bloqueada até a resolução dos itens pendentes**.
