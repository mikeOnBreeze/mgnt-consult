🪐 Magnite Product Team Style Guide

Aesthetic Direction

Magnite’s design language communicates momentum, clarity, and structured intelligence. The interface uses bold gradients, layered depth, and smooth hover animations to make AI workflows feel powerful yet approachable. The tone is futuristic, collaborative, and action-oriented — helping product managers move seamlessly from discovery to deployment.

The vibe is AI-native, strategy-first, and flexible, leaning into vibrant colors, animated states, and shaded cards that communicate hierarchy and focus without rigid templates.

⸻

🎨 Color Palette

Magnite’s palette emphasizes high-contrast gradients with deep purples, blues, and supporting accent tones.
	•	Primary Gradient (Hero Backgrounds)
	•	#1C0033 (Deep Violet) → #360079 (Royal Purple) → #6B1FB3 (Vibrant Purple)
Used for headers, hero sections, and landing page frames. Creates depth and energy.
	•	Secondary Gradient (Cards & Panels)
	•	#220044 (Dark Plum) → #3C1275 (Indigo)
Used as component backgrounds for cards, info boxes, and workflow panels.
	•	Accent Colors
	•	#00C2FF (Bright Cyan) – used for highlights, links, code mentions (.md files).
	•	#6DFF8B (Neon Green) – callouts and success states.
	•	#FFC857 (Gold) – warnings, highlights, or phase markers.
	•	Typography Base Colors
	•	#FFFFFF (White) – primary text on dark backgrounds.
	•	#D1B3FF (Soft Lavender) – secondary text, muted headers.
	•	#9E9E9E (Grey) – meta labels and footnotes.

⸻

🧩 Components
	•	Cards
Rounded corners (border-radius: 1.25rem), with soft shadows and hover lift (transform: translateY(-2px)). Backgrounds are gradient-tinted for hierarchy.
	•	Phase Blocks
Each workflow stage (Discovery, Planning, Building) uses a unique accent color in its icon and border treatment for quick scannability.
	•	Code Mentions (.md references)
Inline highlighted text (background: #220044; color: #00C2FF; border-radius: 6px; padding: 0.1em 0.3em).
	•	Callouts
	•	Info callouts: Blue border, cyan accent icon.
	•	Success callouts: Green gradient accent.
	•	Warning callouts: Gold border, animated pulse on hover.

⸻

✨ Motion & Interactions

Magnite’s system is designed to guide users through flow states with smooth micro-animations:
	•	Hover States
	•	Buttons: subtle glow (box-shadow: 0 0 12px currentColor)
	•	Cards: lift + gradient intensification
	•	Links: underline slide animation (left to right)
	•	Page Transitions
Fade-in gradient sweeps on load, with easing (ease-in-out 300ms).
	•	Icons & Phase Badges
Animated with a bounce-in effect (scale(1.1) → scale(1)).
	•	Future Ideas Section
Accordion-style reveal with smooth vertical expand (max-height transition, 0.3s ease).

⸻

📝 Usage Guidelines
	•	Consistency: Always apply gradients for primary sections; avoid flat color fills.
	•	Hierarchy: Use bright accents sparingly to highlight action points (e.g., links, commands, success states).
	•	Readability: Maintain high contrast between text and backgrounds.
	•	Flexibility: The design system is a starter pack — adapt components as needed, but keep the momentum aesthetic intact.

⸻

Stack

-- next.js (App Router), deploy on vercel
-- tailwindcss + shadcn/ui (Radix primitives)
-- lucide-react for icons
-- framer-motion optional for complex sequences (prefer CSS transitions for common states)

⸻

🧭 Design Principles

	1.	Momentum-First Interfaces
	Interactions should feel like forward movement. Use gradient energy, layered depth, and micro-lifts to guide attention.
	2.	Clarity through Contrast
	High-contrast text on deep, rich surfaces. Accents are bright and purposeful—never decorative noise.
	3.	Hierarchy by Light & Elevation
	Elevate primary actions and active cards with glow and lift; keep background elements calm.
	4.	Consistency over Novelty
	Repeat gradient, spacing, and motion patterns across surfaces to build familiarity.
	5.	Performance-Aware
	Prefer GPU-friendly transforms, avoid shadow stacking, and respect reduced motion.
	6.	Accessible by Default
	Meet or exceed WCAG AA contrast, visible focus, and motion preferences.

⸻

🅰️ Typography

	•	Primary Font Family: Inter, with system fallbacks (-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif)
	•	Monospace Font: SF Mono, Menlo, Monaco, Consolas, monospace
	•	Base Font Size: 16px
	•	Line Height: 1.6 (body), 1.25–1.35 for headings
	•	Font Weights
	•	Regular: 400
	•	Medium: 500
	•	Semibold: 600
	•	Bold: 700
	•	Recommended Display Scale
	•	H1: 48–56px / 1.15; H2: 36–44px / 1.2; H3: 28–32px / 1.25; H4: 22–24px / 1.3
	•	Letterspacing: -0.01em for H1/H2, normal elsewhere

⸻

📐 Spacing System

Name	Value
Extra Small (xs)	8px
Small (sm)	12px
Medium (md)	20px
Large (lg)	32px
XL (xlg)	52px

Apply margins and paddings using this scale. Use larger jumps (md→xl) for hero and section separation.

⸻

🧱 Layout

	•	Fluid, full-width canvases; avoid boxed layouts.
	•	Container max-widths: 1280px (xl), 1120px (lg). Internal gutters: md on mobile, lg on desktop.
	•	Breakpoints (Tailwind defaults): sm 640, md 768, lg 1024, xl 1280, 2xl 1536.
	•	Use 12-column mental model; prefer asymmetric groupings and layered stacks.

⸻

🎛️ Design Tokens (CSS Variables)

```css
:root {
  /* Brand Gradients */
  --mg-hero-gradient: linear-gradient(135deg, #1C0033 0%, #360079 40%, #6B1FB3 100%);
  --mg-surface-gradient: linear-gradient(180deg, #220044 0%, #3C1275 100%);

  /* Surfaces */
  --mg-surface-0: #0F0120; /* deepest background */
  --mg-surface-1: #220044; /* cards base */
  --mg-surface-2: #3C1275; /* elevated panels */

  /* Text */
  --mg-text-primary: #FFFFFF;
  --mg-text-secondary: #D1B3FF;
  --mg-text-meta: #9E9E9E;

  /* Accents */
  --mg-cyan: #00C2FF;
  --mg-green: #6DFF8B;
  --mg-gold: #FFC857;

  /* Borders & Effects */
  --mg-border: rgba(255, 255, 255, 0.08);
  --mg-ring: rgba(0, 194, 255, 0.35);
  --mg-shadow-elev-1: 0 8px 24px rgba(28, 0, 51, 0.45);
  --mg-shadow-elev-2: 0 16px 40px rgba(54, 0, 121, 0.40);

  /* Radii */
  --mg-radius-card: 20px; /* 1.25rem */
  --mg-radius-chip: 999px;

  /* Motion */
  --mg-duration-fast: 150ms;
  --mg-duration: 200ms;
  --mg-duration-slow: 300ms;
  --mg-ease: cubic-bezier(0.20, 0.60, 0.20, 1.00);
}

@media (prefers-reduced-motion: reduce) {
  :root { --mg-duration-fast: 0ms; --mg-duration: 0ms; --mg-duration-slow: 0ms; }
}
```

⸻

🔧 Tailwind Setup (snippet)

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        mg: {
          surface0: '#0F0120',
          surface1: '#220044',
          surface2: '#3C1275',
          text: {
            primary: '#FFFFFF',
            secondary: '#D1B3FF',
            meta: '#9E9E9E',
          },
          cyan: '#00C2FF',
          green: '#6DFF8B',
          gold: '#FFC857',
          border: 'rgba(255,255,255,0.08)'
        }
      },
      borderRadius: {
        card: '20px',
        chip: '999px'
      },
      boxShadow: {
        mg1: '0 8px 24px rgba(28, 0, 51, 0.45)',
        mg2: '0 16px 40px rgba(54, 0, 121, 0.40)'
      },
      transitionTimingFunction: {
        mg: 'cubic-bezier(0.20, 0.60, 0.20, 1.00)'
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms'
      },
      backgroundImage: {
        'mg-hero': 'linear-gradient(135deg, #1C0033 0%, #360079 40%, #6B1FB3 100%)',
        'mg-surface': 'linear-gradient(180deg, #220044 0%, #3C1275 100%)'
      }
    }
  }
} satisfies Config
```

⸻

🧩 Component Recipes

	•	Buttons
	•	Primary: gradient background (bg-[image:theme(backgroundImage.mg-hero)]), text-white, rounded-[var(--mg-radius-chip)], px-5 py-2.5, shadow-mg1, transition-[colors,transform,shadow] duration-base ease-mg; hover: translate-y-[-2px] shadow-mg2; focus-visible: outline-none ring-2 ring-[--mg-ring].
	•	Secondary: bg-[--mg-surface-1], border border-[--mg-border], text-[--mg-text-primary], hover:bg-[--mg-surface-2].
	•	Ghost: transparent bg-transparent text-[--mg-text-secondary] hover:text-[--mg-text-primary] hover:bg-white/5.

	•	Links
	•	Text-[--mg-cyan] with underline-slide: background-size 0% 1px → 100% 1px on hover. Respect visited color slightly dimmed (90%).

	•	Cards
	•	Rounded-[var(--mg-radius-card)], background mg-surface gradient, border border-[--mg-border], shadow-mg1; hover: translate-y-[-2px] shadow-mg2; internal padding md–lg; header uses H4 with secondary text.

	•	Phase Blocks
	•	Left accent border using accent color (cyan/green/gold) at 2–3px; small badge icon (lucide) with subtle glow.

	•	Inputs / Fields
	•	bg-[--mg-surface-0], border border-[--mg-border], rounded-lg, placeholder:text-[--mg-text-meta]; focus:ring-2 ring-[--mg-ring] ring-offset-0; invalid:border-[--mg-gold].

	•	Navbar
	•	Translucent surface (bg-white/3 on gradient) with backdrop-blur; 1px bottom border using --mg-border; active link gets cyan underline-slide and 600 weight.

	•	Tabs / Chips
	•	Chip radius, subtle surface (bg-white/5), active uses cyan text + 1px glow via box-shadow: 0 0 0 1px var(--mg-cyan).

	•	Badges
	•	Small uppercase, tracking-wide, bg-white/6; semantic variants: success (--mg-green), info (--mg-cyan), warning (--mg-gold) as left dot or border.

	•	Callouts
	•	Info: cyan left stripe; Success: green gradient wash; Warning: gold border with gentle pulse on hover.

	•	Modal / Dialog
	•	Centered panel on surface gradient with shadow-mg2; enter: fade+lift 12px over var(--mg-duration); scrim: bg-black/60.

⸻

✨ Motion & Interactions (detailed)

	•	Durations: fast 150ms (hover), base 200ms (typical), slow 300ms (entrances)
	•	Easing: var(--mg-ease)
	•	Buttons: subtle outer glow (0 0 12px currentColor) on hover; active: translateY(1px) reduce shadow
	•	Links: underline slide left→right; focus-visible adds 2px ring using --mg-ring
	•	Cards: lift 2px + gradient intensify on hover; active: settle back
	•	Page transitions: gradient sweep fade-in on mount, stagger cards by 40ms
	•	Respect `prefers-reduced-motion`: disable non-essential transitions

⸻

🧿 Iconography

	•	Library: lucide-react
	•	Sizes: 20–24px for inline, 32–48px for hero badges
	•	Stroke width: 1.75 by default
	•	Usage: icons inherit currentColor; primary actions use cyan with subtle glow

⸻

♿ Accessibility

	•	Contrast: meet WCAG AA (≥ 4.5:1 for body); avoid placing high-saturation gradient directly behind small text
	•	Focus: always visible with 2px ring (cyan) and offset where needed
	•	Motion: honor reduced motion; provide non-animated alternatives
	•	Hit targets: min 40px for tap targets
	•	ARIA: descriptive labels for icon-only controls

⸻

🏷️ Brand Elements

	•	Title Style: “Magnite” set in Inter 700, letterspacing -0.01em
	•	Hero Treatment: apply --mg-hero-gradient as background with large, soft vignette
	•	Signature: Optional “Made by Magnite” microcopy in meta color at footer

⸻

🚀 Implementation Checklist

	1.	Initialize Next.js + Tailwind; install shadcn/ui and lucide-react.
	2.	Add CSS variables in global stylesheet and enable Tailwind theme extensions above.
	3.	Build layout with hero gradient and surface gradients for primary sections.
	4.	Implement Button, Card, Navbar using Component Recipes.
	5.	Wire focus rings, hover/active states, and motion durations consistently.
	6.	Audit contrast and keyboard nav; test with reduced motion.
	7.	Profile for layout thrash and shadow costs; swap to transforms when possible.

