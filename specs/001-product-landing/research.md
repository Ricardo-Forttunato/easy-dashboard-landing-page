# Research: EasyDashboard Product Landing Page

## Decisions

### Vite, React and strict TypeScript

**Decision**: Use Vite, React and strict TypeScript; CI runs typecheck, ESLint, Prettier, tests and build.

**Rationale**: Vite supports React TypeScript, but TypeScript type checking is a separate CI step.

**Alternatives considered**: A full-stack framework is unnecessary; non-strict TypeScript weakens quality.

Sources: [Vite guide](https://vite.dev/guide/) and [Vite TypeScript features](https://vite.dev/guide/features).

### Material UI, tests, translations and assets

**Decision**: Centralize MUI theme tokens; use semantic HTML; test behavior with Vitest, React Testing
Library and Playwright; keep `pt.ts`/`en.ts` translations and images local.

**Rationale**: Theme tokens support responsive consistency, while semantic HTML and manual WCAG checks
remain necessary. Local translations avoid a data flow. Hero images load eagerly; below-fold images lazy-load.

**Alternatives considered**: Ad-hoc styles, snapshot-first tests, accessibility scans alone, and remote
translations do not meet the quality, accessibility or privacy goals.

Sources: [MUI principles](https://mui.com/material-ui/discover-more/vision/), [Vitest](https://vitest.dev/guide/environment.html), [RTL](https://testing-library.com/docs/react-testing-library/intro/), [Playwright](https://playwright.dev/docs/accessibility-testing), [i18next](https://www.i18next.com/overview/configuration-options), and [lazy loading](https://web.dev/articles/browser-level-image-lazy-loading).

### Contact Function with approved privacy boundary

**Decision**: The proposed `POST /api/contact` Function validates a bounded Zod schema on client and
server, accepts only POST, avoids request-body logging and uses a sensitive server-only Resend key.

**Rationale**: Server validation is a trust boundary and sensitive environment variables keep the key
out of the bundle. Governance v1.1.0 permits this only for the documented commercial-contact purpose.

**Alternatives considered**: Browser email SDKs expose credentials; third-party forms add sharing.

Sources: [Vercel Vite](https://vercel.com/docs/frameworks/frontend/vite), [Node Functions](https://vercel.com/docs/functions/runtimes/node-js), and [sensitive variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables).

### Contact PII has a narrow approved exception

**Decision**: Do not claim contact data is discarded after sending until governance and privacy terms
is verified. Governance v1.1.0 permits only the documented contact-form purpose.

**Rationale**: A contact request reaches Vercel, Resend and a recipient mailbox. Resend retains email
data by default; mailbox retention remains. Privacy disclosure needs purpose, processors, transfers,
retention and LGPD-rights information.

**Alternatives considered**: Remove contact submission under the browser-only policy, or amend
governance and specification with a narrow contact-data exception; this option is now approved.

Sources: [Resend storage guidance](https://resend.com/docs/knowledge-base/how-do-i-ensure-sensitive-data-isnt-stored-on-resend), [Resend email API](https://resend.com/docs/api-reference/emails/send-email), and [LGPD agents](https://www.gov.br/incra/pt-br/acesso-a-informacao/tratamento-de-dados-pessoais/agentes-de-tratamento-lgpd).

### Vercel deployment and protected CI

**Decision**: Use Git-connected Vercel previews/production and protected CI checks; monitor aggregate
performance only.

**Rationale**: This preserves repeatability while excluding PII and product data from telemetry.

Sources: [Vercel Git](https://vercel.com/docs/git) and [deployment checks](https://vercel.com/docs/deployment-checks).
