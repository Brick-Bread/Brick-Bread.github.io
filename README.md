# brick-bread.github.io

Personal site for **Liam Mercer** (brick_bread) — Minecraft network owner, content
creator, A Level Computer Science student.

Live at **https://brick-bread.github.io**

## What's here

```
index.html          home — hero, work, stack, about, contact
projects/index.html the long write-ups, hash-routed (#tracker, #brickworks, #zyralis)
styles.css          every style for both pages
script.js           nav, scroll progress, reveals, case-study routing
404.html            styled not-found page
assets/favicon.svg  isometric brick
.nojekyll           serve files as-is, skip Jekyll
```

No build step, no dependencies, no framework. Open `index.html` in a browser and
it works. Push to `main` and GitHub Pages serves it.

## Design notes

The direction is **"node graph in fired clay"** — the page is the network, drawn.

- **Ground** is mortar grey (`#cdc3b4`), not white and not black, with a fine
  grain over it so it reads as printed on chipboard.
- **Clay** (`#b4552f`) is the accent, used as a structural material rather than
  trim. **Slate** (`#3f6d8c`) marks the one thing in the stack that isn't a game
  server: the proxy.
- **Type** is Bricolage Grotesque (display), Familjen Grotesk (body) and
  Martian Mono (labels and data).
- **The signature** is the annotated axonometric in the hero: five bricks, one per
  layer of what actually runs, numbered from the base up. Hover raises a course.
- **Work cards** are laid in running bond — the second course steps half a brick,
  the way a wall is actually built.
- Buttons and cards press down into their own drop shadow instead of glowing.

Motion is one orchestrated moment (the stack settling from the base up) plus quiet
hover states. `prefers-reduced-motion` turns all of it off.

## Editing

Content lives directly in the HTML — there's no CMS and no templating, so a change
is a text edit. Colours and type are CSS custom properties at the top of
`styles.css`; changing `--clay` re-skins the whole site.

To add a write-up: copy an `<article class="bb-case">` block in
`projects/index.html`, give it a new `id`, and link to `projects/#that-id`. The
routing picks it up automatically.

## Custom domain

The site is served from `brick-bread.github.io`. To move `brick-bread.me` here,
remove the `CNAME` file from the `portfolio` repo first (GitHub only allows one
repo to claim a domain), then add a `CNAME` file here containing `brick-bread.me`
and point the DNS at GitHub Pages.
