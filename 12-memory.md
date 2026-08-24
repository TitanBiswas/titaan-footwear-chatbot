# Memory Document
## Inuit Chatbot — Session State & Memory Rules

Defines what the bot "remembers" during a conversation, so the flow feels personal rather than repetitive (ties to persona goal: "wants to feel heard").

## 1. Scope of Memory
This is **in-session memory only** — nothing persists after the user closes the chat or leaves the site, since no backend/account system is in scope for this assignment (see `01-PRD.md` §5, Out of Scope).

## 2. What the Bot Remembers Within a Session

| Variable | Set at | Used at | Purpose |
|---|---|---|---|
| `shopping_for` | Step 2a | Step 5 closing tone (optional personalization) | "Someone else" vs "myself" framing |
| `style_preference` | Step 2b | Step 3 (filters which 3 products show), Step 5 reflection line | Personalizes the carousel and reduces re-asking |
| `liked_products[]` | Step 3 (card taps) | Step 5 (re-surfaces liked item first) | Avoids making the user re-state their pick |
| `videos_watched[]` | Step 4 | Not reused downstream, but available for analytics | Tracks engagement, not required for flow logic |
| `pincode` | Step 5 | Step 6 (delivery estimate line) | Only piece of PII collected — used once, not stored beyond session |
| `fallback_count_per_step` | Any step | Fallback Handler (escalation rule in `09-rules.md`) | Triggers human handoff after repeat misses |

## 3. Memory Rules
- Nothing collected is used to pre-fill or skip steps in a way that feels presumptive — memory is used to *reflect back*, not to silently make choices for the user
- `pincode` is the only sensitive field and is not referenced again after Step 6's delivery-estimate line
- If the user goes "Back" and changes an earlier answer, all downstream variables that depended on it are cleared and re-derived (e.g., changing `style_preference` clears `liked_products[]`, since the old carousel no longer applies)

## 4. Explicitly Not Remembered
- No memory persists across separate site visits (no login/account system in this scope)
- No cross-session product recommendation ("last time you looked at...") — out of scope per PRD
- No message-level chat history stored beyond what's needed to render "Back" (i.e., no analytics warehouse in this assignment's scope)

## 5. Future Consideration
A real production version could persist `style_preference` and `liked_products[]` to a logged-in user's profile for return-visit personalization — noted as a Phase 8+ item in `10-phases.md`, not part of this assignment.
