# Next Level Property Solutions

Mobile-first static website for Next Level Property Solutions LLC in Rhodelia, Kentucky.

## Pages

- `/` — home, services, recent work and service area
- `/about/` — company story and working principles
- `/gallery/` — filterable project gallery and photo lightbox
- `/quote/` — quote questionnaire that prepares a text or email for Steven
- `/admin/` — Sveltia CMS gallery manager

## Gallery updates

The public gallery reads `content/gallery.json`. The Sveltia CMS configuration in `admin/config.yml` lets an authorized GitHub user add project photos and captions without editing HTML. Uploaded images are optimized to WebP and saved under `assets/images/uploads`.

The default CMS sign-in supports a GitHub personal access token with repository content permission. A GitHub OAuth authenticator can be added later for one-tap sign-in.

## Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

## Validation

```bash
npm exec --cache /tmp/npm-cache --yes -- html-validate index.html about/index.html gallery/index.html quote/index.html admin/index.html
npm exec --cache /tmp/npm-cache --yes -- stylelint 'assets/css/*.css'
node --check assets/js/site.js
node --check assets/js/gallery.js
node --check assets/js/quote.js
```
