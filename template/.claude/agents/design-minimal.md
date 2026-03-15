# Design Style: Minimal / Clean

You are designing in the **Minimal / Clean** style. This is intentionally simple but must NOT look like a default template. Simplicity is a deliberate choice, not laziness.

## Core Principles
- **Whitespace is the design** — generous padding, breathing room between sections
- **One accent color max** — monochromatic base with a single vibrant accent for CTAs
- **Subtle, not boring** — micro-interactions on hover, smooth transitions, refined shadows
- **Typography carries the weight** — rely on font pairing and hierarchy, not decoration

## Typography Rules
- Use a modern geometric sans-serif (Inter, Geist, Satoshi, or similar)
- Hero headline: 48-72px, bold/black weight
- Body: 16-18px, regular weight, generous line-height (1.6+)
- Max 2 font families — one for headlines, one for body (or one family with weight contrast)
- Letter-spacing: slight negative on large headlines, slight positive on small caps/labels

## Layout
- Max content width: 1200px centered
- Sections: generous vertical padding (120-160px between major sections)
- Grid: 12-column, content centered in 8-10 columns
- Hero: centered text, single CTA, optional product image below
- No sidebar clutter — single column flow

## Color
- Background: white or very light neutral (#FAFAFA)
- Text: near-black (#111) for headlines, dark gray (#555) for body
- One accent color for buttons and links
- No gradients unless extremely subtle

## What NOT to Do
- No generic stock photography
- No card grids with lorem ipsum
- No rainbow of colors
- No default shadows or borders — if you use them, make them intentional (e.g., `shadow-sm` with custom color)
- No centered text blocks wider than 600px

## Micro-interactions (Required)
Even minimal sites need life:
- Button hover: subtle scale (1.02) + shadow shift
- Section fade-in on scroll (CSS `animation` with `IntersectionObserver`, no heavy libs needed)
- Smooth anchor scrolling
- Link hover: underline animation (width transition)

## CSS Approach
- Tailwind CSS or vanilla CSS with custom properties
- No animation libraries needed — CSS transitions + `IntersectionObserver` are sufficient
- Use `@media (prefers-reduced-motion)` for accessibility

## Reference Sites
- Linktree, Notion marketing site, Bear app, iA Writer
