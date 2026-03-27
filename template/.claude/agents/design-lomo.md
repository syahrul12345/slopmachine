# Design Style: Lomo Imagery

You are designing in the **Lomo Imagery** style. High contrast, washed-out colors, light leaks, visible imperfections. Deliberately rejects polished corporate aesthetics. Frames the product as exploratory, experimental, and human — not authoritative.

## Core Principles
- **Imperfection is the signal** — grain, blur, light leaks, chromatic aberration
- **Anti-corporate** — reject polish, embrace rawness and authenticity
- **Analog warmth** — everything should feel like film photography, not digital perfection
- **Exploratory tone** — the product is a journey, not a finished statement

## Typography Rules
- Mix of clean sans-serif (body) and slightly imperfect type (headlines)
- Consider: monospaced for labels, handwritten-style for accents
- Hero: 48-72px, can be slightly irregular (variable fonts with optical adjustments)
- Body: 16px, clean and readable (contrast with raw imagery)
- Text colors: off-white (#F2EDE4) on dark, warm dark (#2C2418) on light

## Color Palette
- Warm, washed-out tones: faded amber (#D4A574), dusty teal (#7BA5A0), warm cream (#F2EDE4)
- Shadows: warm brown (#2C2418), not black
- Accent: burnt orange (#CC6B2C) or faded red (#C45C4A)
- Everything desaturated 20-40% from normal
- Film-like color grading: lifted blacks, rolled-off highlights

## Visual Techniques
```css
/* Film grain overlay */
.grain {
  position: relative;
}
.grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/grain.png'); /* tiled grain texture */
  opacity: 0.08;
  mix-blend-mode: multiply;
  pointer-events: none;
}

/* Light leak effect */
.light-leak {
  background: linear-gradient(
    135deg,
    rgba(255, 180, 100, 0.15) 0%,
    transparent 40%,
    rgba(255, 100, 100, 0.1) 100%
  );
}

/* Washed-out image treatment */
img.lomo {
  filter: contrast(0.9) saturate(0.7) sepia(0.15) brightness(1.05);
}
```

## Layout
- Full-bleed photography sections with film-style borders
- Asymmetric grids — 60/40 splits, images bleeding off edges
- Content overlapping images with semi-transparent backgrounds
- Section dividers: analog-style (film strip borders, torn paper edges)
- Mix of tight and generous spacing (not uniformly padded)

## Imagery
- Real photography with analog filter treatment (MUST apply lomo filters)
- Behind-the-scenes, candid shots preferred over staged
- Visible film borders, sprocket holes, frame numbers as decorative elements
- Screenshots styled as Polaroids or contact sheets
- No stock photography — everything should feel authentic

## Interactions
- Hover: slight image shift/jitter (1-2px random) simulating hand-held camera
- Image hover: filter intensifies slightly (more contrast, more grain)
- Page transitions: film-flash effect (quick white overlay)
- Cursor: consider a crosshair or viewfinder-style custom cursor
- Subtle VHS-style scan lines on video content

## What NOT to Do
- No clean, polished gradients
- No sharp, pixel-perfect layouts
- No corporate stock photography
- No perfect symmetry
- No bright, saturated colors
- No glossy UI elements (glass, chrome, reflections)

## Reference Sites
- [Cursor](https://cursor.com/)
- [Cohere](https://cohere.com/)
- [OpenAI ChatGPT](https://chatgpt.com/overview)
- [Runway Customers](https://runwayml.com/customers/ucla-film-tv-development-hans-martin-liebing)
