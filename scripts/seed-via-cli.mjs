#!/usr/bin/env node
/* Create the wooden-plaque products from plaques.js using the Shopify CLI
   (`shopify store execute`) — token-free. Authenticate once with
   `shopify store auth --store <store> --scopes write_products,read_products`,
   then run this.

   Usage:
     node scripts/seed-via-cli.mjs --store beefinthecity.myshopify.com
     SHOPIFY_STORE=beefinthecity.myshopify.com node scripts/seed-via-cli.mjs

   Optional:
     --dry-run                 print the plan; no CLI calls, no file writes
     SHOPIFY_BIN=/path/shopify override the CLI binary (if not on PATH)
     PLAQUE_PRESET_PRICE=49    preset price
     PLAQUE_CUSTOM_PRICE=69    custom-plaque price

   Notes:
   - Uses your existing `shopify store auth` session — nothing secret is read
     or written by this script.
   - Products are created as DRAFT; publish them in Shopify when ready.
   - Safe to re-run: products already created (tagged `cpseed:<id>`) are reused.
   - Writes the resulting variant IDs into shop-config.js.
*/

import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function argVal(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const STORE = argVal("--store") || process.env.SHOPIFY_STORE || "beefinthecity.myshopify.com";
const SHOPIFY_BIN = process.env.SHOPIFY_BIN || "shopify";
const PRESET_PRICE = process.env.PLAQUE_PRESET_PRICE || "49";
const CUSTOM_PRICE = process.env.PLAQUE_CUSTOM_PRICE || "69";
const VENDOR = "BlessingBoard";
const DRY_RUN = process.argv.includes("--dry-run");

function fail(msg) { console.error("\n✖ " + msg + "\n"); process.exit(1); }
const J = s => JSON.stringify(String(s)); // safe GraphQL/JSON string literal

// ---- Load blessings from plaques.js (a browser global, no exports) ----
const PLAQUES = Function(readFileSync(join(ROOT, "plaques.js"), "utf8") + "\nreturn PLAQUES;")();

function descriptionHtml(p) {
  return `<p>${esc(p.meaning)}</p>` + (p.usage ? `<p><em>${esc(p.usage)}</em></p>` : "") + `<p>${esc(p.pinyin)}</p>`;
}
function esc(s) { return String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }

const products = PLAQUES.map((p, i) => ({
  seedId: `preset-${i}`, key: p.phrase,
  title: `${p.phrase} — ${p.title}`, descriptionHtml: descriptionHtml(p),
  price: PRESET_PRICE, tags: ["wooden-plaque", "door-blessing"]
}));
products.push({
  seedId: "custom", key: "__custom__",
  title: "Custom Engraved Plaque",
  descriptionHtml: "<p>Your own characters, hand-finished and engraved on solid wood. Tell us the characters at checkout.</p>",
  price: CUSTOM_PRICE, tags: ["wooden-plaque", "custom-engraving"]
});

if (DRY_RUN) {
  console.log(`\nDRY RUN — would create ${products.length} products (DRAFT) on ${STORE}:\n`);
  for (const p of products) console.log(`  • [${p.seedId}] ${p.title}  $${p.price}`);
  console.log("\nNo CLI calls, no files written.\n");
  process.exit(0);
}

// ---- Shopify CLI runner ----
function runGraphQL(query, { mutation = false } = {}) {
  const args = ["store", "execute", "--store", STORE, "--query", query];
  if (mutation) args.push("--allow-mutations");
  let out;
  try {
    out = execFileSync(SHOPIFY_BIN, args, { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });
  } catch (e) {
    const detail = (e.stderr || "") + (e.stdout || "") || e.message;
    throw new Error(`shopify store execute failed:\n${detail}`);
  }
  return parseData(out);
}

// The CLI prints a decorative box, then the GraphQL data as JSON. Pull the
// first complete top-level {…} object out of the output.
function parseData(text) {
  const start = text.indexOf("{");
  if (start < 0) throw new Error("No JSON in CLI output:\n" + text);
  let depth = 0, inStr = false, escd = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inStr) {
      if (escd) escd = false;
      else if (ch === "\\") escd = true;
      else if (ch === '"') inStr = false;
    } else if (ch === '"') inStr = true;
    else if (ch === "{") depth++;
    else if (ch === "}") { if (--depth === 0) return JSON.parse(text.slice(start, i + 1)); }
  }
  throw new Error("Unbalanced JSON in CLI output:\n" + text);
}
function checkUserErrors(label, ue) { if (ue && ue.length) throw new Error(`${label}: ${JSON.stringify(ue)}`); }

function fetchExisting() {
  const data = runGraphQL(
    `query { products(first: 100, query: "tag:cpseed") { nodes { id tags variants(first: 1) { nodes { id } } } } }`);
  const map = {};
  for (const node of data.products.nodes) {
    const seed = (node.tags || []).find(t => t.startsWith("cpseed:"));
    if (seed) map[seed.slice("cpseed:".length)] = {
      productId: node.id, variantId: node.variants.nodes[0] && node.variants.nodes[0].id
    };
  }
  return map;
}

function createProduct(p) {
  const tags = [`cpseed:${p.seedId}`, ...p.tags].map(J).join(", ");
  const create = runGraphQL(
    `mutation { productCreate(product: {
      title: ${J(p.title)}, descriptionHtml: ${J(p.descriptionHtml)},
      status: DRAFT, productType: "Wooden Plaque", vendor: ${J(VENDOR)}, tags: [${tags}]
    }) { product { id variants(first: 1) { nodes { id } } } userErrors { field message } } }`,
    { mutation: true });
  checkUserErrors("productCreate", create.productCreate.userErrors);
  const product = create.productCreate.product;
  const variantId = product.variants.nodes[0].id;

  const upd = runGraphQL(
    `mutation { productVariantsBulkUpdate(
      productId: ${J(product.id)},
      variants: [{ id: ${J(variantId)}, price: ${J(p.price)} }]
    ) { productVariants { id } userErrors { field message } } }`,
    { mutation: true });
  checkUserErrors("productVariantsBulkUpdate", upd.productVariantsBulkUpdate.userErrors);
  return { productId: product.id, variantId };
}

// ---- Write results into shop-config.js ----
function writeConfig(variants, customVariantId) {
  const cfgPath = join(ROOT, "shop-config.js");
  let cfg = readFileSync(cfgPath, "utf8");
  const entries = Object.entries(variants)
    .map(([phrase, id]) => `    ${JSON.stringify(phrase)}: ${JSON.stringify(id)}`).join(",\n");
  const block = "/* SEED:BEGIN */\n" +
    "  variants: {\n" + (entries ? entries + "\n" : "") + "  },\n" +
    `  customVariantId: ${JSON.stringify(customVariantId || "")}\n` +
    "  /* SEED:END */";
  if (!/\/\* SEED:BEGIN \*\/[\s\S]*?\/\* SEED:END \*\//.test(cfg))
    throw new Error("Couldn't find the SEED markers in shop-config.js.");
  cfg = cfg.replace(/\/\* SEED:BEGIN \*\/[\s\S]*?\/\* SEED:END \*\//, block);
  writeFileSync(cfgPath, cfg);
}

// ---- Run ----
try { execFileSync(SHOPIFY_BIN, ["version"], { stdio: "ignore" }); }
catch { fail(`Shopify CLI not found (tried "${SHOPIFY_BIN}"). Install it, or set SHOPIFY_BIN to its full path.`); }

console.log(`\nSeeding ${products.length} products into ${STORE} via the Shopify CLI…\n`);
const existing = fetchExisting();
const variants = {};
let customVariantId = "";

for (const p of products) {
  let rec = existing[p.seedId];
  if (rec && rec.variantId) {
    console.log(`  = exists   [${p.seedId}] ${p.title}`);
  } else {
    rec = createProduct(p);
    console.log(`  + created  [${p.seedId}] ${p.title}`);
  }
  if (p.seedId === "custom") customVariantId = rec.variantId;
  else variants[p.key] = rec.variantId;
}

writeConfig(variants, customVariantId);

console.log(`\n✔ Done. Wrote ${Object.keys(variants).length} preset variant(s)` +
  `${customVariantId ? " + the custom variant" : ""} into shop-config.js.`);
console.log("→ Add your Storefront API token in shop-config.js and set enabled:true to go live.");
console.log("→ Products are DRAFT. Publish them in Shopify when fulfilment is ready.\n");
