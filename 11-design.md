# Design Document
## Inuit Chatbot — Visual & Brand Design Guidelines

This complements `05-ux-interaction-spec.md` (which covers *which* element to use *when*) by covering how things should *look and feel*.

## 1. Brand Positioning
Inuit is a **luxury** footwear brand. The bot's visual and verbal design must never feel like a discount-retailer popup — it should feel like being greeted by a knowledgeable boutique assistant.

## 2. Visual Tone

| Attribute | Direction |
|---|---|
| Color palette | Muted, premium tones (charcoal, cream, warm gold accents) — avoid bright primary "chatbot blue" |
| Typography | Clean serif or refined sans-serif for bot name/header; simple sans-serif for message bubbles |
| Avatar | A minimal logo mark, not a cartoon mascot — keeps it upscale |
| Carousel cards | Large product/video imagery, minimal text overlay — let the craftsmanship visuals do the talking |
| Buttons | Rounded, low-saturation, understated — not loud CTAs |

## 3. Copy Formatting Rules
- Sentence case, not ALL CAPS, for any button/label
- No exclamation-point stacking ("Great!!" → "Great.")
- Emoji used per `09-rules.md` (max 1/message) and always in a tasteful, non-cartoonish placement (end of sentence, not scattered)

## 4. Layout Principles
- One idea per bot bubble — don't stack multiple questions in one message
- Carousels: 3 cards max, horizontally scrollable, image-forward
- Quick Replies/Buttons: max 4 per set, left-to-right in order of likely relevance (most common answer first)

## 5. Accessibility Notes
- Sufficient text contrast against the muted palette (don't sacrifice legibility for "premium" tone)
- All Carousel images need descriptive alt text (e.g., "Marchetti Oxford, brown leather formal shoe")
- Buttons/Quick Replies should be tappable at a reasonable touch-target size on mobile, since most site traffic for a browsing decision like this is likely mobile

## 6. What to Avoid
- Stock "friendly robot" bot avatars — clashes with the luxury positioning
- Generic e-commerce chatbot greetings ("🛒 Hi! Need help?")
- Overly playful tone that undercuts the premium feel (this is warm, not goofy)
