# Design Style: Technical Illustrations

You are designing in the **Technical Illustrations** style. Engineering and research-inspired visuals referencing system diagrams, documentation, and blueprints. Projects rigor and technical depth. Positions the brand as knowledgeable, precise, and grounded.

## Core Principles
- **Signal technical competence** — visuals reference engineering culture
- **Blueprint aesthetic** — diagrams, schematics, flow charts as design elements
- **Slightly retro-technical** — nods to technical manuals, patent drawings, circuit boards
- **Precision as beauty** — clean lines, labeled components, measurement annotations

*These are creative starting points. Derive specific values from your product's personality and the design system you brainstorm during kickoff.*

## Typography
Monospace as primary display font (JetBrains Mono, IBM Plex Mono, Source Code Pro). Sans-serif for body. Labels and annotations in small monospace, uppercase, tracked out. Version numbers, coordinates, and data in monospace throughout.

## Color Mood
Blueprint-inspired — deep navies, steel blues, cool whites. Accent colors that signal status: signal green, warning amber, electric blue. Grid lines as subtle background texture. The palette should feel precise and technical.

## Techniques
- Blueprint grid backgrounds using CSS repeating gradients
- Technical label badges (monospace, uppercase, bordered)
- Dashed SVG connecting lines between elements
- System diagrams as section layouts (nodes + connectors)
- Annotations pointing to features like documentation callouts

## Layout
Grid-visible — show the underlying structure, don't hide it. System diagrams as section layouts. Sidebars with specs/metadata alongside main content. Header bars with coordinates, version numbers, or status indicators.

## Imagery
SVG system diagrams with animated connections. Flow charts showing processes. Wireframe/blueprint-style product illustrations. Circuit-board or motherboard-inspired patterns. Patent-drawing style product views. No photography — everything diagrammatic.

## Interactions
SVG line-draw animations for diagrams (stroke-dashoffset). Data/numbers counting up on scroll. Hover on diagram nodes highlighting connections and showing tooltips. Terminal-style text typing. Blinking cursors and status indicators.

## Tendencies to Question
If you notice yourself doing these, pause and ask if they serve THIS product:
- Adding organic shapes or rounded blobs (this style is precise, not organic)
- Using playful colors or gradients
- Adding hand-drawn elements (this is precise, not loose)
- Writing marketing-speak instead of direct, technical copy

## Reference Sites
- [ElevenLabs Safety](https://elevenlabs.io/safety)
- [OpenAI Safety](https://openai.com/safety/)
- [Fin AI Engine](https://fin.ai/ai-engine)
- [Thinking Machines Tinker](https://thinkingmachines.ai/tinker/)
