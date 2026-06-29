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
admin.html            Content studio (/admin) — edit text, products, photos
404.html              Branded not-found page
content/content.json  All site content (products, materials, EN/ES copy, settings)
showcase.html         All homepage variations in one switcher (hidden via _redirects)
logo-options.html     IA monogram options (hidden via _redirects)
favicon.svg           IA monogram favicon
_redirects            Netlify rules (hide drafts, /admin pretty URL)
assets/
  css/intiara.css     Shared styles
  css/admin.css       Admin styles
  js/intiara.js       Loads content.json; EN/ES i18n, cart, image + page rendering
  js/admin.js         Admin: GitHub auth, editors, image upload, publish
variations/           10 homepage design directions (v1–v10) + gallery (hidden via _redirects)
```

## Editing content

Content lives in `content/content.json` and is editable without code via the admin
panel at **/admin** — see [ADMIN.md](ADMIN.md). Saving from the admin commits to the
repo, and Netlify rebuilds the live site automatically.

## Brand

- **Palette** — Chocolate `#3B2F24` · Dorado `#C8A95A` · Marfil `#F6F3EA`
- **Type** — Playfair Display (display) · Jost (UI)
- **Logo** — INTIARA wordmark + interlocking **IA** monogram with the *Inti* sun-dot
- **Materials** — alpaca · 950 silver · Andean opal · alpaca tassels · woven interior

## Status

Live at intiara.com.pe. Content is editable via /admin. Imagery uses elegant placeholders
that automatically switch to real photos as they are uploaded in the admin; piece names and
EUR prices are still placeholder values to be confirmed.
