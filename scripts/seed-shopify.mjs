#!/usr/bin/env node
/* Create the wooden-plaque products in your Shopify store from plaques.js,
   then write the resulting variant IDs into shop-config.js.

   Usage:
     SHOPIFY_STORE="your-store.myshopify.com" \
     SHOPIFY_ADMIN_TOKEN="shpat_xxx" \
     node scripts/seed-shopify.mjs

   Optional env:
     SHOPIFY_STOREFRONT_TOKEN  also writes domain + storefront token and sets enabled:true
     SHOPIFY_API_VERSION       Admin API version (default 2025-10)
     PLAQUE_PRESET_PRICE       price for each preset (default 49)
     PLAQUE_CUSTOM_PRICE       price for the custom plaque (default 69)

   Flags:
     --dry-run   show what would be created; no network calls, no file writes

   Notes:
   - The Admin token is read from the environment and never written to disk.
   - Products are created as DRAFT (unpublished). Publish them in Shopify
     once your fulfilment is ready.
   - Safe to re-run: products already created by this script (tagged
     `cpseed:<id>`) are reused, not duplicated.
*/

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const STORE = process.env.SHOPIFY_STORE;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || "";
const API_VERSION = process.env.SHOPIFY_API_VERSION || "2025-10";
const PRESET_PRICE = process.env.PLAQUE_PRESET_PRICE || "49";
const CUSTOM_PRICE = process.env.PLAQUE_CUSTOM_PRICE || "69";
const VENDOR = "门楣吉语";
const DRY_RUN = process.argv.includes("--dry-run");

function fail(msg) { console.error("\n✖ " + msg + "\n"); process.exit(1); }

if (!DRY_RUN && (!STORE || !ADMIN_TOKEN)) {
  fail("Set SHOPIFY_STORE and SHOPIFY_ADMIN_TOKEN. See the header of this file for usage.");
}

// ---- Load the blessings from plaques.js (a browser global, no exports) ----
function loadPlaques() {
  const src = readFileSync(join(ROOT, "plaques.js"), "utf8");
  // eslint-disable-next-line no-new-func
  return Function(src + "\nreturn PLAQUES;")();
}
const PLAQUES = loadPlaques();

// ---- Build the product list ----
function descriptionHtml(p) {
  return `<p>${esc(p.meaning)}</p>` +
    (p.usage ? `<p><em>${esc(p.usage)}</em></p>` : "") +
    `<p>${esc(p.pinyin)}</p>`;
}
function esc(s) {
  return String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

const products = PLAQUES.map((p, i) => ({
  seedId: `preset-${i}`,
  key: p.phrase,                              // how shop-config maps it
  title: `${p.phrase} — ${p.title}`,
  descriptionHtml: descriptionHtml(p),
  price: PRESET_PRICE,
  tags: ["wooden-plaque", "door-blessing"]
}));
products.push({
  seedId: "custom",
  key: "__custom__",
  title: "Custom Engraved Plaque",
  descriptionHtml:
    "<p>Your own characters, hand-finished and engraved on solid wood. " +
    "Tell us the characters at checkout.</p>",
  price: CUSTOM_PRICE,
  tags: ["wooden-plaque", "custom-engraving"]
});

if (DRY_RUN) {
  console.log(`\nDRY RUN — would create ${products.length} products as DRAFT:\n`);
  for (const p of products) {
    console.log(`  • [${p.seedId}] ${p.title}  —  ${PRESET_PRICE === p.price ? "" : ""}$${p.price}`);
  }
  console.log("\nNo network calls made, no files written. " +
    "Re-run without --dry-run (and with your store env vars) to apply.\n");
  process.exit(0);
}

// ---- Shopify Admin GraphQL ----
async function gql(query, variables) {
  const res = await fetch(`https://${STORE}/admin/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": ADMIN_TOKEN },
    body: JSON.stringify({ query, variables })
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status} from Shopify: ${text}`);
  let json;
  try { json = JSON.parse(text); } catch { throw new Error("Non-JSON response: " + text); }
  if (json.errors) throw new Error("GraphQL error: " + JSON.stringify(json.errors));
  return json.data;
}
function checkUserErrors(label, ue) {
  if (ue && ue.length) throw new Error(`${label}: ${JSON.stringify(ue)}`);
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchExisting() {
  const map = {};
  let cursor = null;
  do {
    const data = await gql(
      `query($cursor:String){
        products(first:100, after:$cursor, query:"tag:cpseed") {
          pageInfo { hasNextPage endCursor }
          nodes { id tags variants(first:1){ nodes { id } } }
        }
      }`, { cursor });
    for (const node of data.products.nodes) {
      const seedTag = (node.tags || []).find(t => t.startsWith("cpseed:"));
      if (seedTag) {
        map[seedTag.slice("cpseed:".length)] = {
          productId: node.id,
          variantId: node.variants.nodes[0] && node.variants.nodes[0].id
        };
      }
    }
    cursor = data.products.pageInfo.hasNextPage ? data.products.pageInfo.endCursor : null;
  } while (cursor);
  return map;
}

async function createProduct(p) {
  const input = {
    title: p.title,
    descriptionHtml: p.descriptionHtml,
    status: "DRAFT",
    productType: "Wooden Plaque",
    vendor: VENDOR,
    tags: [`cpseed:${p.seedId}`, ...p.tags]
  };
  const created = await gql(
    `mutation($input:ProductInput!){
      productCreate(input:$input){
        product { id variants(first:1){ nodes { id } } }
        userErrors { field message }
      }
    }`, { input });
  checkUserErrors("productCreate", created.productCreate.userErrors);
  const product = created.productCreate.product;
  const variantId = product.variants.nodes[0].id;

  const updated = await gql(
    `mutation($pid:ID!,$variants:[ProductVariantsBulkInput!]!){
      productVariantsBulkUpdate(productId:$pid, variants:$variants){
        productVariants { id }
        userErrors { field message }
      }
    }`, { pid: product.id, variants: [{ id: variantId, price: String(p.price) }] });
  checkUserErrors("productVariantsBulkUpdate", updated.productVariantsBulkUpdate.userErrors);

  return { productId: product.id, variantId };
}

// ---- Write results into shop-config.js ----
function buildSeedBlock(variants, customVariantId) {
  const entries = Object.entries(variants)
    .map(([phrase, id]) => `    ${JSON.stringify(phrase)}: ${JSON.stringify(id)}`)
    .join(",\n");
  return "/* SEED:BEGIN */\n" +
    "  variants: {\n" + (entries ? entries + "\n" : "") + "  },\n" +
    `  customVariantId: ${JSON.stringify(customVariantId || "")}\n` +
    "  /* SEED:END */";
}

function writeConfig(variants, customVariantId) {
  const cfgPath = join(ROOT, "shop-config.js");
  let cfg = readFileSync(cfgPath, "utf8");
  const block = buildSeedBlock(variants, customVariantId);
  if (!/\/\* SEED:BEGIN \*\/[\s\S]*?\/\* SEED:END \*\//.test(cfg)) {
    throw new Error("Couldn't find the SEED markers in shop-config.js.");
  }
  cfg = cfg.replace(/\/\* SEED:BEGIN \*\/[\s\S]*?\/\* SEED:END \*\//, block);
  if (STOREFRONT_TOKEN) {
    cfg = cfg.replace(/domain:\s*"[^"]*"/, `domain: "${STORE}"`);
    cfg = cfg.replace(/storefrontAccessToken:\s*"[^"]*"/, `storefrontAccessToken: "${STOREFRONT_TOKEN}"`);
    cfg = cfg.replace(/enabled:\s*(?:true|false)/, "enabled: true");
  }
  writeFileSync(cfgPath, cfg);
}

// ---- Run ----
(async () => {
  console.log(`\nSeeding ${products.length} products into ${STORE} (API ${API_VERSION})…\n`);
  const existing = await fetchExisting();
  const variants = {};
  let customVariantId = "";

  for (const p of products) {
    let rec = existing[p.seedId];
    if (rec && rec.variantId) {
      console.log(`  = exists   [${p.seedId}] ${p.title}`);
    } else {
      rec = await createProduct(p);
      console.log(`  + created  [${p.seedId}] ${p.title}`);
      await sleep(250); // be gentle with the API
    }
    if (p.seedId === "custom") customVariantId = rec.variantId;
    else variants[p.key] = rec.variantId;
  }

  writeConfig(variants, customVariantId);

  console.log(`\n✔ Done. Wrote ${Object.keys(variants).length} preset variant(s)` +
    `${customVariantId ? " + the custom variant" : ""} into shop-config.js.`);
  if (STOREFRONT_TOKEN) {
    console.log("✔ Storefront token + domain written; shop enabled.");
  } else {
    console.log("→ Next: add your Storefront API token + domain in shop-config.js " +
      "and set enabled:true (or re-run with SHOPIFY_STOREFRONT_TOKEN set).");
  }
  console.log("→ Products are DRAFT. Publish them in Shopify when fulfilment is ready.\n");
})().catch(err => fail(err.message));
