# Design Conflict Comparison

**Date:** 12 Jul 2026
**Files compared:** `docs/ui-design/ui-design.md` vs Actual Codebase

---

## Stack & Dependencies

| Aspect | `ui-design.md` | Actual Codebase | Match? |
|---|---|---|---|
| UI Library | Material Design components | shadcn/ui v4 (15 components) | ❌ |
| Icons | Outlined Material Icons | Lucide React | ❌ |
| CSS Framework | Not specified | Tailwind CSS v4 | ⚠️ |
| Toasts | Not specified | Sonner | ⚠️ |
| Forms | React Hook Form + Zod | React Hook Form + Zod | ✅ |
| Headless Components | Not specified | @base-ui/react | ⚠️ |
| Theme Provider | Not specified | next-themes | ⚠️ |

## Colors

| Token | `ui-design.md` | Actual Codebase | Match? |
|---|---|---|---|
| Primary | Material Light Blue `#64B5F6` | Clinical Teal `#22867a` (HSL `173 58% 32%`) | ❌ |
| Background | `#BBDEFB` (light blue) | `--muted: 173 20% 96%` (light teal) | ❌ |
| Secondary | Deep Navy `#1E3A8A` | Not defined | ❌ |
| Page Background | Clean White `#FFFFFF` | `--background: 0 0% 100%` (white) | ✅ |
| Destructive | Not specified | `--destructive: 0 72% 45%` | ⚠️ |
| Border | Not specified | `--border: 173 10% 88%` | ⚠️ |
| Color Approach | Hardcoded hex values | HSL tokens + Tailwind classes only | ❌ |

## Typography

| Aspect | `ui-design.md` | Actual Codebase | Match? |
|---|---|---|---|
| Font Family | Inter (sans-serif) | Inter via `next/font`, fallback system-ui | ✅ |
| Font Weights | Not specified | 400, 600 only | ⚠️ |
| Type Scale | Not specified | `text-2xl` / `text-lg` / `text-sm` / `text-xs` | ⚠️ |

## Layout

| Aspect | `ui-design.md` | Actual Codebase | Match? |
|---|---|---|---|
| App Shell | Overlay/FAB based, no sidebar | Fixed sidebar (`w-60`) + topbar | ❌ |
| Sidebar | Not defined | `w-60`, role-based nav items | ❌ |
| Topbar | Not defined | Page title + user menu + logout | ❌ |
| Content Area | Not defined | `max-w-6xl`, `p-6` | ⚠️ |

## Responsive Strategy

| Aspect | `ui-design.md` | Actual Codebase | Match? |
|---|---|---|---|
| Approach | Mobile-first | Desktop-first | ❌ |
| Phone Support | Core target — doctors use handhelds | Out of scope this sprint | ❌ |
| Tablet | Not specified | Sidebar collapses to icons | ⚠️ |
| Breakpoint | `768px+` for modal overlay | Not formally defined | ⚠️ |

## Components

| Component | `ui-design.md` | Actual Codebase | Match? |
|---|---|---|---|
| FAB (Floating Action Button) | Pinned per screen | Not used | ❌ |
| Bottom Sheet | Slide-up panels on mobile | Not used (shadcn `dialog`) | ❌ |
| Stepper | Multi-step form groups | Not installed | ❌ |
| Button | Material buttons | shadcn `button` (default/outline/ghost/destructive) | ❌ |
| Dialog | Material modal | shadcn `dialog` / `alert-dialog` | ❌ |
| Card | Material card | shadcn `card` | ⚠️ |
| Table | Material data table | shadcn `table` | ⚠️ |
| Tabs | Not specified | shadcn `tabs` | ⚠️ |
| Badge | Not specified | shadcn `badge` | ⚠️ |
| Dropdown | Not specified | shadcn `dropdown-menu` | ⚠️ |
| Skeleton | Not specified | shadcn `skeleton` | ⚠️ |
| Switch | Not specified | shadcn `switch` | ⚠️ |

## Forms

| Aspect | `ui-design.md` | Actual Codebase | Match? |
|---|---|---|---|
| Library | React Hook Form + Zod | React Hook Form + Zod | ✅ |
| Layout | Multi-step Steppers | Single column, `max-w-lg` | ❌ |
| Mobile Layout | Single-column scrollable | Not implemented | ⚠️ |
| Desktop Layout | Multi-column + validation sidebar | Not implemented | ⚠️ |
| Medical Units | Not specified | Field suffix (`cm`, `kg`, `°C`, `%`) | ⚠️ |

## Accessibility

| Aspect | `ui-design.md` | Actual Codebase | Match? |
|---|---|---|---|
| Contrast Ratio | 4.5:1 minimum | WCAG AA (token palette) | ✅ |
| Touch Targets | 44×44px minimum | Not specified | ❌ |
| Keyboard Navigation | Not specified | Dialogs trap focus, forms submit on Enter | ⚠️ |
| Aria Labels | Not specified | Icon-only buttons get `aria-label` | ⚠️ |
| Print Styles | Not defined | `@media print` — hide shell, black on white | ⚠️ |

## Voice & Microcopy

| Aspect | `ui-design.md` | Actual Codebase | Match? |
|---|---|---|---|
| Casing | Not specified | Sentence case ("Register patient") | ⚠️ |
| Tone | Not specified | Staff-facing, terse, factual | ⚠️ |
| Date Format | Not specified | `12 Jul 2026, 14:30` (24h) | ⚠️ |
| Button Labels | Not specified | Verb-only: "Register patient", not "OK" | ⚠️ |

---

## Summary

| Category | Matches | Mismatches | Gaps |
|---|---|---|---|
| Stack & Dependencies | 1 | 2 | 4 |
| Colors | 1 | 3 | 2 |
| Typography | 1 | 0 | 2 |
| Layout | 0 | 2 | 2 |
| Responsive | 0 | 2 | 2 |
| Components | 0 | 4 | 7 |
| Forms | 1 | 1 | 3 |
| Accessibility | 1 | 1 | 3 |
| Voice & Microcopy | 0 | 0 | 4 |
| **Total** | **5** | **15** | **29** |

**Verdict:** `ui-design.md` describes a Material Design, mobile-first app. The actual codebase is shadcn/ui, desktop-first, with Lucide icons and Tailwind tokens. Only **Inter font** and **RHF + Zod** match. The document needs a full rewrite to reflect the real stack.
