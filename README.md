# Titaan Footwear — Storefront + AI Concierge Chatbot

**Live demo:** https://titaan-footwear-chatbot.vercel.app

A full front-end e-commerce demo for **Titaan Footwear**, a luxury footwear
brand storefront, featuring a built-in **Titaan Concierge** chatbot that
guides visitors from greeting → style preference → curated product picks →
craftsmanship story videos → delivery check → order.

Built with React 19, TypeScript, Vite, and Tailwind CSS.

## Features

- **Full storefront** — product catalog with filters, product detail modal,
  cart, wishlist, checkout, size guide, store locator, and order tracking.
- **Titaan Concierge chatbot** (`src/components/Chatbot.tsx`) — a scripted,
  rules-based conversational assistant that:
  - Greets visitors and introduces the brand
  - Asks who they're shopping for and their style preference
  - Shows a curated product **carousel** matching that preference
  - Shows a **craftsmanship video carousel** (3 behind-the-scenes stories)
  - Checks delivery by pincode and hands off to checkout
  - Understands a handful of free-text intents (delivery, returns, sizing,
    stores, discounts) and falls back gracefully — re-offering valid
    options — when it doesn't recognize input
  - Remembers the visitor's answers for the session (no backend/login
    required)

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vitejs.dev/) for dev server & build
- [Tailwind CSS 4](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) for icons

## Getting Started

**Prerequisites:** Node.js 18+ and npm

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

### Other scripts

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build locally
npm run lint      # type-check with tsc
```

## Project Structure

```
src/
  components/       UI components (Navbar, ProductList, Chatbot, modals, ...)
  context/          ShopContext — global cart/wishlist/UI state
  data/products.ts  Mock product catalog
  types.ts          Shared TypeScript types
01-PRD.md ... 12-memory.md   Conversation design docs for the chatbot
                              (persona, flow, script, fallback matrix, rules)
```

## Deployment

This is a static Vite app — it deploys to [Vercel](https://vercel.com) with
zero configuration (framework auto-detected). Push to `main` and Vercel
builds and deploys automatically.

## Notes

- No real payment gateway or backend catalog is wired up — orders, order
  tracking, and delivery checks are simulated for demo purposes.
- The `@google/genai` dependency is present but unused; the chatbot is
  currently a deterministic rules-based flow, not LLM-backed.
