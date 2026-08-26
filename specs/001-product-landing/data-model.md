# Data Model: EasyDashboard Product Landing Page

## Prospective Customer

Represents an anonymous visitor evaluating the landing page. It has no account, identifier, or
stored profile. Interactions with the product demonstration use fictional example content only.

## Dashboard Data

Represents manual chart inputs, uploads, derived datasets, and chart output belonging to a visitor.
It is processed only in the visitor's browser, is never accepted by the contact endpoint, and has no
server-side lifecycle.

## Contact Request

Represents the sole approved transmission of personal data: a voluntary request for a demonstration
or commercial contact.

| Field | Required | Validation and handling |
|---|---:|---|
| Name | Yes | Trimmed non-empty text, maximum 100 characters. |
| Work email | Yes | Trimmed valid email address, maximum 254 characters. |
| Company | No | Trimmed text, maximum 150 characters. |
| Message | Yes | Trimmed non-empty text, maximum 2,000 characters. |
| Privacy acknowledgement | Yes | Explicit affirmative acknowledgement before submission. |
| Honeypot | No | Must remain empty; it is never included in email content. |

Lifecycle: `editing` → `client-invalid` or `ready` → `submitting` → `sent` or `recoverable-error`.
The client must prevent duplicate submissions while `submitting`. Server validation is authoritative;
invalid, abusive, malformed, or non-POST requests never create an email.

The request exists in application memory only long enough to validate and send. The application does
not persist it or log its body. Provider and recipient-mailbox retention are external processing and
must be disclosed in the privacy notice before release.

## Trust Information

Represents public, localized content explaining local dashboard processing, the contact-data
exception, processors, retention, privacy rights, legal information, and how to request a demo.
It must distinguish Dashboard Data from Contact Request data consistently in Portuguese and English.
