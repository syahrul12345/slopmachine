# Design Kickoff Workflow

**Run this BEFORE writing any UI code.** This workflow figures out what to build, how it should feel, and what it should look like — in that order. Do not skip steps.

---

## Step 0: Run /teach-impeccable (if not done yet)

**If `.impeccable.md` does not exist in the project root**, run the `/teach-impeccable` skill first. It interactively gathers design context from the codebase and the developer — users, brand personality, aesthetic direction, accessibility requirements — and saves it to `.impeccable.md`. This feeds into all impeccable design skills (`/audit`, `/critique`, `/polish`, etc.) for the rest of the project.

This only needs to run once per project.

---

## Step 1: Understand the Product

Before touching anything visual, you need to understand what you're designing for. Ask the developer:

1. **"What does this product do in one sentence?"**
2. **"Who is this for? Describe your ideal user."**
3. **"What's the ONE thing you want someone to do when they visit?"** (sign up, download, buy, learn more)
4. **"What makes this different from alternatives?"**
5. **"What's the emotional tone?"** (trustworthy, playful, premium, rebellious, calm, energetic)

Save the answers to `.claude/context/product-brief.md`. This file drives every design decision.

**If the developer doesn't have clear answers**, help them brainstorm:
- Look at the codebase — what does the app actually do?
- Who would use this? Paint a picture of the user.
- What problem does it solve? What's the before/after?

**DO NOT PROCEED without a product brief.** Designing without knowing what you're designing is how you end up with generic hero + features + CTA.

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

Example for a developer tool:
```
1. Interactive demo (hook — show the product working, not a headline)
2. "The problem" — pain point with relatable scenario
3. How it works — 3 steps, show the actual UI
4. Speed comparison — before/after metrics
5. Integration logos — "works with your stack"
6. Pricing — clear, no tricks
7. CTA — single action
```

Example for a consumer app:
```
1. Bold statement + app preview (hook)
2. Feature showcase — the top 3 things, each with a phone mockup
3. Social proof — real user quotes, app store rating
4. "How it works" — 3 simple steps
5. Download CTA with app store badges
```

**Anti-patterns to REJECT:**
- ❌ Generic "Welcome to [Product]" hero
- ❌ Three icon cards with vague feature titles
- ❌ Alternating left-right sections with stock imagery
- ❌ Dark section → light section → dark section banding
- ❌ "Trusted by" logo bar as the second section (lazy social proof)
- ❌ FAQ accordion at the bottom (sign of unexplained product)
- ❌ Every section centered with the same max-width
- ❌ Footer with 40 links nobody clicks

### 3c: Section Transitions

**Sections should FLOW, not stack.** Define how each section connects to the next:

- **Visual continuity**: use the same background color across 2-3 sections, only changing when the narrative shifts
- **Content bridges**: the last line of one section sets up the next ("But what about X?" → next section answers X)
- **Layout variety**: if section 1 is centered text, section 2 should be asymmetric. If 2 is a grid, 3 should be full-width. Never repeat the same layout twice in a row.
- **Progressive disclosure**: each section reveals more depth — start broad, get specific
- **Color flow**: instead of alternating light/dark, use subtle background tint changes (#FAFAF8 → #F5F0E8 → #FAF8F5) that create natural rhythm without harsh contrast

Save the section plan to `.claude/context/page-architecture.md`.

---

## Step 4: Define the Design System

**Now that you know WHAT you're building, define HOW it looks.**

Create `.claude/context/design-system.md`:

### Colors
```
Primary:        #_____ (main brand color — derived from product personality)
Secondary:      #_____ (supporting color)
Accent:         #_____ (CTAs, highlights)
Background:     #_____ (page background — NOT pure white, NOT pure black)
Surface:        #_____ (cards, elevated elements)
Surface Alt:    #_____ (alternate section background — subtle shift, NOT opposite)
Text Primary:   #_____ (headlines — NOT pure black)
Text Secondary: #_____ (body, descriptions)
Text Muted:     #_____ (captions, hints)
Border:         #_____ (dividers, outlines)
```

**⚠️ COLOR RULES:**
- Default to LIGHT backgrounds unless the style explicitly requires dark
- Never use pure black (#000000) or pure white (#FFFFFF) — use tinted variants
- Section backgrounds should be SUBTLE variations (5-10% shift), not black↔white alternation
- Ask the developer: "Light or dark?" — don't assume
- Test: screenshot your palette and squint — if it looks like a zebra, fix it

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
- [ ] No pure black / pure white anywhere
- [ ] Section backgrounds are subtle variations, not alternating extremes
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
