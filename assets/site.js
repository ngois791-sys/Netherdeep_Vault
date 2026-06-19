/* ============================================================================
   Search dropdown + Tags page logic for the Call of the Netherdeep Vault.
   Pure vanilla JS, no build step. Reads SITE_PAGES from site-data.js and
   SITE_BASE (set per page: "" on root pages, "../" one folder deep).
   ============================================================================ */
(function () {
  "use strict";

  var BASE  = (typeof SITE_BASE === "string") ? SITE_BASE : "";
  var PAGES = (typeof SITE_PAGES !== "undefined") ? SITE_PAGES : [];

  function norm(s) { return (s == null ? "" : String(s)).toLowerCase(); }

  function escapeHtml(s) {
    return (s == null ? "" : String(s)).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function byTitle(a, b) { return a.title.localeCompare(b.title); }

  /* ---------------- Live search dropdown ---------------- */
  var input = document.getElementById("site-search");
  var box   = document.getElementById("search-results");

  if (input && box) {
    function hide() { box.hidden = true; box.innerHTML = ""; }

    function run(q) {
      q = norm(q).trim();
      if (!q) { hide(); return; }
      var terms = q.split(/\s+/);
      var matches = PAGES.filter(function (p) {
        var hay = norm(p.title) + " " + norm(p.summary) + " " +
                  norm(p.section) + " " + norm((p.tags || []).join(" "));
        return terms.every(function (t) { return hay.indexOf(t) !== -1; });
      }).sort(byTitle).slice(0, 8);

      if (!matches.length) {
        box.innerHTML = '<span class="sr-empty">No matches.</span>';
        box.hidden = false;
        return;
      }
      box.innerHTML = matches.map(function (p) {
        return '<a href="' + BASE + escapeHtml(p.url) + '">' +
                 '<span class="sr-title">' + escapeHtml(p.title) + '</span>' +
                 (p.section ? '<span class="sr-section">' + escapeHtml(p.section) + '</span>' : '') +
               '</a>';
      }).join("");
      box.hidden = false;
    }

    input.addEventListener("input", function () { run(input.value); });
    input.addEventListener("focus", function () { if (input.value) run(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { hide(); input.blur(); }
      if (e.key === "Enter") {
        var first = box.querySelector("a");
        if (first) { window.location.href = first.getAttribute("href"); }
      }
    });
    document.addEventListener("click", function (e) {
      if (e.target !== input && !box.contains(e.target)) { hide(); }
    });
  }

  /* ---------------- Tags page ---------------- */
  var tagRoot = document.getElementById("tags-root");
  if (tagRoot) {
    var tag = null;
    try { tag = new URLSearchParams(window.location.search).get("tag"); } catch (e) {}

    if (tag) {
      var matches = PAGES.filter(function (p) {
        return (p.tags || []).some(function (t) { return norm(t) === norm(tag); });
      }).sort(byTitle);

      var head = '<div class="section-head">' +
        '<p class="eyebrow"><a href="' + BASE + 'tags.html">Tags</a> &middot; ' + escapeHtml(tag) + '</p>' +
        '<h1>Tagged &ldquo;' + escapeHtml(tag) + '&rdquo;</h1>' +
        '<p>' + matches.length + ' page' + (matches.length === 1 ? '' : 's') + ', in alphabetical order.</p></div>';

      var body;
      if (!matches.length) {
        body = '<p class="muted">No pages have this tag yet.</p>';
      } else {
        body = '<div class="grid">' + matches.map(function (p) {
          return '<a class="card" href="' + BASE + escapeHtml(p.url) + '">' +
                   (p.section ? '<p class="eyebrow">' + escapeHtml(p.section) + '</p>' : '') +
                   '<h3>' + escapeHtml(p.title) + '</h3>' +
                   (p.summary ? '<p>' + escapeHtml(p.summary) + '</p>' : '') +
                 '</a>';
        }).join("") + '</div>';
      }
      tagRoot.innerHTML = head + body;
      document.title = tag + " · Tags · Call of the Netherdeep Vault";

    } else {
      var counts = {};
      PAGES.forEach(function (p) {
        (p.tags || []).forEach(function (t) { counts[t] = (counts[t] || 0) + 1; });
      });
      var names = Object.keys(counts).sort(function (a, b) { return a.localeCompare(b); });

      var header = '<div class="section-head"><p class="eyebrow">Index</p><h1>Tags</h1>' +
        '<p>Browse the Vault by tag. Pick one to see every page that shares it.</p></div>';

      var cloud;
      if (!names.length) {
        cloud = '<p class="muted">No tags yet. Add some in <code>assets/site-data.js</code>.</p>';
      } else {
        cloud = '<div class="tag-cloud">' + names.map(function (t) {
          return '<a class="tag" href="' + BASE + 'tags.html?tag=' + encodeURIComponent(t) + '">' +
                   escapeHtml(t) + ' <span class="tag-count">' + counts[t] + '</span></a>';
        }).join("") + '</div>';
      }
      tagRoot.innerHTML = header + cloud;
    }
  }

  /* ---------------- Previous / Next pager ----------------
     Auto-built from SITE_PAGES: steps through the pages of the CURRENT
     section in the order they're listed. Shown only on multi-page content
     pages — hidden on hub/index pages (section "Section"), the home page,
     and single-page sections. Add a page to SITE_PAGES and it gets
     Previous/Next for free, no per-page wiring. */
  (function () {
    var main = document.querySelector("main.site-main");
    if (!main || !PAGES.length) return;

    // current page's site-root-relative URL, derived from SITE_BASE depth
    var depth = (BASE.match(/\.\.\//g) || []).length;
    var parts = window.location.pathname.split("/").filter(Boolean);
    if (!parts.length) return;                          // home served as "/"
    var curUrl = parts.slice(parts.length - (depth + 1)).join("/");

    var hits = PAGES.filter(function (p) { return p.url === curUrl; });
    if (!hits.length) return;                           // page not in the index
    var cur = null;
    for (var h = 0; h < hits.length; h++) {
      if (hits[h].section !== "Section") { cur = hits[h]; break; }
    }
    if (!cur) return;                                   // a hub / index page

    // ordered, de-duplicated list of this section's pages
    var seen = {}, list = [];
    PAGES.forEach(function (p) {
      if (p.section !== cur.section || seen[p.url]) return;
      seen[p.url] = true; list.push(p);
    });
    if (list.length < 2) return;                        // single-page section

    var i = -1;
    for (var k = 0; k < list.length; k++) {
      if (list[k].url === cur.url) { i = k; break; }
    }
    if (i === -1) return;
    var prev = i > 0 ? list[i - 1] : null;
    var next = i < list.length - 1 ? list[i + 1] : null;
    if (!prev && !next) return;

    function slot(side, page, dir) {
      if (!page) return '<div class="pg-slot pg-' + side + '"></div>';
      return '<div class="pg-slot pg-' + side + '">' +
               '<a href="' + BASE + escapeHtml(page.url) + '">' +
                 '<span class="pg-dir">' + dir + '</span>' +
                 '<span class="pg-title">' + escapeHtml(page.title) + '</span>' +
               '</a></div>';
    }

    var nav = document.createElement("nav");
    nav.className = "pager";
    nav.setAttribute("aria-label", "Previous and next page");
    nav.innerHTML = slot("left", prev, "‹ Previous") +
                    slot("right", next, "Next ›");
    main.appendChild(nav);
  })();
})();
