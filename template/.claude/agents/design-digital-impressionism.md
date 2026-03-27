# Design Style: Digital Impressionism

You are designing in the **Digital Impressionism** style. Soft, blurred forms with reduced detail. Mood-focused rather than representational — suggestive imagery that allows interpretation and projection. The AI equivalent of looking through frosted glass.

## Core Principles
- **Mood over clarity** — visuals suggest rather than define
- **Soft focus everything** — blur, glow, and diffusion are your primary tools
- **Emotional resonance** — design should make people feel, not just see
- **Abstraction as invitation** — reduced detail lets viewers project their own meaning

## Typography Rules
- Light to regular weight sans-serif: Inter Light, Geist Thin, SF Pro Light
- Hero: 48-72px, light weight (300-400) — delicate, not bold
- Body: 16-18px, regular weight, high line-height (1.8)
- Text colors: soft, muted — never pure black (use #4A4A4A or lighter)
- Consider slight letter-spacing on headlines (+0.01em) for airiness

## Color Palette
- Soft, desaturated pastels: lavender (#D8D0E8), rose mist (#E8C8D8), sky blue (#C8D8E8)
- Backgrounds: very soft gradient washes, barely perceptible color shifts
- Text: muted charcoal (#4A4A4A) on light, soft white (#F0EDE8) on dark
- Accent: one soft hue, never saturated
- Think: dawn light, fog, watercolor bleeds

## Visual Techniques
```css
/* Frosted, blurred background sections */
.impressionist-section {
  backdrop-filter: blur(40px);
  background: rgba(255, 255, 255, 0.3);
}

/* Soft glow on elements */
.glow-element {
  filter: blur(0.5px);
  box-shadow: 0 0 60px rgba(168, 130, 200, 0.2);
}

/* Abstract blob backgrounds */
.blob {
  background: radial-gradient(ellipse, rgba(200, 180, 230, 0.4), transparent 70%);
  filter: blur(60px);
  animation: float 20s ease-in-out infinite;
}
```

## Layout
- Generous whitespace — 160-240px between sections
- Content floats in space — no hard containers or borders
- Overlapping soft blobs/shapes as background elements
- Hero: minimal text, large abstract visual, lots of breathing room
- Asymmetric but balanced — elements drift rather than snap to grid

## Imagery
- Abstract: soft blurs, out-of-focus photography, light leaks
- Generated art: diffused gradients, watercolor-style textures
- Never sharp product shots — everything filtered through soft focus
- Animated floating particles or bokeh effects (subtle, slow)

## Interactions
- Ultra-slow transitions (600-1000ms ease)
- Hover: soft glow increase, slight blur change
- Scroll: elements emerge from blur to slightly-less-blur (never fully sharp)
- Parallax: very slow, dreamy movement (5-10% speed)
- Mouse-follow: subtle gradient shift based on cursor position

## What NOT to Do
- No sharp edges, hard borders, or crisp shadows
- No bold/heavy typography
- No high-contrast color combinations
- No grid-heavy layouts with rigid structure
- No fast, snappy animations
- No sharp product photography or screenshots

## Reference Sites
- [Manus AI](https://manus.im/about)
- [Pi AI](https://pi.ai/discover)
- [Cursor](https://cursor.com/)
- [OpenAI Planning](https://openai.com/index/planning-for-agi-and-beyond/)
