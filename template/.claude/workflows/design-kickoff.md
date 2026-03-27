# Design Kickoff Workflow

**Run this BEFORE writing any UI code.** This workflow establishes the design system and validates the chosen style. Do not skip steps.

---

## Step 1: Gather Inspiration

Ask the developer:
1. "Do you have any reference sites or screenshots for the vibe you want?"
2. "What's the product about and who's the target audience?"

If the developer has references:
- Use WebFetch to view each URL they provide
- Save screenshots/URLs to `.claude/context/design-inspiration.md`

If the developer has NO references:
- Load `.claude/context/design-style-catalog.md`
- Pick 3-5 example images from the chosen style (URLs listed in catalog)
- Use WebFetch to view them and describe the visual patterns
- Show the developer what the chosen style looks like with concrete examples

## Step 2: Analyze & Validate Style

Compare the inspiration against the project's chosen style (from CLAUDE.md → "Design Style"):

**Does the inspiration match the chosen style?**
- YES → proceed to Step 3
- NO → suggest which style(s) from the catalog better match the inspiration
- MIXED → propose a hybrid approach, documenting which rules to borrow from which style

**If style change is needed**, tell the developer:
> "Your inspiration leans more toward [X style] than [current style]. Want me to switch? Here's what that means: [key differences]"

Save the decision to `.claude/context/design-inspiration.md`.

## Step 3: Define the Design System

**⚠️ DO NOT SKIP THIS STEP. DO NOT START BUILDING UI WITHOUT A DESIGN SYSTEM.**

Create `.claude/context/design-system.md` with these tokens:

### 3a: Color Palette
```
Primary:      #_____ (main brand color)
Secondary:    #_____ (supporting color)
Accent:       #_____ (CTAs, highlights)
Background:   #_____ (page background)
Surface:      #_____ (cards, elevated elements)
Text Primary: #_____ (headlines)
Text Secondary: #_____ (body, descriptions)
Text Muted:   #_____ (captions, hints)
Border:       #_____ (dividers, outlines)
Error:        #_____
Success:      #_____
```

**⚠️ COLOR BIAS WARNING:**
- **DO NOT default to dark backgrounds.** Most products should start with light backgrounds unless the style explicitly calls for dark (outer-space, futuristic-surrealism, technical-illustrations on dark, morphing-objects).
- **DO NOT use pure black (#000000) for text.** Use warm dark (#1A1A1A, #2D2A26) or cool dark (#111827) depending on style warmth.
- **DO NOT use pure white (#FFFFFF) for backgrounds** unless the style is minimal or academia. Use tinted whites that match the style's warmth.
- Ask the developer: "Light or dark theme as default?" — don't assume.

### 3b: Typography
```
Font Family (Headlines): _____
Font Family (Body):      _____
Font Family (Code/Mono): _____ (if needed)

Scale:
  Display:  __px / weight ___
  H1:       __px / weight ___
  H2:       __px / weight ___
  H3:       __px / weight ___
  Body:     __px / weight ___
  Small:    __px / weight ___
  Caption:  __px / weight ___

Line Heights:
  Headlines: ___
  Body:      ___
```

### 3c: Spacing
```
Base unit: _px (typically 4px or 8px)
Scale: xs(_px), sm(_px), md(_px), lg(_px), xl(_px), 2xl(_px)
Section padding: _px vertical
Max content width: _px
```

### 3d: Border Radius
```
None:   0px   (for: ___)
Small:  _px   (for: buttons, inputs)
Medium: _px   (for: cards)
Large:  _px   (for: modals, containers)
Full:   9999px (for: pills, avatars)
```

### 3e: Shadows
```
Subtle:  ____  (for: cards at rest)
Medium:  ____  (for: dropdowns, popovers)
Heavy:   ____  (for: modals, dialogs)
```

### 3f: Motion
```
Duration fast:   ___ms (hover states)
Duration normal: ___ms (transitions)
Duration slow:   ___ms (page transitions)
Easing default:  ___
Easing bounce:   ___ (if style uses it)
```

## Step 4: Validate Design System

Before proceeding:
- [ ] Colors pass WCAG AA contrast (text on background: 4.5:1 minimum)
- [ ] Typography scale is consistent (not random sizes)
- [ ] Spacing is based on a multiple of the base unit
- [ ] Design system matches the active style's rules
- [ ] Light theme is the default (unless style explicitly requires dark)

Run `/typeset` and `/colorize` skills to validate.

## Step 5: Create Tailwind/CSS Config

If using Tailwind (Next.js landing):
- Update `tailwind.config.ts` with the design system tokens
- Create CSS custom properties as fallback

If using React Native (mobile):
- Create `lib/theme.ts` with all tokens exported
- Create a `useTheme()` hook if supporting light + dark modes

## Step 6: Build the First Screen

NOW you can start building UI. Start with:
1. **Landing page hero section** (if landing is active) — this sets the tone
2. **Mobile app main screen** (if mobile is active) — the core experience

After the first screen is built, run:
- `/critique` to validate UX
- `/polish` to catch visual issues
- Show the developer for feedback before continuing

---

## Quick Reference: When to Re-run This Workflow
- When starting a new project (always)
- When the developer says "the design doesn't feel right"
- When switching design styles
- When adding a major new section (e.g., adding landing to a mobile-only project)
