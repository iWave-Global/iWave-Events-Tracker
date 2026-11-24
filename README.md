# iWave Events Tracker

A browser-based dashboard for tracking events, travel, budgets, and leads.

## Run locally

Open `index.html` in a modern browser. Internet access is required for the SheetJS CDN dependency used by Excel import/export.

## Publish with GitHub Pages

1. Create a GitHub repository (for example, `iwave-events-2026`).
2. Upload `index.html` and this `README.md` to the repository root.
3. In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Open the Pages URL shown by GitHub after deployment.

## Data and storage notes

- This package is the standalone GitHub Pages version of the supplied HTML.
- Without the original host-provided `window.claude` data service, it uses browser `localStorage` for edits. Those edits stay in that browser and are not automatically shared with other users or devices.
- You can use **Export Excel** to back up data and **Import Excel** to restore it or move it to another browser.
- The page can also load a `data.xlsx` file placed beside `index.html`, but this is view-only. The Excel template can be generated from the **Excel template** button.
- The original code's hosted `window.claude` database integration is platform-specific and is not replaced by GitHub Pages. No credentials, API keys, or tokens are included in this package.

## Included dashboard sections

- Overview and monthly event summary
- Events, categories, attendees, leads, and costs
- Travel and trip status
- Lead pipeline and follow-up dates
- Search and filters
- Excel import, export, and template generation
