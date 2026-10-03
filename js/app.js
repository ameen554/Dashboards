/* ==========================================================
   app.js - builds the category tabs and dashboard grid from
   window.DASHBOARDS (js/data.js). No libraries needed.
   ========================================================== */
(function () {
  "use strict";

  var all = window.DASHBOARDS || [];
  var $ = function (id) { return document.getElementById(id); };
  var tabsEl = $("tabs"), gridEl = $("grid"), searchEl = $("search");

  /* Tabs: "All" first, then each category in the order it first appears */
  var cats = ["All"].concat(all.map(function (d) { return d.category; })
    .filter(function (c, i, a) { return a.indexOf(c) === i; }));

  var shown = all; /* dashboards currently on screen, in order (the preview arrows move through these) */
  var state = { tab: decodeURIComponent(location.hash.slice(1)) || "All", q: "" };
  if (cats.indexOf(state.tab) < 0) state.tab = "All";

  /* Escape text so file names/descriptions can never break the markup */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Default preview when a dashboard has no image: a small bar chart icon */
  var PLACEHOLDER = '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="26" width="8" height="16" rx="2" fill="currentColor" opacity=".55"/><rect x="20" y="14" width="8" height="28" rx="2" fill="currentColor"/><rect x="34" y="20" width="8" height="22" rx="2" fill="currentColor" opacity=".75"/></svg>';

  function renderTabs() {
    tabsEl.innerHTML = cats.map(function (c) {
      return '<button class="tab' + (c === state.tab ? " active" : "") + '" data-tab="' + esc(c) + '">' + esc(c) + "</button>";
    }).join("");
    var a = tabsEl.querySelector(".active");
    if (a && a.scrollIntoView && !matchMedia("(max-width: 700px)").matches) a.scrollIntoView({ inline: "center", block: "nearest" });
  }

  /* Preview picture: assets/previews/<Excel file name>.png (then .jpg, .webp).
     Add an "image" field in data.js only to point somewhere else. */
  var EXTS = ["png", "jpg", "webp"];
  function previewSrc(d, n) {
    if (d.image) return d.image;
    return "assets/previews/" + d.file.split("/").pop().replace(/\.[^.]+$/, "") + "." + EXTS[n];
  }

  function card(d) {
    return '<article class="card" data-idx="' + all.indexOf(d) + '"><div class="thumb"><img src="' + esc(encodeURI(previewSrc(d, 0))) + '" alt="" loading="lazy"></div><div class="info">' +
      '<span class="cat">' + esc(d.category) + "</span><h3>" + esc(d.title) + "</h3>" +
      (d.description ? '<p class="desc">' + esc(d.description) + "</p>" : "") +
      (d.updated ? '<span class="upd">Updated ' + esc(d.updated) + "</span>" : "") +
      '<a class="dl" href="' + esc(encodeURI(d.file)) + '" download>Download</a></div></article>';
  }

  function renderGrid() {
    var q = state.q.toLowerCase();
    var list = all.filter(function (d) {
      var inTab = state.tab === "All" || d.category === state.tab;
      var hit = !q || (d.title + " " + d.category + " " + (d.description || "")).toLowerCase().indexOf(q) >= 0;
      return inTab && hit;
    });
    shown = list;
    gridEl.innerHTML = list.length ? list.map(card).join("") :
      '<p class="empty">No dashboards match. Try another word or tab.</p>';
  }

  function render() { renderTabs(); renderGrid(); }

  /* Events */
  tabsEl.addEventListener("click", function (e) {
    var b = e.target.closest(".tab");
    if (!b) return;
    state.tab = b.dataset.tab;
    setMenu(false); /* closes the menu on phones */
    location.hash = encodeURIComponent(state.tab); /* makes each tab linkable */
  });
  window.addEventListener("hashchange", function () {
    var t = decodeURIComponent(location.hash.slice(1)) || "All";
    state.tab = cats.indexOf(t) < 0 ? "All" : t;
    render();
    window.scrollTo(0, 0);
  });
  searchEl.addEventListener("input", function () { state.q = searchEl.value.trim(); renderGrid(); });

  /* Menu (nine-dot button) and theme switch. Theme follows the device until the
     switch is used, then the choice is remembered. */
  var root = document.documentElement, themeBtn = $("theme"), menuBtn = $("menu-btn"), menu = $("menu");
  function isDark() { return root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; }
  function syncTheme() { themeBtn.setAttribute("aria-checked", String(isDark())); }
  function setMenu(open) { menu.hidden = !open; menuBtn.setAttribute("aria-expanded", String(open)); }

  try { var saved = localStorage.getItem("theme"); if (saved) root.dataset.theme = saved; } catch (e) {}
  themeBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncTheme();
  });
  menuBtn.addEventListener("click", function (e) { e.stopPropagation(); setMenu(menu.hidden); });
  document.addEventListener("click", function (e) { if (!menu.contains(e.target)) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setMenu(false); if (document.body.classList.contains("searching")) setSearch(false); } });
  syncTheme();

  /* Phones (700px and under): category tabs move from the header into the menu */
  var bar = document.querySelector(".bar"), menuTabs = $("menu-tabs"), phone = matchMedia("(max-width: 700px)");
  function placeTabs() {
    if (phone.matches) menuTabs.appendChild(tabsEl);
    else bar.insertBefore(tabsEl, $("search-wrap"));
  }
  if (phone.addEventListener) phone.addEventListener("change", placeTabs); else phone.addListener(placeTabs);
  placeTabs();

  /* Phones: the magnifier opens a full-width search field; closing it clears the search */
  function setSearch(open) {
    document.body.classList.toggle("searching", open);
    if (open) { searchEl.focus(); }
    else { searchEl.value = ""; state.q = ""; renderGrid(); }
  }
  $("search-btn").addEventListener("click", function () { setSearch(true); });
  $("search-close").addEventListener("click", function () { setSearch(false); });
  searchEl.addEventListener("keydown", function (e) { if (e.key === "Enter") searchEl.blur(); }); /* hides the phone keyboard */

  /* Footer: one link per category */
  $("foot-cats").insertAdjacentHTML("beforeend", cats.map(function (c) {
    return '<a href="#' + encodeURIComponent(c) + '">' + esc(c) + "</a>";
  }).join(""));

  /* Previews: try the next file type if one is missing, else show the chart icon */
  gridEl.addEventListener("error", function (e) {
    var img = e.target;
    if (img.tagName !== "IMG") return;
    var box = img.parentNode, d = all[+box.parentNode.dataset.idx], n = (+img.dataset.n || 0) + 1;
    if (!d.image && n < EXTS.length) { img.dataset.n = n; img.src = encodeURI(previewSrc(d, n)); }
    else box.innerHTML = PLACEHOLDER;
  }, true);
  /* A loaded preview becomes tappable (opens the large view) */
  gridEl.addEventListener("load", function (e) {
    var img = e.target;
    if (img.tagName !== "IMG") return;
    var box = img.parentNode;
    box.classList.add("has-img"); box.tabIndex = 0;
    box.setAttribute("role", "button"); box.setAttribute("aria-label", "Enlarge preview");
  }, true);

  /* Large preview with previous / next */
  var dlg = $("preview"), big = $("preview-img"), stage = $("preview-stage"), cur = 0, tries = 0;
  $("preview-empty").innerHTML = PLACEHOLDER + "<span>No preview yet</span>";

  function loadBig() { big.src = encodeURI(previewSrc(all[cur], tries)); }
  function showPreview(idx) {
    var d = all[idx], many = shown.length > 1;
    cur = idx; tries = 0;
    stage.classList.remove("no-img");
    big.alt = "Preview of " + d.title;
    $("preview-title").textContent = d.title;
    $("preview-dl").href = encodeURI(d.file);
    $("preview-prev").hidden = $("preview-next").hidden = !many;
    loadBig();
  }
  big.addEventListener("error", function () {
    if (!big.getAttribute("src")) return;
    if (!all[cur].image && ++tries < EXTS.length) loadBig();
    else { big.removeAttribute("src"); stage.classList.add("no-img"); }
  });
  function step(dir) {            /* wraps around at both ends */
    var n = shown.length, pos = shown.indexOf(all[cur]);
    if (n > 1) showPreview(all.indexOf(shown[(pos + dir + n) % n]));
  }
  function openPreview(box) { showPreview(+box.parentNode.dataset.idx); dlg.showModal(); }
  $("preview-prev").addEventListener("click", function () { step(-1); });
  $("preview-next").addEventListener("click", function () { step(1); });
  document.addEventListener("keydown", function (e) {
    if (!dlg.open) return;
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  });
  gridEl.addEventListener("click", function (e) { var b = e.target.closest(".thumb.has-img"); if (b) openPreview(b); });
  gridEl.addEventListener("keydown", function (e) {
    var b = e.target.closest && e.target.closest(".thumb.has-img");
    if (b && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openPreview(b); }
  });
  $("preview-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); }); /* click outside closes */

  $("year").textContent = new Date().getFullYear();
  render();
})();
