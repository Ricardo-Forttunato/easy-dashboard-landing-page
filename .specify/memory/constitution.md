<!--
Sync Impact Report
- Version change: 1.0.0 -> 1.1.0
- Modified principles: III. Privacy by Design and LGPD Compliance expanded with a narrowly scoped
  contact-form exception.
- Added sections: none.
- Removed sections: none.
- Follow-up TODOs: configure and document contact-data retention and provider settings before release.
-->
# EasyDashboard Constitution

## Core Principles

### I. Clean, SOLID, and Intentional Design
Production code MUST have a single, clear responsibility and use explicit boundaries between
presentation, domain logic, and infrastructure. Components and modules MUST be cohesive,
independently testable, and depend on abstractions at integration boundaries. Duplication,
implicit side effects, speculative abstractions, and unnecessary complexity MUST be removed or
justified in review. This keeps a B2B product trustworthy, maintainable, and adaptable.

### II. Test-Driven Quality for Critical Paths
Changes to critical components MUST follow Red-Green-Refactor: write a failing test, implement
the smallest passing change, then refactor. Critical paths include the primary CTA, navigation,
interactive feature demonstrations, file-selection and client-side parsing boundaries, privacy
guarantees, and accessibility interactions. Unit and component tests MUST cover their expected,
error, and keyboard-accessible states; regressions MUST receive a reproducing test.

### III. Privacy by Design and LGPD Compliance
EasyDashboard MUST process manual inputs and uploaded files entirely in the browser. Raw inputs,
uploaded file contents, derived datasets, and chart data MUST NOT be transmitted to external APIs,
analytics providers, or application servers, and MUST NOT be persisted in browser or server
storage unless the user explicitly requests a future, separately specified local-only capability.
Any telemetry MUST be anonymous, minimized, disclosed, and incapable of collecting personal or
raw dashboard data. Features MUST document their data flow and satisfy LGPD purpose limitation,
data minimization, transparency, and security requirements.

The sole permitted exception is a voluntary contact form for commercial demonstration requests.
It MAY transmit only the minimum contact data needed to answer that request to approved processors
and the EasyDashboard recipient mailbox. It MUST NOT receive dashboard inputs, uploads, derived
datasets, or chart data. Before release, the form MUST provide a clear privacy notice and lawful
basis, use server-side validation and abuse controls, avoid application request-body logging, and
document processors, international transfers, retention, deletion, and LGPD rights. The exception
does not permit analytics, profiling, or unrelated reuse of contact data.

### IV. Accessible Mobile-First Experience
Every interface MUST be designed mobile-first and remain responsive without loss of content or
functionality across supported viewport sizes. It MUST conform to WCAG 2.1 AA, including
semantic markup, sufficient contrast, visible focus, text alternatives, accessible names and
status announcements, and 100% keyboard-operable behavior. Screen-reader and high-contrast use
MUST be considered an acceptance criterion, not a post-release enhancement.

### V. Clear Value and Measurable Engagement
The above-the-fold experience MUST state the EasyDashboard value proposition, emphasize that data
remains local, and expose a prominent, unambiguous primary CTA. The landing page MUST include an
accessible interactive or visual presentation of core capabilities that helps visitors understand
the product without uploading sensitive data. Engagement elements MUST preserve performance,
privacy, user control, and accessibility; decorative motion MUST respect reduced-motion settings.

## Product and Privacy Constraints

EasyDashboard is a B2B landing page for a browser-based product that creates charts from manual
input or uploaded files. Product claims, demonstrations, and UI copy MUST accurately describe
client-side processing and must not imply that raw customer data is retained, analyzed remotely,
or shared.

Privacy copy MUST distinguish browser-local dashboard data from voluntary contact-form data. It
MUST NOT claim that contact data is discarded immediately after sending unless provider and
recipient-mailbox retention controls are verified and the statement remains accurate.

The page MUST use semantic SEO: one descriptive primary heading, a logical heading hierarchy,
descriptive links, crawlable content, and meaningful page titles and meta descriptions. Every
public page MUST provide accurate Open Graph metadata and appropriate Schema.org structured data;
structured-data claims MUST match visible content. Third-party scripts, fonts, embeds, and assets
MUST be reviewed for data collection, accessibility, performance, and legal implications before
use.

## Development Workflow and Quality Gates

Each change MUST define acceptance criteria for responsive behavior, accessibility, privacy, SEO,
and relevant critical-path tests before implementation. Code review MUST verify SOLID and Clean
Code boundaries, test evidence, keyboard navigation, screen-reader semantics, contrast, and that
no raw input or upload data crosses the browser boundary.

Before release, the team MUST run the applicable automated tests and validate critical flows on a
small viewport and a desktop viewport. Automated accessibility checks complement, but MUST NOT
replace, manual keyboard and assistive-technology verification. SEO metadata and Schema.org
markup MUST be validated whenever public content or page structure changes. A privacy-impact
review is mandatory for every new integration, storage mechanism, analytics event, upload path,
or data-processing change.

## Governance

This constitution supersedes conflicting implementation preferences and project practices.
Proposed amendments MUST document the affected principles, rationale, compatibility impact,
required migration work, and semantic version bump. Maintainers approve amendments only after
reviewing their effect on privacy, accessibility, quality, and the B2B product promise.

Constitution versions follow semantic versioning: MAJOR for removed or incompatible governance,
MINOR for added principles or materially stronger requirements, and PATCH for clarifications that
do not change obligations. Every feature specification, plan, task list, pull request, and release
review MUST include an explicit compliance check against this constitution. Non-compliance requires
a documented, time-bounded exception approved by maintainers before merge or release.

**Version**: 1.1.0 | **Ratified**: 2026-08-25 | **Last Amended**: 2026-08-26
