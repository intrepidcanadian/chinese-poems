# 每日一诗 · A Chinese Poem a Day

A small, self-contained web app for learning famous Chinese poems. Each day shows
a rotating **Poem of the Day** with pinyin, English translation, a character-by-character
breakdown, a literary interpretation, and the author / dynasty / source.

No build step and no dependencies — just open `index.html` in a browser.

## Features

- **Poem of the Day** — the date deterministically selects a poem, so it rotates daily.
- **Pinyin** with tone marks (toggleable).
- **Line-by-line + full English translation** (toggleable).
- **Character-by-character interpretation** — every character glossed; tap any
  character in the poem for an instant pop-up of its pinyin and meaning.
- **Literary interpretation** of each poem.
- **Author, dynasty, and source** for every poem.
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

## Files

| File | Purpose |
|------|---------|
| `index.html` | Markup and layout |
| `style.css` | Styling (classical serif theme) |
| `app.js` | Rotation, navigation, character pop-ups |
| `poems.js` | The poem dataset |
