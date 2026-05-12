# Design Brief

## Direction
Resel Ponno — Bangladeshi reseller e-commerce mobile app with app-shell UI, green-driven call-to-action commerce, and smooth interactive flows.

## Tone
Functional, engaging, and commercially optimized — clean card layers with strong green accents, soft shadows, and zero friction in transaction workflows.

## Differentiation
Bangla-first interface with culturally authentic e-commerce workflows (reseller onboarding, daily stats, referral tracking) designed for reseller velocity.

## Color Palette

| Token      | OKLCH         | Role                               |
|------------|---------------|------------------------------------|
| background | 0.99 0 0      | Light: white; dark: navy #1a1a2e  |
| foreground | 0.2 0 0       | Light mode: dark text              |
| card       | 0.99 0 0      | Light: white; dark: slightly elevated navy |
| primary    | 0.5 0.2 152   | Vibrant green (#16a34a), all buttons/CTAs |
| accent     | 0.5 0.2 152   | Same as primary: green highlights  |
| muted      | 0.92 0 0      | Light neutrals; card borders light |
| destructive| 0.55 0.22 25  | Red for warnings/errors            |

## Typography

- Display: Hind Siliguri (Bangla-optimized) bold — headings, hero text
- Body: Hind Siliguri regular — all Bangla labels, body copy
- Scale: h1 text-2xl font-bold, h2 text-lg font-semibold, label text-sm font-medium, body text-base

## Elevation & Depth

Soft shadow hierarchy: card bg with shadow-sm (0 1px 2px rgba), hover state raises with shadow-md. No gradients or blur effects — pure layering with carefully tuned neutral colors.

## Structural Zones

| Zone    | Background            | Border         | Notes                                      |
|---------|----------------------|----------------|-----------------------------------------|
| Header  | primary (green)      | none           | Sticky, white text, hamburger + logo + balance button |
| Content | background (white)   | border (light) | Auto-padding, card-based grid sections    |
| BottomNav | background (white) | border-t (light) | Fixed, 4 green-highlighted tabs, icons + Bangla labels |
| Sidebar | card (white/elevated) | border (light) | Overlay backdrop, slide-in animation, dark mode support |

## Spacing & Rhythm

430px max-width mobile-first; sections use 1rem gaps, cards use 0.75rem internal padding, section headers 1.5rem top margin. Two-column grid on mobile for dashboard, one-column for product listings.

## Component Patterns

- Buttons: rounded-lg, primary green with white text, hover scale 105%, active shadow elevated
- Cards: rounded-lg, white bg (light) / elevated navy (dark), shadow-sm, responsive 2-4 col grid
- Pills: rounded-full, green bg, white text (e.g., balance button, category filter)
- Badges: small rounded-sm, muted bg with primary text (e.g., discount, profit labels)
- Tabs: underline active tab with green, gray text for inactive

## Motion

- Entrance: Framer Motion page transitions via opacity + slide-up, 0.3s ease-out
- Hover: Cards scale 102%, buttons scale 98% on press, sidebar slide 0.25s ease-out
- Decorative: Banner auto-scroll, counter animations on stat cards (0.8s spring), pulsing badge notification

## Constraints

- Max-width 430px centered container (mobile-first)
- All UI text in Bangla; use Hind Siliguri font exclusively
- Dark mode: navy bg (#1a1a2e equiv 0.12 0 0), elevated card surfaces, bright green accents
- No arbitrary hex/rgb colors; all from OKLCH tokens
- Animations via Framer Motion only; no CSS animations except transitions
- Lucide React icons for all UI affordances

## Signature Detail

Vibrant green primary color (0.5 0.2 152 / #16a34a) on every CTA button and active navigation element — it's the reseller's confidence and commerce velocity in one color.
