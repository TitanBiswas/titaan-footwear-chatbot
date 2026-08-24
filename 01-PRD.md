# Product Requirements Document (PRD)
## Inuit Shoe Shop — Website Chatbot

**Prepared by:** Titan Kumar Biswas
**Assignment:** Bot Analyst / Implementation Analyst — Jio Haptik
**Version:** 1.0

---

## 1. Background & Problem Statement

Inuit is a luxury online footwear brand. Despite selling premium shoes successfully, a large share of website visitors leave without browsing the product range. The business hypothesis is that visitors need a more guided, engaging entry point than a static website — someone (or something) to greet them, help them find what they want, build trust in the product craftsmanship, and nudge them toward a purchase.

## 2. Goal

Design a website chatbot that reduces drop-off by actively engaging visitors from the moment they land, guiding them toward a completed home-delivery order.

## 3. Objectives (what the bot must do)

| # | Objective | Maps to task brief |
|---|-----------|---------------------|
| O1 | Greet the visitor and introduce the Inuit product range | "Welcome the user and tell them about the products Inuit brand sells" |
| O2 | Understand the visitor's shoe preference | "Ask the user about some specifics of their choice of shoe" |
| O3 | Build trust/desire through craftsmanship storytelling | "Show three videos about how Inuit shoes are made" |
| O4 | Convert interest into an order | "Ask the user to place an order for home delivery" |

## 4. Target User

A visitor who has already landed on the Inuit website (i.e., already has some purchase intent) but is unsure what to pick or not engaged enough to browse manually. See `02-user-persona.md` for detail.

## 5. Scope

**In scope:**
- End-to-end conversational flow from greeting to order placement
- Use of rich chat elements: Quick Replies, Carousels, Buttons, Emojis
- A fallback/"I didn't understand that" path
- A closing/confirmation message

**Out of scope:**
- Actual payment gateway integration (simulated "order placed" confirmation is sufficient)
- Backend inventory/catalog integration (mock product data is fine)
- Multi-language support

## 6. Success Criteria (how this gets graded)

Directly from the assignment brief, the bot will be evaluated on:
1. **Personality and tone** — consistent, on-brand (luxury but approachable), not robotic
2. **Creative use of chat elements** — Quick Replies, Carousels, Buttons, Emojis used purposefully, not decoratively
3. **Navigation** — user can move through the flow easily, including revisiting earlier steps via buttons
4. **Onboarding & closing** — clear start and a clear, satisfying end to the conversation
5. **Fallback handling** — graceful behavior when the bot doesn't understand a message

A `07-review-test-checklist.md` document maps each of these to concrete, checkable test cases.

## 7. Constraints & Guidelines (from the brief)

- Build the flow in any tool, or one from **cui.tools**
- Haptik.ai's own website bot can be used as inspiration
- Keep the conversation **short, simple, and personal**
- The flow must be **easy for a reviewer to follow** — favors clarity over cleverness

## 8. Deliverables for this project

1. PRD (this document)
2. User Persona
3. Conversation Flow (step-by-step)
4. Content/Script document (every bot message + button/quick-reply labels)
5. UX/Interaction Design Spec (which element is used where, and why)
6. Fallback & Error Handling Matrix
7. Review/Test Checklist
8. Final build (on the chosen tool) + Task 2 paragraph-about-yourself

## 9. Open Decisions (to confirm before build)

- **Tool choice** for building the actual flow (e.g., a cui.tools builder, Voiceflow, Botsociety, or a simple diagram if no live tool is used) — TBD
- **Number of shoe categories** to offer in Task 1 (kept small deliberately, per "short & simple")
- **Video placeholders**: since no real Inuit videos exist, we'll use clearly-labeled placeholder video slots (title + thumbnail description) rather than real URLs

## 10. Timeline

Submission deadline: 48 hours from receipt of assignment (received Aug 24, 2026 ~05:52 AM IST) → **due ~Aug 26, 2026 morning.**
