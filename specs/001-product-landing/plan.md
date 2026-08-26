# Implementation Plan: EasyDashboard Product Landing Page

**Branch**: `001-product-landing` | **Date**: 2026-08-26 | **Spec**: [spec.md](./spec.md)

## Summary

Build a mobile-first, multilingual B2B landing page using Vite, React, TypeScript and Material UI.
It presents the browser-local EasyDashboard product, an accessible interactive demonstration, and a
CTA for a demo or commercial contact.

**Status: READY FOR IMPLEMENTATION.** Governance v1.1.0 authorizes a narrowly scoped commercial
contact-form exception. Dashboard inputs, uploads, derived datasets, and chart data remain strictly
browser-local; the contact flow has separate disclosure and validation obligations.

## Technical Context

**Language/Version**: TypeScript strict mode; current supported Node.js LTS

**Primary Dependencies**: React, Vite, Material UI, Zod, react-i18next/i18next, Vitest, React
Testing Library, Playwright, and Resend SDK (server only)

**Storage**: No database or browser/server persistence for dashboard inputs, uploads, or chart
data. Contact-message delivery is limited to the approved contact-data exception; no application
database or request-body logging is permitted.

**Testing**: TDD with Vitest and React Testing Library; Playwright E2E for page access, contact
submission, and `Tab`/`Enter`; automated and manual WCAG 2.1 AA verification

**Target Platform**: Modern mobile and desktop browsers; Vercel static hosting and Function runtime

**Project Type**: Static SPA with one proposed serverless contact endpoint

**Performance Goals**: At 320 CSS pixels, value, privacy statement and CTA appear without
horizontal scrolling; hero is prioritized, secondary images are lazy loaded, and performance
telemetry is anonymous, minimized, disclosed, and excludes personal and product data. Performance
validation uses Chrome stable emulating Moto G Power, cold cache, and simulated 4G.

**Constraints**: WCAG 2.1 AA; browser-local dashboard data; LGPD privacy-by-design; semantic SEO,
Open Graph and Schema.org; Portuguese fallback; ESLint, Prettier, and strict TypeScript in CI

**Scale/Scope**: One public landing page, Portuguese and English content, a safe demonstration,
privacy/legal content, and one contact conversion path

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Evidence / action |
|---|---|---|
| Clean, SOLID design and testability | PASS | Separation of presentation, domain and infrastructure plus TDD is planned. |
| Privacy-by-design and LGPD | PASS, conditional | Governance v1.1.0 permits minimum contact PII only for a commercial request. Release requires privacy notice, lawful basis, processor/transfer/retention documentation, validation, anti-abuse controls, and no body logging. |
| Browser-local dashboard data | PASS, conditional | Demonstrations use fictional data; dashboard inputs/uploads/chart data remain local. |
| Mobile-first WCAG 2.1 AA | PASS | Theme tokens, semantic HTML, keyboard tests, assistive review, contrast and reduced motion are planned. |
| Value, engagement and SEO | PASS, conditional | Above-fold value/privacy/CTA, interactive demo, semantic metadata and structured data are planned; third parties need privacy review. |

**Gate decision:** PASS — Phase 1 design is complete. The conditional privacy controls are release
gates and are captured in the contact contract and quickstart.

## Project Structure

### Documentation (this feature)

```text
specs/001-product-landing/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md               # Created by speckit-tasks
```

### Source Code (repository root)

```text
src/
├── assets/                # Descriptive static images
├── components/            # Reusable accessible UI
├── features/
│   ├── contact/           # Contact UI and validation
│   ├── demonstration/     # Example-only chart presentation
│   └── landing/           # Hero and landing sections
├── locales/               # pt.ts and en.ts dictionaries
├── theme/                 # MUI tokens and theme
└── test/                  # Shared test setup
api/contact.ts             # Vercel Function for approved contact-data exception
tests/e2e/                 # Playwright critical journeys
```

**Structure Decision**: A single Vite React application keeps UI, localization, assets and tests
cohesive. The only server-side boundary is the approved, minimal contact-data Function.
