# Quickstart Validation: EasyDashboard Product Landing Page

## Prerequisites

- Current Node.js LTS and npm.
- A Vercel project linked to the repository for preview deployments.
- A verified Resend sending domain and a sensitive `RESEND_API_KEY` configured only in Vercel.
- A reviewed privacy notice covering the contact-data exception in the contact contract.

## Local Quality Checks

After dependencies are installed, run the project scripts in this order:

```bash
npm run lint
npm run format:check
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

Expected results: every command succeeds; critical components have behavior-focused tests; E2E
tests cover page access, keyboard `Tab`/`Enter`, and contact form success/error handling.

## Manual Acceptance Checks

1. At 320 CSS pixels, confirm the initial viewport exposes value proposition, browser-local privacy
   statement, and demo/contact CTA without horizontal scrolling.
2. Navigate the page and all demonstration/contact controls by keyboard alone; visible focus, order,
   and Enter activation must be correct.
3. Use a screen reader, high contrast, 200% zoom, and reduced-motion preferences; validate the
   WCAG 2.1 AA requirements in the feature specification.
4. Switch between Portuguese and English, then use an unsupported browser language; Portuguese must
   be the fallback and content must retain the same meaning.
5. Submit invalid contact inputs; accessible error messages identify each correction and no request
   is sent.
6. Submit a valid contact request in a preview environment; verify the generic success response and
   delivery to the configured recipient without exposing data in browser/server logs.
7. Inspect the request contract and monitoring configuration to confirm dashboard data never reaches
   `/api/contact` or any third-party tool.
8. Validate title, meta description, Open Graph tags, Schema.org data, and visible-content agreement.

## Release Gates

- Contract requirements in [contact-api.md](./contracts/contact-api.md) are implemented and tested.
- Legal/privacy owner approves the contact notice, retention, processors, transfer statement, and
  LGPD rights channel.
- CI checks and Vercel deployment checks pass before production promotion.
