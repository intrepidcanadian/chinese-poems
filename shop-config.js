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
  enabled: true,

  // From your Shopify admin:
  //   domain                — e.g. "your-store.myshopify.com"
  //   storefrontAccessToken — Settings → Apps → Develop apps → Storefront API
  //                           (this token is meant to be public / client-side)
  domain: "blessingboard.myshopify.com",
  storefrontAccessToken: "06180a9405fd627946a76241f8af33e0",

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
    "家和万事兴": "gid://shopify/ProductVariant/49288100315363",
    "出入平安": "gid://shopify/ProductVariant/49288100413667",
    "紫气东来": "gid://shopify/ProductVariant/49288100577507",
    "五福临门": "gid://shopify/ProductVariant/49288100708579",
    "招财进宝": "gid://shopify/ProductVariant/49288100806883",
    "金玉满堂": "gid://shopify/ProductVariant/49288100937955",
    "鸿运当头": "gid://shopify/ProductVariant/49288101036259",
    "吉祥如意": "gid://shopify/ProductVariant/49288101167331",
    "万事如意": "gid://shopify/ProductVariant/49288101298403",
    "万象更新": "gid://shopify/ProductVariant/49288101429475",
    "竹报平安": "gid://shopify/ProductVariant/49288101527779",
    "国泰民安": "gid://shopify/ProductVariant/49288101658851",
    "福寿康宁": "gid://shopify/ProductVariant/49288101789923",
    "一帆风顺": "gid://shopify/ProductVariant/49288101888227",
    "室雅人和": "gid://shopify/ProductVariant/49288102019299",
    "厚德载物": "gid://shopify/ProductVariant/49288102117603",
    "上善若水": "gid://shopify/ProductVariant/49288102248675",
    "宁静致远": "gid://shopify/ProductVariant/49288102379747"
  },
  customVariantId: "gid://shopify/ProductVariant/49288102543587"
  /* SEED:END */
};
