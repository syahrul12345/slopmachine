# Design Style: ASCII & Pixels

You are designing in the **ASCII & Pixels** style. Pixel art and ASCII aesthetics. Retro computer culture, early internet nostalgia, and hacker-chic. AI that's here to play, not to take your job.

## Core Principles
- **Retro-digital nostalgia** — reference early computing, BBS culture, 8-bit era
- **Playful technical** — complex technology presented through approachable retro lens
- **Constraint-driven beauty** — limited palette and resolution as creative tools
- **Community signal** — appeals to developers and tech-literate audiences

## Typography Rules
- **Monospace ONLY for display**: Berkeley Mono, JetBrains Mono, Fira Code, IBM Plex Mono
- Pixel fonts for headings: Press Start 2P, VT323, Silkscreen, or custom pixel font
- Hero: 32-48px pixel font (these render best at specific sizes — stick to multiples)
- Body: 16px monospace for everything (embrace the terminal feel)
- All text aligned to a virtual grid
- ASCII art headings for section breaks:
```
╔══════════════════╗
║   FEATURES       ║
╚══════════════════╝
```

## Color Palette
- **Terminal classic**: green (#00FF41) on black (#0D0208), amber (#FFB000) on dark (#1A1000)
- **Retro computing**: CGA palette — cyan, magenta, white, black
- **Game console**: NES palette, Game Boy palette (#0F380F, #306230, #8BAC0F, #9BBC0F)
- **Modern pixel**: dark background (#111111) with 4-5 bright accent colors
- No gradients (unless pixelated) — flat colors only

## Visual Techniques
```css
/* Pixel-perfect rendering */
* {
  image-rendering: pixelated;
  -ms-interpolation-mode: nearest-neighbor;
}

/* CRT scanlines overlay */
.crt::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0px,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}

/* Terminal text effect */
.terminal-text {
  font-family: 'JetBrains Mono', monospace;
  color: #00FF41;
  text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
}

/* Pixel border */
.pixel-border {
  border: 4px solid #00FF41;
  box-shadow:
    4px 0 0 0 #00FF41,
    -4px 0 0 0 #00FF41,
    0 4px 0 0 #00FF41,
    0 -4px 0 0 #00FF41;
}

/* Blinking cursor */
.cursor::after {
  content: '█';
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
```

## Layout
- **Terminal/grid-based**: content on fixed-width grid
- No rounded corners — pixel-sharp edges only
- ASCII box-drawing characters for borders and dividers
- Command-line inspired navigation (`> home | features | pricing`)
- Content blocks resembling terminal windows with title bars
- Fixed-width layout (800-1000px) for authentic terminal feel

## ASCII Art Elements
Use ASCII art for:
- Section headers and dividers
- Logo/wordmark (ASCII art version)
- Decorative borders and frames
- Status indicators: `[████████░░] 80%`
- Navigation markers: `> `, `$ `, `// `

## Imagery
- Pixel art illustrations (16x16, 32x32, or 64x64 sprite-style)
- ASCII art compositions for hero sections
- Retro game-inspired UI elements (health bars, inventory grids)
- QR codes as decorative elements
- No photography (everything pixel/ASCII)

## Interactions
- **Typing effect**: text appears character by character
- **CRT power-on**: screen flicker on page load
- **Pixel hover**: elements pixelate on mouseover
- **Command line**: interactive terminal-style easter eggs
- **8-bit sounds**: optional retro sound effects (click, select, error)
- **Glitch effect**: occasional digital glitch on section transitions

## What NOT to Do
- No smooth gradients (pixelate them or use dithering)
- No rounded corners or soft shadows
- No photography or realistic imagery
- No serif or elegant typefaces
- No organic shapes or curves
- No anti-aliasing on decorative elements (embrace the pixels)

## Reference Sites
- [Midjourney](https://www.midjourney.com/home)
- [Mistral AI](https://mistral.ai/)
- [Fal AI Explore](https://fal.ai/explore)
- [General Intelligence Company](https://www.generalintelligencecompany.com/about)
