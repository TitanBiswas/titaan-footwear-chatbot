# Rules Document
## Inuit Chatbot — Conversation & Business Logic Rules

## 1. Conversation Rules

| Rule ID | Rule | Rationale |
|---|---|---|
| R1 | Every bot message must end with 2–4 tappable options, except free-text prompts | Keeps navigation frictionless; avoids dead ends |
| R2 | Maximum 1 emoji per bot message | Prevents tone from tipping into "spammy" |
| R3 | Free text is only ever requested for the delivery pincode | Minimizes fallback risk (see Architecture §3) |
| R4 | "⬅ Back" is present on every step except Step 1 (welcome) and Step 6 (closing) | Matches the brief's hint about letting users revisit history |
| R5 | The bot never asks more than 2 questions before showing something visual (product/video) | Keeps the flow "short, simple, personal" per the brief |
| R6 | A step's message + options must be re-shown verbatim (not silently skipped) if input doesn't match | Prevents the user from feeling stuck or ignored |

## 2. Fallback Escalation Rule

- 1st unmatched input on a step → re-prompt with same options (soft correction)
- 2nd unmatched input in a row on the same step → re-prompt **plus** a `Talk to support` escape hatch
- Bot never escalates to human on the first miss (would feel broken/impatient)

## 3. Order/Checkout Rules

- Order is only "confirmed" after: (a) a shoe has been referenced in-session (picked or default category), and (b) a valid-format pincode has been entered
- Pincode validation: exactly 6 digits, numeric only — no real geo-validation needed for the demo
- No real payment is collected — "Confirm order" simply moves to the closing message

## 4. Session Rules

- Session state resets only on explicit user action (closing the chat) or genuine site navigation away — not on a single fallback event
- A user who says "hi"/"hello" mid-flow is NOT treated as wanting to restart — they're re-shown the current step (see `06-fallback-error-handling.md`)

## 5. Content Rules

- No line of bot copy may exceed ~2 short sentences (matches "short, simple, personal")
- Brand voice must stay warm/boutique, never generic corporate phrasing (banned phrases: "How may I assist you today?", "Please select an option below.")
