# Derek Yang - Personal Portfolio

This repository contains the source for the personal portfolio of Derek (Yangdeyi Yang). It serves as a lightweight navigation and identity layer above three engineering/research case studies spanning machine learning, physiological signal processing, multirate DSP, and physical sensing.

## Selected work

- **CRFID Research Case Study** — chipless RFID recognition under physical distribution shift, with strict domain-generalisation evaluation, signal/representation diagnostics, and reproducible research evidence.
- **EEG Seizure Detection Engineering Case Study (EE6019)** — patient-specific seizure-event detection from multichannel scalp EEG, including signal processing, classical ML, event-level evaluation, error analysis, and deployment-oriented profiling.
- **EEG Multirate DSP Engineering Case Study (EE6041)** — specification-driven 500 Hz → 32 Hz resampling with anti-alias FIR design, polyphase optimisation, and quantitative spectral-preservation validation.

## Project architecture

- Pure HTML5 semantic structure
- Vanilla CSS styling with restrained, editorial design
- Lightweight and fully static; hosted with GitHub Pages
- No complex frontend framework required for the portfolio landing page
- No Node/npm build process required

## Deployment

The portfolio deploys natively via GitHub Pages.

### Local development

To preview locally, open `index.html` in a modern browser, or run:

```bash
python -m http.server
```

## Structure

- `index.html` — portfolio content and links to the three selected case studies
- `style.css` — styling, responsive rules, and layout
- `assets/` — portfolio-local visual assets when required
- `README.md` — repository overview
