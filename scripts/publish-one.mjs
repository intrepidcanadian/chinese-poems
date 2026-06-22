#!/usr/bin/env node
/* Publish ONE seeded plaque to the Headless sales channel and set it Active,
   so the Storefront API (and the website's Buy button) can sell it — for
   testing the end-to-end checkout while the rest stay Draft.

   Prereq — re-auth once with the publications scopes:
     shopify store auth --store beefinthecity.myshopify.com \
       --scopes write_products,read_products,read_publications,write_publications

   Usage:
     node scripts/publish-one.mjs --store beefinthecity.myshopify.com
     node scripts/publish-one.mjs --seed preset-3        # pick a different one
     node scripts/publish-one.mjs --channel "Headless"   # channel title match

   Token-free: rides your `shopify store auth` session.
*/

import { execFileSync } from "node:child_process";

function argVal(f) { const i = process.argv.indexOf(f); return i >= 0 ? process.argv[i + 1] : undefined; }
const STORE = argVal("--store") || process.env.SHOPIFY_STORE || "beefinthecity.myshopify.com";
const SHOPIFY_BIN = process.env.SHOPIFY_BIN || "shopify";
const SEED = argVal("--seed") || "preset-0";
const CHANNEL_MATCH = (argVal("--channel") || "headless").toLowerCase();
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

// 1) Find the Headless publication (sales channel)
const pubs = runGraphQL(`query { publications(first: 50) { nodes { id name } } }`).publications.nodes;
const channel = pubs.find(p => (p.name || "").toLowerCase().includes(CHANNEL_MATCH));
if (!channel) fail(`No sales channel matching "${CHANNEL_MATCH}". Found: ${pubs.map(p => p.name).join(", ")}`);

// 2) Find the product tagged cpseed:<seed>
const prods = runGraphQL(
  `query { products(first: 100, query: "tag:wooden-plaque") { nodes { id title status tags } } }`).products.nodes;
const prod = prods.find(p => (p.tags || []).includes(`cpseed:${SEED}`));
if (!prod) fail(`No product tagged cpseed:${SEED}. Run the seed script first.`);

console.log(`\nPublishing "${prod.title}" → channel "${channel.name}"…\n`);

// 3) Set Active
if (prod.status !== "ACTIVE") {
  const u = runGraphQL(
    `mutation { productUpdate(product: { id: ${J(prod.id)}, status: ACTIVE }) { product { id status } userErrors { field message } } }`,
    { mutation: true });
  checkUserErrors("productUpdate", u.productUpdate.userErrors);
  console.log("  ✓ set Active");
} else {
  console.log("  = already Active");
}

// 4) Publish to the Headless channel
const pub = runGraphQL(
  `mutation { publishablePublish(id: ${J(prod.id)}, input: [{ publicationId: ${J(channel.id)} }]) { userErrors { field message } } }`,
  { mutation: true });
checkUserErrors("publishablePublish", pub.publishablePublish.userErrors);
console.log(`  ✓ published to ${channel.name}`);

console.log(`\n✔ "${prod.title}" is live on the Storefront API. Test the Buy button on the site.\n`);
