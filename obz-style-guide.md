🕷️ Project Bifrost Design Style Guide

Aesthetic Direction:
This guide evolves the Labyrinth visual language for a more intense, high-fidelity, cinematic experience. Bifrost leans into the dark. Interfaces evoke mystery, clarity through contrast, and layered precision—like the command deck of a stealth-class ship—with a single spectral light‑bridge inspired by the MCU Bifrost. Bifrost is the onBreeze portal between domains; keep it restrained and iconic.

Stack:
-- next.js to be deployed on vercel
-- use shadcn components, use best practices

⸻

🧭 Design Principles
	1.	Golden Ratio Proportions
Spacing, padding, and typography scale based on the golden ratio (~1.618) for inherent visual balance.
	2.	Minimal, Cinematic Density
White/negative space is present but weighted. Composition should feel deliberate, precise, and narrative—like panels of a storyboard.
	3.	Hyper Consistent Brand Use
The Primary Brand Color appears in all views—either subtly (borders, glows) or boldly (interactive states). Avoid introducing new colors.
	4.	Pure Black Canvas
The background is pure black (#000000)—to increase contrast, reduce eye strain, and create a feeling of vast digital depth.
	5.	Readability with Intention
Large body copy is rare. Text is concise, structured, and scannable—designed for high-speed comprehension.
	6.	Tech-Noir Futurism
Inspired by sci-fi HUDs, wireframes, and stealth tech. Think Ghost in the Shell, Blade Runner schematics, and modular overlays. Emphasize precision, layered information, and schematic realism.

⸻

🅰️ Typography
	•	Primary Font Family: Inter, with system fallbacks (-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif)
	•	Monospace Font: SF Mono, Menlo, Monaco, Consolas, monospace
Used for metrics, data blocks, and inline readouts.
	•	Base Font Size: 16px
	•	Line Height: 1.6 (body), tighter (1.4) for data blocks
	•	Font Weights:
	•	Regular: 400
	•	Medium: 500
	•	Semibold: 600
	•	Bold: 700

⸻

🎨 Color Palette

Element	Color	Description
Primary Brand Color	#0cdeaa	Electric teal / mint green for accents
Background - Primary	#000000	Pure black (new)
Background - Secondary	#121212	Ultra dark gray for panels
Primary Text	#f8f8f8	Near-white
Secondary Text	#d0d0d0	Muted gray
Tertiary Text	#888888	For footers, credits
Accent Shape Color	#A9A9A9	Light gray for geometric containers
Border / Line Color	#2a2a2a	Used for outlines, HUD linework

Spectral Accent (Gradient)	see tokens below	Rainbow spectrum for Bifrost bridge and glow accents

Spectral Gradient Tokens

```css
:root {
  --color-brand-primary: #0cdeaa;
  --bifrost-spectral-stops: #ff004c 0%, #ff7a00 16%, #ffd400 33%, #21ff87 50%, #00c2ff 66%, #6a5cff 83%, #d400ff 100%;
  --bifrost-gradient: linear-gradient(90deg, var(--bifrost-spectral-stops));
  --bifrost-glow: drop-shadow(0 0 20px rgba(12, 222, 170, 0.35));
}
```


⸻

📐 Spacing System (Golden Ratio Based)

Name	Value
Extra Small (xs)	8px
Small (sm)	13px
Medium (md)	21px
Large (lg)	34px
XL (xlg)	55px

Apply padding and margins using this scale. Avoid random spacing values.

⸻

🧱 Layout
	•	Full-Width, Fluid Layouts: Avoid boxed grids. Elements float and nest across edge-to-edge canvases.
	•	Asymmetrical Composition: Break symmetry purposefully—think HUDs, not dashboards.
	•	Grid Offsets: Use golden-ratio gaps between grouped content blocks.
	•	Mobile Breakpoint: 600px

⸻

🧩 UI & Visual Language

Geometry & Structure
	•	Deconstructed Forms
Use angular containers, beveled boxes, and overlapping layers. Avoid soft, rounded cards.
	•	Foreground Geometry
Use Accent Shape Color to create outlines, indicators, and framing.
	•	Chamfers & Cutouts
Use CSS clip paths or SVGs to suggest physical fabrication or modularity.

Linework
	•	Use thin (1px–2px) precise lines—solid, dashed, dotted.
	•	Draw invisible connections between elements.
	•	Animate lines on load or hover subtly.
	•	Use Border Color or Primary Brand Color.

Data Visuals
	•	Numbers and metadata use monospace fonts, aligned deliberately.
	•	Boxes may have data-specific labels like STAT, READOUT, or TRACE.
	•	Avoid typical charting. Instead, display data like sensor readouts or schematic dials.

⸻

🌈 Bifrost Light Bridge (Animated Background)

• Purpose
Subtle, iconic background ribbon that conveys motion and depth without distracting from content.

• Placement
Fixed, behind all content (z-index below panels). Anchor along a shallow diagonal (≈ −6° to −12°). Allow bleed beyond viewport edges.

• Color & Treatment
Use `--bifrost-gradient` with soft blur, slight saturation and contrast boost. Default opacity: 0.10–0.16 on dark backgrounds. Apply `--bifrost-glow` sparingly for highlights.

• Motion
Slow drift (6–14s ease-in-out, alternating). No parallax for primary flows. Respect reduced motion.

• Interaction
On hover/focus of primary CTAs, optionally bump opacity by +0.02 and shift hue ±5°.

• Accessibility
Respect `prefers-reduced-motion: reduce` (freeze or swap to static image). Maintain WCAG contrast for text/panels; never place high-saturation directly under small text.

• Performance
Target 60fps, GPU composited. Avoid heavy box-shadow stacking; prefer `filter: blur()` and transforms. Keep VRAM footprint modest and avoid large textures.

Implementation Options

1) CSS-only ribbon (recommended default)

```css
.bifrost-bridge {
  position: fixed;
  inset: -10% -40% auto -40%;
  height: 28vh;
  background: var(--bifrost-gradient);
  filter: blur(12px) saturate(140%) contrast(110%);
  opacity: 0.12;
  transform: translate3d(0,0,0);
  animation: bifrost-drift 14s ease-in-out infinite alternate;
  mask: radial-gradient(120% 60% at 50% 40%, #000 60%, transparent 62%);
  pointer-events: none;
}
@keyframes bifrost-drift {
  from { transform: translate3d(-8%, -2%, 0) rotate(-6deg); }
  to   { transform: translate3d(8%,  2%, 0) rotate(6deg); }
}
@media (prefers-reduced-motion: reduce) {
  .bifrost-bridge { animation: none; }
}
```

2) Canvas / p5.js (flowing photons)
Particles flow along a curved path with additive blending; cap count to remain performant (≤ 240 on desktop, ≤ 120 on mobile). Use spectral colors sampled along the gradient.

3) WebGL / Three.js (advanced)
Tube along a cubic Bézier; fragment shader disperses wavelengths for subtle chromatic spread. Keep bloom low and frame time budget conservative.

Usage Rules
• One hero instance per view. Avoid multiple bridges.
• Keep below panels and HUD linework.
• Pair with teal brand accents; reserve rainbow for this element.

⸻

🎛️ Interactions & Transitions
	•	Hover/Focus States
	•	Glow effect using Primary Brand Color
	•	Slight zoom or pulse for tactile feedback
	•	Transitions
	•	Duration: 0.2s ease
	•	Subtle movement, never bouncy or springy

⸻

⏳ Loading States
• Full-screen overlay may include the Bifrost bridge at 0.10–0.14 opacity behind the loader.
• Progress indicator uses Primary Brand Color; do not apply rainbow to text/UI chrome.
• Animation cycle 8–10s; pause when complete.
• Respect reduced motion: static gradient bar replacement.

⸻

🏷️ Brand Elements
	•	Project Title: “Bifrost”
	•	Font Size: 36px
	•	Weight: Bold 700
	•	Alignment: Top-left corner or HUD-style overlay
	•	Footer / Signature
	•	Text: "Made by onBreeze"
	•	Font Size: 12px
	•	Color: Tertiary Text (#888888)
	•	Position: Lower-left or inside a status panel

⸻

Let me know if you want a Figma template, Tailwind classes, or React component snippets based on this.