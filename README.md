# Portfolio — Samra Ansari

A single-page personal portfolio built with React and Vite.

## Getting started

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run lint     # eslint, zero-warning policy
```

## Structure

```
public/assets/          images, served verbatim at /assets/*
src/
  App.jsx               section composition
  vars.css              design tokens (colour, motion, elevation)
  utils.js              getImageUrl helper
  hooks/
    useScrollSpy.js     drives the active navbar link
  data/                 content: about, skills, history, projects
  Components/
    Reveal/             Reveal, Stagger, RevealItem — the motion primitives
    Navbar/ Hero/ About/ Experience/ Project/ Contact/
```

## Editing content

Text and images are data, not markup — edit the JSON in `src/data/` and the
sections re-render:

- `about.json` — the three role cards
- `skills.json` — skill chips
- `history.json` — the employment timeline
- `projects.json` — project cards. `source` and `demo` are optional; a card
  only renders a link when the corresponding URL is present and non-empty.

`imageSrc` values are relative to `public/assets/`.

## Motion

All scroll animation goes through `src/Components/Reveal/Reveal.jsx`:

- `<Reveal>` — a single element entering. Takes `direction`
  (`up`/`down`/`left`/`right`), `delay`, `duration`, and `slide` for the
  wipe-panel effect used on section headings.
- `<Stagger>` + `<RevealItem>` — a list whose children cascade in.

Both respect `prefers-reduced-motion`: opacity still fades, travel is dropped.

## Assets

Images live in `public/assets/` so they are copied to `dist/assets/` verbatim.
Bundler output goes to `dist/bundle/` (`build.assetsDir` in `vite.config.js`)
to keep the two from colliding. Reference images through `getImageUrl()`, which
resolves against `import.meta.env.BASE_URL` and so survives deployment under a
sub-path.
