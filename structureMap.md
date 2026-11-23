# Structure Map

## 1. Purpose

This document describes the current implementation of 545. It is a map of existing files and runtime responsibilities, not a list of planned features.

## 2. Root tree

~~~text
545/
├── .github/workflows/deploy-pages.yml
├── public/
│   ├── .nojekyll
│   └── styles.css
├── reference/
│   ├── glass-button/
│   └── glow-button/
├── src/
│   ├── components/
│   │   ├── MaterialButton.tsx
│   │   ├── MaterialCard.tsx
│   │   ├── SearchOverlay.tsx
│   │   └── SiteHeader.tsx
│   ├── config/materials.ts
│   ├── data/materials.ts
│   ├── hooks/useTheme.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── designRules.md
├── index.html
├── package.json
├── README.md
├── structureMap.md
├── tsconfig.json
└── vite.config.ts
~~~

## 3. File ownership

| File | Responsibility |
|---|---|
| index.html | HTML shell, metadata and pre-mount theme |
| src/main.tsx | Font imports and React bootstrap |
| src/App.tsx | Page composition, search visibility, keyboard shortcut and interaction counts |
| src/components/SiteHeader.tsx | Brand, circular theme/search controls and repository link |
| src/components/SearchOverlay.tsx | Full-screen overlay, search filtering, focus management and keyboard behavior |
| src/components/MaterialCard.tsx | Study presentation, specs and status |
| src/components/MaterialButton.tsx | Shared interactive button element |
| src/config/materials.ts | Material variant type and labels |
| src/data/materials.ts | Study descriptions, button labels and specs |
| src/hooks/useTheme.ts | Theme state and localStorage persistence |
| public/styles.css | Design tokens, components, overlay, button materials and responsive rules |
| vite.config.ts | React plugin and GitHub Pages base path |
| .github/workflows/deploy-pages.yml | Type check, build and deployment |
| reference/ | Original HTML/CSS experiments retained for comparison |

## 4. Runtime flow

~~~text
index.html
  ↓
src/main.tsx
  ↓
src/App.tsx
  ├── useTheme()
  ├── SiteHeader
  │    └── open search
  ├── SearchOverlay
  │    ├── filter MATERIAL_STUDIES
  │    ├── focus trap / Escape / backdrop click
  │    └── navigate to material section
  └── MATERIAL_STUDIES
       ↓
    MaterialCard
       ↓
    MaterialButton
       ↓
    click / pointer events
       ↓
    local interaction count
~~~

## 5. State

App.tsx owns:

- local activation counters: glass and glow,
- search overlay visibility.

Activation counters are presentation state only. They reset when the page is reloaded and are not sent to a server.

useTheme.ts owns:

- light/dark theme state,
- theme persistence under the 545-theme localStorage key,
- document data-theme and color-scheme synchronization,
- theme-color meta synchronization.

SearchOverlay.tsx owns its query and filtered results. The result index is derived from MATERIAL_STUDIES and does not require an API.

## 6. Data and configuration

The current study list is stored in src/data/materials.ts.

Each study includes id, title, description, buttonLabel, note and specs.

The variant type and short labels are stored in src/config/materials.ts.

The project currently has two variants: glass and glow.

## 7. Components

### SiteHeader

Renders the 545 wordmark, circular search and theme controls, and the GitHub link.

### SearchOverlay

Renders a viewport-sized blurred modal. It filters titles, descriptions, labels, notes and property values. It focuses its input on opening, locks background scrolling, traps keyboard focus, closes on Escape/backdrop and restores focus to the header trigger.

### MaterialCard

Renders one editorial study row. It receives its metadata, current activation count and activation callback through props.

### MaterialButton

Renders the shared semantic button. The variant prop selects its CSS material. Pointer movement writes local CSS custom properties only for mouse and pen input.

## 8. CSS

public/styles.css is the single styling authority.

It contains light/dark tokens, base styles, header and footer, circular nav controls, hero and section typography, study layout, glass surface, glow edge, full-screen search overlay, interaction feedback, responsive rules and reduced-motion rules.

Button decoration uses pseudo-elements and CSS custom properties. It does not require GSAP or Chroma.js.

## 9. Original source material

The initial experiments are kept under reference/:

- reference/glass-button contains the original HTML/CSS sketch.
- reference/glow-button contains the original CodePen-derived source and its MIT license.

These files are historical reference material and are not part of the Vite entry graph.

## 10. Build and deployment

vite.config.ts selects the base path in this order:

1. VITE_BASE_PATH
2. GITHUB_ACTIONS + repository name
3. local /

The GitHub Actions workflow runs on push to main and manual dispatch. It uses Node 22, npm install, npm run typecheck, npm run build and GitHub Pages deployment.

## 11. Current limits

- The application is client-side and static.
- There is no backend, API or database.
- Search covers only the local material study data.
- Generate and Activate are local interaction demonstrations.
- Activation counts are not persisted.
- Theme is the only persisted preference.
- There is no automated browser or visual regression test suite.

## 12. Documentation source of truth

- README.md — purpose, stack, local commands and deployment.
- designRules.md — visual and interaction rules.
- structureMap.md — current files, ownership and data flow.
