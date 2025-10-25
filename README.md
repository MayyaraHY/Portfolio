# My Portfolio

[![Deploy Status](https://github.com/MayyaraHY/Portfolio/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/MayyaraHY/Portfolio/actions/workflows/gh-pages.yml)

Live demo: https://mayyarahy.github.io/Portfolio/

A small Vite + React portfolio site.

## Local development

Install dependencies and start the dev server:

```powershell
npm ci
npm run dev
```

Open http://localhost:5173 (or the address `vite` prints).

## Build

```powershell
npm run build
```

The production build output is written to `dist/`.

## Deployment (automatic)

This repository includes a GitHub Actions workflow (`.github/workflows/gh-pages.yml`) that builds the site and publishes the `dist/` folder to the `gh-pages` branch automatically when you push to `main` or `my-portfolio`.

Notes:
- `vite.config.js` contains `base: '/Portfolio/'` so asset URLs work when served from GitHub Pages at `https://<username>.github.io/Portfolio/`.
- The workflow uses the repository's `GITHUB_TOKEN` and `peaceiris/actions-gh-pages` to publish to `gh-pages`.

## Manual deploy (optional)

If you prefer, you can deploy from your machine using the `gh-pages` package. Example:

```powershell
npm run build
npx gh-pages -d dist -b gh-pages
```

## Troubleshooting

- If pages appear broken, confirm `vite.config.js` base matches the repo name and that the `gh-pages` branch contains the `dist/` contents.
- If the Actions job fails, open the Actions tab in GitHub and inspect the logs.

---

If you want, I can also add a small deployment badge that links to the site or include instructions for a custom domain (CNAME).