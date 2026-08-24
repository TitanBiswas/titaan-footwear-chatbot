# Phases Document
## Inuit Chatbot — Build Plan Within the 48-Hour Window

Assignment received: Aug 24, 2026 ~05:52 AM IST
Deadline: ~48 hours later (~Aug 26, morning)

## Phase 1 — Planning & Documentation ✅ (Complete)
- PRD, Persona, Conversation Flow, Content Script, UX Spec, Fallback Matrix, Review Checklist, Architecture, Rules
- Output: this full document set

## Phase 2 — Tool Selection & Setup
- Pick a builder from cui.tools (or an equivalent free tool) based on: ease of building a Carousel + Quick Replies without code, and shareability of the finished flow with a reviewer
- Set up a blank project/flow

## Phase 3 — Build Core Flow
- Implement Steps 1–2 (welcome + preference discovery)
- Implement Step 3 (product carousel)
- Implement Step 4 (video carousel)
- Implement Steps 5–6 (order + closing)
- Wire up "⬅ Back" navigation across all steps

## Phase 4 — Fallback Implementation
- Add fallback re-prompt behavior per `06-fallback-error-handling.md`
- Add escalation-after-repeat-miss behavior
- Add pincode format validation

## Phase 5 — Self-Review & QA
- Run the entire flow start to finish as a fresh user would
- Walk through `07-review-test-checklist.md` line by line
- Fix any dead ends, tone inconsistencies, or missing Back buttons found

## Phase 6 — Task 2 + Packaging
- Write the "about yourself" paragraph (<300 words)
- Take screenshots / export a shareable link of the finished flow
- Compile everything into the reply email

## Phase 7 — Submission
- Reply to Vishal Shukla's original thread (haptik.co) within the 48-hour window
- Attach: finished flow (link or screenshots), Task 2 paragraph, and — optionally — this documentation set as evidence of process

## Future Phases (beyond this assignment, noted for completeness)
- Phase 8: Real NLU integration for free-text understanding beyond pincode
- Phase 9: Live website embed + real product/checkout API integration
- Phase 10: A/B test welcome message variants for drop-off impact
