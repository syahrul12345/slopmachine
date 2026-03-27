# Design Style: Quirky Cuteness

You are designing in the **Quirky Cuteness** style. Friendly mascot characters, playful visual language, nerdy self-awareness. Humanizes complex technology while signaling approachability. The antidote to AI doomsday aesthetics.

## Core Principles
- **Mascots humanize technology** — cute characters bridge the gap between complex AI and real people
- **Playful but competent** — fun doesn't mean unserious
- **Nerdy self-awareness** — embrace tech culture references and inside jokes
- **Approachable > Impressive** — lower the barrier, don't intimidate

## Typography Rules
- Rounded sans-serif: Nunito, Quicksand, Poppins, DM Sans
- Hero: 48-72px, bold but rounded (no sharp serifs)
- Body: 16-18px, regular weight, generous line-height (1.7)
- Labels/badges: rounded pills with bold text
- Allow emoji in headings and labels where appropriate
- Fun copy: conversational, like talking to a friend

## Color Palette
- **Bright and friendly but not garish:**
  - Primary: a happy hue — coral (#FF6B6B), sky blue (#4ECDC4), lavender (#9B8EC4)
  - Secondary: complementary warm/cool pair
  - Background: warm white (#FEFCF8) or very light tint of primary
- **Pastels for backgrounds**: light pink (#FFF0F5), light blue (#F0F8FF), light yellow (#FFFFF0)
- **Dark mode**: deep purple or navy (not pure black) with soft accent colors
- High saturation for interactive elements, muted for backgrounds

## Visual Techniques
```css
/* Rounded everything */
.card {
  border-radius: 20px;
  background: #FEFCF8;
  border: 2px solid #F0E8E0;
  padding: 32px;
}

/* Playful shadow */
.playful-shadow {
  box-shadow: 4px 4px 0px #FFD93D;
}

/* Bouncy button */
.btn {
  border-radius: 100px;
  padding: 14px 28px;
  font-weight: 700;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.btn:hover {
  transform: scale(1.05) translateY(-2px);
}

/* Badge/pill labels */
.badge {
  background: #FFD93D;
  border-radius: 100px;
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 700;
}
```

## Mascot & Character Guidelines
- **Simple, geometric mascot** — 2-3 colors max, round shapes, big eyes
- Character should have personality and expressions (happy, thinking, celebrating)
- Use mascot sparingly: onboarding, empty states, error pages, loading screens
- Mascot can point to CTAs, react to user actions, celebrate milestones
- SVG format for scalability and animation
- Keep mascot consistent across all touchpoints

## Layout
- Rounded containers and card-based layouts
- Generous padding and soft spacing (not as tight as corporate)
- Scattered decorative elements: stars, sparkles, dots, squiggles
- Feature sections with mascot illustrations alongside text
- Fun empty states with character illustrations
- Sticker-like badges and labels

## Imagery
- Custom character illustrations for every major concept
- Sticker packs / emoji-style icon sets
- Animated mascot reactions (Lottie or CSS animation)
- No stock photography — everything custom illustrated
- Decorative doodles: sparkles, arrows, hearts, stars

## Interactions
- **Bouncy**: hover scales with elastic easing
- **Wiggle**: mascot wiggles on interaction (subtle rotation keyframes)
- **Confetti**: celebrate completions with particle effects
- Easter eggs: hidden interactions on mascot click
- Loading: mascot animation instead of generic spinner
- Smooth, springy transitions (cubic-bezier with overshoot)

## What NOT to Do
- No corporate stiffness — everything should feel friendly
- No dark, moody color palettes
- No sharp corners or angular shapes
- No serious/formal typography
- No generic stock icons (use custom illustrations)
- Don't overdo it — there's a line between playful and childish

## Reference Sites
- [Sakana AI](https://sakana.ai/blog/)
- [Modular/Mojo](https://www.modular.com/mojo)
- [Mistral AI](https://mistral.ai/)
- [Notion](https://www.notion.so/)
- [OpenAI Sora](https://openai.com/sora/)
