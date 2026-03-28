# Design Kickoff Workflow

**Run this BEFORE writing any UI code.** This workflow figures out what to build, how it should feel, and what it should look like — in that order. Do not skip steps.

---

## Step 0: Establish Design Context

**If `.impeccable.md` does not exist in the project root**, run the `/teach-impeccable` skill first. It interactively gathers design context — users, brand personality, aesthetic direction, accessibility requirements — and saves it to `.impeccable.md`. This feeds into all impeccable design skills (`/audit`, `/critique`, `/polish`, etc.) for the rest of the project. Only needs to run once.

**If `.impeccable.md` already exists**, read it now. It contains the brand personality, user context, and aesthetic direction that should inform every step below.

---

## Step 1: Understand the Product

**Read `.impeccable.md` first** — it may already answer some of these. Only ask the developer questions that aren't already covered:

1. **"What does this product do in one sentence?"**
2. **"Who is this for?"** (may already be in `.impeccable.md` → skip if so)
3. **"What's the ONE thing you want someone to do when they visit?"** (sign up, download, buy, learn more)
4. **"What makes this different from alternatives?"**
5. **"What's the emotional tone?"** (may already be in `.impeccable.md` → skip if so)

Save the answers to `.claude/context/product-brief.md`. This file drives every design decision.

**If the developer doesn't have clear answers**, help them brainstorm:
- Look at the codebase ��� what does the app actually do?
- Who would use this? Paint a picture of the user.
- What problem does it solve? What's the before/after?

**DO NOT PROCEED without a product brief.** Designing without knowing what you're designing is how you end up with generic output.

---

## Step 2: Gather Inspiration & Validate Style

Ask: **"Do you have any reference sites or screenshots for the vibe you want?"**

**If they have references:**
- Use WebFetch to view each URL
- Note what you like about each: layout? color? typography? animation? copy tone?
- Save to `.claude/context/design-inspiration.md`

**If they have NO references:**
- Load `.claude/context/design-style-catalog.md`
- Pick 3-5 example images from the chosen style
- Use WebFetch to view them, describe the patterns
- Show the developer: "Here's what your chosen style looks like in practice"

**Compare inspiration vs chosen style.** Does it match?
- YES → proceed
- NO → suggest which style(s) better match, explain the difference
- MIXED → propose a hybrid, document which rules come from which style

---

## Step 3: Brainstorm the Page Narrative

**⚠️ THIS IS THE MOST IMPORTANT STEP. Do not skip it.**

A landing page is NOT a collection of sections. It's a **story** that takes someone from "I don't know what this is" to "I need this." The structure should emerge from the product's story, not from a template.

### 3a: Define the Narrative Arc

Work with the developer to answer:

1. **Hook** — What grabs attention in the first 3 seconds? (This might NOT be a hero with a headline. It could be a demo, a question, a bold statement, an animation, a video.)
2. **Problem** — What pain does the user have right now?
3. **Solution** — How does this product fix it? Show, don't just tell.
4. **Proof** — Why should they believe you? (demos, screenshots, testimonials, numbers, logos)
5. **Differentiation** — What makes this different from everything else?
6. **Action** — What do you want them to do? (Only ONE primary action.)

### 3b: Map Narrative to Sections

Based on the arc, propose a section flow. **Every section must answer: "Why does this section exist? What does the user feel after reading it?"**

The section flow should be UNIQUE to this product. Don't start from a template — start from the narrative arc above and ask: what's the most compelling order to tell THIS story?

**If your proposed flow looks like every other landing page** (hero → features → testimonials → CTA), push yourself harder. What would make someone remember THIS page?

### 3c: Section Transitions

**Sections should FLOW, not stack.** Define how each section connects to the next:

- **Visual continuity**: think about what holds the page together as one cohesive experience. How do sections connect rather than just stack?
- **Content bridges**: the last line of one section sets up the next ("But what about X?" → next section answers X)
- **Layout variety**: vary layouts between sections so the page has visual rhythm and doesn't feel like stacked boxes
- **Progressive disclosure**: each section reveals more depth — start broad, get specific

Save the section plan to `.claude/context/page-architecture.md`.

---

## Step 4: Define the Design System

**Now that you know WHAT you're building, define HOW it looks.**

Before filling in values, read the impeccable reference guides for informed decisions:
- **Color**: `.claude/skills/frontend-design/reference/color-and-contrast.md` — OKLCH for perceptually uniform palettes, 60-30-10 rule, tinted neutrals, WCAG contrast ratios
- **Typography**: `.claude/skills/frontend-design/reference/typography.md` — modular scales, font selection, vertical rhythm, font loading strategy
- **Spacing**: `.claude/skills/frontend-design/reference/spatial-design.md` — 4pt base system, semantic tokens, hierarchy through space

Create `.claude/context/design-system.md`:

### Colors
```
Primary:        #_____ (main brand color — derived from product personality)
Secondary:      #_____ (supporting color)
Accent:         #_____ (CTAs, highlights)
Background:     #_____ (page background — derived from product mood)
Surface:        #_____ (cards, elevated elements)
Text Primary:   #_____ (headlines)
Text Secondary: #_____ (body, descriptions)
Text Muted:     #_____ (captions, hints)
Border:         #_____ (dividers, outlines)
```

**Color considerations:**
- Ask the developer: "Light or dark?" — don't assume
- Consider avoiding pure black/white — tinted variants feel more intentional
- Think about how section transitions will work — will you rely on background color changes or spacing/layout shifts?

### Typography
```
Font Family (Headlines): _____
Font Family (Body):      _____

Scale:
  Display: __px / weight ___
  H1:      __px / weight ___
  H2:      __px / weight ___
  H3:      __px / weight ___
  Body:    __px / weight ___
  Small:   __px / weight ___
  Caption: __px / weight ___

Line Heights: Headlines ___ / Body ___
```

### Spacing
```
Base unit: _px
Scale: xs(_px) sm(_px) md(_px) lg(_px) xl(_px) 2xl(_px)
Section padding: _px vertical
Max content width: _px
```

### Radius, Shadows, Motion
```
Radius:  sm(_px) md(_px) lg(_px) full(9999px)
Shadows: subtle(___) medium(___) heavy(___)
Motion:  fast(___ms) normal(___ms) slow(___ms) easing(___)
```

---

## Step 5: Validate

Before writing any code:
- [ ] Product brief exists (`.claude/context/product-brief.md`)
- [ ] Page architecture defined (`.claude/context/page-architecture.md`)
- [ ] Design system defined (`.claude/context/design-system.md`)
- [ ] Colors pass WCAG AA contrast (4.5:1 text on background)
- [ ] Typography scale is consistent
- [ ] Page flow tells a story, not just lists features

Run `/typeset` and `/colorize` skills to validate tokens.

---

## Step 6: Create Config & Build

### If Tailwind (Next.js landing):
- Update `tailwind.config.ts` with design system tokens
- Create CSS custom properties as fallback
- Install fonts via `next/font`

### If React Native (mobile):
- Create `lib/theme.ts` with all tokens
- Create `useTheme()` hook if supporting light + dark

### Build order:
1. **Global styles** — fonts, base colors, resets
2. **First section** (the hook from your page architecture — NOT necessarily a "hero")
3. Show the developer, get feedback
4. Continue section by section per the architecture
5. After each section: does it flow from the previous? Does the layout vary?

After the full page: run `/critique` → fix → `/polish` → `/audit` → ship.

---

## When to Re-run This Workflow
- Starting a new project (always)
- Developer says "this looks generic" or "this doesn't feel right"
- Switching design styles
- Adding a new major page
