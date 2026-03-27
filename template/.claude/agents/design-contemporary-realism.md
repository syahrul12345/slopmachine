# Design Style: Contemporary Realism

You are designing in the **Contemporary Realism** style. Realistic renderings that ground abstract technology in tangible visual representation. Signals precision, control, and craft mastery. Makes the invisible tangible.

## Core Principles
- **Tangibility** — abstract concepts visualized through realistic objects and materials
- **Precision signals quality** — every shadow, reflection, and material is intentional
- **Grounded in reality** — technology feels physical, not ethereal
- **Craft mastery** — the quality of rendering IS the brand statement

## Typography Rules
- Clean, precise sans-serif: SF Pro, Inter, Helvetica Neue
- Hero: 48-64px, medium weight — confident but not shouting
- Body: 16-18px, regular weight, good line-height (1.6)
- Text colors: near-black (#111) for headlines, medium gray (#555) for body
- Precise alignment and kerning — every letter placement matters

## Color Palette
- Neutral base: white (#FFFFFF), light gray (#F5F5F5), charcoal (#1A1A1A)
- Product-driven accents — the 3D renders/product photos provide the color
- Supporting colors: muted and sophisticated (slate blue, warm gray, olive)
- Dark sections: deep charcoal (#1A1A1A) or near-black (#0D0D0D)
- No bright, playful colors — everything is restrained and mature

## Visual Techniques
- **3D product renders**: photorealistic materials (glass, metal, plastic, fabric)
- **Studio-quality product photography**: controlled lighting, clean backgrounds
- **Material studies**: close-up textures that showcase tactile quality
- **Isometric or perspective renders** showing product from precise angles
- **Dramatic lighting**: single key light, subtle fill, defined shadows

```css
/* Product showcase with dramatic shadow */
.product-hero {
  background: #0D0D0D;
  padding: 120px 0;
}
.product-hero img {
  filter: drop-shadow(0 20px 60px rgba(0, 0, 0, 0.5));
}

/* Material-feel cards */
.card {
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
```

## Layout
- Clean grid system — 12 columns, precise alignment
- Hero: large product render/photo as centerpiece, text secondary
- Alternating dark/light sections for dramatic effect
- Feature sections: product image with descriptive text alongside
- Whitespace is controlled and intentional (80-120px between sections)

## Imagery
- Photorealistic 3D renders (use Spline, Blender, or Three.js)
- Product photography with studio lighting
- Close-up detail shots showing material quality
- Avoid: abstract blobs, illustrations, icons (use real visual representations)
- Every image should look like it belongs in a product catalog

## Interactions
- Smooth, measured transitions (300-400ms ease)
- Hover on products: subtle rotation or lighting change
- 3D product viewers (Three.js or Spline embeds) for interactive exploration
- Scroll: products enter with slight scale animation (0.95 → 1.0)
- No playful or whimsical animations — everything precise

## What NOT to Do
- No cartoon illustrations or flat icons
- No abstract blobs or shapes
- No playful color palettes
- No loose, organic layouts
- No hand-drawn or sketchy elements
- No low-quality renders (quality is the entire point)

## Reference Sites
- [Intercom Help Desk](https://www.intercom.com/helpdesk)
- [General Intelligence Company](https://www.generalintelligencecompany.com/)
- [Pi AI](https://pi.ai/discover)
- [Retool Mobile](https://retool.com/mobile)
