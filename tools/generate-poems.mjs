// Autoresearch generator: asks Claude to draft poem entries in the app's schema,
// validates each, and writes the accepted ones to tools/staged-poems.json for
// human review. Nothing touches poems.js until you run merge-poems.mjs.
//
// Usage:
//   export ANTHROPIC_API_KEY=sk-ant-...
//   cd tools && npm install
//   node generate-poems.mjs            # reads queue.json
//   node generate-poems.mjs "山居秋暝|王维" "望岳|杜甫"   # ad-hoc list

import { createRequire } from "module";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Anthropic from "@anthropic-ai/sdk";

import { validatePoem } from "./validate.mjs";
import { poemSchema, SYSTEM_PROMPT, userPrompt } from "./poem-schema.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const POEMS = require("../poems.js");

const MODEL = "claude-opus-4-8";
const MAX_REPAIRS = 1; // re-ask once with the validation errors if the first draft fails

function loadQueue() {
  const args = process.argv.slice(2);
  if (args.length) {
    return args.map((a) => {
      const [title, author] = a.split("|").map((s) => s.trim());
      return { title, author: author || "" };
    });
  }
  const queuePath = join(__dirname, "queue.json");
  if (!existsSync(queuePath)) {
    console.error("No args given and tools/queue.json not found.");
    process.exit(1);
  }
  return JSON.parse(readFileSync(queuePath, "utf8"));
}

const existingTitles = new Set(POEMS.map((p) => p.titleHanzi));

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

async function draft(messages) {
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    thinking: { type: "adaptive" },
    output_config: { effort: "high", format: { type: "json_schema", schema: poemSchema } },
    system: SYSTEM_PROMPT,
    messages
  });
  const text = res.content.find((b) => b.type === "text")?.text ?? "";
  return JSON.parse(text);
}

async function generateOne({ title, author }) {
  let messages = [{ role: "user", content: userPrompt(title, author) }];
  for (let attempt = 0; attempt <= MAX_REPAIRS; attempt++) {
    let poem;
    try {
      poem = await draft(messages);
    } catch (e) {
      return { ok: false, errors: [`API/parse error: ${e.message}`] };
    }
    const { ok, errors } = validatePoem(poem, title);
    if (ok) return { ok: true, poem };
    if (attempt < MAX_REPAIRS) {
      messages = [
        ...messages,
        { role: "assistant", content: JSON.stringify(poem) },
        { role: "user", content: `These problems were found — fix them and return the corrected entry:\n- ${errors.join("\n- ")}` }
      ];
    } else {
      return { ok: false, errors };
    }
  }
}

async function main() {
  const queue = loadQueue();
  console.log(`Generating ${queue.length} poem(s) with ${MODEL}...\n`);

  const accepted = [];
  const rejected = [];

  for (const item of queue) {
    const label = `${item.title}${item.author ? " · " + item.author : ""}`;
    process.stdout.write(`• ${label} ... `);
    const result = await generateOne(item);
    if (!result.ok) {
      console.log("REJECTED");
      rejected.push({ item, errors: result.errors });
      continue;
    }
    if (existingTitles.has(result.poem.titleHanzi)) {
      console.log("skipped (already in collection)");
      continue;
    }
    existingTitles.add(result.poem.titleHanzi);
    accepted.push(result.poem);
    console.log(`ok (${result.poem.titleHanzi}, ${result.poem.lines.length} lines)`);
  }

  const outPath = join(__dirname, "staged-poems.json");
  writeFileSync(outPath, JSON.stringify(accepted, null, 2));

  console.log(`\nAccepted ${accepted.length}, rejected ${rejected.length}.`);
  console.log(`Wrote ${accepted.length} entr${accepted.length === 1 ? "y" : "ies"} to ${outPath}`);
  if (rejected.length) {
    console.log("\nRejected (review/retry manually):");
    for (const r of rejected) {
      console.log(`  - ${r.item.title}: ${r.errors.slice(0, 3).join("; ")}${r.errors.length > 3 ? " …" : ""}`);
    }
  }
  console.log("\nNext: review tools/staged-poems.json, then run `node merge-poems.mjs` to append into poems.js.");
}

main().catch((e) => { console.error(e); process.exit(1); });
