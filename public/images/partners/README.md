# Partner logos

Drop pilot-partner logo files here, then tell Claude the filenames and they'll
be wired into the scrolling marquee in the Credibility section.

## Guidelines

- **Format:** SVG preferred (crisp at any size). Otherwise transparent PNG.
- **Color:** the site background is near-black (#0a0e14), so use **white or
  light** versions of each logo. Dark-on-transparent logos will be invisible.
- **Naming:** lowercase, no spaces, e.g.
  - `gorocky.svg`
  - `saaya.svg`
  - `midoconline.svg`

Once the files are here, they're referenced as `/images/partners/<file>` in
`src/components/sections/Credibility.jsx` (the `PARTNERS` array).
