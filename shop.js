/* Storefront behaviour — wires the Buy buttons and the custom-plaque
   designer to Shopify checkout.

   Safe by default: if the shop is disabled (see shop-config.js) or a
   product isn't mapped yet, clicking Order shows a "launching soon"
   message instead of starting a transaction. The Shopify SDK is only
   loaded on demand, the first time a real checkout is attempted. */

(function () {
  "use strict";

  const cfg = (typeof SHOP_CONFIG !== "undefined") ? SHOP_CONFIG : { enabled: false };
  const API_VERSION = "2025-10";

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

  // ---- Storefront API (Cart) ----
  async function storefront(query, variables) {
    const res = await fetch(`https://${cfg.domain}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": cfg.storefrontAccessToken
      },
      body: JSON.stringify({ query, variables })
    });
    if (!res.ok) throw new Error(`Store request failed (${res.status}).`);
    return res.json();
  }

  const CART_CREATE = `mutation cartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl totalQuantity }
      userErrors { field message }
    }
  }`;

  // A "soon / sold out" failure is expected pre-launch; show a gentle message.
  const SOON_RE = /does not exist|not available|availableForSale|sold out|inventory|out of stock/i;

  async function checkout(line, btn) {
    if (!cfg.enabled) {
      toast("Our shop is launching soon — thanks for your interest!");
      return;
    }
    if (!line.merchandiseId) { toast("This design isn't available to order yet."); return; }
    const label = btn ? btn.textContent : null;
    if (btn) { btn.disabled = true; btn.textContent = "Opening checkout…"; }
    const restore = () => { if (btn) { btn.disabled = false; if (label) btn.textContent = label; } };
    try {
      const json = await storefront(CART_CREATE, {
        lines: [{ merchandiseId: line.merchandiseId, quantity: line.quantity || 1, attributes: line.attributes || [] }]
      });
      const data = json.data && json.data.cartCreate;
      const cart = data && data.cart;
      // A sold-out / unpublished variant doesn't error — Shopify drops the line
      // to quantity 0 and still returns a checkout URL (an empty cart). Only
      // redirect when the item actually made it into the cart.
      if (cart && cart.totalQuantity > 0 && cart.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
        return;
      }
      const msg = (data && data.userErrors && data.userErrors[0] && data.userErrors[0].message) ||
        (json.errors && json.errors[0] && json.errors[0].message) || "";
      if (!cart || cart.totalQuantity === 0 || SOON_RE.test(msg)) {
        toast("Coming soon — this plaque isn't available to order yet.");
      } else {
        toast(msg || "Couldn't start checkout. Please try again.");
      }
      restore();
    } catch (err) {
      toast(err.message || "Couldn't start checkout.");
      restore();
    }
  }

  function buyPreset(phrase, btn) {
    checkout({ merchandiseId: cfg.variants && cfg.variants[phrase], quantity: 1 }, btn);
  }

  function buyCustom(text, btn) {
    const value = (text || "").trim();
    if (!value) { toast("Type the characters you'd like engraved."); return; }
    checkout({ merchandiseId: cfg.customVariantId, quantity: 1, attributes: [{ key: "Engraving", value }] }, btn);
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
