# Contact API Contract

## Purpose

Submit a voluntary B2B demonstration or commercial-contact request. This endpoint is the only
approved server boundary and MUST NOT accept dashboard data, uploads, derived datasets, or charts.

## Request

`POST /api/contact`

Content type: `application/json`

| Field | Type | Required | Rules |
|---|---|---:|---|
| `name` | string | Yes | Trimmed, 1-100 characters. |
| `email` | string | Yes | Trimmed, valid email, at most 254 characters. |
| `company` | string | No | Trimmed, at most 150 characters. |
| `message` | string | Yes | Trimmed, 1-2,000 characters. |
| `privacyAcknowledged` | boolean | Yes | Must be `true`. |
| `website` | string | No | Honeypot; must be empty. |

The server MUST repeat validation, accept only POST, reject unknown dashboard/upload fields, avoid
logging request bodies, and apply rate limiting and anti-abuse controls. It MUST accept no more than
five requests per source IP in a rolling 15-minute window, return `429` for excess requests, and
reject a non-empty honeypot without sending an email. The Resend credential MUST remain a sensitive
server-side environment variable. The recipient is
`ricardo.forttunato@gmail.com`; the sender uses a verified Resend domain and the lead address is the
reply-to address.

## Responses

| Status | Meaning | Response body |
|---:|---|---|
| 202 | Request accepted for email delivery | `{ "status": "accepted" }` |
| 400 | Invalid input or missing acknowledgement | `{ "error": "invalid_request" }` |
| 405 | Unsupported method | `{ "error": "method_not_allowed" }` |
| 429 | Rate-limited or suspected abuse | `{ "error": "try_again_later" }` |
| 502 | Email provider could not accept delivery | `{ "error": "delivery_unavailable" }` |

Responses MUST NOT echo submitted values or reveal provider credentials, configuration, or internal
failure details.

## Privacy and Security Conditions

Before release, the privacy notice MUST identify the commercial-contact purpose, lawful basis,
Vercel and Resend processing, possible international transfer, retention, deletion process, and
LGPD rights channel. The implementation must verify and document provider retention settings; it
must not promise immediate discard unless that statement is demonstrably accurate.
