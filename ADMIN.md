# INTIARA Studio — editing your website

Your site has a private admin panel at **intiara.com.pe/admin**. Use it to change
text, products, prices, photos, contact details and social links yourself. When you
press **Publish**, the site updates automatically in about a minute.

## One-time setup: your access key

The admin needs a free GitHub "access token" the first time (so only you can edit).

1. Go to **https://github.com/settings/personal-access-tokens/new** and sign in as **datacendia**.
2. **Token name:** `intiara admin` · **Expiration:** No expiration (or 1 year).
3. **Repository access** → *Only select repositories* → choose **datacendia/intiara**.
4. **Permissions** → *Repository permissions* → **Contents** → **Read and write**.
5. Click **Generate token**, copy it.
6. Open **intiara.com.pe/admin**, paste it into *Access key*, click **Sign in**.

The key is saved in your browser, so you only do this once per device. On a shared
computer, click **Sign out** when finished.

## Using it

- **Products** — edit name, price, colour, description (English + Spanish), and drag in photos. First photo is the main image. Use ↑ ↓ to reorder, "+ Add a product" for new pieces.
- **Materials** — the five materials shown on the Materials page.
- **Text** — every line of text on the site, English + Spanish. Use the search box to find a phrase.
- **Settings** — contact email, WhatsApp number, Instagram/Pinterest links, currency symbol, and the three main brand photos (hero, founder, materials).

Then click **Publish changes** (bottom right). Refresh the site after ~1 minute.

## Photos

Upload web-sized images (ideally under ~1 MB each) for fast loading. Any slot left
without a photo keeps the elegant monogram placeholder automatically.

## Notes

- All content lives in `content/content.json`. The admin edits that file; the site reads it.
- Publishing creates a commit on GitHub, which Netlify rebuilds into the live site.
