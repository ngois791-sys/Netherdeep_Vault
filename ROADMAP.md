# The Netherdeep Vault — Site Roadmap

A plain-English map of how this website is built and how every file talks to the
others. Read top to bottom once and you'll be able to edit confidently.

---

## 1. The 30-second mental model

- The site is just a folder of **plain files** (HTML, CSS, JS, images). There is
  **no database and no build step** — what's in the folder *is* the website.
- **GitHub Pages** takes that folder and serves it at your live URL.
- Every page shares the **same look** (one stylesheet) and the **same brain**
  (a few small JavaScript files). You almost never edit those — you mostly add
  or edit content pages.
- One file, **`assets/site-data.js`**, is the "table of contents." It powers
  Search, the Tags page, and the Previous/Next buttons. Keep it up to date and
  the smart features keep working.

---

## 2. How the live site loads (start to finish)

1. Someone opens **`https://ngois791-sys.github.io/Netherdeep_Vault/`**.
2. GitHub Pages serves **`index.html`** automatically (that's the "home" file —
   every web folder's default front door is named `index.html`).
3. The browser reads `index.html` top to bottom. In the `<head>` it sees links
   to the **fonts**, the **favicon** (tab icon), and **`assets/css/style.css`**,
   and loads them.
4. At the bottom it loads the **scripts**: `assets/site-data.js` then
   `assets/site.js` (and `assets/lightbox.js` on pages with zoomable images).
5. The page is now on screen. From here the visitor clicks the **top nav**,
   the **cards**, **tag chips**, **search**, or **Previous/Next** to move around.

So the "spine" of the whole site is: **index.html → nav → everything else**,
and **every page → the shared CSS + JS in `assets/`**.

---

## 3. The `assets/` folder — the shared "brain" and "skin"

These four files are loaded by (almost) every page. Edit one of them and the
change shows up everywhere.

| File | What it is | When you'd touch it |
|---|---|---|
| **`assets/css/style.css`** | The **skin**: all colors, fonts, spacing, and layout for the whole site. | Change colors/fonts/sizes (see §8). |
| **`assets/site-data.js`** | The **table of contents**: one list (`SITE_PAGES`) of every page — its title, address, section, summary, and tags. | Every time you add a new page (see §7). |
| **`assets/site.js`** | The **brain**: builds the live Search results, the Tags page, and the Previous/Next buttons by reading `site-data.js`. | Rarely. It's logic, not content. |
| **`assets/lightbox.js`** | The **image zoomer**: makes maps open in a zoom/pan viewer when clicked. | Rarely. |

Also in `assets/`: `favicon.svg` / `favicon-32.png` / `apple-touch-icon.png`
(the tab/bookmark icon), and `img/` (faction crest images, currently unused).

---

## 4. The anatomy of one page (every HTML file has the same 5 parts)

Open any `.html` file and you'll see the same skeleton. Knowing these five
zones means you can edit any page:

```
1. <head> ............ invisible setup: title, fonts, favicon, link to style.css
2. <header> .......... the top bar: the ◆ logo, the nav menu, the search box
3. <main> ............ THE ONLY PART THAT CHANGES per page — the actual content
4. <footer> .......... the bottom credit line ("A Campaign Companion…")
5. <script> tags ..... loads site-data.js + site.js (+ lightbox.js on map pages)
```

> **The header, footer, and scripts are copied into every file and are basically
> identical.** When you make a new page, the safe move is to **copy an existing
> page of the same type and only change the `<main>` part.**

One important line near the bottom of every page:

```html
<script>var SITE_BASE = "";</script>      <!-- on root pages -->
<script>var SITE_BASE = "../";</script>   <!-- on pages inside a subfolder -->
```

`SITE_BASE` tells the scripts how deep the page is in the folders (see §9 on
relative paths). Root pages use `""`; pages inside `lore/`, `sessions/`,
`characters/` use `"../"`.

---

## 5. The page types (there are only four kinds)

Once you see the pattern, all 26 pages fall into four buckets:

**A. The Home page** — `index.html`
A welcome hero + a grid of cards, one card per section. The front door.

**B. Hub pages** — show a grid of cards that link to sub-pages:
- `lore.html` → links to the pages in the `lore/` folder
- `sessions.html` → links to the pages in the `sessions/` folder
- `characters.html` → links to the pages in the `characters/` folder

**C. Content pages** — the actual writing lives right on the page:
- Inside folders: `lore/introduction.html`, `lore/the-calamity.html`,
  `lore/factions.html`, `lore/locations-of-interest.html`,
  `lore/history-mythology.html`, `lore/visions.html`,
  `sessions/session-03.html` … `session-09.html`,
  `characters/ody.html`, `torden.html`, `sirius.html`, `phoebe.html`
- At the root (reached straight from the nav, no card layer):
  `npcs.html` (the Important People list), `events.html` (Timeline),
  `maps.html` (map gallery), `downloads.html` (download list)

**D. The Tags page** — `tags.html`
Special: it's nearly empty in the file. Its content (the tag cloud and the
"pages with this tag" lists) is **drawn by `site.js`** when the page opens,
using `site-data.js`. You don't hand-edit results here.

---

## 6. How pages connect to each other (six kinds of links)

1. **Top navigation** (the menu bar) — on every page, links to the 8 main
   sections (Lore, Sessions, NPCs, Party, Timeline, Maps, Tags, Downloads).
2. **Cards** — on hub pages, each card is a link to one sub-page.
3. **Back-link** — content pages have a "← Back to Lore" style link at the bottom.
4. **Tag chips** — the little rounded labels link to `tags.html?tag=Xhorhas`,
   which then shows every page that shares that tag.
5. **Previous / Next buttons** — auto-generated by `site.js` to step through the
   pages of the current section in `site-data.js` order.
6. **Search** — the box in the header; `site.js` filters `site-data.js` live.

Links 4, 5, and 6 all run on **`site-data.js`**. That's why it's the heart of
the site.

---

## 7. `site-data.js` — the master list (this is the one you'll edit most)

It's a list called `SITE_PAGES`. Each page is one block:

```js
{
  title:   "Session 5",                      // shown in search, tags, Prev/Next
  url:     "sessions/session-05.html",       // the address, FROM THE SITE ROOT
  section: "Sessions",                       // which group it belongs to
  summary: "Session notes — played Nov 9.",  // one line shown in search results
  tags:    ["Session"]                       // labels for the Tags page
},
```

**To add a new page so it's searchable, taggable, and gets Prev/Next:**
1. Create the HTML file (copy a similar page, edit the `<main>`).
2. Add a block like the one above to `SITE_PAGES`.
3. Put it **in the right spot in the list** — the order of pages *within a
   section* is the order the Previous/Next buttons follow, and should match the
   order they appear on that section's hub page.

Rules of thumb:
- `section: "Section"` is reserved for the **hub/landing pages** — those don't
  get Previous/Next buttons.
- If several entries share the same `url` (like the three Maps entries), they're
  treated as one page for navigation but separate for tag browsing.

---

## 8. `style.css` — changing the look (colors & fonts)

Open `assets/css/style.css`. The very top has a block called `:root` — these are
**named color slots used everywhere**. Change a value here and the whole site
recolors at once:

```css
:root {
  --bg:      #0d0a0b;   /* page background (near-black) */
  --ink:     #e8e6e8;   /* main text (silver-white) */
  --red:     #b3122a;   /* primary accent */
  --red-2:   #e2425a;   /* brighter accent (titles, buttons, separators) */
  --silver:  #c2c6cf;   /* secondary accent (eyebrows, tags) */
  ...
}
```

Fonts are set on the `body` and headings (`h1, h2, h3`) rules a little further
down — currently **EB Garamond** for body text and **Cinzel** for headings.

You don't need to understand the rest of the file to recolor or re-font the
site — those two spots do most of the work.

---

## 9. The one technical gotcha: relative paths

When a page links to another file, the address is **relative to where that page
sits in the folders**:

- A **root** page (e.g. `lore.html`) links to assets as `assets/css/style.css`
  and to other pages as `npcs.html`.
- A page **inside a folder** (e.g. `lore/visions.html`) has to "step up" one
  level first, so it links as `../assets/css/style.css` and `../npcs.html`.
  The `../` means "go up one folder."

This is why every page sets `SITE_BASE` (`""` for root, `"../"` for subfolders) —
the scripts use it to build correct links. **If you copy a page, copy one from
the same folder depth** and the paths will already be right.

---

## 10. "I want to ___" → edit this

| Goal | Do this |
|---|---|
| Add a new Lore page | Copy a file in `lore/`, edit its `<main>`, add a card to `lore.html`, add a block to `site-data.js`. |
| Add a new session | Copy `sessions/session-09.html`, edit it, add a card to `sessions.html`, add a block to `site-data.js`. |
| Fix a typo in a page's text | Edit that one `.html` file's `<main>` section. |
| Change a color or font | Edit the `:root` block (and font rules) in `assets/css/style.css`. |
| Change the menu/nav links | Edit the `<nav class="site-nav">` block — but it's in **every** file, so change them all (or ask me to). |
| Add/rename a tag | Edit the `tags` list in `site-data.js`, and the tag chips in the page's HTML. |
| Change Previous/Next order | Reorder the entries within a section in `site-data.js`. |

---

## 11. Publishing changes

1. Edit files locally.
2. (Optional) Preview locally — there's a dev-server config in
   `.claude/launch.json`; or just double-click an `.html` file to open it.
3. In **GitHub Desktop**: write a summary → **Commit to main** → **Push origin**.
4. GitHub Pages rebuilds in ~1 minute; hard-refresh (`Ctrl+Shift+R`) to see it.

---

## 12. Folder map (what's where)

```
Netherdeep_Vault/
├── index.html .................. HOME (front door)
├── lore.html ................... Hub → lore/*
├── sessions.html ............... Hub → sessions/*
├── characters.html ............. Hub → characters/*  (the "Party" tab)
├── npcs.html ................... Content: Important People list
├── events.html ................. Content: Timeline   (the "Timeline" tab)
├── maps.html ................... Content: map gallery
├── downloads.html .............. Content: download list
├── tags.html ................... Special: filled in by site.js
│
├── lore/ ....................... Lore content pages (6)
├── sessions/ ................... Session pages (session-03 … session-09)
├── characters/ ................. Party member pages (ody, torden, sirius, phoebe)
│
├── assets/
│   ├── css/style.css ........... the look (colors, fonts, layout)
│   ├── site-data.js ............ the table of contents (SITE_PAGES)
│   ├── site.js ................. search + tags + Previous/Next logic
│   ├── lightbox.js ............. image zoom viewer
│   ├── favicon.svg / *.png ..... the tab/bookmark icon
│   └── img/ .................... crest images
│
├── maps/ ....................... map image files
├── downloads/ .................. downloadable files
├── Files to translate/ ........ YOUR source docs (not published; git-ignored)
│   └── Converted/ .............. sources I've already turned into pages
│
├── README.md ................... short project intro
├── ROADMAP.md .................. this file
└── .gitignore / .claude/ ....... housekeeping (safe to ignore)
```

---

### The one sentence to remember

**Add content by copying a similar page and editing its middle (`<main>`), then
register it in `assets/site-data.js`; change the whole site's look from the
`:root` block in `assets/css/style.css`.**
