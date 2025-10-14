# 🧪 blankspace — Internal Design Token Generator

> **"Forge your brand’s colors, fonts, and tokens into a unified design system."**

blankspace is an internal web app for generating, testing, and exporting **design tokens** — including **colors, typography, shadows, and radii** — to Tailwind, CSS variables, or JSON.  
Think of it as *UIColors.app*, but extended for your **entire visual system**.

---

## 🚀 Overview

blankspace is a comprehensive design token generator that bridges the gap between design and development. It empowers teams to create, test, and maintain consistent design systems through:

### Core Value Propositions
- **🎨 Perceptually Uniform Color Generation**: Create scientifically accurate color scales using OKLCH color space
- **🧪 Live Component Testing**: Preview design tokens on real UI components before implementation
- **♿ Built-in Accessibility**: Automatic WCAG 2.2 contrast checking and compliance validation
- **📦 Multi-format Export**: Generate tokens for Tailwind, CSS variables, and JSON formats
- **🌓 Theme Management**: Organize and manage multiple themes (light, dark, high-contrast)
- **🔧 Comprehensive Token Support**: Colors, typography, shadows, radii, and spacing tokens

### Target Users
- **Designers**: Visual design system creation and validation
- **Frontend Engineers**: Token implementation and consistency
- **Design System Teams**: Collaborative token management and versioning

---

## 🎨 Core Features

### MVP (v0.1) - Core Features

#### 1. **Color Scale Generator**
- **Input**: Seed color (HEX or OKLCH format)
- **Output**: 10-step perceptual scale (50–950)
- **Controls**: Adjust hue, chroma, and lightness independently
- **Locking**: Pin specific steps and regenerate the rest
- **Visualization**: Real-time preview with OKLCH color space

#### 2. **Contrast Analyzer**
- **Automatic Testing**: WCAG 2.2 AA/AAA compliance checking
- **Visual Indicators**: Clear badges (AA Pass, AAA Pass, Fail)
- **Live Preview**: Test text/background combinations instantly
- **Accessibility Score**: Overall compliance percentage

#### 3. **Component Playground**
- **Live Preview**: Real components using generated tokens
- **Component Library**: Button, Card, Input, Navbar, Tooltip, Badge, Chart
- **Semantic Mapping**: Connect raw colors to design roles
- **Interactive Testing**: Hover states, focus states, and variants

#### 4. **Export System**
- **Tailwind Config**: Ready-to-use `tailwind.config.ts`
- **CSS Variables**: Standard `:root` CSS custom properties
- **JSON Format**: W3C Design Tokens specification
- **Download Options**: Copy to clipboard or download files

#### 5. **Typography Generator**
- **Font Preview**: Google Fonts integration via API
- **Type Scale**: Generate 8–10 step typography scales
- **Export Ready**: Tailwind `fontFamily` and `fontSize` configs
- **Visual Testing**: Live typography preview

#### 6. **Project Management**
- **Local Storage**: Save/load projects in browser
- **Import/Export**: JSON project files for sharing
- **Version History**: Track changes and iterations

---

### v1.0 Extensions - Advanced Features

#### 1. **Multi-theme Support**
- **Theme Variants**: Light, Dark, High Contrast, Custom themes
- **Live Toggle**: Switch between themes in real-time
- **Export Variants**: Generate theme-specific token files
- **Theme Inheritance**: Base theme with overrides

#### 2. **Semantic Token Mapping**
- **Role-based Tokens**: Map raw colors to semantic roles
- **Examples**: `bg.default`, `fg.muted`, `accent.primary`, `border.subtle`
- **Context-aware**: Different mappings per theme
- **Validation**: Ensure all required roles are defined

#### 3. **Extended Token Types**
- **Colors**: Brand, neutral, semantic color tokens
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale (4px, 8px, 16px, etc.)
- **Radii**: Border radius tokens for consistent rounding
- **Shadows**: Elevation and depth shadow tokens

#### 4. **Version Control**
- **Snapshot System**: Save project versions (v0.1 → v0.2)
- **Change Tracking**: Visual diff view of token changes
- **Rollback**: Revert to previous versions
- **Changelog**: Document what changed between versions

#### 5. **Team Collaboration**
- **Authentication**: Supabase-based user management
- **Project Sharing**: Invite teammates to collaborate
- **Permissions**: Read-only and edit access levels
- **Share Links**: Public read-only project links

---

## ⚙️ Architecture

### Frontend Stack
- **Next.js** (App Router)
- **React** + **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** + **Radix Primitives**
- **Zustand** for state management
- **React Query** for async data
- **Culori** or **oklch-js** for color math

### Backend (Optional)
- **Supabase**
  - Authentication, PostgreSQL, Row Level Security
  - Tables for projects, themes, tokens, versions

### Persistence Strategy
| Layer | MVP | v1 |
|-------|------|----|
| Auth | None | Supabase |
| Storage | localStorage | Supabase Tables |
| Export | Local files | Git sync / CLI optional |

---

## 🧩 Data Model (v1, Supabase)

| Table | Fields | Description |
|--------|---------|-------------|
| `projects` | `id`, `name`, `slug`, `owner_id`, `created_at` | A token workspace |
| `themes` | `id`, `project_id`, `name`, `is_default` | Multiple themes per project |
| `token_groups` | `id`, `theme_id`, `kind`, `name` | Group by category (color, font, etc.) |
| `tokens` | `id`, `group_id`, `token_type`, `name`, `value`, `meta` | Actual tokens (e.g. `brand.500`, `bg.default`) |
| `versions` | `id`, `project_id`, `semver`, `changelog` | Versioning for audits |

---

## 🧠 Color Engine Logic

1. **Input**
   - HEX or OKLCH (e.g. `oklch(0.7 0.15 280)`).

2. **Scale Generation**
   - 10 steps (50–950) by interpolating lightness (`L`) and adjusting chroma (`C`) and hue (`H`).
   - Maintain perceptual uniformity using OKLCH space.
   - Support curve-based adjustment with visual bezier sliders.

3. **Gamut Handling**
   - Clamp or compress chroma to stay in sRGB gamut.
   - Optional “Gamut Preview” toggle.

4. **Locking**
   - Lock any step to keep it fixed when regenerating.

5. **Contrast Checking**
   - Compute relative luminance.
   - Precompute text/bg pairs for AA/AAA.

---

## 🧰 Token Formats

### 🎨 JSON (Design Tokens Schema)
```json
{
  "tokens": {
    "color": {
      "brand": {
        "50": { "value": "oklch(0.98 0.02 265)" },
        "500": { "value": "oklch(0.68 0.13 265)" }
      },
      "bg": { "default": { "value": "{color.neutral.0}" } }
    },
    "font": {
      "family": { "ui": { "value": "\"Inter\", system-ui, sans-serif" } },
      "size": { "md": { "value": "1rem" } }
    },
    "radius": { "md": { "value": "0.75rem" } }
  }
}

### 💅 CSS Variables
```css
:root {
  --brand-50: oklch(0.98 0.02 265);
  --brand-500: oklch(0.68 0.13 265);
  --bg-default: var(--neutral-0);
  --fg-default: var(--neutral-950);
  --radius-md: 12px;
  --font-ui: "Inter", system-ui, sans-serif;
}
```

### 🧵 Tailwind Config
```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "oklch(var(--brand-50) / <alpha-value>)",
          500: "oklch(var(--brand-500) / <alpha-value>)"
        },
        bg: { DEFAULT: "var(--bg-default)" },
        fg: { DEFAULT: "var(--fg-default)" }
      },
      borderRadius: { md: "var(--radius-md)" },
      fontFamily: { ui: "var(--font-ui)" }
    }
  }
} satisfies Config;
```


## 🧑‍💻 Implementation Plan

### Phase 1: MVP Core (Week 1-2)

#### Days 1-2: Project Foundation
- **Setup**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **State Management**: Zustand store for token management
- **Persistence**: localStorage integration for project saving
- **Deliverable**: Working project scaffold with basic routing

#### Days 3-4: Color Engine
- **OKLCH Integration**: Culori library for color space conversion
- **Scale Generation**: 10-step perceptual color scales (50-950)
- **Interactive Controls**: Hue, chroma, lightness sliders
- **Locking System**: Pin specific steps during regeneration
- **Deliverable**: Functional color scale generator with real-time preview

#### Days 5-6: Component Playground
- **Component Library**: Button, Card, Input, Badge, Alert components
- **Token Integration**: Connect generated colors to component props
- **Contrast Matrix**: WCAG 2.2 compliance checking
- **Live Preview**: Real-time component updates with token changes
- **Deliverable**: Interactive component playground with accessibility validation

#### Days 7-8: Typography & Export
- **Font Integration**: Google Fonts API for font preview
- **Type Scale**: Generate 8-10 step typography scales
- **Export System**: Tailwind config, CSS variables, JSON formats
- **Download Options**: Copy to clipboard and file download
- **Deliverable**: Complete export system with typography support

#### Days 9-10: Polish & Testing
- **Project Management**: Import/export JSON projects
- **UI Polish**: Dark mode toggle, responsive design
- **Error Handling**: Input validation and error states
- **Testing**: Cross-browser compatibility and performance
- **Deliverable**: Production-ready MVP

### Phase 2: Advanced Features (Week 3-4)

#### Days 11-12: Database Integration
- **Supabase Setup**: Database schema for projects, themes, tokens
- **API Layer**: RESTful endpoints for CRUD operations
- **Data Migration**: localStorage to database migration
- **Deliverable**: Backend infrastructure for team collaboration

#### Days 13-14: Authentication & Sharing
- **User Auth**: Supabase authentication with email/password
- **Project Sharing**: Invite teammates and permission management
- **Public Links**: Read-only project sharing
- **Deliverable**: Multi-user collaboration system

#### Days 15-16: Advanced Features
- **Multi-theme**: Light/dark/high-contrast theme support
- **Version Control**: Snapshot system with diff visualization
- **Semantic Mapping**: Role-based token organization
- **Deliverable**: Enterprise-ready feature set

#### Days 17-18: Launch Preparation
- **Documentation**: User guides and API documentation
- **Onboarding**: Interactive tutorial and walkthrough
- **Performance**: Optimization and monitoring setup
- **Deliverable**: Launch-ready application

## 🧩 Component Playground (shadcn/ui)
| Component | Variants | Purpose |
|-----------|----------|----------|
| Button | primary, secondary, destructive, ghost | Brand contrast test |
| Card | header/body/footer | Background surfaces |
| Input | label + helper text | Text contrast |
| Badge | neutral/accent | Semantic token mapping |
| Alert | success/error/warning/info | Contrast validation |
| Tabs, Tooltip, Dialog | — | Realistic UI contexts |
| Chart | bar/line mock | Brand tone test |

## 🧮 Accessibility Features

Live WCAG contrast computation for:
- `brand.x` on `bg.default`
- `content.default` on all surfaces
- Button states (hover/focus/active)
- Optional color vision simulator (protanopia/deuteranopia)
- Summary panel: "AA Pass 92%, AAA Pass 68%"

## 💾 Export Deliverables
- `tailwind.config.ts`
- `tokens.css`
- `tokens.json`

Optional CLI sync script:
```bash
pnpm blankspace export --format=tailwind --project=my-brand
```

## 💡 Future Ideas
- Gradient generator and tokenization
- Icon color previews
- Animation tokens (timing, easing)
- Style Dictionary sync
- GitHub integration to auto-commit exported tokens

## 🧭 Risks & Mitigations
| Risk | Description | Mitigation |
|------|-------------|------------|
| Gamut differences | OKLCH vs browser color gamut mismatch | Use sRGB clamp; visual indicator |
| Font licensing | Google Fonts only; no uploads | Use API; store family name only |
| Accessibility drift | Colors look different in various screens | Add device-preview mode |
| Export sync errors | Tailwind config overwrites | Create separate tokens.tailwind.ts file |

## 🔖 Naming Alternatives
| Name | Meaning | Notes |
|------|---------|-------|
| blankspace | forge = creation + craftsmanship | 🔥 Recommended |
| PrismLab | color experiments and optics | Good alt |
| HuePilot | steering hues | playful |
| ToneSmith | craft-focused | artistic feel |
| PaletteKit | straightforward and safe | |
| Specimen | typography inspiration | |
| Tailwind Mint | token minting idea | |

## 📚 Summary

blankspace will serve as your team's internal Design System Lab:

- Engineers can safely experiment with tokenized theming
- Designers can visually tune and verify consistency
- Exports instantly fit into Tailwind, CSS, or JSON workflows
- Build once — use everywhere
