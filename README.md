# 545 — Material Studies

> Small, static React application for exploring tactile interface materials and button interactions.

**Repository:** akcizur/545  
**Application:** 545 — Material Studies  
**GitHub Pages:** https://akcizur.github.io/545/  
**Reference architecture:** akcizur/kaap  
**Default branch:** main

---

## 1. What this project is

545 is a small interactive component study built from two original experiments:

- Glass surface — translucent fill, layered highlights and a physical press response.
- Glow edge — dark inset surface, animated monochrome rim and a pointer-following highlight.

The project turns those isolated HTML/CSS explorations into one maintainable application. Each button is live: pressing it registers a local interaction in the interface.

The app is static-first. It has no backend, API, database, account system or external runtime service.

## 2. Technology

- React 19
- TypeScript strict
- Vite
- Lucide React
- Google Sans
- Fragment Mono
- Global CSS
- GitHub Actions
- GitHub Pages

The visual effects are implemented with CSS. Pointer position is handled by a small React event handler. GSAP and Chroma.js are not runtime dependencies.

## 3. Project structure

~~~text
545/
├── .github/workflows/deploy-pages.yml
├── public/
│   ├── .nojekyll
│   └── styles.css
├── reference/
│   ├── glass-button/
│   │   ├── index.html
│   │   └── style.css
│   └── glow-button/
│       ├── LICENSE.txt
│       ├── README.md
│       └── src/
│           ├── index.html
│           ├── script.js
│           └── style.scss
├── src/
│   ├── components/
│   │   ├── MaterialButton.tsx
│   │   ├── MaterialCard.tsx
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

The original experiments are kept under reference/. They document the source material, but they are not loaded by the production app.

## 4. Architecture

~~~text
index.html
  └── src/main.tsx
       └── src/App.tsx
            ├── components/SiteHeader.tsx
            ├── components/MaterialCard.tsx
            │    └── components/MaterialButton.tsx
            ├── data/materials.ts
            ├── config/materials.ts
            └── hooks/useTheme.ts

public/styles.css
~~~

- App.tsx owns page composition and local interaction counts.
- MaterialCard.tsx renders a study and its metadata.
- MaterialButton.tsx contains the reusable interactive button surface.
- data/materials.ts contains the displayed study content.
- config/materials.ts defines the variant type and labels.
- useTheme.ts persists the light/dark preference.
- public/styles.css is the styling authority.

## 5. Development

Requirements: Node.js 22 or newer.

Install:

~~~sh
npm install
~~~

Start:

~~~sh
npm run dev
~~~

Type check:

~~~sh
npm run typecheck
~~~

Production build:

~~~sh
npm run build
~~~

Preview the production build:

~~~sh
npm run preview
~~~

## 6. Theme

The interface supports light and dark themes. The choice is stored in localStorage under 545-theme.

The initial theme is applied in the HTML shell before React mounts to avoid a theme flash.

## 7. Interaction and accessibility

- Both buttons are real semantic buttons.
- Each activation updates a visible local interaction count.
- Pointer-following light is enabled for mouse and pen input.
- Touch input does not depend on hover.
- Focus-visible styles are provided.
- Reduced-motion preferences disable continuous and non-essential motion.

There is no network action behind Generate or Activate. They are interaction previews, not connected generation services.

## 8. GitHub Pages

The workflow at .github/workflows/deploy-pages.yml runs on pushes to main and manual dispatch.

Pipeline:

1. Checkout
2. Set up Node 22
3. Install dependencies
4. Run TypeScript type check
5. Build the Vite app
6. Upload dist
7. Deploy GitHub Pages

vite.config.ts derives the repository base path from GITHUB_REPOSITORY in Actions and uses / for local development. VITE_BASE_PATH can override it.

## 9. Documentation source of truth

- README.md — project purpose, commands and implementation overview.
- designRules.md — visual and interaction rules.
- structureMap.md — file ownership and data flow.

Keep all three aligned when the architecture or visual system changes.
