# INTIARA

Website for **INTIARA** — a contemporary luxury brand transforming Peru's finest materials
(baby alpaca, 950 silver, Andean opal and handwoven interiors) into designer pieces.

Bilingual (English / Spanish), aimed at an international audience. Static site — no build step.

## Live (local)

```bash
# from the project root
python -m http.server 8080
# then open http://localhost:8080
```

## Structure

```
index.html            Home
collection.html       Collection (with Bags / Wallets filter)
product.html          Product detail template (?id=inti … wayra)
story.html            Our story / mission / vision
materials.html        Materials & detail
contact.html          Contact + enquiry form
showcase.html         All homepage variations in one switcher
logo-options.html     IA monogram options
favicon.svg           IA monogram favicon
assets/
  css/intiara.css     Shared styles
  js/intiara.js       Data, EN/ES i18n, cart, page rendering
variations/           10 homepage design directions (v1–v10) + gallery
```

## Brand

- **Palette** — Chocolate `#3B2F24` · Dorado `#C8A95A` · Marfil `#F6F3EA`
- **Type** — Playfair Display (display) · Jost (UI)
- **Logo** — INTIARA wordmark + interlocking **IA** monogram with the *Inti* sun-dot
- **Materials** — alpaca · 950 silver · Andean opal · alpaca tassels · woven interior

## Status

Functional prototype. Imagery is intentional placeholder (marked photo slots) awaiting real
editorial photography; piece names and EUR prices are placeholders.
