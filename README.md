# Call of the Netherdeep Vault

A static campaign-companion website for a *Call of the Netherdeep* tabletop game.
No build step, no server, no dependencies — just HTML, one CSS file, and a little
vanilla JavaScript. Open `index.html` in a browser, or host the whole folder on
any static host (GitHub Pages, Netlify, etc.).

## What's here

```
index.html              Landing page (hero + section cards)
lore.html               Lore section index
sessions.html           Session recaps index
npcs.html               NPC index
characters.html         The Party index
events.html             Timeline (edit directly)
maps.html               Maps & handouts gallery
tags.html               Tag browser (auto-generated)

lore/                   Individual lore entries
sessions/               Individual session write-ups
npcs/                   Individual NPC pages
characters/             Individual party-member pages
maps/                   Map / handout images (a sample SVG is included)

assets/css/style.css    The whole theme. Colors live in the :root block at the top.
assets/site.js          Search dropdown + Tags page logic. You won't normally edit this.
assets/site-data.js     The search/tag INDEX. Add one entry per page (see below).
assets/img/             Faction crests for the Powers of Exandria page.
```

## How to add content

1. **Copy an existing page** of the same kind (e.g. duplicate
   `npcs/maaya-two-snake.html`) and rewrite the content. The header, footer, and
   script tags are identical on every page — leave them alone.
2. **Link it** from the matching section index by copying one `<a class="card">`
   block (or, on the timeline/maps pages, one `<li>` / `<figure>` block).
3. **Register it for search & tags** by adding one entry to the `SITE_PAGES`
   array in `assets/site-data.js`. That's what powers the search box and the
   Tags page.

> Pages one folder deep (like `npcs/…`) link to assets with `../` and set
> `var SITE_BASE = "../";` near the bottom. Root-level pages use `""`. If you
> copy a page into the right folder, this is already correct.

## Recoloring

Every color is a CSS variable at the top of `assets/css/style.css`:

- `--red` / `--red-2` — the primary blood-red accent (titles, buttons, borders)
- `--silver` — the secondary accent (eyebrows, tags, the "now" timeline marker)
- `--bg` / `--bg-2` / `--bg-3` — the black backgrounds and panels

Change those and the whole site recolors at once.

## Notes

- The map and faction crests in `maps/` and `assets/img/` are **placeholder
  SVGs** — swap in your own images whenever you like.
- All page content is **sample text** based on the published adventure, meant to
  show the format. Overwrite it with your table's own story.
