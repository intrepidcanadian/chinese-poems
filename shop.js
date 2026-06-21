/* Storefront behaviour — wires the Buy buttons and the custom-plaque
   designer to Shopify checkout.

   Safe by default: if the shop is disabled (see shop-config.js) or a
   product isn't mapped yet, clicking Order shows a "launching soon"
   message instead of starting a transaction. The Shopify SDK is only
   loaded on demand, the first time a real checkout is attempted. */

(function () {
  "use strict";

  const cfg = (typeof SHOP_CONFIG !== "undefined") ? SHOP_CONFIG : { enabled: false };
  const SDK_URL = "https://sdks.shopifycdn.com/js-buy-sdk/v2/latest/index.umd.min.js";

  // ---- Small transient message ----
  let toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "shop-toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3200);
  }

  // ---- Shopify SDK (loaded lazily) ----
  let sdkPromise = null;
  function loadSDK() {
    if (window.ShopifyBuy) return Promise.resolve(window.ShopifyBuy);
    if (sdkPromise) return sdkPromise;
    sdkPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = SDK_URL;
      s.async = true;
      s.onload = () => window.ShopifyBuy ? resolve(window.ShopifyBuy) : reject(new Error("SDK missing"));
      s.onerror = () => reject(new Error("Could not load the store. Check your connection."));
      document.head.appendChild(s);
    });
    return sdkPromise;
  }

  // ---- Checkout ----
  async function checkout(lineItems, btn) {
    if (!cfg.enabled) {
      toast("Our shop is launching soon — thanks for your interest!");
      return;
    }
    const label = btn ? btn.textContent : null;
    if (btn) { btn.disabled = true; btn.textContent = "Opening checkout…"; }
    try {
      const SB = await loadSDK();
      const client = SB.buildClient({
        domain: cfg.domain,
        storefrontAccessToken: cfg.storefrontAccessToken
      });
      const co = await client.checkout.create();
      await client.checkout.addLineItems(co.id, lineItems);
      window.location.href = co.webUrl;
    } catch (err) {
      toast(err.message || "Something went wrong starting checkout.");
      if (btn) { btn.disabled = false; if (label) btn.textContent = label; }
    }
  }

  function buyPreset(phrase, btn) {
    const variantId = cfg.variants && cfg.variants[phrase];
    if (cfg.enabled && !variantId) {
      toast("This design isn't available to order yet.");
      return;
    }
    checkout([{ variantId, quantity: 1 }], btn);
  }

  function buyCustom(text, btn) {
    const value = (text || "").trim();
    if (!value) { toast("Type the characters you'd like engraved."); return; }
    checkout([{
      variantId: cfg.customVariantId,
      quantity: 1,
      customAttributes: [{ key: "Engraving", value: value }]
    }], btn);
  }

  // ---- Custom-plaque designer ----
  const sheet = document.getElementById("designSheet");
  const phraseEl = document.getElementById("designPhrase");
  const input = document.getElementById("designInput");
  const buyBtn = document.getElementById("designBuy");
  const priceEl = sheet ? sheet.querySelector(".design-price") : null;

  function renderPreview() {
    const chars = Array.from((input.value || "").trim());
    phraseEl.innerHTML = chars.length
      ? chars.map(c => `<span>${escapeHtml(c)}</span>`).join("")
      : `<span class="design-placeholder">福</span>`;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function openDesigner(seed) {
    if (!sheet) return;
    input.value = seed || "";
    renderPreview();
    if (priceEl) priceEl.textContent = cfg.currency + (cfg.customPrice || "");
    sheet.hidden = false;
    setTimeout(() => input.focus(), 30);
  }
  function closeDesigner() { if (sheet) sheet.hidden = true; }

  if (input) input.addEventListener("input", renderPreview);
  if (buyBtn) buyBtn.addEventListener("click", () => buyCustom(input.value, buyBtn));
  if (sheet) {
    sheet.addEventListener("click", e => { if (e.target === sheet) closeDesigner(); });
    const closeBtn = document.getElementById("designClose");
    if (closeBtn) closeBtn.addEventListener("click", closeDesigner);
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !sheet.hidden) closeDesigner();
    });
  }

  // ---- Delegated clicks from the rendered plaque ----
  document.addEventListener("click", e => {
    const buy = e.target.closest(".buy-plaque");
    if (buy) { buyPreset(buy.dataset.phrase, buy); return; }
    const design = e.target.closest(".design-own");
    if (design) { openDesigner(design.dataset.seed || ""); return; }
  });
})();
