#!/usr/bin/env node
/* Generate product mockup images with Google Gemini ("Nano Banana") and
   attach them to the matching Shopify products.

   Pipeline per product:
     1. Gemini text→image  (gemini-2.5-flash-image by default)
     2. save a local copy to ./generated-images/<seed>.png
     3. Shopify stagedUploadsCreate → POST the bytes to the staged target
     4. productUpdate(media: …) to attach the image to the product

   Prereqs:
     - GEMINI_API_KEY in your env (from Google AI Studio; keep it secret)
     - Re-auth the CLI with file scopes:
         shopify store auth --store beefinthecity.myshopify.com \
           --scopes write_products,read_products,write_files,read_files

   Usage:
     GEMINI_API_KEY=... node scripts/gen-images.mjs --store beefinthecity.myshopify.com
     ... --seed preset-3            # a specific blessing (default preset-0)
     ... --all                      # every blessing + the custom product
     ... --save-only                # generate + save locally, skip Shopify upload
     ... --dry-run                  # print prompts only; no API calls

   Heads-up: AI image models can render Chinese characters imperfectly. Run on
   ONE product first (the default) and eyeball ./generated-images before --all.
   "Nano Banana Pro" (GEMINI_MODEL=gemini-3-pro-image-preview) renders text better.
*/

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "generated-images");

function argVal(f) { const i = process.argv.indexOf(f); return i >= 0 ? process.argv[i + 1] : undefined; }
const has = f => process.argv.includes(f);

const STORE = argVal("--store") || process.env.SHOPIFY_STORE || "beefinthecity.myshopify.com";
const SHOPIFY_BIN = process.env.SHOPIFY_BIN || "shopify";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-image";
const SEED = argVal("--seed") || "preset-0";
const DO_ALL = has("--all");
const SAVE_ONLY = has("--save-only");
const DRY_RUN = has("--dry-run");
const J = s => JSON.stringify(String(s));
function fail(m) { console.error("\n✖ " + m + "\n"); process.exit(1); }

// ---- Blessings ----
const PLAQUES = Function(readFileSync(join(ROOT, "plaques.js"), "utf8") + "\nreturn PLAQUES;")();

const items = PLAQUES.map((p, i) => ({
  seedId: `preset-${i}`, phrase: p.phrase, title: p.title, meaning: p.meaning
}));
items.push({ seedId: "custom", phrase: "福", title: "Custom Engraved Plaque",
  meaning: "Your own characters, engraved on solid wood." });

const targets = DO_ALL ? items : items.filter(it => it.seedId === SEED);
if (!targets.length) fail(`No item matches --seed ${SEED}. Use --all or a valid preset-N / custom.`);

function prompt(it) {
  return `Photorealistic e-commerce product photo of a traditional Chinese carved ` +
    `wooden plaque (匾额) mounted on a clean wall. Horizontal dark walnut board with ` +
    `an ornate gold-leaf carved inscription of exactly these Chinese characters: ` +
    `"${it.phrase}". Warm gallery lighting, shallow depth of field, neutral background, ` +
    `high-end catalog look. Render the characters "${it.phrase}" accurately and crisply; ` +
    `do not add any other text.`;
}

if (DRY_RUN) {
  console.log(`\nDRY RUN — prompts for ${targets.length} item(s), model ${GEMINI_MODEL}:\n`);
  for (const it of targets) console.log(`• [${it.seedId}] ${it.phrase}\n  ${prompt(it)}\n`);
  process.exit(0);
}
if (!GEMINI_API_KEY) fail("Set GEMINI_API_KEY in your env (from Google AI Studio).");

// ---- Gemini text→image ----
async function generateImage(text) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] }
    })
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Gemini HTTP ${res.status}: ${body}`);
  const json = JSON.parse(body);
  const parts = json.candidates?.[0]?.content?.parts || [];
  const img = parts.find(p => p.inlineData?.data);
  if (!img) {
    const txt = parts.map(p => p.text).filter(Boolean).join(" ");
    throw new Error("Gemini returned no image" + (txt ? `: ${txt}` : ` (raw: ${body.slice(0, 300)})`));
  }
  return Buffer.from(img.inlineData.data, "base64");
}

// ---- Shopify CLI ----
function runGraphQL(query, { mutation = false } = {}) {
  const args = ["store", "execute", "--store", STORE, "--query", query];
  if (mutation) args.push("--allow-mutations");
  let out;
  try { out = execFileSync(SHOPIFY_BIN, args, { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }); }
  catch (e) { throw new Error("shopify store execute failed:\n" + ((e.stderr || "") + (e.stdout || "") || e.message)); }
  return parseData(out);
}
function parseData(text) {
  const start = text.indexOf("{");
  if (start < 0) throw new Error("No JSON in CLI output:\n" + text);
  let depth = 0, inStr = false, escd = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inStr) { if (escd) escd = false; else if (ch === "\\") escd = true; else if (ch === '"') inStr = false; }
    else if (ch === '"') inStr = true;
    else if (ch === "{") depth++;
    else if (ch === "}") { if (--depth === 0) return JSON.parse(text.slice(start, i + 1)); }
  }
  throw new Error("Unbalanced JSON:\n" + text);
}
function checkUserErrors(label, ue) { if (ue && ue.length) throw new Error(`${label}: ${JSON.stringify(ue)}`); }

function productIdForSeed(seedId) {
  const data = runGraphQL(
    `query { products(first: 100, query: "tag:wooden-plaque") { nodes { id tags } } }`);
  const node = data.products.nodes.find(n => (n.tags || []).includes(`cpseed:${seedId}`));
  return node && node.id;
}

async function uploadToShopify(productId, buf, filename, alt) {
  const staged = runGraphQL(
    `mutation { stagedUploadsCreate(input: [{ filename: ${J(filename)}, mimeType: "image/png", httpMethod: POST, resource: IMAGE }]) {
      stagedTargets { url resourceUrl parameters { name value } } userErrors { field message } } }`,
    { mutation: true });
  checkUserErrors("stagedUploadsCreate", staged.stagedUploadsCreate.userErrors);
  const target = staged.stagedUploadsCreate.stagedTargets[0];

  const form = new FormData();
  for (const { name, value } of target.parameters) form.append(name, value);
  form.append("file", new Blob([buf], { type: "image/png" }), filename);
  const up = await fetch(target.url, { method: "POST", body: form });
  if (!up.ok) throw new Error(`Staged upload failed: HTTP ${up.status} ${await up.text()}`);

  const attach = runGraphQL(
    `mutation { productUpdate(product: { id: ${J(productId)} }, media: [{ originalSource: ${J(target.resourceUrl)}, mediaContentType: IMAGE, alt: ${J(alt)} }]) {
      product { id } userErrors { field message } } }`,
    { mutation: true });
  checkUserErrors("productUpdate", attach.productUpdate.userErrors);
}

// ---- Run ----
if (!SAVE_ONLY) {
  try { execFileSync(SHOPIFY_BIN, ["version"], { stdio: "ignore" }); }
  catch { fail(`Shopify CLI not found (tried "${SHOPIFY_BIN}").`); }
}
mkdirSync(OUT_DIR, { recursive: true });

console.log(`\nGenerating ${targets.length} image(s) with ${GEMINI_MODEL}` +
  `${SAVE_ONLY ? " (save-only)" : ` → ${STORE}`}…\n`);

for (const it of targets) {
  try {
    const buf = await generateImage(prompt(it));
    const file = `${it.seedId}.png`;
    writeFileSync(join(OUT_DIR, file), buf);
    console.log(`  ✓ generated  [${it.seedId}] ${it.phrase}  → generated-images/${file}`);

    if (!SAVE_ONLY) {
      const productId = productIdForSeed(it.seedId);
      if (!productId) { console.log(`    … skipped upload: no product tagged cpseed:${it.seedId}`); continue; }
      await uploadToShopify(productId, buf, file, `${it.phrase} wooden plaque`);
      console.log(`    ✓ uploaded to product`);
    }
  } catch (e) {
    console.error(`  ✖ [${it.seedId}] ${e.message}`);
  }
}
console.log(SAVE_ONLY
  ? "\n✔ Done. Review ./generated-images before uploading.\n"
  : "\n✔ Done. Check the product images in Shopify admin.\n");
