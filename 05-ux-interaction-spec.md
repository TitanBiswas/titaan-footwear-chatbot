# UX / Interaction Design Spec
## Inuit Chatbot — Chat Element Usage Rationale

This document exists to make the "creative use of chat elements" grading point explicit and defensible — every element choice below has a reason, not just variety for its own sake.

| Step | Element | Why this element (not another) |
|---|---|---|
| 1 | Quick Replies | Fastest way to branch intent (tour / know what I want / browsing) without typing. Only 3 options — stays scannable. |
| 2 | Quick Replies + Back button | Preference capture needs to be zero-friction; free text here would slow the user down and risk unmatched intents. Back button lets user correct a misclick. |
| 3 | Carousel | Shoes are visual products — a carousel lets the user compare 3 options side by side, which a plain text list can't do. |
| 3 | Button ("Show me 🎥") | Single clear next action after browsing, not a menu — keeps momentum toward Step 4. |
| 4 | Carousel | Same visual logic as Step 3 — videos need thumbnails to be inviting; plain links would get ignored. |
| 4 | Emoji (🎥, single use) | Signals "this is media, tap to watch" at a glance — functional, not decorative. |
| 5 | Free text (pincode only) | The one piece of information that can't reasonably be a button (too many possible values). Kept as the *only* free-text moment in the whole flow by design. |
| 5–6 | Buttons | Order confirmation and closing are decision points, not open questions — buttons remove ambiguity at the moment that matters most (checkout). |
| All steps | Persistent "⬅ Back" | Directly answers the brief's hint about letting users revisit their history without derailing the flow. |

## General interaction rules

1. **No more than 4 options per Quick Reply/Button set** — keeps decisions fast (aligned with the "keep it short & simple" instruction).
2. **Carousels capped at 3 cards** — matches the assignment's own "three videos" spec and avoids overwhelming a luxury-brand user.
3. **Emoji budget: 1 per bot message, max** — used only where it adds meaning (a wave to greet, a shopping bag for the CTA), never stacked.
4. **Free text is opt-in and minimal** — only used once (pincode), everywhere else the user taps. This is deliberate: fewer typed responses = fewer chances for the bot to "not understand."
