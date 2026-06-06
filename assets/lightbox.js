/* ============================================================================
   Lightweight image zoom + pan lightbox for the Netherdeep Vault.
   No dependencies. Click any image inside a .gallery figure (or any link with
   class "zoomable") to open a fullscreen viewer:
     - scroll wheel / pinch  : zoom toward the cursor (or pinch midpoint)
     - drag                  : pan
     - double-click          : zoom in a step (or reset when already zoomed)
     - + / - / Reset buttons , Esc or ✕ to close
   For a higher-resolution zoom image, put it on the link as
     data-zoom-src="maps/whatever-large.jpg"
   otherwise the link's href is used.

   IMPORTANT: zoom is done by setting the image's rendered *width* (which makes
   the browser re-rasterise from the full-resolution source), NOT a CSS
   transform: scale() (which would just upscale the small fitted bitmap and look
   blurry). Panning uses translate(), which is lossless. Zoom is capped at the
   source's native resolution so it never upscales into blur.
   ============================================================================ */
(function () {
  "use strict";

  var MIN = 1, STEP = 1.6;
  var dynMax = 8;          // per-image ceiling (set on load from native resolution)
  var baseW = 0;           // fitted image width at scale 1, in CSS px
  var scale = 1, tx = 0, ty = 0;
  var pointers = {};
  var dragStart = null;
  var pinchStart = null;

  // ---- build the overlay once ----
  var lb = document.createElement("div");
  lb.className = "lb";
  lb.hidden = true;
  lb.innerHTML =
    '<div class="lb-stage" role="dialog" aria-label="Image viewer">' +
      '<img class="lb-img" alt="">' +
    '</div>' +
    '<div class="lb-ctrl">' +
      '<button type="button" data-act="out" aria-label="Zoom out">&minus;</button>' +
      '<button type="button" data-act="reset">Reset</button>' +
      '<button type="button" data-act="in" aria-label="Zoom in">&plus;</button>' +
      '<button type="button" data-act="close" aria-label="Close">&times;</button>' +
    '</div>' +
    '<div class="lb-hint">Scroll or pinch to zoom &middot; drag to pan &middot; double-click to zoom &middot; Esc to close</div>';
  document.body.appendChild(lb);

  var stage = lb.querySelector(".lb-stage");
  var img   = lb.querySelector(".lb-img");

  function clamp(s) { return Math.max(MIN, Math.min(dynMax, s)); }

  function apply() {
    img.style.width = (baseW * scale) + "px";
    img.style.transform = "translate(" + tx + "px," + ty + "px)";
  }

  function reset() { scale = 1; tx = 0; ty = 0; apply(); }

  function open(src, alt) {
    // clear inline sizing so the CSS fit (max-width/height) applies until measured
    img.style.cssText = "";
    img.alt = alt || "";
    img.src = src;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function close() {
    lb.hidden = true;
    img.src = "";
    img.style.cssText = "";
    document.body.style.overflow = "";
    pointers = {}; dragStart = null; pinchStart = null;
  }

  // measure the fitted size and native-resolution cap once the image loads
  img.addEventListener("load", function () {
    // let CSS (max-width:94vw / max-height:92vh) size the image, then measure
    img.style.width = "";
    img.style.maxWidth = "";
    img.style.maxHeight = "";
    img.style.transform = "none";
    var r = img.getBoundingClientRect();
    baseW = r.width;
    var dpr = window.devicePixelRatio || 1;
    if (baseW > 0 && img.naturalWidth > 0) {
      // cap so the rendered width never exceeds the source's real pixels
      // (in device px) — guarantees crisp, never upscaled
      dynMax = Math.max(1, img.naturalWidth / (baseW * dpr));
    } else {
      dynMax = 8;
    }
    // now drive size/position explicitly
    img.style.maxWidth = "none";
    img.style.maxHeight = "none";
    scale = 1; tx = 0; ty = 0;
    apply();
  });

  // zoom toward a screen point, keeping that point stationary
  function zoomAt(px, py, factor) {
    var next = clamp(scale * factor);
    factor = next / scale;
    if (factor === 1) return;
    var r = img.getBoundingClientRect();
    var cx = r.left + r.width / 2;
    var cy = r.top + r.height / 2;
    tx += (px - cx) * (1 - factor);
    ty += (py - cy) * (1 - factor);
    scale = next;
    apply();
  }

  // ---- wheel zoom ----
  stage.addEventListener("wheel", function (e) {
    e.preventDefault();
    var factor = e.deltaY < 0 ? STEP : 1 / STEP;
    if (Math.abs(e.deltaY) < 40) factor = e.deltaY < 0 ? 1.12 : 1 / 1.12; // trackpads
    zoomAt(e.clientX, e.clientY, factor);
  }, { passive: false });

  // ---- pointer drag + pinch ----
  stage.addEventListener("pointerdown", function (e) {
    stage.setPointerCapture(e.pointerId);
    pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(pointers);
    if (ids.length === 1) {
      dragStart = { x: e.clientX, y: e.clientY, tx: tx, ty: ty };
      stage.classList.add("is-pan");
    } else if (ids.length === 2) {
      var a = pointers[ids[0]], b = pointers[ids[1]];
      pinchStart = { dist: Math.hypot(a.x - b.x, a.y - b.y), cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
      dragStart = null;
    }
  });

  stage.addEventListener("pointermove", function (e) {
    if (!pointers[e.pointerId]) return;
    pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(pointers);
    if (ids.length === 2 && pinchStart) {
      var a = pointers[ids[0]], b = pointers[ids[1]];
      var dist = Math.hypot(a.x - b.x, a.y - b.y);
      zoomAt(pinchStart.cx, pinchStart.cy, dist / pinchStart.dist);
      pinchStart.dist = dist;
    } else if (dragStart) {
      tx = dragStart.tx + (e.clientX - dragStart.x);
      ty = dragStart.ty + (e.clientY - dragStart.y);
      apply();
    }
  });

  function endPointer(e) {
    delete pointers[e.pointerId];
    var ids = Object.keys(pointers);
    if (ids.length < 2) pinchStart = null;
    if (ids.length === 0) { dragStart = null; stage.classList.remove("is-pan"); }
    else if (ids.length === 1) {
      var p = pointers[ids[0]];
      dragStart = { x: p.x, y: p.y, tx: tx, ty: ty };
    }
  }
  stage.addEventListener("pointerup", endPointer);
  stage.addEventListener("pointercancel", endPointer);

  // ---- double-click to step zoom / reset ----
  stage.addEventListener("dblclick", function (e) {
    e.preventDefault();
    if (scale > 1.05) reset();
    else zoomAt(e.clientX, e.clientY, STEP * 1.5);
  });

  // ---- click background to close (only when not zoomed) ----
  stage.addEventListener("click", function (e) {
    if (e.target === img) return;
    if (scale > 1.02) return;
    close();
  });

  // ---- control buttons ----
  lb.querySelector(".lb-ctrl").addEventListener("click", function (e) {
    var act = e.target.getAttribute("data-act");
    if (!act) return;
    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    if (act === "in")  zoomAt(mx, my, STEP);
    if (act === "out") zoomAt(mx, my, 1 / STEP);
    if (act === "reset") reset();
    if (act === "close") close();
  });

  // ---- keyboard ----
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "+" || e.key === "=") zoomAt(innerWidth / 2, innerHeight / 2, STEP);
    if (e.key === "-" || e.key === "_") zoomAt(innerWidth / 2, innerHeight / 2, 1 / STEP);
    if (e.key === "0") reset();
  });

  // ---- wire up image links (".gallery figure > a" = the image link only, NOT
  //      the tag chips inside the caption) ----
  function wire(a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var src = a.getAttribute("data-zoom-src") || a.getAttribute("href");
      var im = a.querySelector("img");
      open(src, im ? im.getAttribute("alt") : "");
    });
  }
  document.querySelectorAll(".gallery figure > a, a.zoomable").forEach(wire);
})();
