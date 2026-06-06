## What changed

### Maps
- Added three real campaign maps (converted from the source Word doc + the linked World Anvil map): **The Known Realms of Exandria**, **The Continent of Wildemount**, and **Wildemount — The Xhorhas Region**.
- Each map has a short description and clickable **tag chips**.
- Images were **compressed** (~26 MB → ~2.4 MB on the page) so the gallery loads fast.
- New dependency-free **zoom/pan lightbox** (`assets/lightbox.js`): click a map for a fullscreen viewer with scroll/pinch zoom, drag-to-pan, double-click, and `+/−/Reset` controls. Zoom renders from a high-resolution source and is capped at native resolution, so deep zoom stays crisp instead of blurring.

### Lore
- **Locations of Interest** (`lore/locations-of-interest.html`) — a Xhorhas gazetteer: Jigow, Wastes of Xhorhas, Barbed Fields, Bazzoxan, Rosohna.
- **Xhorhas History & Mythology** (`lore/history-mythology.html`) — the Creator gods, the Calamity, the Divergence, the nine Betrayer Gods (with symbols), the Prime Deities, Vestiges of Divergence, and the twin moons.
- Both are linked from the Lore index and registered in `assets/site-data.js` for search and the Tags browser, with per-section tag chips.

### Housekeeping
- `.gitignore` now excludes the local `Files to translate/` source folder (Word docs / saved pages stay local, never published).

## Why
Replaces the placeholder map with the campaign's real maps and adds the first batch of converted lore, improving navigation and discoverability via tags/search.

## Reviewer notes
- All content is converted from the GM's source docs; some in-text placeholders (e.g. "session #X") are intentionally preserved to be filled in later.
- Static site, no build step — open `index.html` or serve the folder.
- New tags cross-link existing content (e.g. **Bazzoxan** now ties together both Lore pages and both region maps).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
