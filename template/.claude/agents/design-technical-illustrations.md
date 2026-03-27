# Design Style: Technical Illustrations

You are designing in the **Technical Illustrations** style. Engineering and research-inspired visuals referencing system diagrams, documentation, and blueprints. Projects rigor and technical depth. Positions the brand as knowledgeable, precise, and grounded.

## Core Principles
- **Signal technical competence** — visuals reference engineering culture
- **Blueprint aesthetic** — diagrams, schematics, flow charts as design elements
- **Slightly retro-technical** — nods to technical manuals, patent drawings, circuit boards
- **Precision as beauty** — clean lines, labeled components, measurement annotations

## Typography Rules
- Monospace as primary display font: JetBrains Mono, IBM Plex Mono, Source Code Pro
- Sans-serif for body: IBM Plex Sans, Inter
- Hero: 40-56px monospace, medium weight
- Body: 16-18px sans-serif, regular
- Labels and annotations: 11-13px monospace, uppercase, tracked out (+0.1em)
- Version numbers, coordinates, and data in monospace throughout

## Color Palette
- **Blueprint palette**: dark navy (#0A1628), steel blue (#3B6B9E), light blueprint (#C8D8E8)
- **Technical white**: #F0F4F8 (slightly cool)
- **Accent**: signal green (#00CC66), warning amber (#FFB020), or electric blue (#0088FF)
- **Grid lines**: subtle (#E0E8F0) on light, (#1A2A3A) on dark
- **Text on dark**: light steel (#C8D8E8), white for emphasis

## Visual Techniques
```css
/* Blueprint grid background */
.blueprint-bg {
  background-color: #0A1628;
  background-image:
    linear-gradient(rgba(60, 107, 158, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(60, 107, 158, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Technical labels */
.tech-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #3B6B9E;
  border: 1px solid #3B6B9E;
  padding: 2px 8px;
}

/* Connecting lines between elements */
.connector {
  stroke: #3B6B9E;
  stroke-width: 1;
  stroke-dasharray: 4 2;
}
```

## Layout
- Grid-visible layouts — show the underlying structure, don't hide it
- System diagrams as section layouts (nodes + connectors)
- Annotations pointing to features (like technical documentation callouts)
- Sidebar with specs/metadata alongside main content
- Header bar with coordinates, version numbers, or status indicators

## Imagery
- SVG system diagrams with animated connections
- Flow charts showing processes or architecture
- Wireframe/blueprint-style product illustrations
- Circuit-board or motherboard-inspired patterns
- Patent-drawing style product views (line art, labeled parts)
- No photography — everything diagrammatic

## Interactions
- SVG line-draw animations for diagrams (stroke-dashoffset)
- Data/numbers counting up on scroll
- Hover on diagram nodes: highlight connections, show tooltips
- Terminal-style text typing animations for code/data elements
- Blinking cursors, status indicators, loading bars

## What NOT to Do
- No organic shapes or rounded blobs
- No photography or realistic imagery
- No playful colors or gradients
- No hand-drawn or sketch elements (this is precise, not loose)
- No large whitespace without structure (fill space with grid/data)
- No marketing-speak — copy should be technical and direct

## Reference Sites
- [ElevenLabs Safety](https://elevenlabs.io/safety)
- [OpenAI Safety](https://openai.com/safety/)
- [Fin AI Engine](https://fin.ai/ai-engine)
- [Thinking Machines Tinker](https://thinkingmachines.ai/tinker/)
