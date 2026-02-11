# Arsalan Ansari Personal Website

Production-ready static personal website for deployment to Vercel and GitHub Pages.

## Stack

- HTML + CSS + vanilla JavaScript
- No build step required

## Local preview

Open `index.html` directly, or run a simple static server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import the repo in Vercel.
3. Framework preset: `Other`.
4. Build command: leave empty.
5. Output directory: leave empty.
6. Deploy.

`vercel.json` is included for security headers and clean static behavior.

## Deploy to GitHub Pages

A GitHub Actions workflow is included at:

- `.github/workflows/deploy-pages.yml`

### Steps

1. Push to `main` branch on GitHub.
2. In repo settings, enable **Pages** and set source to **GitHub Actions**.
3. Every push to `main` auto-deploys.

## SEO files

Included:

- `robots.txt`
- `sitemap.xml`

If your domain changes, update:

- canonical URL in `index.html`
- URLs in `sitemap.xml`

## Content notes

- Resume file in use: `Ansari_Resume.pdf`
- Contact email: `aa2324@cornell.edu`

