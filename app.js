/* A Chinese Poem a Day — app logic
   - Picks a deterministic "poem of the day" from POEMS based on the date,
     so everyone sees the same poem on a given day and it rotates daily.
   - Lets you browse forward/back, jump to today, pick random, or open the list.
   - Tap any character for its individual meaning. */

(function () {
  "use strict";

  const app = document.querySelector(".app");
  const root = document.getElementById("poemRoot");
  const dateLabel = document.getElementById("dateLabel");
  const charPop = document.getElementById("charPop");

  // Day 0 = a fixed epoch so the rotation is stable across machines.
  const EPOCH = Date.UTC(2024, 0, 1); // 2024-01-01
  const DAY_MS = 24 * 60 * 60 * 1000;

  // dayNumber: whole days since EPOCH for a given Date (local midnight).
  function dayNumber(date) {
    const local = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    return Math.floor((local - EPOCH) / DAY_MS);
  }

  function poemIndexForDay(dayNum) {
    const n = POEMS.length;
    return ((dayNum % n) + n) % n;
  }

  // State: which date we're viewing.
  let viewDate = new Date();

  function fmtDate(d) {
    return d.toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function renderLineHanzi(line) {
    return line.chars.map((ch, i) =>
      `<span class="hz" data-c="${esc(ch.c)}" data-p="${esc(ch.p)}" data-m="${esc(ch.m)}">${esc(ch.c)}</span>`
    ).join("");
  }

  function render() {
    const dayNum = dayNumber(viewDate);
    const poem = POEMS[poemIndexForDay(dayNum)];

    const today = dayNumber(new Date());
    let dayWord = fmtDate(viewDate);
    if (dayNum === today) dayWord = "Today · " + dayWord;
    else if (dayNum === today - 1) dayWord = "Yesterday · " + fmtDate(viewDate);
    else if (dayNum === today + 1) dayWord = "Tomorrow · " + fmtDate(viewDate);
    dateLabel.textContent = dayWord;

    const linesHtml = poem.lines.map(line => `
      <div class="line">
        <div class="line-hanzi">${renderLineHanzi(line)}</div>
        <div class="line-pinyin">${esc(line.pinyin)}</div>
        <div class="line-trans">${esc(line.translation)}</div>
      </div>`).join("");

    const charCells = poem.lines.flatMap(l => l.chars).map(ch => `
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

      <div class="section trans">
        <h3>Translation</h3>
        <p>${esc(poem.translation)}</p>
      </div>

      <div class="section note">
        <h3>Interpretation</h3>
        <p>${esc(poem.note)}</p>
      </div>

      <div class="section chars">
        <h3>Character by character</h3>
        <div class="char-grid">${charCells}</div>
      </div>

      <div class="section source">
        <h3>Source</h3>
        <p class="source-line"><span class="src-zh">${esc(poem.source)}</span></p>
      </div>
    `;

    hidePop();
  }

  // ---- Character popover ----
  function showPop(el) {
    document.querySelectorAll(".hz.active").forEach(n => n.classList.remove("active"));
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
    document.querySelectorAll(".hz.active").forEach(n => n.classList.remove("active"));
  }

  root.addEventListener("click", e => {
    const hz = e.target.closest(".hz");
    if (hz) { e.stopPropagation(); showPop(hz); }
  });
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
    // jump to a random day that lands on a different poem
    const curr = poemIndexForDay(dayNumber(viewDate));
    let target = curr;
    while (target === curr && POEMS.length > 1) {
      target = Math.floor(Math.random() * POEMS.length);
    }
    // find nearest day offset producing that poem index
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

  // ---- Toggles ----
  document.getElementById("togglePinyin").addEventListener("change", e => {
    app.classList.toggle("hide-pinyin", !e.target.checked);
  });
  document.getElementById("toggleTranslation").addEventListener("change", e => {
    app.classList.toggle("hide-trans", !e.target.checked);
  });

  render();
})();
