# Tasks: EasyDashboard Product Landing Page

**Input**: Design documents from `specs/001-product-landing/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/contact-api.md, and
quickstart.md

**Tests**: TDD is required for critical components and flows. Write each specified test before its
implementation and observe it failing first.

**Organization**: Tasks are grouped by user story so that each increment remains independently
testable.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Vite React TypeScript application and quality tooling.

- [ ] T001 Initialize the Vite React TypeScript project and scripts in package.json
- [ ] T002 [P] Configure strict TypeScript and path aliases in tsconfig.json and vite.config.ts
- [ ] T003 [P] Configure ESLint and Prettier in eslint.config.js and .prettierrc.json
- [ ] T004 [P] Configure Vitest, jsdom, React Testing Library, and shared test setup in vite.config.ts and src/test/setup.ts
- [ ] T005 [P] Configure Playwright projects and base test settings in playwright.config.ts
- [ ] T006 [P] Configure Vercel project behavior, sensitive environment-variable documentation, and build settings in vercel.json and .env.example
- [ ] T007 Add CI quality workflow for lint, format check, typecheck, unit tests, E2E tests, and build in .github/workflows/ci.yml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared application, localization, design, accessibility, and privacy
foundations.

**⚠️ CRITICAL**: Complete this phase before beginning a user-story phase.

- [ ] T008 Create the application entry point and semantic page shell in src/main.tsx and src/App.tsx
- [ ] T009 [P] Define accessible MUI theme tokens, color contrast, typography, breakpoints, and focus styles in src/theme/theme.ts
- [ ] T010 [P] Define Portuguese and English static dictionaries in src/locales/pt.ts and src/locales/en.ts
- [ ] T011 Configure browser-language detection, Portuguese fallback, and i18next provider in src/locales/i18n.ts and src/main.tsx
- [ ] T012 [P] Create shared semantic layout, skip link, header, footer, and focus behavior in src/components/layout/SiteLayout.tsx and src/components/layout/SiteLayout.test.tsx
- [ ] T013 [P] Create reusable accessible section, button, and status-message primitives in src/components/ui/Section.tsx, src/components/ui/PrimaryCta.tsx, and src/components/ui/StatusMessage.tsx
- [ ] T014 Implement localized semantic SEO, Open Graph, and Schema.org metadata configuration in src/lib/seo.ts and src/App.tsx
- [ ] T015 Document product-data versus contact-data boundaries and approved third parties in src/content/privacy.ts
- [ ] T016 Create shared rendering helpers with MUI and i18n providers in src/test/render.tsx

**Checkpoint**: Foundation supports responsive, localized, accessible stories without transmitting
dashboard data.

---

## Phase 3: User Story 1 - Understand the Product Value (Priority: P1) 🎯 MVP

**Goal**: Let a first-time B2B visitor immediately understand the product and request a demo or
commercial contact through an accessible CTA.

**Independent Test**: On a mobile viewport, a visitor can identify the value/privacy message and
complete a keyboard-only valid contact request; invalid input exposes accessible recovery guidance.

### Tests for User Story 1

- [ ] T017 [P] [US1] Write failing behavior tests for hero value proposition, privacy statement, and primary CTA in src/features/landing/Hero.test.tsx
- [ ] T018 [P] [US1] Write failing validation, status, and keyboard tests for the contact form in src/features/contact/ContactForm.test.tsx
- [ ] T019 [P] [US1] Write failing request/response contract tests for POST /api/contact in tests/contract/contact-api.test.ts
- [ ] T020 [P] [US1] Write failing Playwright CTA, contact success/error, and Tab/Enter journey tests in tests/e2e/contact.spec.ts

### Implementation for User Story 1

- [ ] T021 [US1] Implement localized hero content and above-the-fold CTA in src/features/landing/Hero.tsx
- [ ] T022 [US1] Define shared client and server Zod contact schema with field limits and honeypot handling in src/features/contact/contactSchema.ts
- [ ] T023 [US1] Implement accessible contact form states, validation messages, privacy acknowledgement, and duplicate-submit prevention in src/features/contact/ContactForm.tsx
- [ ] T024 [US1] Implement the contact request client with generic failure handling and no data persistence in src/features/contact/contactClient.ts
- [ ] T025 [US1] Implement POST-only Vercel contact Function with server validation, anti-abuse boundary, no body logging, and Resend delivery in api/contact.ts
- [ ] T026 [US1] Integrate hero CTA, contact dialog/section, and status announcements in src/features/landing/LandingPage.tsx
- [ ] T027 [US1] Add verified sending-domain, sensitive-key, recipient, reply-to, and privacy-notice setup instructions in README.md and .env.example

**Checkpoint**: User Story 1 is independently demonstrable without the interactive product demo.

---

## Phase 4: User Story 2 - Explore Capabilities Safely (Priority: P2)

**Goal**: Let visitors explore an accessible example-only visualization of manual input and upload
workflows without contributing real data.

**Independent Test**: A visitor can understand both input methods and the interactive-chart outcome
using keyboard or assistive technology, with a meaningful non-animated fallback.

### Tests for User Story 2

- [ ] T028 [P] [US2] Write failing component tests for the example chart demonstration, keyboard controls, and reduced-motion behavior in src/features/demonstration/ProductDemo.test.tsx
- [ ] T029 [P] [US2] Write failing Playwright keyboard and reduced-motion journeys for the demonstration in tests/e2e/demonstration.spec.ts

### Implementation for User Story 2

- [ ] T030 [P] [US2] Add descriptively named hero and secondary visual assets in src/assets/
- [ ] T031 [US2] Create fictional chart data and localized capability copy in src/features/demonstration/demoContent.ts
- [ ] T032 [US2] Implement accessible input-method explanation, example chart interaction, and reduced-motion fallback in src/features/demonstration/ProductDemo.tsx
- [ ] T033 [US2] Integrate hero-priority and secondary lazy-loading image policy in src/features/demonstration/ProductVisuals.tsx and src/features/landing/Hero.tsx
- [ ] T034 [US2] Integrate the demonstration into the landing flow with semantic headings and fallback content in src/features/landing/LandingPage.tsx

**Checkpoint**: User Story 2 is independently usable with example content and never accepts or
sends visitor dashboard data.

---

## Phase 5: User Story 3 - Verify Privacy and Trust Signals (Priority: P3)

**Goal**: Let privacy-conscious buyers distinguish browser-local dashboard processing from the
limited contact-data exception and reach legal information accessibly.

**Independent Test**: A visitor finds plain-language privacy information and can determine which
data remains local, which minimal contact data is sent, and how to exercise privacy rights.

### Tests for User Story 3

- [ ] T035 [P] [US3] Write failing content and accessible-link tests for local-processing and contact-data disclosures in src/features/privacy/PrivacyTrust.test.tsx
- [ ] T036 [P] [US3] Write failing Playwright keyboard journey for privacy/legal links and disclosures in tests/e2e/privacy.spec.ts

### Implementation for User Story 3

- [ ] T037 [US3] Create localized privacy, processor, retention, transfer, and LGPD-rights content in src/features/privacy/privacyContent.ts
- [ ] T038 [US3] Implement accessible privacy/trust section and legal-information links in src/features/privacy/PrivacyTrust.tsx
- [ ] T039 [US3] Integrate privacy/trust content into the landing page and contact form acknowledgement in src/features/landing/LandingPage.tsx and src/features/contact/ContactForm.tsx
- [ ] T040 [US3] Document the verified Resend retention setting, Vercel/Resend processors, and privacy-rights contact channel in docs/privacy-operations.md

**Checkpoint**: User Story 3 makes the data boundary and contact exception clear without weakening
the browser-local product promise.

---

## Phase 6: Polish and Cross-Cutting Concerns

**Purpose**: Finish release gates shared by all stories.

- [ ] T041 [P] Validate equivalent Portuguese and English title, description, Open Graph, Schema.org, language alternates, and semantic hierarchy in src/lib/seo.ts and tests/e2e/seo.spec.ts
- [ ] T042 [P] Add automated accessibility scans and document manual WCAG 2.1 AA review with browser, screen reader, keyboard, 200% zoom, and high-contrast evidence in tests/e2e/accessibility.spec.ts and docs/accessibility-review.md
- [ ] T043 [P] Add anonymous, minimized, disclosed Core Web Vitals monitoring that excludes personal and product data in src/lib/monitoring.ts and README.md
- [ ] T044 [P] Run asset optimization and validate hero/secondary image loading policy in src/assets/ and src/features/demonstration/ProductVisuals.tsx
- [ ] T045 Run all quickstart validation scenarios and record release-gate evidence in docs/release-validation.md
- [ ] T046 Perform final Clean Code/SOLID refactor and remove unused code in src/
- [ ] T047 Obtain and record legal/privacy-owner approval of the contact notice, lawful basis, processors, transfers, retention, deletion, and LGPD-rights channel in docs/privacy-operations.md
- [ ] T048 Run Chrome stable Moto G Power emulation with cold cache and simulated 4G against 2.5-second largest-contentful and 0.1 layout-shift targets in docs/release-validation.md
- [ ] T049 Conduct and record a moderated evaluation with at least 10 target B2B participants covering 15-second comprehension, mobile/keyboard CTA completion, and demonstration understanding in docs/usability-validation.md

---

## Dependencies and Execution Order

### Phase Dependencies

- **Setup (Phase 1)** has no dependencies.
- **Foundational (Phase 2)** depends on Setup and blocks all stories.
- **US1 (Phase 3)** depends on Foundational and is the MVP.
- **US2 (Phase 4)** depends on Foundational and can proceed in parallel with US1 after shared
  landing integration points are agreed.
- **US3 (Phase 5)** depends on Foundational and can proceed in parallel with US1/US2; its contact
  acknowledgement integration follows US1's form.
- **Polish (Phase 6)** depends on all desired stories.

### User Story Dependencies

- **US1 (P1)**: Independent after Foundational; supplies the commercial CTA and contact journey.
- **US2 (P2)**: Independent after Foundational; uses only fictional example data.
- **US3 (P3)**: Independent privacy content after Foundational; contact-form acknowledgement depends
  on T023 when integrating T039.

### Parallel Opportunities

- T002–T007 and T009–T016 can be distributed by file ownership.
- Tests T017–T020, T028–T029, and T035–T036 can be written in parallel before their respective
  implementations.
- US2 can start on T030–T032 while US1 implements contact functionality; US3 can start on T037–T038
  at the same time.
- T041–T044 can run in parallel after all story integrations finish.

## Parallel Example: User Story 1

```text
T017 src/features/landing/Hero.test.tsx
T018 src/features/contact/ContactForm.test.tsx
T019 tests/contract/contact-api.test.ts
T020 tests/e2e/contact.spec.ts
```

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 and its tests.
3. Validate the P1 value proposition, privacy boundary, CTA, and contact journey independently.
4. Deploy a preview only after the contact privacy notice, processor configuration, and sensitive
   environment settings are available.

### Incremental Delivery

1. Add US2 after MVP to improve product understanding and retention without collecting dashboard data.
2. Add US3 to complete trust, transparency, and legal-information requirements.
3. Complete Phase 6 before production promotion.
