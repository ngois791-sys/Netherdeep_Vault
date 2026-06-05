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
    title: "Powers of Exandria",
    url: "lore/factions.html",
    section: "Lore",
    summary: "The factions racing for the Netherdeep's secrets — their crests, seats of power, and known agents.",
    tags: ["Factions", "Ank'Harel"]
  },

  // ----- Sessions -----
  {
    title: "Session 1 — The Festival of Merit",
    url: "sessions/session-01-festival.html",
    section: "Sessions",
    summary: "The party meets in Jigow during the festival, wins a strange contest, and dives the Emerald Grotto.",
    tags: ["Session", "Jigow"]
  },

  // ----- NPCs -----
  {
    title: "Maaya Two-Snake",
    url: "npcs/maaya-two-snake.html",
    section: "NPCs",
    summary: "The Jigow tide-broker who pointed the party toward the grotto. Knows more than she lets on.",
    tags: ["NPC", "Jigow"]
  },

  // ----- Party -----
  {
    title: "Vasha Tidemark",
    url: "characters/vasha-tidemark.html",
    section: "Party",
    summary: "A water genasi paladin who hears a drowning voice in her dreams and means to answer it.",
    tags: ["Player Character", "Paladin"]
  },

  // ----- Section pages (so search can find them too; usually no tags) -----
  { title: "Lore & Wiki",     url: "lore.html",       section: "Section", summary: "The gods, the Calamity, and the powers that shape Exandria.",       tags: [] },
  { title: "Session Recaps",  url: "sessions.html",   section: "Section", summary: "The story so far, told one session at a time.",                   tags: [] },
  { title: "NPCs",            url: "npcs.html",        section: "Section", summary: "Everyone the party has met and thought worth remembering.",        tags: [] },
  { title: "The Party",       url: "characters.html",  section: "Section", summary: "The adventurers whose tale this is.",                              tags: [] },
  { title: "Timeline",        url: "events.html",      section: "Section", summary: "The important events, in the order they came to pass.",            tags: [] },
  { title: "Maps & Handouts", url: "maps.html",        section: "Section", summary: "Maps, letters, and other things the party has gathered.",          tags: [] }

];
