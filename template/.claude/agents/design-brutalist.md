# Design Style: Brutalist / Experimental

You are designing in the **Brutalist / Experimental** style. This is anti-design done intentionally. Raw, confrontational, memorable. Every design choice should feel like a deliberate rejection of convention. This style works best for brands that want to signal they're different from everything else in their space.

## Core Principles
- **Break rules on purpose** — only works if you know which rules you're breaking and why
- **Raw over polished** — exposed structure, visible grid lines, monospace type, system fonts
- **Tension creates interest** — clash elements intentionally (serif + monospace, huge + tiny, dense + sparse)
- **Memorable over comfortable** — visitors should remember this site. Comfort is forgettable.

## Typography Rules
- **Monospace as primary** (JetBrains Mono, IBM Plex Mono, Space Mono) — signals "code", "raw", "real"
- OR **extreme serif** (editorial serifs at massive sizes) for contrast
- Mix monospace body with oversized display headlines
- Sizes: go extreme — 120px+ headlines next to 12px labels
- ALL CAPS for labels and navigation
- Consider: visible font metadata, raw text alignment, no text-align: center

## Layout
- **Visible grid structure** — show borders, outlines, grid lines as design elements
- **Dense information packing** — no luxury whitespace. Fill the viewport.
- **Asymmetric and overlapping** — elements crossing boundaries, negative margins
- **Flat hierarchy** — resist the urge to create clear visual hierarchy. Let the user explore.
- Single-column brutalism: full-width blocks stacked with visible borders
- OR: newspaper-style multi-column with visible column rules

## Color
- **Monochrome base** — black, white, maybe one system color
- OR: **harsh, clashing colors** — acid green, hot pink, electric blue. No pastels.
- No gradients (too smooth, too polished)
- Backgrounds: pure white (#FFF) or pure black (#000). No warm grays.
- Borders: 1-3px solid black. Visible. Structural.

## Imagery
- **Raw, unprocessed** — no filters, no color grading, no rounded corners on images
- Screenshots over renders
- Diagrams over illustrations
- ASCII art as decoration
- Mix image sizes chaotically — one massive, several tiny
- Consider: no images at all. Pure type and color.

## Interactive Elements
- **Custom cursor** — oversized dot, crosshair, or text cursor
- **Hover states that transform** — color inversion, border toggle, element displacement
- **No smooth transitions** — instant state changes (0ms transition) or deliberately slow (800ms+)
- **Scrolljacking acceptable** — if it serves the experimental intent
- Raw form inputs — no styled dropdowns, visible focus outlines

## CSS/JS Approach
- Minimal CSS — avoid frameworks. Write raw CSS.
- CSS Grid with visible `outline` or `border` on grid items
- `mix-blend-mode` for overlapping element effects
- `cursor: none` + custom cursor div following mouse
- Deliberately ignore responsive conventions if the desktop experience is the art

## Copy Rules
- Terse, direct, no fluff
- Technical language welcome — don't dumb it down
- Sentence fragments OK
- Self-referential humor (acknowledge the brutalism)
- No emoji. No "Hey there!" warmth.

## What NOT to Do
- Don't be ugly by accident — every "broken" element must be intentional
- Don't sacrifice usability entirely — the user must still be able to navigate and convert
- Don't use brutalism to mask poor content — the content must still be strong
- Don't half-commit — a brutalist site with rounded buttons and soft shadows is just a bad site

## Reference Sites
- Balenciaga.com, Craigslist (unintentionally), Bloomberg Businessweek, Hacker News (unintentional), some web3/crypto project sites
