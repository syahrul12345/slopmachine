# Design Style: Editorial / Bold

You are designing in the **Editorial / Bold** style. Think magazine covers meets tech product page. Typography dominance, asymmetric layouts, personality-driven copy. Photography and type hierarchy do the heavy lifting — not animations.

## Core Principles
- **Typography IS the hero** — oversized headlines, dramatic weight contrast, intentional spacing
- **Asymmetry creates tension** — break the grid deliberately, let images bleed to edges
- **Personality in every line** — copy should have voice, opinion, and wit (not corporate filler)
- **High contrast everything** — dark on light, big vs small, bold vs thin

*These are creative starting points. Derive specific values from your product's personality and the design system you brainstorm during kickoff.*

## Typography
This style lives or dies by its type. Headlines should dominate — dramatically larger than body text. Mix weights aggressively: ultra-bold headlines against lightweight body. Consider a display typeface with personality for headlines (Clash Display, Cabinet Grotesk, General Sans) paired with a clean sans-serif for body. Tight letter-spacing on large headlines creates density and impact.

## Color Mood
High contrast. Accent color used sparingly but boldly — full-width accent bars, highlighted words. The classic editorial palette is black + white + one accent, but derive yours from the product personality.

## Layout
Full-bleed sections — images and backgrounds extending edge-to-edge. Asymmetric grids, not always centered. Overlapping elements: text over images, offset positioning. Let some text run wider than the content column for impact. Mix section heights.

## Structural Patterns (How Editorial Pages Are Built)
Editorial pages read like magazine spreads. Each "spread" is a different layout — NEVER repeat the same layout twice in a row. The page should feel curated, not generated.

**Patterns that WORK for this style:**
- **Magazine spread** — one full-bleed image takes 60% of the viewport, text overlays or sits beside it. Next "spread" flips the ratio. Each spread feels like a different page of a magazine.
- **Type-dominant opener** — the first thing is a MASSIVE headline (100px+, bold), maybe animated, maybe spanning the full viewport. No image, no illustration — just type carrying the weight.
- **Split screen** — 50/50 vertical split. Left side: image or demo. Right side: text. NOT stacked — side by side. Break the split at different ratios (60/40, 70/30) for variety.
- **Pull quotes** — oversized quotes break up the flow, spanning wider than the content column. Like editorial pull quotes in magazines.
- **Mixed-height blocks** — some sections are 30vh, some are 150vh. The rhythm is unpredictable. Dense text block followed by a full-viewport image followed by a tight text + CTA.
- **Offset grid** — 2 or 3 columns where items DON'T align to top. Staggered vertically. Creates asymmetry naturally.
- **Full-width statement bars** — a single bold sentence in large type, spanning the full width with a contrasting background. Used as transitions between major sections.

**BANNED for this style:**
- Centering everything — editorial is asymmetric
- Equal-height card grids
- Alternating left-right sections with the same layout (the "zigzag")
- Small, timid typography
- Stock photography thumbnails in card layouts
- Generic CTA sections with centered text + button
- Any section where everything is the same size

## Photography & Imagery
Premium product photography with dramatic lighting. Full-bleed images, not thumbnailed in cards. Real social proof — screenshots, user content, not stock photography.

## Copy Approach
Headlines should make statements, not describe features. Short punchy lines, then longer explanation. Include personality: humor, opinion, directness. CTAs should be specific, not generic.

## Interactions
Scroll-triggered text reveals, image parallax, bold hover states (color inversion, scale shifts, underline wipes), staggered element entrances. Editorial is about layout and type — no heavy WebGL needed.

## Tendencies to Question
If you notice yourself doing these, pause and ask if they serve THIS product:
- Centering everything — that's minimal, not editorial
- Using timid typography when the style calls for boldness
- Building identical-sized card grids instead of varied layouts
- Writing corporate filler instead of copy with voice

## Reference Sites
- dbrand.com, Apple product pages, Nothing Phone, Teenage Engineering, Aesop
