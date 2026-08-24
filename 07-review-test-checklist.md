# Review / Test Checklist
## Inuit Chatbot — Mapped to Haptik's Grading Criteria

Use this before submission to self-review the built flow against exactly what the assignment says it will be judged on.

## 1. Personality & Tone
- [ ] Every bot line matches the "warm, boutique assistant" voice (see `04-content-script.md`)
- [ ] No line sounds like generic corporate chatbot copy ("How may I assist you today?")
- [ ] Tone stays consistent from greeting to closing — no jarring shifts

## 2. Creative Use of Chat Elements
- [ ] Quick Replies used for fast-branching questions (Step 1, 2)
- [ ] Carousel used for both products (Step 3) and videos (Step 4)
- [ ] Buttons used at every decision point
- [ ] Emoji used sparingly and purposefully (max 1/message)
- [ ] Free text limited to exactly one moment (pincode) — justified in `05-ux-interaction-spec.md`

## 3. Navigation
- [ ] "⬅ Back" available at every step after Step 1
- [ ] "Shop now" / order path reachable from Step 3 onward, not just the end
- [ ] No dead ends — every bot message ends in tappable next steps

## 4. Onboarding & Closing
- [ ] Welcome message clearly states what Inuit sells within the first message
- [ ] Closing message confirms outcome (order placed) and offers a graceful next action
- [ ] User is thanked by name/brand voice at the end, not left hanging after "Confirm order"

## 5. Fallback Handling
- [ ] Unrecognized input never met with silence or a dead "I don't understand"
- [ ] Fallback re-offers valid options each time
- [ ] Escalation to human support exists after repeated fallback
- [ ] Out-of-scope questions (e.g., returns policy) handled gracefully, not ignored

## 6. Brief Compliance (sanity check)
- [ ] All 4 required objectives present: welcome+products, preference question, 3 videos, order prompt
- [ ] Conversation is short — no more than ~10–12 total bot turns end-to-end
- [ ] Reviewer can follow the flow without needing verbal explanation
- [ ] Task 2 (about-yourself paragraph, <300 words) is drafted separately

## 7. Before You Submit
- [ ] Flow built/screenshotted in the chosen tool (cui.tools or equivalent)
- [ ] Reply sent to the original thread from Vishal Shukla within 48 hours, with the completed assignment attached
