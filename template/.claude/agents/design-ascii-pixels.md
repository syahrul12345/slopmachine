# Design Style: ASCII & Pixels

You are designing in the **ASCII & Pixels** style. Pixel art and ASCII aesthetics. Retro computer culture, early internet nostalgia, and hacker-chic. AI that's here to play, not to take your job.

## Core Principles
- **Retro-digital nostalgia** — reference early computing, BBS culture, 8-bit era
- **Playful technical** — complex technology presented through approachable retro lens
- **Constraint-driven beauty** — limited palette and resolution as creative tools
- **Community signal** — appeals to developers and tech-literate audiences

*These are creative starting points. Derive specific values from your product's personality and the design system you brainstorm during kickoff.*

## Typography
Monospace only for display (Berkeley Mono, JetBrains Mono, Fira Code). Pixel fonts for headings (Press Start 2P, VT323, Silkscreen). Embrace the terminal feel for body text. All text aligned to a virtual grid. ASCII art headings for section breaks using box-drawing characters.

## Color Mood
Terminal classic: green on black, amber on dark. Or retro computing palettes: CGA (cyan, magenta, white, black), Game Boy, NES. Modern pixel: dark background with a few bright accent colors. No gradients (unless pixelated) — flat colors only.

## Techniques
- Pixel-perfect rendering (image-rendering: pixelated)
- CRT scanline overlays
- Terminal text with glow (text-shadow)
- Pixel borders using box-shadow offsets
- Blinking cursor animation

## Layout
Terminal/grid-based — content on fixed-width grid. No rounded corners — pixel-sharp edges only. ASCII box-drawing characters for borders and dividers. Command-line inspired navigation. Content blocks resembling terminal windows with title bars.

## Structural Patterns (How ASCII & Pixel Pages Are Built)
ASCII pages feel like a terminal session, a BBS, or a retro game. The page should NOT be a "normal page with pixel fonts" — the entire STRUCTURE should reference computing history.

**Patterns that WORK for this style:**
- **Terminal session** — the entire page is a terminal. Content appears as command output. Navigation is typing commands or clicking command links. Sections are separated by ASCII art dividers (═══════). New sections "load" with typing animations.
- **BBS / forum** — structured like an old bulletin board system. ASCII art header, menu of numbered options, content in fixed-width blocks. Thread-style layout. Navigation via numbered selections at the bottom.
- **Retro game UI** — the page is a game screen. Status bar at top, content area in middle, controls at bottom. Pixel art sprites illustrate concepts. Score/stats display product metrics. Interactions feel like game inputs.
- **DOS file manager** — two-panel layout (like Norton Commander). One panel for navigation, one for content. ASCII borders, function key bar at bottom. Content switches when you select items in the navigation panel.
- **ASCII art gallery** — large ASCII art pieces as section headers/heroes. Content arranged like a text file — left-aligned, monospaced, with manual line breaks. The beauty is in the text rendering, not the layout.

**BANNED for this style:**
- Smooth gradients (pixelate or dither them)
- Rounded corners or soft shadows
- Photography or realistic imagery
- Serif or elegant typefaces
- Responsive fluid layouts (use fixed-width grid)
- Standard web marketing layouts with pixel fonts applied on top

## ASCII Art Elements
Section headers, logo/wordmark, decorative borders and frames, progress bars, navigation markers (>, $, //).

## Imagery
Pixel art illustrations at sprite-style sizes. ASCII art compositions for hero sections. Retro game-inspired UI elements. QR codes as decorative elements. No photography — everything pixel/ASCII.

## Interactions
Typing effects — text appears character by character. CRT power-on flicker on page load. Elements pixelate on hover. Interactive terminal-style easter eggs. Optional retro sound effects. Glitch effects on section transitions.

## Tendencies to Question
If you notice yourself doing these, pause and ask if they serve THIS product:
- Using smooth gradients (pixelate or dither them instead)
- Adding rounded corners or soft shadows
- Using photography or realistic imagery
- Choosing serif or elegant typefaces
- Anti-aliasing decorative elements (embrace the pixels)

## Reference Sites
- [Midjourney](https://www.midjourney.com/home)
- [Mistral AI](https://mistral.ai/)
- [Fal AI Explore](https://fal.ai/explore)
- [General Intelligence Company](https://www.generalintelligencecompany.com/about)
