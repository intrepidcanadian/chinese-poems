// Storefront configuration for selling physical wooden plaques via Shopify.
//
// The shop is DISABLED until you fill this in and flip `enabled` to true.
// While disabled, the Buy buttons and the "Design your own" preview still
// appear, but clicking Order shows a friendly "launching soon" message
// instead of starting a real checkout — so nothing can be sold by accident
// before your Shopify store and fulfilment are ready.
//
// You can create the products and fill in the IDs below automatically:
//   node scripts/seed-shopify.mjs        (see STORE-SETUP.md)
// or edit by hand. Setup steps live in STORE-SETUP.md.

const SHOP_CONFIG = {
  // Flip to true only once the store + products + fulfilment are ready.
  enabled: false,

  // From your Shopify admin:
  //   domain                — e.g. "your-store.myshopify.com"
  //   storefrontAccessToken — Settings → Apps → Develop apps → Storefront API
  //                           (this token is meant to be public / client-side)
  domain: "your-store.myshopify.com",
  storefrontAccessToken: "",

  // Display only (the real prices come from Shopify at checkout).
  currency: "$",
  presetPrice: "49",
  customPrice: "69",

  // Product IDs below are written automatically by
  // `node scripts/seed-shopify.mjs`. Avoid editing between the markers.
  //   variants        — maps each blessing phrase → Shopify variant GID
  //   customVariantId — the single "Custom engraved plaque" variant
  /* SEED:BEGIN */
  variants: {
  },
  customVariantId: ""
  /* SEED:END */
};
