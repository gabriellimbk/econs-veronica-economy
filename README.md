# Lion City Ledger

An interactive React + Vite app about Singapore's economic development. This project was originally exported from Google AI Studio, but it is now configured to run as a standard static Vite site so you can test it locally and later publish it on GitHub Pages.

## Local Development

1. Open a terminal in `singapore economy`.
2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Production Build

Create a local production build:

```bash
npm run build
```

Preview that build locally:

```bash
npm run preview
```

## GitHub Pages Build

GitHub Pages usually serves a project site from `https://<user>.github.io/<repo-name>/`, so the app needs a matching base path during build.

For this repository, build it like this:

```bash
$env:VITE_BASE_PATH='/econs-veronica-economy/'
npm run build
```

If you later rename the repository, change the value to match the new repo name.

## GitHub Pages Deployment

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

- Push to `main`.
- GitHub Actions builds the Vite app with the correct Pages base path.
- The built `dist/` output is deployed to GitHub Pages automatically.

## Notes

- This app is fully static. It does not require Gemini, Express, SQLite, or any server-side runtime.
- The generated `dist/` folder is what you would publish to GitHub Pages.
- For a user or organization Pages site published from the root domain, keep the default `/` base path.
