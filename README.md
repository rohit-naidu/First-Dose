# First Dose Health — marketing site

A single-page marketing site for First Dose Health, plus a fuller GLP-1
sub-page and three coming-soon drug-class pages. Built to the company's copy
brief and UX/UI direction: a deep charcoal-blue, clinical, cinematic interface
with a photorealistic 3D DNA double helix as a persistent background "spine."

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Three.js** via `@react-three/fiber` + `drei` + `postprocessing` (the helix)
- **Framer Motion** (section reveals)
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Structure

```
src/
  app/
    page.js                 # home (all 7 sections)
    glp-1/page.js           # full GLP-1 sub-page
    {antidepressants,cardiovascular,oncology}/page.js  # coming-soon
    opengraph-image.js      # generated social card
    icon.svg                # favicon
  components/
    three/MoleculeCanvas.jsx, three/DnaHelix.jsx   # the persistent helix
    Hero.jsx, sections/     # page sections
    Section.jsx             # sets per-section molecule position/dim
    SectionBackdrop.jsx     # scientific-photography texture layer
    ContactForm.jsx, Navbar.jsx, Footer.jsx, Reveal.jsx, CountUp.jsx
  lib/
    scroll.js               # shared scroll state for the render loop
    photography.js          # per-section image config (the "scale arc")
```

## Content still to wire (from the planning brief, §7)

- **Advisor one-liners** — confirm Dr. Chowdari / Eltepu / Peddi statements.
- **Clinic partner name** — replace `[clinic partner]` in `Credibility.jsx`.
- **Publication links** — three `#` placeholders in `Credibility.jsx`.
- **Scientific photography** — drop images into `public/images/science/`
  and set `src` in `src/lib/photography.js` (see that folder's README).
- **Contact form** — currently composes a `mailto:` to
  `hello@firstdosehealth.com`. To route to a CRM, replace `onSubmit` in
  `ContactForm.jsx` with a POST to an API route.

## Deploy (Vercel)

Push to GitHub and import the repo at vercel.com — the Next.js preset needs no
configuration. Build command is `next build`; output is handled automatically.
