# Design Style: Brutalist / Experimental

You are designing in the **Brutalist / Experimental** style. Anti-design done intentionally. Raw, confrontational, memorable. Every design choice should feel like a deliberate rejection of convention.

## Core Principles
- **Break rules on purpose** — only works if you know which rules you're breaking and why
- **Raw over polished** — exposed structure, visible grid lines, monospace type, system fonts
- **Tension creates interest** — clash elements intentionally (serif + monospace, huge + tiny, dense + sparse)
- **Memorable over comfortable** — visitors should remember this site. Comfort is forgettable.

*These are creative starting points. Derive specific values from your product's personality and the design system you brainstorm during kickoff.*

## Typography
Monospace as primary signals "code", "raw", "real". Or extreme serif at massive sizes for contrast. Mix monospace body with oversized display headlines. Go extreme with size contrast. ALL CAPS for labels and navigation. Consider: visible font metadata, raw text alignment, no centering.

## Color Mood
Monochrome base — or go the opposite with harsh, clashing colors. No pastels, no gradients (too smooth). Borders should be visible and structural. The palette should feel deliberate and confrontational.

## Layout
Show the grid — visible borders, outlines, grid lines as design elements. Dense information packing OR deliberate sparseness (pick a stance). Asymmetric and overlapping elements. Single-column brutalism with full-width blocks and visible borders, or newspaper-style multi-column with visible column rules.

## Structural Patterns (How Brutalist Pages Are Built)
Brutalist pages reject the idea of "sections." The entire page is ONE thing — a document, a system, a manifesto. Structure should feel raw and functional, not decorated.

**Patterns that WORK for this style:**
- **Newspaper layout** — multi-column with visible column rules (CSS grid, border-right). Headlines span columns. Content density is high. No whitespace padding between "sections."
- **Terminal / document** — the page reads like a plain-text document or terminal output. Monospace, left-aligned, no centering. Information is listed, not "designed." Navigation is a list of anchors at the top.
- **Full-width blocks** — each content block is 100vw with 1px solid borders top and bottom. No padding, no max-width containers. Text runs edge to edge (with minimal inline padding).
- **Overlapping / collage** — elements overlap intentionally. Absolute positioning, negative margins, z-index stacking. Text on top of text. Images bleeding out of containers.
- **Index / catalog** — the page is a structured list (like a database view or Craigslist). Feature names in a `<dl>` or table, not in cards. Dense, scannable.
- **Single statement** — the entire page is one giant headline + one link. Nothing else. Brutalist minimalism — say it and stop.

**BANNED for this style:**
- Rounded corners on anything
- Gradient backgrounds
- Card components with shadows
- Centered hero with subtitle + CTA button combo
- Smooth scroll animations or fade-ins
- Icon grids or feature cards
- Anything that looks "designed" — if it looks polished, it's wrong for this style
- Testimonial sections with quote marks and avatars

## Imagery
Raw, unprocessed — no filters, no color grading, no rounded corners. Screenshots over renders, diagrams over illustrations, ASCII art as decoration. Or no images at all — pure type and color.

## Interactions
Custom cursors, hover states that transform (color inversion, element displacement), instant state changes OR deliberately slow — no in-between. Raw form inputs with visible focus outlines.

## Copy Approach
Terse, direct, no fluff. Technical language welcome. Sentence fragments OK. Self-referential humor. No warmth for warmth's sake.

## Tendencies to Question
If you notice yourself doing these, pause and ask if they serve THIS product:
- Being ugly by accident rather than by intention
- Sacrificing usability entirely — users must still navigate and convert
- Using brutalism to mask poor content
- Half-committing — a brutalist site with rounded buttons and soft shadows is just a bad site

## Reference Sites
- Balenciaga.com, Craigslist (unintentionally), Bloomberg Businessweek, Hacker News (unintentional), some web3/crypto project sites
