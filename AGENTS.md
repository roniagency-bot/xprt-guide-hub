# Project Notes

## Rules

- The site header must keep every top-level menu item on a single row at 1280px in both English and Spanish: keep the top-level list short and group extras under a "More" dropdown, and show the desktop menu only from `xl` up (hamburger below). Why: eight top-level items overflowed the header, wrapped labels and clipped the primary call-to-action button.
- Pages served from static folders under `public/` (for example the Medicare and ACA pages) are linked with a plain `<a href>` pointing at the folder's `index.html`, never a router `Link` and never the bare folder path. Why: the router would intercept the navigation and the bare folder path does not resolve.
- App-internal server logic lives under `src/lib` with its `.functions.ts` / `.server.ts` modules, not under `src/server`. Why: the production build failed while that logic lived in `src/server`.
- Do not edit the files inside the static `public/` page folders the owner maintains separately (Medicare, ACA); link to them instead. Why: the owner updates those pages outside this project and asked for them to stay untouched.
