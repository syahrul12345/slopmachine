# Design Style: Sketch & Scribble

You are designing in the **Sketch & Scribble** style. Uneven lines, quick marks, half-formed diagrams. References notebooks and whiteboards. Emphasizes human thought processes over machine perfection. A deliberate counterpoint to AI polish.

## Core Principles
- **Thinking made visible** — design should feel like watching someone think on paper
- **Imperfect is intentional** — wobbly lines, rough edges, hand-drawn feel
- **Process over polish** — show the journey, not just the destination
- **Human > Machine** — every element should feel made by a person, not generated

## Typography Rules
- Mix handwritten/sketch fonts with clean body text:
  - Headlines: Caveat, Architects Daughter, Patrick Hand, or similar hand-drawn font
  - Body: clean sans-serif (Inter, DM Sans) for readability
- Hero: 48-72px in handwritten font
- Body: 16-18px in clean font
- Annotations and labels in handwritten style
- Allow slight rotation on text elements (1-2deg) for sketch feel

## Color Palette
- **Paper backgrounds**: warm white (#FAF8F5), aged paper (#F5F0E8), notebook blue-line (#E8EFF5)
- **Ink colors**: pencil gray (#4A4A4A), pen blue (#2B5EA7), marker red (#C54B4B)
- **Highlights**: marker yellow (#FFF3B0) at 60% opacity, pink (#FFD6E0) at 50%
- Accent: single bold color for CTAs — keeping the rest sketch-like
- No gradients — flat colors or cross-hatching for fills

## Visual Techniques
```css
/* Sketch-style borders */
.sketch-box {
  border: 2px solid #4A4A4A;
  border-radius: 2px;
  /* Use slightly irregular SVG border for authentic feel */
  background-image: url('/sketch-border.svg');
}

/* Marker highlight effect */
.highlight {
  background: linear-gradient(
    180deg,
    transparent 50%,
    rgba(255, 243, 176, 0.6) 50%
  );
  display: inline;
}

/* Wobble animation */
@keyframes wobble {
  0%, 100% { transform: rotate(-0.5deg); }
  50% { transform: rotate(0.5deg); }
}

/* Paper texture background */
.paper {
  background-color: #FAF8F5;
  background-image: url('/paper-texture.png');
}
```

## Layout
- **Notebook/whiteboard feel** — optional ruled lines, grid dots, or graph paper background
- Hand-drawn arrows connecting sections
- Elements positioned slightly off-grid (1-3px random offsets)
- Annotations pointing to key features (speech bubbles, arrows, circles)
- Sketched dividers: wavy lines, dashes, or doodle borders
- Mix of sticky notes, paper scraps, and notebook pages as UI metaphors

## Imagery
- Hand-drawn illustrations and diagrams
- SVG doodles: arrows, stars, underlines, circles, checkmarks
- Whiteboard-style system diagrams
- Screenshots "taped" onto paper backgrounds (with tape/pin decorations)
- No photography — everything illustrated or diagrammatic

## Interactions
- Draw-on effects: SVG path animation (stroke-dashoffset) for lines appearing
- Hover: elements get a hand-drawn circle or underline
- Click: sketch "check" animation
- Page transition: paper flip or notebook page turn
- Scroll: elements "drawn in" progressively (SVG line animation)

## What NOT to Do
- No polished gradients or glass effects
- No perfect geometric shapes
- No stock photography
- No heavy 3D renders
- No pixel-perfect alignment (slight messiness is the point)
- No corporate formality

## Reference Sites
- [Anthropic](https://www.anthropic.com/)
- [Notion Help](https://www.notion.com/help)
- [Microsoft AI About](https://microsoft.ai/about/)
