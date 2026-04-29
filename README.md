# About Morgan

A single-page website for a Morgan State University UNIV 100 group project.

## Project Overview

This site covers:
- Mission and history
- Traditions and commencement symbols
- Core values
- Student resources
- Sources and citations

## Tech Stack

- HTML5 (`index.html`)
- CSS3 (`style.css`)
- Vanilla JavaScript (`script.js`)
- React 18 via CDN for timeline (`timeline.jsx`)
- Lucide icons via CDN

## Project Structure

- `index.html` - Main page content and sections
- `style.css` - Site styling and responsive rules
- `script.js` - Interactivity (nav, tabs, card details, reveals)
- `timeline.jsx` - React timeline component
- `logo/` - Image assets and logos
- `vercel.json` - Vercel deployment settings

## Run Locally

Open `index.html` in a browser.

For best compatibility (module/CDN and relative assets), you can also run a local static server:

```powershell
npx serve .
```

Then open the local URL printed in the terminal.

## Deploy to Vercel

This project is configured as a static site.

```powershell
npx vercel --prod --yes
```

Current production alias:
- https://aboutmorgan.vercel.app

## Notes

- The site uses Lucide icons initialized in `script.js`.
- The timeline is mounted into `#timeline-root` from `timeline.jsx`.
