# Design Style: Organic Gradients

You are designing in the **Organic Gradients** style. Dimensional gradient transitions with grain, texture, and organic variation. Not the flat, sterile gradients of Web 2.0 — these feel alive and tactile.

## Core Principles
- **Gradients with depth** — multi-stop, non-linear, with grain/noise overlays for texture
- **Organic transitions** — colors flow like watercolor, not hard geometric bands
- **Dimensional feel** — gradients suggest light, atmosphere, depth
- **Distinctiveness through variation** — no two gradient sections should feel identical

*These are creative starting points. Derive specific values from your product's personality and the design system you brainstorm during kickoff.*

## Typography
Clean sans-serif that doesn't compete with gradient backgrounds. Light text on gradients must pass WCAG contrast — add subtle text-shadow for readability. Clean dark text on light sections.

## Color Mood
Multi-stop gradients with soft transitions — think sunset warmth, ocean depth, or aurora light depending on your product mood. Grain/noise texture overlaid at low opacity for tactile feel. Light sections between gradients for breathing room.

## Techniques
- Noise/grain overlays using mix-blend-mode for texture
- Radial gradients for spotlight/glow effects
- Animated gradient shifts on hover
- Mesh gradients for hero sections
- Glassmorphism cards (backdrop-filter blur) on gradient backgrounds

## Layout
Full-bleed gradient hero sections. Frosted glass cards over gradient backgrounds. Product mockups floating on gradient fields. Abstract 3D shapes with matching gradient materials.

## Structural Patterns (How Organic Gradient Pages Are Built)
Gradient pages are about ENVIRONMENT, not sections. The gradient IS the space. Content lives inside it. Don't think "section with gradient background" — think "the whole page is a gradient that evolves as you scroll."

**Patterns that WORK for this style:**
- **Gradient as environment** — one continuous gradient that shifts hue as the user scrolls. Content floats within it. No section boundaries — the color shift signals topic changes.
- **Glass panels** — frosted glass (backdrop-filter) panels floating on the gradient at varying positions. Not a grid of cards — scattered, overlapping, at different sizes. Some pinned, some scrolling.
- **Portal / spotlight** — dark background with a radial gradient spotlight that follows content. As you scroll, the spotlight moves, revealing content in its glow. Everything outside the spotlight is dark.
- **Layered depth** — gradient at the back, a semi-transparent noise layer, then content. Mesh gradient background that shifts on mouse move. Content casts colored shadows.
- **Gradient transitions** — each major content group uses a different gradient palette. Transitions between them are smooth blends (one gradient melts into the next over 200px of scroll).

**BANNED for this style:**
- White backgrounds between gradient sections (breaks the immersion)
- Flat-colored card grids sitting on a gradient (lazy use of the style)
- Two-color linear gradients without grain or complexity
- Standard hero → white section → gradient section → white section pattern
- Using gradient only on the hero and then abandoning it for the rest of the page

## Interactions
Gradient hue shift on scroll. Button hover with gradient intensity increase and glow. Frosted glass reveals on card hover. Smooth color transitions.

## Tendencies to Question
If you notice yourself doing these, pause and ask if they serve THIS product:
- Using flat two-color linear gradients (too generic — add stops, grain, variation)
- Skipping the grain/texture overlay (looks like PowerPoint without it)
- Mixing gradient sections with clashing photography
- Using gradient text on busy backgrounds without fallback

## Reference Sites
- [OpenAI / ChatGPT](https://chatgpt.com/overview)
- [ElevenLabs](https://elevenlabs.io/blog/introducing-elevenlabs-image-and-video)
- [Perplexity Comet](https://www.perplexity.ai/comet)
- [Intercom](https://www.intercom.com/)
