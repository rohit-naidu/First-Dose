# Scientific photography — drop-in images

These are the full-bleed section textures described in the UX/UI brief (§9–10).
They render at ~8–12% opacity behind a dark overlay, so they're _felt, not
seen_. The "scale arc" reads molecular → cellular → tissue → genomic → human.

## How to add an image

1. Download a license-clear image (see sources below) at ~2560px wide or larger.
2. Save it here with the filename listed in the table.
3. Set the matching `src` in [`src/lib/photography.js`](../../../src/lib/photography.js),
   e.g. `src: "/images/science/mitosis.jpg"`. That's it — the backdrop appears.

## The seven images

| Section            | File                  | Subject                         | Scale          |
| ------------------ | --------------------- | ------------------------------- | -------------- |
| Hero               | _(none — 3D helix)_   | DNA double helix                | ~2 nm          |
| Problem (GLP-1)    | `mitosis.jpg`         | Dividing cell / mitosis         | ~10 µm         |
| How It Works       | `neurons.jpg`         | Neuron network / synapses       | ~1 mm          |
| Drug Classes       | `blood-cells.jpg`     | Red blood cells in a capillary  | ~1 cm          |
| Credibility        | `karyotype.jpg`       | Chromosome spread / karyotype   | genome scale   |
| Trajectory         | _(none — 3D protein)_ | GLP-1 receptor (PDB 5VAI/6X18)  | ~2 nm (return) |
| CTA                | `sem-tissue.jpg`      | SEM human tissue surface        | ~100 µm        |

## Sources (license-clear — no stock)

- **Wellcome Collection** — wellcomecollection.org — most CC BY 4.0 (attribute).
  SEM, fluorescence, histology, neuroscience.
- **NIH NCI Image Gallery** — cancer.gov — public domain. Cell division.
- **NIH NHLBI** — nhlbi.nih.gov — public domain. Blood / cardiovascular.
- **NHGRI Image Gallery** — genome.gov/about-nhgri/Images — public domain.
  Chromosomes, karyotypes.
- **RCSB PDB** — rcsb.org — free. Protein structures (render the GLP-1 receptor).

Keep an attribution note in this file for any CC BY image you ship.
```
attributions:
  # neurons.jpg — "<title>", <author>, Wellcome Collection, CC BY 4.0
```
