# Architecture Document
## Inuit Chatbot — System & Flow Architecture

## 1. High-Level Architecture

This is a scripted/rules-based conversational flow (no LLM/NLU backend required for the assignment), built and demoed on a no-code chat design tool.

```
[Website Visitor]
      │
      ▼
[Chat Widget (embedded on site)]
      │
      ▼
[Conversation Engine — built on chosen tool from cui.tools]
      │
      ├── Step Logic (Steps 1–6, see 03-conversation-flow.md)
      ├── Session Memory (see 12-memory.md)
      ├── Fallback Handler (see 06-fallback-error-handling.md)
      │
      ▼
[Mock Data Layer]
      ├── Product catalog (3 sample shoes, static)
      ├── Video content (3 sample thumbnails/titles, static)
      └── Order confirmation (simulated — no real payment gateway)
```

## 2. Component Breakdown

| Component | Responsibility | Notes for this assignment |
|---|---|---|
| Chat Widget | Entry point, renders bot UI on the website | Simulated via chosen builder tool, not a live site |
| Conversation Engine | Drives step sequencing, branching logic | Rules-based state machine, not free-form NLU |
| Session Memory | Holds user's answers across the session | See `12-memory.md` — in-session only, no persistence needed |
| Fallback Handler | Intercepts unmatched input at any step | Rule: re-prompt with same options, escalate after repeat miss |
| Mock Data Layer | Supplies product/video content to Carousels | Static, hardcoded for the demo — no real backend |

## 3. Why rules-based (not NLU/LLM-based)

The brief asks for a demo of conversation design skill (personality, chat elements, navigation, fallback) — not a production NLU build. A deterministic step-based flow:
- Is easier for a reviewer to trace end-to-end (ties to grading point 3: navigation)
- Keeps behavior 100% predictable during a live demo
- Matches "short, simple" guidance in the brief

If this were a real production build for Inuit, a next iteration would add NLU intent matching (e.g., via Haptik's own platform) so free-text input could be understood beyond the single pincode field — noted as a future phase in `10-phases.md`.

## 4. Data Flow for a Single Turn

1. User taps a Button/Quick Reply (or types, in the one free-text field)
2. Conversation Engine matches input against the current step's expected options
3. Match found → Session Memory updated → next step's message + elements rendered
4. No match → Fallback Handler triggered (see matrix in `06-fallback-error-handling.md`)

## 5. Integration Points (for future/real build, not required for this assignment)

- Website embed (JS snippet)
- Real product catalog API (replacing mock data)
- Payment/checkout system (replacing simulated confirmation)
- Human handoff to live support queue
