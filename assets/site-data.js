// ============================================================================
//  SITE INDEX  —  this makes Search and Tags work.
//
//  Every page that should be searchable / taggable needs ONE entry below.
//  When you add a new page, copy a block and fill it in. Fields:
//    title:   what shows in search results and tag lists
//    url:     the path FROM THE SITE ROOT (no leading slash), e.g. "npcs/maaya-two-snake.html"
//    section: which part of the site it belongs to (shown as a small label)
//    summary: one short sentence
//    tags:    a list of tags in [square brackets], e.g. ["NPC", "Jigow"]
//
//  Tags can be any words you like. Pages that share a tag are grouped together
//  on the Tags page automatically.
// ============================================================================

const SITE_PAGES = [

  // ----- Lore -----
  {
    title: "An Introduction to Exandria",
    url: "lore/introduction.html",
    section: "Lore",
    summary: "The gods, the Calamity, and the drowned prison beneath the sea that gives our campaign its name.",
    tags: ["History", "Exandria"]
  },
  {
    title: "The Calamity & the Apotheon",
    url: "lore/the-calamity.html",
    section: "Lore",
    summary: "The war that broke the world, and the mortal hero whose fall left a wound in the deep.",
    tags: ["History", "The Netherdeep"]
  },
  {
    title: "Important Factions",
    url: "lore/factions.html",
    section: "Lore",
    summary: "The powers and groups shaping the party's journey — the Kryn Dynasty, the Luxon, the Cobalt Soul, and more.",
    tags: ["Factions", "Allegiance of Allsight", "Aloysia", "Bazzoxan", "Consortium of the Vermillion Dream", "Dermot Wurder", "Kryn Dynasty", "Luxon", "Marquet", "Prolix", "Question", "Rosohna", "Strange Mineral", "Verin Theyless"]
  },
  {
    title: "Locations of Interest",
    url: "lore/locations-of-interest.html",
    section: "Lore",
    summary: "A gazetteer of notable places across Xhorhas — Jigow, the Wastes, Barbed Fields, Bazzoxan, and Rosohna.",
    tags: ["Xhorhas", "Kryn Dynasty", "Luxon", "Calamity", "Betrayer Gods", "Rosohna", "Bazzoxan", "Aurora Watch", "Verin Theyless", "Bright Queen"]
  },
  {
    title: "Xhorhas History & Mythology",
    url: "lore/history-mythology.html",
    section: "Lore",
    summary: "The making of Exandria — the Prime Deities and Betrayer Gods, the Calamity, the Divergence, and the divine relics and moons tied to them.",
    tags: ["Prime Deities", "Betrayer Gods", "Calamity", "Divergence", "Wastes of Xhorhas", "Barbed Fields", "Bazzoxan", "Luxon", "Exandria's Moons", "Alyxian", "Jewel of Three Prayers", "Perigee", "Sehanine"]
  },
  {
    title: "Visions & Dreams",
    url: "lore/visions.html",
    section: "Lore",
    summary: "The party's visions and dreams — Alyxian's pleas from the deep, the shared nightmares, and the fall of the winged champion Perigee.",
    tags: ["Visions", "Alyxian", "Perigee", "Sehanine", "Jewel of Three Prayers", "Bazzoxan", "Ruidus"]
  },

  // ----- Sessions (newest first, to match the Sessions index page) -----
  //   NOTE: the order of pages WITHIN a section here also drives the
  //   "‹ Previous / Next ›" buttons, so keep each section in the same order
  //   its index page lists them.
  { title: "Session 9", url: "sessions/session-09.html", section: "Sessions", summary: "Session notes — played May 17, 2026.",      tags: ["Session"] },
  { title: "Session 8", url: "sessions/session-08.html", section: "Sessions", summary: "Session notes — played April 19, 2026.",    tags: ["Session"] },
  { title: "Session 7", url: "sessions/session-07.html", section: "Sessions", summary: "Session notes — played February 22, 2026.", tags: ["Session"] },
  { title: "Session 6", url: "sessions/session-06.html", section: "Sessions", summary: "Session notes — played January 25, 2026.",  tags: ["Session"] },
  { title: "Session 5", url: "sessions/session-05.html", section: "Sessions", summary: "Session notes — played November 9, 2025.",  tags: ["Session"] },
  { title: "Session 4", url: "sessions/session-04.html", section: "Sessions", summary: "Session notes — played May 11, 2025.",      tags: ["Session"] },
  { title: "Session 3", url: "sessions/session-03.html", section: "Sessions", summary: "Session notes — played April 13, 2025.",    tags: ["Session"] },

  // ----- NPCs -----
  {
    title: "Important People",
    url: "npcs.html",
    section: "NPCs",
    summary: "Everyone the party has met and thought worth remembering — allies, rivals, and the rest.",
    tags: ["Allegiance of Allsight", "Aloysia", "Alyxian", "Ayo Jabe", "Bazzoxan", "Consortium of the Vermillion Dream", "Dermot Wurder", "Galsariad Ardyth", "Jewel of Three Prayers", "Jigow", "Kryn Dynasty", "Library of the Cobalt Soul", "Luxon", "Maggie Keeneyes", "Prime Deities", "Prolix", "Rosohna", "Strange Mineral", "Visions"]
  },

  // ----- Party -----
  { title: "Ody",    url: "characters/ody.html",    section: "Party", summary: "Party member.", tags: ["Player Character"] },
  { title: "Torden", url: "characters/torden.html", section: "Party", summary: "Party member.", tags: ["Player Character"] },
  { title: "Sirius", url: "characters/sirius.html", section: "Party", summary: "Party member.", tags: ["Player Character"] },
  { title: "Phoebe", url: "characters/phoebe.html", section: "Party", summary: "Party member.", tags: ["Player Character"] },

  // ----- Maps (point at the Maps page; tags make them browsable) -----
  {
    title: "The Known Realms of Exandria",
    url: "maps.html",
    section: "Maps",
    summary: "The full world map — Wildemount, Marquet, and the continents beyond.",
    tags: ["Exandria"]
  },
  {
    title: "The Continent of Wildemount",
    url: "maps.html",
    section: "Maps",
    summary: "The eastern continent where the campaign begins, from the Menagerie Coast to the Emerald Gulch.",
    tags: ["Xhorhas", "Jigow", "Bazzoxan", "Rosohna"]
  },
  {
    title: "Wildemount — The Xhorhas Region",
    url: "maps.html",
    section: "Maps",
    summary: "A close map of Xhorhas and the Emerald Gulch: Jigow, Bazzoxan, and Rosohna.",
    tags: ["Jigow", "Bazzoxan", "Rosohna"]
  },

  // ----- Section pages (so search can find them too; usually no tags) -----
  { title: "Lore & Wiki",     url: "lore.html",       section: "Section", summary: "The gods, the Calamity, and the powers that shape Exandria.",       tags: [] },
  { title: "Session Recaps",  url: "sessions.html",   section: "Section", summary: "The story so far, told one session at a time.",                   tags: [] },
  { title: "The Party",       url: "characters.html",  section: "Section", summary: "The adventurers whose tale this is.",                              tags: [] },
  { title: "Timeline",        url: "events.html",      section: "Section", summary: "The important events, in the order they came to pass.",            tags: [] },
  { title: "Maps & Handouts", url: "maps.html",        section: "Section", summary: "Maps, letters, and other things the party has gathered.",          tags: [] },
  { title: "Downloads",       url: "downloads.html",   section: "Section", summary: "Maps, character sheets, and handouts to save or print.",            tags: [] }

];
