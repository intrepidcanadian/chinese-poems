/* A Chinese Poem a Day — app logic
   - Deterministic "poem of the day" from POEMS based on the date, so the poem
     rotates daily and is the same for everyone on a given date.
   - Sticky controls; supplementary content (translation / interpretation /
     characters / source) lives behind tabs to keep the page short.
   - Tap any character for its individual meaning. */

(function () {
  "use strict";

  const root = document.getElementById("poemRoot");
  const dateLabel = document.getElementById("dateLabel");
  const charPop = document.getElementById("charPop");

  const EPOCH = Date.UTC(2024, 0, 1); // stable rotation anchor
  const DAY_MS = 24 * 60 * 60 * 1000;

  let viewDate = new Date();
  let activeTab = "trans"; // persists across day changes

  function dayNumber(date) {
    const local = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    return Math.floor((local - EPOCH) / DAY_MS);
  }
  function poemIndexForDay(dayNum) {
    const n = POEMS.length;
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

  function render() {
    const dayNum = dayNumber(viewDate);
    const poem = POEMS[poemIndexForDay(dayNum)];

    const today = dayNumber(new Date());
    let prefix = "";
    if (dayNum === today) prefix = "Today · ";
    else if (dayNum === today - 1) prefix = "Yesterday · ";
    else if (dayNum === today + 1) prefix = "Tomorrow · ";
    dateLabel.textContent = prefix + fmtDate(viewDate);

    const linesHtml = poem.lines.map(line => `
      <div class="line">
        <div class="line-hanzi">${renderLineHanzi(line)}</div>
        <div class="line-pinyin">${esc(line.pinyin)}</div>
        <div class="line-trans">${esc(line.translation)}</div>
      </div>`).join("");

    // dedupe repeated characters so the grid stays compact
    const seen = new Set();
    const uniqueChars = poem.lines.flatMap(l => l.chars).filter(ch => {
      if (seen.has(ch.c)) return false;
      seen.add(ch.c);
      return true;
    });
    const charCells = uniqueChars.map(ch => `
      <div class="char-cell">
        <span class="cc-char">${esc(ch.c)}</span>
        <span class="cc-body">
          <span class="cc-pinyin">${esc(ch.p)}</span>
          <span class="cc-meaning">${esc(ch.m)}</span>
        </span>
      </div>`).join("");

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

    setTab(activeTab);
    hidePop();
  }

  // ---- Tabs ----
  function setTab(name) {
    activeTab = name;
    root.querySelectorAll(".tab").forEach(t =>
      t.classList.toggle("active", t.dataset.tab === name));
    root.querySelectorAll(".tab-panel").forEach(p =>
      p.hidden = p.dataset.panel !== name);
  }

  root.addEventListener("click", e => {
    const tab = e.target.closest(".tab");
    if (tab) { setTab(tab.dataset.tab); return; }
    const hz = e.target.closest(".hz");
    if (hz) { e.stopPropagation(); showPop(hz); }
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

  // ---- Navigation ----
  function step(days) {
    viewDate = new Date(viewDate.getTime() + days * DAY_MS);
    render();
  }
  document.getElementById("prevDay").addEventListener("click", () => step(-1));
  document.getElementById("nextDay").addEventListener("click", () => step(1));
  document.getElementById("todayBtn").addEventListener("click", () => { viewDate = new Date(); render(); });

  document.getElementById("randomBtn").addEventListener("click", () => {
    const curr = poemIndexForDay(dayNumber(viewDate));
    let target = curr;
    while (target === curr && POEMS.length > 1) target = Math.floor(Math.random() * POEMS.length);
    const base = dayNumber(viewDate);
    for (let off = 1; off <= POEMS.length; off++) {
      if (poemIndexForDay(base + off) === target) { step(off); return; }
    }
  });

  // ---- Browse sheet ----
  const sheet = document.getElementById("browseSheet");
  const browseList = document.getElementById("browseList");

  function openBrowse() {
    const curr = poemIndexForDay(dayNumber(viewDate));
    browseList.innerHTML = POEMS.map((p, i) => `
      <li data-i="${i}" class="${i === curr ? "current" : ""}">
        <span>
          <span class="bl-title-zh">${esc(p.titleHanzi)}</span>
          <span class="bl-title-en"> — ${esc(p.title)}</span>
        </span>
        <span class="bl-author">${esc(p.authorHanzi)} ${esc(p.author)}</span>
      </li>`).join("");
    sheet.hidden = false;
  }
  function closeBrowse() { sheet.hidden = true; }

  document.getElementById("browseBtn").addEventListener("click", openBrowse);
  document.getElementById("closeBrowse").addEventListener("click", closeBrowse);
  sheet.addEventListener("click", e => { if (e.target === sheet) closeBrowse(); });

  browseList.addEventListener("click", e => {
    const li = e.target.closest("li");
    if (!li) return;
    const target = parseInt(li.dataset.i, 10);
    const base = dayNumber(viewDate);
    for (let off = 0; off < POEMS.length; off++) {
      if (poemIndexForDay(base + off) === target) {
        viewDate = new Date(viewDate.getTime() + off * DAY_MS);
        break;
      }
    }
    closeBrowse();
    render();
  });

  // ---- Toggle chips ----
  function wireToggle(btnId, bodyClass) {
    const btn = document.getElementById(btnId);
    btn.addEventListener("click", () => {
      const on = btn.classList.toggle("on");
      btn.setAttribute("aria-pressed", String(on));
      document.body.classList.toggle(bodyClass, !on);
    });
  }
  wireToggle("togglePinyin", "hide-pinyin");
  wireToggle("toggleTranslation", "hide-trans");

  render();
})();
