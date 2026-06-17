# Autoresearch pipeline

Offline tooling that uses **Claude (Opus 4.8)** to research new poems and draft
them directly in the app's data schema — per-character pinyin and glosses, line
translations, a full translation, a literary note, and the source. Every draft is
validated before it can enter the app, and **nothing is written to `poems.js`
until you review and merge.** No API key ever ships in the web app; this runs on
your machine only.

```
  queue.json ──► generate-poems.mjs ──► staged-poems.json ──► merge-poems.mjs ──► ../poems.js
                  (Claude + validate)      (you review)         (validate again,
                                                                 back up, append)
```

## Setup

```sh
cd tools
npm install
export ANTHROPIC_API_KEY=sk-ant-...   # your key, used locally only
```

## Generate

Edit `queue.json` (a list of `{ "title": "...", "author": "..." }`), then:

```sh
node generate-poems.mjs
# or an ad-hoc list:
node generate-poems.mjs "山居秋暝|王维" "望岳|杜甫"
```

For each poem Claude returns a structured entry. The validator checks it
(see below); if a draft fails, Claude is asked once to repair it using the exact
errors. Accepted entries are written to `staged-poems.json`. Poems already in the
collection are skipped automatically.

## Review, then merge

Open `staged-poems.json` and read the entries. When you're happy:

```sh
node merge-poems.mjs --dry-run   # preview what would be appended
node merge-poems.mjs             # validate again, back up poems.js, append
```

`poems.js.bak` is written before any change. Then delete or empty
`staged-poems.json` and reload the app — the new poems join the daily rotation
automatically.

> After merging, regenerate definitions so the new characters have dictionary
> entries: re-run the `chardict.js` generation step (see the repo root), which
> derives definitions from CC-CEDICT for every character in the collection.

## What the validator enforces (`validate.mjs`)

- All metadata/translation/note fields are present and non-empty.
- Every line has `text`, `pinyin`, `translation`, and a non-empty `chars` array.
- **Each line's `chars` aligns 1:1 with the characters in `text`** — same count,
  same characters, in order. This is the check that guarantees the tap-a-character
  feature never points at the wrong gloss.

## Self-test (no API key)

```sh
node selftest.mjs
```

Confirms all existing poems validate, that the serializer round-trips, that a
broken entry is rejected, and that the merge marker exists.

## Files

| File | Purpose |
|------|---------|
| `queue.json` | Poems you want generated |
| `generate-poems.mjs` | Calls Claude, validates, writes `staged-poems.json` |
| `merge-poems.mjs` | Reviews + appends staged entries into `../poems.js` |
| `validate.mjs` | Schema + character-alignment validation |
| `serialize.mjs` | Renders a poem as a `poems.js`-style JS literal |
| `poem-schema.mjs` | JSON schema + the research system prompt |
| `selftest.mjs` | Offline pipeline test |
