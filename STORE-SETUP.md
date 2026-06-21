# Selling wooden plaques — setup guide

The site can sell physical wooden plaques (the preset blessings and a
custom-engraved option) through **Shopify**, which handles payment,
shipping, and tax. The storefront UI is already built; this guide covers
turning it on.

> **The shop ships DISABLED.** Until you complete the steps below and set
> `enabled: true` in `shop-config.js`, the Buy buttons show a "launching
> soon" message and no transaction can happen. The "Design your own"
> preview works regardless.

## Before you flip the switch — fulfilment first

Code is the easy part; making and shipping real plaques is the hard part.
Sort this out **before** going live:

- **Who makes them?** A laser/CNC engraving workshop, a local maker, or a
  print-on-demand partner that does wood. Confirm they can do Chinese
  characters and the custom text option.
- **Costs & lead time** per plaque, so your Shopify prices cover them.
- **Shipping** — domestic vs international, packaging for something rigid.
- **Returns/defects** policy, especially for custom (usually non-returnable).
- **Legal/tax** — business registration, and tax/VAT collection (Shopify
  can compute it, but you must be registered to collect it).

Until that's ready, consider running as **pre-order** (Shopify supports
this) or leaving the shop disabled and just collecting interest.

## Fast path: let the seed script create the products

Instead of adding products by hand, `scripts/seed-shopify.mjs` reads the 18
blessings from `plaques.js`, creates one **draft** product each (plus a
"Custom Engraved Plaque"), and writes the variant IDs into `shop-config.js`.

1. **Create an Admin API token** (this is a *secret*, different from the
   public Storefront token): Settings → Apps and sales channels → Develop
   apps → Create an app → **Configure Admin API scopes** → enable
   `write_products` (and `read_products`) → Install → copy the
   **Admin API access token** (`shpat_…`).
2. **Run it** (the token stays in your shell — never committed):
   ```sh
   SHOPIFY_STORE="your-store.myshopify.com" \
   SHOPIFY_ADMIN_TOKEN="shpat_xxxxx" \
   node scripts/seed-shopify.mjs
   ```
   Preview first with `node scripts/seed-shopify.mjs --dry-run` (no network,
   no writes). Re-running is safe — existing seeded products are reused, not
   duplicated.
3. **Add the Storefront token** to `shop-config.js` and set `enabled: true`
   (or pass `SHOPIFY_STOREFRONT_TOKEN=...` to the script to have it written
   and enabled for you).

Products are created as **Draft** — publish them in Shopify once fulfilment
is ready. Prefer to do it manually instead? Use the steps below.

## Manual setup

1. **Create a Shopify store** (Basic plan is fine to start).
2. **Add products:**
   - One product per preset blessing you want to sell (e.g. 家和万事兴).
   - One product called **"Custom engraved plaque"** for the designer.
3. **Create a Storefront API token:** Settings → Apps and sales channels →
   Develop apps → Create an app → Configure Storefront API scopes
   (`unauthenticated_read_product_listings`, `unauthenticated_write_checkouts`,
   `unauthenticated_read_checkouts`) → Install → copy the **Storefront API
   access token**.
4. **Get each variant's GID.** For a product, the variant ID looks like
   `gid://shopify/ProductVariant/1234567890`. You can read it from the
   product's admin URL/API, or the Storefront API.

## Fill in `shop-config.js`

```js
const SHOP_CONFIG = {
  enabled: true,                                   // turn the shop on
  domain: "your-store.myshopify.com",
  storefrontAccessToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  currency: "$",
  presetPrice: "49",
  customPrice: "69",
  variants: {
    "家和万事兴": "gid://shopify/ProductVariant/1111111111",
    "出入平安":   "gid://shopify/ProductVariant/2222222222"
    // ...one per preset you sell
  },
  customVariantId: "gid://shopify/ProductVariant/9999999999"
};
```

- Any preset **not** listed in `variants` simply shows "not available to
  order yet" — so you can launch a few designs and add more later.
- The custom designer attaches the buyer's characters to the order as a
  line-item property named **Engraving**, which your engraver reads from
  the Shopify order.

## How it behaves

- **Order a real wooden plaque** → creates a Shopify checkout with that
  preset and redirects to Shopify's hosted checkout.
- **Design your own** → opens the live wooden-plaque preview; the typed
  characters are sent as the custom engraving.
- The Shopify SDK is only loaded the first time someone checks out.

## Note on visuals

The on-site plaque is a CSS rendering, not a product photo. Add real
photos of the finished plaques to your Shopify product pages — physical
goods convert far better with real images.
