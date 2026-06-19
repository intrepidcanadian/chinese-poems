# 每日一诗 · A Chinese Poem a Day

A small, self-contained web app for learning famous Chinese poems. Each day shows
a rotating **Poem of the Day** with pinyin, English translation, a character-by-character
breakdown, a literary interpretation, and the author / dynasty / source.

No build step and no dependencies — just open `index.html` in a browser.

Includes **36 classic poems** (Tang and Song dynasties) plus **18 auspicious
plaque blessings** — over a month of daily content.

## Features

- **Two modes** — switch between **诗 Poems** and **匾 Door blessings** (匾额/横批),
  the auspicious phrases families carve onto a wooden board and hang above a door.
  Each mode has its own daily rotation, Random, and Browse. Blessings render as a
  carved gold-on-wood plaque banner with per-character glosses and a "where it hangs"
  note explaining the custom or allusion behind each phrase.
- **Poem of the Day** — the date deterministically selects a poem, so it rotates daily.
- **Pinyin** with tone marks (toggleable).
- **Line-by-line + full English translation** (toggleable).
- **Stroke-order writer** — tap any character to watch it written stroke by stroke
  on a 田字格 grid, or switch to **Practice mode** and write it yourself on screen
  with your mouse or finger.
- **Dictionary definitions** — the writer panel shows each character's full
  reading(s) and meanings (from CC-CEDICT), alongside its in-poem gloss.
- **Character-by-character interpretation** — every character glossed in context.
- **Literary interpretation** of each poem.
- **Author, dynasty, and source** for every poem.
- **Dark mode** — toggle in the top bar; defaults to your system preference.
- **Saved preferences** — pinyin/English toggles, active tab, and theme persist
  across visits (via `localStorage`).
- **Swipe** left/right on touch devices to move between days.
- Browse controls: step day-by-day, jump to **Today**, pick **Random**, or **Browse all**.

## Running

Open `index.html` directly in any modern browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Adding poems

All content lives in [`poems.js`](poems.js) as a plain list. To add a poem, copy an
existing block and fill in:

- `title`, `titlePinyin`, `titleHanzi`
- `author`, `authorHanzi`, `dynasty`, `source`
- `lines[]`, each with `text`, `pinyin`, `translation`, and `chars[]`
  (each character is `{ c, p, m }` = character, pinyin, meaning)
- `translation` (full poem) and `note` (interpretation)

The daily rotation picks up new poems automatically.

## Adding plaque blessings

Door blessings live in [`plaques.js`](plaques.js) as a plain list. To add one, copy an
existing block and fill in:

- `phrase` (the characters as hung), `pinyin`, `title` (English), `category`
- `chars[]`, each character `{ c, p, m }` = character, pinyin, meaning
- `meaning` (what the phrase wishes for) and `usage` (where it hangs / the allusion)

The Door blessings rotation picks up new entries automatically.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Markup and layout |
| `style.css` | Styling (classical serif theme, light + dark) |
| `app.js` | Rotation, navigation, tabs, theme, stroke-order writer |
| `poems.js` | The poem dataset |
| `plaques.js` | The door-blessing (匾额) dataset |
| `chardict.js` | Per-character dictionary definitions |

## Credits

- **Stroke-order animation:** [Hanzi Writer](https://hanziwriter.org) and its
  stroke data (loaded from CDN).
- **Definitions:** [CC-CEDICT](https://cc-cedict.org), licensed
  [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The bundled
  `chardict.js` is a derived subset covering the characters in this collection.
