#!/usr/bin/env node
/* Soft-launch the whole catalog: for every seeded plaque, set it Active,
   publish it to the Headless channel, and set inventory to 0 with policy
   DENY — so the products are visible/queryable on the storefront but
   nothing can actually be purchased until you add stock.

   Prereq — auth with publications scopes (same as publish-one):
     shopify store auth --store beefinthecity.myshopify.com \
       --scopes write_products,read_products,read_publications,write_publications

   Usage:
     node scripts/publish-all.mjs --store beefinthecity.myshopify.com
     node scripts/publish-all.mjs --channel "Headless"   # channel name match

   To actually start selling later: set inventory > 0 (or switch the variant's
   inventory policy / untrack it) in Shopify admin, per product.

   Token-free: rides your `shopify store auth` session.
*/

import { execFileSync } from "node:child_process";

function argVal(f) { const i = process.argv.indexOf(f); return i >= 0 ? process.argv[i + 1] : undefined; }
const STORE = argVal("--store") || process.env.SHOPIFY_STORE || "beefinthecity.myshopify.com";
const SHOPIFY_BIN = process.env.SHOPIFY_BIN || "shopify";
const CHANNEL_MATCH = (argVal("--channel") || "headless").toLowerCase();
// DENY (default) = can't buy at 0 stock. CONTINUE = sell at 0 (made-to-order /
// oversell): inventory still shows 0 but checkout works.
const POLICY = process.argv.includes("--allow-oversell") ? "CONTINUE" : "DENY";
const J = s => JSON.stringify(String(s));
function fail(m) { console.error("\n✖ " + m + "\n"); process.exit(1); }

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

try { execFileSync(SHOPIFY_BIN, ["version"], { stdio: "ignore" }); }
catch { fail(`Shopify CLI not found (tried "${SHOPIFY_BIN}").`); }

// Headless channel
const pubs = runGraphQL(`query { publications(first: 50) { nodes { id name } } }`).publications.nodes;
const channel = pubs.find(p => (p.name || "").toLowerCase().includes(CHANNEL_MATCH));
if (!channel) fail(`No sales channel matching "${CHANNEL_MATCH}". Found: ${pubs.map(p => p.name).join(", ")}`);

// All seeded products
const prods = runGraphQL(
  `query { products(first: 100, query: "tag:wooden-plaque") {
     nodes { id title status tags variants(first: 1) { nodes { id } } } } }`).products.nodes
  .filter(p => (p.tags || []).some(t => t.startsWith("cpseed:")));
if (!prods.length) fail("No seeded products found. Run the seed script first.");

console.log(`\nPublishing ${prods.length} products → "${channel.name}" ` +
  `(inventory 0, policy ${POLICY}${POLICY === "CONTINUE" ? " — sellable / made-to-order" : " — not purchasable"})…\n`);

for (const p of prods) {
  try {
    const u = runGraphQL(
      `mutation { productUpdate(product: { id: ${J(p.id)}, status: ACTIVE, vendor: "BlessingBoard" }) { product { id } userErrors { field message } } }`,
      { mutation: true });
    checkUserErrors("productUpdate", u.productUpdate.userErrors);
    const variantId = p.variants.nodes[0] && p.variants.nodes[0].id;
    if (variantId) {
      const v = runGraphQL(
        `mutation { productVariantsBulkUpdate(productId: ${J(p.id)}, variants: [{ id: ${J(variantId)}, inventoryPolicy: ${POLICY}, inventoryItem: { tracked: true } }]) { productVariants { id } userErrors { field message } } }`,
        { mutation: true });
      checkUserErrors("productVariantsBulkUpdate", v.productVariantsBulkUpdate.userErrors);
    }
    const pub = runGraphQL(
      `mutation { publishablePublish(id: ${J(p.id)}, input: [{ publicationId: ${J(channel.id)} }]) { userErrors { field message } } }`,
      { mutation: true });
    checkUserErrors("publishablePublish", pub.publishablePublish.userErrors);

    console.log(`  ✓ ${p.title}`);
  } catch (e) {
    console.error(`  ✖ ${p.title}: ${e.message}`);
  }
}

if (POLICY === "CONTINUE") {
  console.log(`\n✔ All set: products live on "${channel.name}", inventory 0 but ` +
    `CHECKOUT ENABLED (oversell / made-to-order). Real orders will go through —` +
    ` make sure you can fulfil them, or note lead times on the product pages.`);
} else {
  console.log(`\n✔ All set: products live on "${channel.name}" but inventory 0 (not purchasable).`);
  console.log("→ Re-run with --allow-oversell to enable checkout while keeping inventory 0.\n");
}
