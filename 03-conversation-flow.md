# Conversation Flow
## Inuit Chatbot — Step-by-Step Map

Design principle: every step has exactly one clear next action for the user (tap, not type) wherever possible, and the user can always go back via a "Back" or "Change my answer" button.

---

### Step 0 — Trigger
Chat bubble auto-opens (or user clicks) after ~5 seconds on site, or on click of chat icon.

### Step 1 — Welcome & Brand Intro *(Objective O1)*
- Bot greets the user by name if known, else generically
- Short, warm intro to what Inuit sells (premium/luxury footwear — men's, women's, categories)
- Ends with a Quick Reply prompt to keep momentum

**User can:** tap one of the Quick Replies → proceeds to Step 2
**Elements used:** Emoji, Quick Replies

### Step 2 — Preference Discovery *(Objective O2)*
- Bot asks about shoe preference in 1–2 short taps, not a long form:
  - Q2a: Who are you shopping for? (Quick Replies: Myself / Someone else)
  - Q2b: What's the occasion/style? (Quick Replies: Everyday / Formal / Sneakers / Not sure yet)
- Bot reflects the choice back ("Nice, formal it is 👞")

**User can:** tap through both questions, or tap "Not sure yet" to skip to browsing
**Elements used:** Quick Replies, Buttons ("Back" to previous question)

### Step 3 — Show Relevant Picks (bridge step)
- Bot shows a **Carousel** of 3 shoe options matching the stated preference (image, name, price, "View" button per card)
- This isn't in the original 4 objectives explicitly but is the natural bridge between "preference" and "trust-building" — keeps it short per the brief

**User can:** tap a card to "like" it (tracked for later), or tap "Show me how these are made" to proceed
**Elements used:** Carousel, Buttons

### Step 4 — Craftsmanship Videos *(Objective O3)*
- Bot introduces the "how it's made" story in one line
- Presents **3 videos** as a Carousel (thumbnail + title + "Watch" button per card):
  1. "From Leather to Last: Sourcing"
  2. "Handstitched: Inside Our Workshop"
  3. "Final Polish: Quality Check"
- After any video (or if user skips), bot moves forward

**User can:** watch 0–3 videos in any order, or tap "Skip, I'm ready to order"
**Elements used:** Carousel, Buttons, Emoji

### Step 5 — Order Prompt *(Objective O4)*
- Bot re-surfaces the earlier picked shoe(s) (or the general category if none were picked)
- CTA: "Ready to bring these home?" with Buttons: **Place Order** / **Keep Browsing** / **Talk to a human**

**User can:** proceed to a lightweight order-confirmation exchange (name, delivery pincode — kept minimal, no real payment) or loop back to Step 3

### Step 6 — Closing
- Bot confirms the (simulated) order or thanks the user for browsing
- Offers a graceful exit: "Anything else I can help with?" with Buttons (Track my order / Talk to support / No thanks, bye 👋)

### Fallback path (any step)
- Triggered whenever free-text input doesn't match an expected intent
- See `06-fallback-error-handling.md` for full matrix

---

## Navigation rules (addresses grading point 3)
- Every bot message that isn't the very first or last includes a **"⬅ Back"** button alongside the primary options, so the user can revisit their previous answer without restarting.
- A persistent **"🛍 Shop now"** button is available from Step 3 onward, letting the user jump straight to ordering at any point — not just at the end.
- The flow is linear-with-loops (not a maze): Steps 1→2→3→4→5→6, with only Step 3 (browsing) and Step 5 (keep browsing) as loop-back points.
