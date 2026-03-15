# Design Style: Editorial / Bold

You are designing in the **Editorial / Bold** style. Think magazine covers meets tech product page. This style wins through typography dominance, asymmetric layouts, and personality-driven copy. Photography and type hierarchy do the heavy lifting — not animations.

## Core Principles
- **Typography IS the hero** — oversized headlines, dramatic weight contrast, intentional spacing
- **Asymmetry creates tension** — break the grid deliberately, let images bleed to edges
- **Personality in every line** — copy should have voice, opinion, and wit (not corporate filler)
- **High contrast everything** — dark on light, big vs small, bold vs thin

## Typography Rules
- Hero headline: 64-120px, ultra-bold or black weight. Allow it to dominate the viewport.
- Use dramatic size contrast — headlines 5-8x bigger than body text
- Mix weights aggressively: Black (900) headlines, Regular (400) body, Light (300) captions
- Uppercase labels/tags for section markers and categories
- Letter-spacing: tight (-0.02em to -0.04em) on large headlines for density
- Consider a display typeface for headlines (e.g., Clash Display, Cabinet Grotesk, General Sans)
- Body in a clean sans-serif (Inter, Geist, DM Sans)

## Layout
- **Full-bleed hero sections** — images and backgrounds extend edge-to-edge
- **Asymmetric grids** — 60/40 or 70/30 splits, not always centered
- **Overlapping elements** — text over images with semi-transparent overlays, or offset positioning
- **Section breaks with personality** — dividers can be bold lines, oversized numbers, or pull quotes
- Let some text run wider than the content column for impact
- Mix section heights — some compact, some full-viewport

## Color
- High contrast base: dark text on light, OR light text on dark sections
- Alternate between light and dark sections for rhythm
- Accent color used sparingly but boldly (full-width accent bars, highlighted words)
- Black + white + one accent is the classic editorial palette

## Photography & Imagery
- **Product photography must be premium** — clean studio shots, dramatic lighting
- Full-bleed product images, not thumbnailed in cards
- If showing people: real, not stock. Lifestyle context > posed portraits.
- Social proof with real screenshots (Twitter/X embeds, Reddit posts, app store reviews)
- User-generated content adds authenticity (like dbrand's approach)

## Copy Rules
- Headlines should make a statement, not describe a feature
- BAD: "Our Premium Phone Cases" → GOOD: "Your phone called. It wants better."
- Use contrast in copy: short punchy line, then longer explanation
- Include personality: humor, opinion, directness
- CTAs should be specific, not generic ("Get yours" not "Learn more")

## What NOT to Do
- No centered-everything layouts — that's minimal, not editorial
- No generic hero with stock photo + "Welcome to our product"
- No card grids with identical sizing — vary the grid
- No thin, timid typography — be bold or don't bother
- No lorem ipsum — every line of copy should have intent

## Interactions
- Scroll-triggered text reveals (clip-path or translateY animations)
- Image parallax on scroll (subtle, 10-20% speed difference)
- Bold hover states: color inversion, scale shifts, underline wipes
- Section transitions: staggered element entrance

## CSS/JS Approach
- CSS Grid for asymmetric layouts
- `IntersectionObserver` for scroll reveals
- Optional: lightweight scroll library (Lenis for smooth scroll)
- CSS `clip-path` for text reveal animations
- No heavy frameworks needed — editorial is about layout and type, not WebGL

## Reference Sites
- dbrand.com, Apple product pages, Nothing Phone, Teenage Engineering, Aesop
