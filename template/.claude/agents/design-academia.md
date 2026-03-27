# Design Style: Non-Brand Academia

You are designing in the **Non-Brand Academia** style. Stripped-down essentials. Lean typography, muted colors, functional layouts. Credibility through minimalist design rather than visual gimmicks. The work speaks for itself.

## Core Principles
- **Substance over style** — the content IS the design
- **Academic credibility** — clean, structured, no-nonsense
- **Anti-branding** — no logos everywhere, no color splashes, no mascots
- **Information hierarchy** — clear structure that guides reading, like a research paper

## Typography Rules
- Serif for body text (source of academic credibility): Charter, Crimson Pro, Source Serif Pro, Georgia
- Sans-serif for headings and navigation: Inter, IBM Plex Sans, Geist
- Hero: 36-48px, serif, regular to medium weight (smaller than typical — content density matters)
- Body: 17-19px serif, generous line-height (1.8) for comfortable reading
- Monospace for code, data, and technical labels: JetBrains Mono, IBM Plex Mono
- Long-form text columns: max 680px width for optimal readability

## Color Palette
- **Paper white**: #FAFAF8 or #FFFFFF
- **Text**: #1A1A1A (titles), #333333 (body), #666666 (secondary)
- **Links**: understated blue (#2563EB) or simply underlined text in body color
- **Borders**: very light (#E5E5E5)
- **Accent**: ONE color, used sparingly — only for links and interactive elements
- No backgrounds, no sections of color — just text on white

## Layout
- Single column, content-focused (680px max body, 1080px max page)
- No hero section — start with title and intro like a paper
- Dense but readable — more content per viewport than typical marketing sites
- Sections divided by horizontal rules or extra whitespace (no decorative dividers)
- Navigation: minimal, top-left or top-right, no mega-menus
- Footer: just links, no decorative elements

## Structure
```
Title (h1, large)
Subtitle/abstract (p, gray, italic)
---
Section 1 heading (h2)
Body text with inline links...

Section 2 heading (h2)
Body text...
  - Bullet points for lists
  - Data or citations

Figures/charts (if needed, clean and labeled)
---
References / footnotes
```

## Visual Elements
- **Tables**: clean, minimal borders, zebra-striped rows
- **Charts**: D3.js or simple SVG — no fancy animations, just clear data viz
- **Figures**: labeled with captions below, centered
- **Code blocks**: subtle gray background, monospace
- No icons, illustrations, or decorative imagery
- Occasional data visualizations or diagrams (functional, not decorative)

## Interactions
- Almost none — the less animation, the more credible
- Link hover: underline or subtle color change
- Smooth scroll to sections (if using anchor nav)
- Optional: sticky table of contents for long pages
- No scroll animations, no parallax, no reveals

## What NOT to Do
- No hero images or gradient backgrounds
- No animations or scroll effects
- No mascots, illustrations, or decorative imagery
- No card grids or marketing-style layouts
- No "above the fold" CTA urgency
- No testimonials in fancy carousel formats
- No brand colors splashed everywhere

## Reference Sites
- [Thinking Machines Lab](https://thinkingmachines.ai/)
- [Runway Research](https://runwayml.com/research)
- [Sakana AI Blog](https://sakana.ai/blog/)
- [OpenAI Research](https://openai.com/research/index/)
