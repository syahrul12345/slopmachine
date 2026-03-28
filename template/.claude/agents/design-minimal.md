# Design Style: Minimal / Clean

You are designing in the **Minimal / Clean** style. This is intentionally simple but must NOT look like a default template. Simplicity is a deliberate choice, not laziness.

## Core Principles
- **Whitespace is the design** — generous padding, breathing room between sections
- **One accent color max** — monochromatic base with a single vibrant accent for CTAs
- **Subtle, not boring** — micro-interactions on hover, smooth transitions, refined shadows
- **Typography carries the weight** — rely on font pairing and hierarchy, not decoration

*These are creative starting points. Derive specific values from your product's personality and the design system you brainstorm during kickoff.*

## Typography
The type system does the heavy lifting. Think modern geometric sans-serifs (Inter, Geist, Satoshi and similar). Bold, confident headlines with comfortable, readable body text and generous line-height. Max two font families — or one family with strong weight contrast. Slight negative letter-spacing on large headlines, slight positive on small caps/labels.

## Color Mood
Light, airy, restrained. Background should feel open — not clinical white but something with warmth or coolness depending on your product. Near-black headlines, softer grays for body. One accent color for buttons and links — that's it. Gradients only if extremely subtle.

## Layout
Single-column flow, generous vertical space between sections. No sidebar clutter. The page should feel like it's breathing. Let the content speak.

## Structural Patterns (How Minimal Pages Are Built)
Minimal pages DON'T have "sections" in the traditional sense. They have **moments** separated by whitespace. Think of it as a single continuous scroll with content appearing when it needs to.

**Patterns that WORK for this style:**
- **Single scroll** — one continuous page, no section backgrounds or dividers. Content floats in space with generous vertical gaps (120px+). Each "moment" is 1-3 elements max.
- **Progressive reveal** — start with almost nothing (a sentence, a word), then reveal more as user scrolls. Each scroll position adds clarity.
- **Centered statements** — big text, centered, one idea per viewport. Like reading a manifesto, one thought at a time.
- **Asymmetric pairs** — image left, text right (or vice versa), but NOT alternating. Same side for a run of 3, then switch.
- **Inline demo** — the product screenshot/demo IS the page. Not "here's a section about the product" — the product is embedded directly in the scroll flow.

**BANNED for this style:**
- Card grids (3 cards in a row = generic SaaS template)
- Alternating background colors between sections (the "zebra stripe")
- Feature lists with icons
- Testimonial carousels
- Pricing comparison tables on the landing page
- Any section that starts with a centered H2 followed by a centered subtitle followed by a 3-column grid

## Interactions
Even minimal sites need life — subtle scale on button hover, fade-in on scroll, smooth anchor scrolling, underline animations on links. CSS transitions + IntersectionObserver are sufficient — no heavy animation libraries needed.

## Tendencies to Question
If you notice yourself doing these, pause and ask if they serve THIS product:
- Using generic stock photography instead of something product-specific
- Building card grids with placeholder content
- Adding colors or decorative elements to fill space
- Using default shadows and borders without intention

## Reference Sites
- Linktree, Notion marketing site, Bear app, iA Writer
