// Appends reviewed entries from tools/staged-poems.json into ../poems.js.
// Re-validates and de-duplicates before writing, and backs up poems.js first.
//
// Usage:  cd tools && node merge-poems.mjs   [--dry-run]

import { createRequire } from "module";
import { readFileSync, writeFileSync, existsSync, copyFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { validatePoem } from "./validate.mjs";
import { serializePoem } from "./serialize.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const POEMS = require("../poems.js");

const dryRun = process.argv.includes("--dry-run");
const stagedPath = join(__dirname, "staged-poems.json");
const poemsPath = join(__dirname, "..", "poems.js");
const MARKER = '\n];\n\nif (typeof module !== "undefined") module.exports = POEMS;';

if (!existsSync(stagedPath)) {
  console.error("tools/staged-poems.json not found — run generate-poems.mjs first.");
  process.exit(1);
}

const staged = JSON.parse(readFileSync(stagedPath, "utf8"));
const existing = new Set(POEMS.map((p) => p.titleHanzi));

const toAdd = [];
for (const poem of staged) {
  const { ok, errors } = validatePoem(poem, poem.titleHanzi || "?");
  if (!ok) {
    console.log(`SKIP ${poem.titleHanzi || "?"} — failed validation:\n  - ${errors.join("\n  - ")}`);
    continue;
  }
  if (existing.has(poem.titleHanzi)) {
    console.log(`SKIP ${poem.titleHanzi} — already in poems.js`);
    continue;
  }
  existing.add(poem.titleHanzi);
  toAdd.push(poem);
}

if (!toAdd.length) {
  console.log("Nothing new to merge.");
  process.exit(0);
}

const src = readFileSync(poemsPath, "utf8");
if (!src.includes(MARKER)) {
  console.error("Could not find the insertion marker in poems.js — aborting.");
  process.exit(1);
}

const block = toAdd.map(serializePoem).join(",\n\n");
const updated = src.replace(MARKER, `,\n\n${block}${MARKER}`);

console.log(`Merging ${toAdd.length} poem(s): ${toAdd.map((p) => p.titleHanzi).join(", ")}`);

if (dryRun) {
  console.log("\n--- dry run: preview of what would be appended ---\n");
  console.log(block.slice(0, 1200) + (block.length > 1200 ? "\n…(truncated)" : ""));
  process.exit(0);
}

copyFileSync(poemsPath, poemsPath + ".bak");
writeFileSync(poemsPath, updated);
console.log(`Done. Backup at poems.js.bak. New total: ${POEMS.length + toAdd.length} poems.`);
console.log("Tip: clear tools/staged-poems.json (or delete it) once merged.");
