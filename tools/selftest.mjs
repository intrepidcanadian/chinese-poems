// Offline test of the pipeline's deterministic pieces (no API key needed):
//   1. every existing poem passes validation
//   2. serialize → eval round-trips to an equivalent object
//   3. a deliberately broken poem is rejected with the right error
//   4. the merge insertion marker exists in poems.js

import { createRequire } from "module";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { validatePoem } from "./validate.mjs";
import { serializePoem } from "./serialize.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const POEMS = require("../poems.js");

let failures = 0;
const fail = (m) => { console.log("  ✗ " + m); failures++; };

// 1. all existing poems validate
let bad = 0;
for (const p of POEMS) {
  const { ok, errors } = validatePoem(p, p.titleHanzi);
  if (!ok) { bad++; if (bad <= 3) fail(errors[0]); }
}
console.log(bad === 0
  ? `  ✓ all ${POEMS.length} existing poems pass validation`
  : `  ✗ ${bad} existing poems failed validation`);
if (bad) failures++;

// 2. serialize → eval round-trip
const sample = POEMS[0];
let roundtripped;
try {
  // eslint-disable-next-line no-eval
  roundtripped = eval("(" + serializePoem(sample) + ")");
} catch (e) {
  fail("serialize produced invalid JS: " + e.message);
}
if (roundtripped) {
  const a = JSON.stringify(sample);
  const b = JSON.stringify(roundtripped);
  if (a === b) console.log("  ✓ serialize → eval round-trips identically");
  else fail("round-trip differs from original");
  const r = validatePoem(roundtripped, "roundtrip");
  if (r.ok) console.log("  ✓ round-tripped poem re-validates");
  else fail("round-tripped poem failed validation: " + r.errors[0]);
}

// 3. broken poem is rejected
const broken = JSON.parse(JSON.stringify(sample));
broken.lines[0].chars.pop(); // drop a gloss → count mismatch
const rb = validatePoem(broken, "broken");
if (!rb.ok && rb.errors.some((e) => /char count mismatch/.test(e)))
  console.log("  ✓ char-count mismatch is detected");
else fail("did not detect a char-count mismatch");

// 4. merge marker present
const MARKER = '\n];\n\nif (typeof module !== "undefined") module.exports = POEMS;';
const src = readFileSync(join(__dirname, "..", "poems.js"), "utf8");
if (src.includes(MARKER)) console.log("  ✓ merge insertion marker found in poems.js");
else fail("merge insertion marker not found in poems.js");

console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
