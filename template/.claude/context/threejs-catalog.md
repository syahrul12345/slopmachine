# Three.js Animation & Effect Catalog

Use Three.js (via React Three Fiber / @react-three/fiber + @react-three/drei) for interactive 3D elements on landing pages and app screens. Browse these references for inspiration.

## How to Use
- All examples viewable at `https://threejs.org/examples/#[name]`
- Source code at `https://github.com/mrdoob/three.js/blob/master/examples/[name].html`
- For React: use `@react-three/fiber` (R3F) + `@react-three/drei` helpers

## Installation
```bash
npm install three @react-three/fiber @react-three/drei
# Optional post-processing
npm install @react-three/postprocessing
```

---

## Hero Backgrounds & Ambient Effects
Best for: full-viewport backgrounds, ambient motion behind content

| Effect | Example | Use case |
|--------|---------|----------|
| Particle waves | `webgl_points_waves` | Flowing particle field behind hero text |
| Dynamic particles | `webgl_points_dynamic` | Responsive particle clouds |
| Particle fluid | `webgpu_compute_particles_fluid` | Fluid-like particle simulation |
| Particle rain/snow | `webgpu_compute_particles_rain` | Weather/atmosphere effects |
| Ocean shader | `webgl_shaders_ocean` | Water surface backgrounds |
| Sky shader | `webgl_shaders_sky` | Dynamic sky/sunset backgrounds |
| Lava shader | `webgl_shader_lava` | Molten/organic backgrounds |
| Backdrop water | `webgpu_backdrop_water` | Stylized water scenes |

## Morphing & Evolving Shapes
Best for: morphing-objects, futuristic-surrealism, organic-gradients styles

| Effect | Example | Use case |
|--------|---------|----------|
| Sphere morph | `webgl_morphtargets_sphere` | Blob that transforms on scroll |
| Face morph | `webgl_morphtargets_face` | Character/avatar morphing |
| Generic morph | `webgl_morphtargets` | Any geometry transformation |
| Marching cubes | `webgl_marchingcubes` | Metaball/organic shape merging |

## Post-Processing Effects
Best for: adding cinematic quality to any 3D scene

| Effect | Example | Use case |
|--------|---------|----------|
| Bloom/glow | `webgl_postprocessing_unreal_bloom` | Neon glow, light bleed |
| Depth of field | `webgl_postprocessing_dof` | Focus effect, depth perception |
| God rays | `webgl_postprocessing_godrays` | Dramatic light shafts |
| Glitch | `webgl_postprocessing_glitch` | Digital distortion, cyberpunk |
| Afterimage | `webgl_postprocessing_afterimage` | Motion trails, ghosting |
| SSAO | `webgl_postprocessing_ssao` | Ambient occlusion for depth |
| Screen space reflections | `webgl_postprocessing_ssr` | Reflective surfaces |

## Instanced Rendering (Performance)
Best for: rendering thousands of objects efficiently

| Effect | Example | Use case |
|--------|---------|----------|
| Instanced scatter | `webgl_instancing_scatter` | Field of objects on terrain |
| Dynamic instancing | `webgl_instancing_dynamic` | Moving crowds/swarms |
| Billboard instancing | `webgl_buffergeometry_instancing_billboards` | Particle-like sprites at scale |
| Instance path | `webgpu_instance_path` | Objects following paths |

## Interactive
Best for: elements that respond to mouse/touch

| Effect | Example | Use case |
|--------|---------|----------|
| Interactive points | `webgl_interactive_points` | Clickable particle fields |
| Raycasting | `webgl_interactive_raycasting_points` | Hover effects on 3D objects |

---

## Style → Three.js Mapping

| Design Style | Recommended Effects |
|---|---|
| Morphing Objects | morphtargets_sphere, marchingcubes, particles_fluid |
| Futuristic Surrealism | postprocessing_unreal_bloom, godrays, backdrop_water |
| Outer Space | points_waves, points_dynamic, shaders_sky, postprocessing_dof |
| Organic Gradients | shader_lava, backdrop_water, custom GLSL gradient shaders |
| Immersive / Motion | postprocessing_dof, unreal_bloom, instancing_scatter |
| Generative Art | compute_particles, points_waves, custom flow field shaders |
| Digital Impressionism | postprocessing_dof (heavy blur), afterimage |
| Technical Illustrations | wireframe + instancing, custom line rendering |
| ASCII & Pixels | ASCII post-processing effect (custom), glitch |

## React Three Fiber Quick Start
```tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial color="#6366f1" distort={0.4} speed={2} />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  )
}
```

## Drei Helpers (Most Useful for Landing Pages)
- `Float` — gentle floating animation
- `MeshDistortMaterial` — organic blob distortion
- `MeshWobbleMaterial` — wobbly jelly effect
- `Stars` — star field background
- `Cloud` — volumetric clouds
- `Sparkles` — floating sparkle particles
- `Text3D` — 3D extruded text
- `Environment` — HDR environment lighting
- `ContactShadows` — ground shadow plane
- `ScrollControls` + `useScroll` — scroll-driven 3D animations
- `Html` — embed HTML inside 3D scene (for text overlays)
