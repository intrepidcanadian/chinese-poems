/* A Chinese Poem a Day — app logic
   - Deterministic "poem of the day" from POEMS based on the date, so the poem
     rotates daily and is the same for everyone on a given date.
   - Sticky controls; supplementary content behind tabs to keep the page short.
   - Preferences (pinyin / English / active tab / theme) persist in localStorage.
   - Swipe left/right on touch devices to move between days.
   - Tap any character for its individual meaning. */

(function () {
  "use strict";

  const root = document.getElementById("poemRoot");
  const dateLabel = document.getElementById("dateLabel");
  const charPop = document.getElementById("charPop");

  const EPOCH = Date.UTC(2024, 0, 1); // stable rotation anchor
  const DAY_MS = 24 * 60 * 60 * 1000;
  const PREF_KEY = "cp_prefs_v1";

  // ---- Preferences ----
  const prefs = loadPrefs();
  let activeTab = prefs.tab || "trans";
  let viewDate = new Date();

  function loadPrefs() {
    let p = {};
    try { p = JSON.parse(localStorage.getItem(PREF_KEY)) || {}; } catch (e) { p = {}; }
    if (typeof p.pinyin !== "boolean") p.pinyin = true;
    if (typeof p.trans !== "boolean") p.trans = true;
    if (p.mode !== "poems" && p.mode !== "plaques") p.mode = "poems";
    if (!p.theme) {
      p.theme = (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
    }
    return p;
  }
  function savePrefs() {
    prefs.tab = activeTab;
    try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch (e) { /* ignore */ }
  }

  // ---- Active dataset (poems vs. door-plaque blessings) ----
  function activeSet() { return prefs.mode === "plaques" ? PLAQUES : POEMS; }
  function defaultTab() { return prefs.mode === "plaques" ? "meaning" : "trans"; }

  // ---- Helpers ----
  function dayNumber(date) {
    const local = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    return Math.floor((local - EPOCH) / DAY_MS);
  }
  function indexForDay(dayNum, set) {
    const n = set.length;
    return ((dayNum % n) + n) % n;
  }
  function fmtDate(d) {
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function renderLineHanzi(line) {
    return line.chars.map(ch =>
      `<span class="hz" data-c="${esc(ch.c)}" data-p="${esc(ch.p)}" data-m="${esc(ch.m)}">${esc(ch.c)}</span>`
    ).join("");
  }

  // ---- Render ----
  function render() {
    const set = activeSet();
    const dayNum = dayNumber(viewDate);
    const item = set[indexForDay(dayNum, set)];

    const today = dayNumber(new Date());
    let prefix = "";
    if (dayNum === today) prefix = "Today · ";
    else if (dayNum === today - 1) prefix = "Yesterday · ";
    else if (dayNum === today + 1) prefix = "Tomorrow · ";
    dateLabel.textContent = prefix + fmtDate(viewDate);

    if (prefs.mode === "plaques") renderPlaque(item);
    else renderPoem(item);

    setTab(activeTab, false);
    hidePop();
  }

  function charCellsHtml(chars) {
    return chars.map(ch => `
      <div class="char-cell" data-c="${esc(ch.c)}" data-p="${esc(ch.p)}" data-m="${esc(ch.m)}">
        <span class="cc-char">${esc(ch.c)}</span>
        <span class="cc-body">
          <span class="cc-pinyin">${esc(ch.p)}</span>
          <span class="cc-meaning">${esc(ch.m)}</span>
        </span>
      </div>`).join("");
  }

  function renderPoem(poem) {
    const linesHtml = poem.lines.map(line => `
      <div class="line">
        <div class="line-hanzi">${renderLineHanzi(line)}</div>
        <div class="line-pinyin">${esc(line.pinyin)}</div>
        <div class="line-trans">${esc(line.translation)}</div>
      </div>`).join("");

    const seen = new Set();
    const uniqueChars = poem.lines.flatMap(l => l.chars).filter(ch => {
      if (seen.has(ch.c)) return false;
      seen.add(ch.c);
      return true;
    });
    const charCells = charCellsHtml(uniqueChars);

    root.innerHTML = `
      <div class="poem-head">
        <div class="poem-title-zh">${esc(poem.titleHanzi)}</div>
        <div class="poem-title-en">${esc(poem.title)} · ${esc(poem.titlePinyin)}</div>
        <div class="poem-meta">
          <span class="author-zh">${esc(poem.authorHanzi)}</span> ${esc(poem.author)}
          <span class="dot">●</span> ${esc(poem.dynasty)}
        </div>
      </div>

      <div class="lines">${linesHtml}</div>

      <div class="tabs" role="tablist">
        <button class="tab" data-tab="trans" role="tab">Translation</button>
        <button class="tab" data-tab="note" role="tab">Interpretation</button>
        <button class="tab" data-tab="chars" role="tab">Characters</button>
        <button class="tab" data-tab="source" role="tab">Source</button>
      </div>

      <div class="tab-panel trans" data-panel="trans">
        <p>${esc(poem.translation)}</p>
      </div>
      <div class="tab-panel note" data-panel="note" hidden>
        <p>${esc(poem.note)}</p>
      </div>
      <div class="tab-panel chars" data-panel="chars" hidden>
        <div class="char-grid">${charCells}</div>
      </div>
      <div class="tab-panel source" data-panel="source" hidden>
        <p class="source-line">
          <span class="lbl">Source</span>
          <span class="src-zh">${esc(poem.source)}</span><br>
          ${esc(poem.authorHanzi)} ${esc(poem.author)} · ${esc(poem.dynasty)}
        </p>
      </div>
    `;
  }

  function renderPlaque(p) {
    const phraseChars = p.chars.map(ch =>
      `<span class="hz" data-c="${esc(ch.c)}" data-p="${esc(ch.p)}" data-m="${esc(ch.m)}">${esc(ch.c)}</span>`
    ).join("");
    const charCells = charCellsHtml(p.chars);

    root.innerHTML = `
      <div class="plaque-board">
        <div class="plaque-hang" aria-hidden="true"></div>
        <div class="plaque-phrase">${phraseChars}</div>
        <div class="plaque-pinyin line-pinyin">${esc(p.pinyin)}</div>
      </div>

      <div class="poem-head plaque-head">
        <div class="poem-title-en">${esc(p.title)}</div>
        <div class="poem-meta"><span class="plaque-cat">${esc(p.category)}</span></div>
      </div>

      <div class="tabs" role="tablist">
        <button class="tab" data-tab="meaning" role="tab">Meaning</button>
        <button class="tab" data-tab="chars" role="tab">Characters</button>
        <button class="tab" data-tab="usage" role="tab">Where it hangs</button>
      </div>

      <div class="tab-panel meaning" data-panel="meaning">
        <p>${esc(p.meaning)}</p>
      </div>
      <div class="tab-panel chars" data-panel="chars" hidden>
        <div class="char-grid">${charCells}</div>
      </div>
      <div class="tab-panel note" data-panel="usage" hidden>
        <p>${esc(p.usage)}</p>
      </div>
    `;
  }

  // ---- Tabs ----
  function setTab(name, persist) {
    const tabs = root.querySelectorAll(".tab");
    // The set of tabs differs by mode; if the requested tab isn't present
    // (e.g. a poem tab carried over into plaque mode), use the first one.
    const names = Array.from(tabs).map(t => t.dataset.tab);
    if (!names.includes(name)) name = names[0] || defaultTab();
    activeTab = name;
    tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === name));
    root.querySelectorAll(".tab-panel").forEach(p =>
      p.hidden = p.dataset.panel !== name);
    if (persist) savePrefs();
  }

  root.addEventListener("click", e => {
    const tab = e.target.closest(".tab");
    if (tab) { setTab(tab.dataset.tab, true); return; }
    const cell = e.target.closest(".hz, .char-cell");
    if (cell) { e.stopPropagation(); openWriter(cell.dataset); }
  });

  // ---- Character popover ----
  function showPop(el) {
    root.querySelectorAll(".hz.active").forEach(n => n.classList.remove("active"));
    el.classList.add("active");
    charPop.querySelector(".cp-char").textContent = el.dataset.c;
    charPop.querySelector(".cp-pinyin").textContent = el.dataset.p;
    charPop.querySelector(".cp-meaning").textContent = el.dataset.m;
    charPop.hidden = false;
    const r = el.getBoundingClientRect();
    charPop.style.left = (r.left + r.width / 2) + "px";
    charPop.style.top = (r.top - 8) + "px";
  }
  function hidePop() {
    charPop.hidden = true;
    root.querySelectorAll(".hz.active").forEach(n => n.classList.remove("active"));
  }
  document.addEventListener("click", e => {
    if (!e.target.closest(".hz") && !e.target.closest(".char-pop")) hidePop();
  });
  window.addEventListener("scroll", hidePop, true);

  // ---- Stroke-order writer ----
  const writerSheet = document.getElementById("writerSheet");
  const writerTarget = document.getElementById("writerTarget");
  const writerMsg = document.getElementById("writerMsg");
  let writer = null;

  function writerColors() {
    const dark = document.body.classList.contains("dark");
    return {
      strokeColor: dark ? "#ece3d3" : "#2b2622",
      radicalColor: dark ? "#e58c73" : "#9c3b2e",
      outlineColor: dark ? "#4a4239" : "#e0d6c4",
      drawingColor: dark ? "#e58c73" : "#9c3b2e",
      highlightColor: dark ? "#e58c73" : "#c8745f"
    };
  }
  function showWriterMsg(text) { writerMsg.textContent = text; writerMsg.hidden = false; }

  function buildWriter(ch, animate) {
    writerTarget.innerHTML = "";
    writerMsg.hidden = true;
    writer = null;
    if (typeof HanziWriter === "undefined") {
      showWriterMsg("Stroke-order library couldn't load (no network connection?).");
      return;
    }
    const c = writerColors();
    writer = HanziWriter.create(writerTarget, ch, {
      width: 230, height: 230, padding: 8,
      showOutline: true,
      strokeColor: c.strokeColor,
      radicalColor: c.radicalColor,
      outlineColor: c.outlineColor,
      drawingColor: c.drawingColor,
      highlightColor: c.highlightColor,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 280,
      onLoadCharDataError: () =>
        showWriterMsg("Stroke-order data isn't available for this character yet.")
    });
    if (animate) writer.animateCharacter();
  }

  function renderDefinition(ch) {
    const def = document.getElementById("writerDef");
    const entry = (typeof CHARDICT !== "undefined") ? CHARDICT[ch] : null;
    let html = '<div class="wd-label">Definition</div>';
    if (entry && entry.length) {
      html += entry.map(r =>
        `<div class="wd-row"><span class="wd-py">${esc(r.py)}</span>` +
        `<span class="wd-defs">${esc(r.defs.join("; "))}</span></div>`).join("");
      html += '<div class="wd-src">Definitions from CC-CEDICT (CC BY-SA)</div>';
    } else {
      html += '<div class="wd-row"><span class="wd-defs">No dictionary entry found for this character.</span></div>';
    }
    def.innerHTML = html;
  }

  function openWriter(ds) {
    writerSheet.querySelector(".writer-pinyin").textContent = ds.p || "";
    writerSheet.querySelector(".writer-meaning").textContent = ds.m || "";
    renderDefinition(ds.c);
    writerSheet.hidden = false;
    buildWriter(ds.c, true);
    writerSheet.dataset.char = ds.c;
  }
  function closeWriter() {
    writerSheet.hidden = true;
    writerTarget.innerHTML = "";
    writer = null;
  }

  document.getElementById("writerAnimate").addEventListener("click", () => {
    if (writer) { writerMsg.hidden = true; writer.animateCharacter(); }
  });
  document.getElementById("writerPractice").addEventListener("click", () => {
    if (!writer) return;
    writerMsg.hidden = true;
    writer.quiz({
      showHintAfterMisses: 2,
      onComplete: () => showWriterMsg("✓ Nicely written! Tap Reset to try again.")
    });
  });
  document.getElementById("writerReset").addEventListener("click", () => {
    buildWriter(writerSheet.dataset.char, true);
  });
  document.getElementById("writerClose").addEventListener("click", closeWriter);
  writerSheet.addEventListener("click", e => { if (e.target === writerSheet) closeWriter(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !writerSheet.hidden) closeWriter();
  });

  // ---- Navigation ----
  function step(days) {
    viewDate = new Date(viewDate.getTime() + days * DAY_MS);
    render();
  }
  document.getElementById("prevDay").addEventListener("click", () => step(-1));
  document.getElementById("nextDay").addEventListener("click", () => step(1));
  document.getElementById("todayBtn").addEventListener("click", () => { viewDate = new Date(); render(); });

  document.getElementById("randomBtn").addEventListener("click", () => {
    const set = activeSet();
    const curr = indexForDay(dayNumber(viewDate), set);
    let target = curr;
    while (target === curr && set.length > 1) target = Math.floor(Math.random() * set.length);
    const base = dayNumber(viewDate);
    for (let off = 1; off <= set.length; off++) {
      if (indexForDay(base + off, set) === target) { step(off); return; }
    }
  });

  // ---- Swipe (touch) ----
  let touchX = 0, touchY = 0, touching = false;
  document.addEventListener("touchstart", e => {
    if (e.target.closest(".sheet")) return; // let the browse list scroll
    const t = e.changedTouches[0];
    touchX = t.clientX; touchY = t.clientY; touching = true;
  }, { passive: true });
  document.addEventListener("touchend", e => {
    if (!touching) return;
    touching = false;
    if (!document.getElementById("browseSheet").hidden) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchX, dy = t.clientY - touchY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      step(dx < 0 ? 1 : -1); // swipe left → next, right → previous
    }
  }, { passive: true });

  // ---- Browse sheet ----
  const sheet = document.getElementById("browseSheet");
  const browseList = document.getElementById("browseList");

  function openBrowse() {
    const set = activeSet();
    const curr = indexForDay(dayNumber(viewDate), set);
    const heading = sheet.querySelector(".sheet-head h2");
    if (heading) heading.textContent = prefs.mode === "plaques" ? "All blessings" : "All poems";
    browseList.innerHTML = set.map((p, i) => {
      if (prefs.mode === "plaques") {
        return `
      <li data-i="${i}" class="${i === curr ? "current" : ""}">
        <span>
          <span class="bl-title-zh">${esc(p.phrase)}</span>
          <span class="bl-title-en"> — ${esc(p.title)}</span>
        </span>
        <span class="bl-author">${esc(p.category)}</span>
      </li>`;
      }
      return `
      <li data-i="${i}" class="${i === curr ? "current" : ""}">
        <span>
          <span class="bl-title-zh">${esc(p.titleHanzi)}</span>
          <span class="bl-title-en"> — ${esc(p.title)}</span>
        </span>
        <span class="bl-author">${esc(p.authorHanzi)} ${esc(p.author)}</span>
      </li>`;
    }).join("");
    sheet.hidden = false;
  }
  function closeBrowse() { sheet.hidden = true; }

  document.getElementById("browseBtn").addEventListener("click", openBrowse);
  document.getElementById("closeBrowse").addEventListener("click", closeBrowse);
  sheet.addEventListener("click", e => { if (e.target === sheet) closeBrowse(); });

  browseList.addEventListener("click", e => {
    const li = e.target.closest("li");
    if (!li) return;
    const set = activeSet();
    const target = parseInt(li.dataset.i, 10);
    const base = dayNumber(viewDate);
    for (let off = 0; off < set.length; off++) {
      if (indexForDay(base + off, set) === target) {
        viewDate = new Date(viewDate.getTime() + off * DAY_MS);
        break;
      }
    }
    closeBrowse();
    render();
  });

  // ---- Toggle chips ----
  function wireToggle(btnId, prefKey, bodyClass) {
    const btn = document.getElementById(btnId);
    function apply() {
      btn.classList.toggle("on", prefs[prefKey]);
      btn.setAttribute("aria-pressed", String(prefs[prefKey]));
      document.body.classList.toggle(bodyClass, !prefs[prefKey]);
    }
    btn.addEventListener("click", () => { prefs[prefKey] = !prefs[prefKey]; apply(); savePrefs(); });
    apply();
  }
  wireToggle("togglePinyin", "pinyin", "hide-pinyin");
  wireToggle("toggleTranslation", "trans", "hide-trans");

  // ---- Theme ----
  const themeBtn = document.getElementById("toggleTheme");
  function applyTheme() {
    const dark = prefs.theme === "dark";
    document.body.classList.toggle("dark", dark);
    themeBtn.textContent = dark ? "☀" : "☾";
    themeBtn.title = dark ? "Switch to light mode" : "Switch to dark mode";
  }
  themeBtn.addEventListener("click", () => {
    prefs.theme = prefs.theme === "dark" ? "light" : "dark";
    applyTheme();
    savePrefs();
  });
  applyTheme();

  // ---- Mode switch (poems ⇄ door blessings) ----
  const brandZh = document.querySelector(".brand-zh");
  const browseBtn = document.getElementById("browseBtn");
  const footerEl = document.getElementById("footer");

  function updateChrome() {
    const plaque = prefs.mode === "plaques";
    document.querySelectorAll(".mode-btn").forEach(b =>
      b.classList.toggle("active", b.dataset.mode === prefs.mode));
    document.body.classList.toggle("plaque-mode", plaque);
    if (brandZh) brandZh.textContent = plaque ? "门楣吉语" : "每日一诗";
    if (browseBtn) browseBtn.textContent = plaque ? "Browse all blessings" : "Browse all poems";
    if (footerEl) {
      footerEl.textContent = plaque
        ? "Auspicious 匾额 · tap any character to see how it's written"
        : "Classic 唐诗 · tap any character to see how it's written";
    }
  }

  function setMode(mode) {
    if (mode === prefs.mode) return;
    prefs.mode = mode;
    activeTab = defaultTab();
    updateChrome();
    savePrefs();
    render();
  }

  document.querySelectorAll(".mode-btn").forEach(btn =>
    btn.addEventListener("click", () => setMode(btn.dataset.mode)));

  updateChrome();
  render();
})();
