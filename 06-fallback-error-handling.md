# Fallback & Error Handling Matrix
## Inuit Chatbot

Directly addresses grading point 5: "How does the bot handle a message from the user that it doesn't understand?"

## Design principle
Never respond with a bare "I didn't understand." Always (a) acknowledge, (b) re-offer the same valid options, (c) give an escape hatch to a human or the menu.

## Fallback scenarios

| Scenario | Trigger | Bot response |
|---|---|---|
| Unrecognized free text at a button/quick-reply step | User types instead of tapping, and text doesn't match an expected intent | "Hmm, I didn't quite catch that 🤔 — here are your options again:" *(re-shows same Quick Replies/Buttons)* |
| Invalid pincode format (Step 5) | Non-numeric or wrong length | "That doesn't look like a valid pincode — mind double-checking? (6 digits, e.g. 110001)" |
| Repeated fallback (2nd miss in a row on same step) | Same step triggers fallback twice | Adds a human handoff option: "Still stuck? I can loop in a human for you." + `Talk to support` button |
| User asks something out of scope (e.g., "What's your return policy?") | Free text matches no defined intent, not a formatting error | "Great question — that's outside what I can help with right now, but our support team can: `Talk to support`. Want to get back to finding your shoes?" + `Continue shopping` button |
| User goes silent / inactive | No response for a defined timeout | One gentle nudge only: "Still there? I'll be here whenever you're ready 👋" — no repeated pinging |
| User types a greeting mid-flow ("hi", "hello") | Common false trigger for "unrecognized" | Treated as a soft reset acknowledgment, not an error: "Hey again! Picking up where we left off:" *(re-shows current step's options)* |

## What the bot never does
- Never repeats the exact same fallback line twice in a row (varies phrasing to avoid feeling robotic/broken)
- Never leaves the user with zero tappable options after a fallback
- Never silently ignores unrecognized input
