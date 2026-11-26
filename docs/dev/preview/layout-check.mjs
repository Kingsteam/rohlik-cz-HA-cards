#!/usr/bin/env node
/**
 * Layout regression check for issue #13 ("Dashboard cards overlap").
 *
 * Loads the preview in `?grid=sections` mode — a replica of Home Assistant's
 * sections grid (hui-grid-section.ts: numeric rows give a cell a fixed height,
 * "auto" sizes it to the content; cards sit in an unstyled inline <hui-card>)
 * — and asserts, for every card:
 *
 * - default (content-sized) mode: the cell is exactly as tall as the card, so
 *   nothing spills over the next card or leaves an empty band, and the card
 *   itself is not a scroll container;
 * - forced fixed height (`rows=4`, as if picked in the card editor): the card
 *   fills its cell and keeps everything inside it (scrolling where needed),
 *   and the cart's last line can be scrolled into view.
 *
 * Runs across section widths, delivery states, languages, mouse and touch,
 * and an empty / default / 40-item cart.
 *
 * Run: npm run check:layout (after npm run build)
 */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../..");
const PORT = 4175;

function chromiumPath() {
  if (process.env.PLAYWRIGHT_CHROMIUM_PATH) return process.env.PLAYWRIGHT_CHROMIUM_PATH;
  if (existsSync("/opt/pw-browsers/chromium")) return "/opt/pw-browsers/chromium";
  return undefined;
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
};

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      const filePath = path.join(REPO_ROOT, urlPath);
      if (!filePath.startsWith(REPO_ROOT)) throw new Error("outside repo root");
      const body = await readFile(filePath);
      res.writeHead(200, { "content-type": MIME[path.extname(filePath)] || "application/octet-stream" });
      res.end(body);
    } catch (err) {
      res.writeHead(404);
      res.end(String(err));
    }
  });
  return new Promise((resolve) => server.listen(PORT, "127.0.0.1", () => resolve(server)));
}

/** The scenarios: every state at three widths, plus language, cart and fixed-height variants. */
function scenarios() {
  const list = [];
  for (const pointer of ["mouse", "touch"]) {
    for (const width of [300, 400, 500]) {
      for (const state of ["arriving", "ordered", "none", "delivered"]) {
        list.push({ pointer, width, state, lang: "cs", cart: "default" });
      }
    }
    list.push({ pointer, width: 400, state: "arriving", lang: "en", cart: "default" });
    for (const cart of ["empty", "many"]) {
      list.push({ pointer, width: 400, state: "arriving", lang: "cs", cart });
    }
    for (const cart of ["empty", "default", "many"]) {
      list.push({ pointer, width: 400, state: "arriving", lang: "cs", cart, rows: 4 });
    }
    // Other fixed heights and widths: rows 4 is clamped to each card's
    // min_rows, rows 8 is the old cart default.
    for (const width of [300, 500]) {
      list.push({ pointer, width, state: "arriving", lang: "cs", cart: "default", rows: 4 });
    }
    list.push({ pointer, width: 400, state: "none", lang: "en", cart: "many", rows: 8 });
    // Compact delivery card: its own default is a fixed 2 rows.
    list.push({ pointer, width: 400, state: "arriving", lang: "cs", cart: "default", compact: true });
    // Compact at phone width (a 360 px phone has a ~340 px section).
    list.push({ pointer, width: 300, state: "none", lang: "cs", cart: "default", compact: true });
    // Compact with only a user-chosen width: still its own fixed 2 rows (HA merges).
    list.push({ pointer, width: 400, state: "none", lang: "cs", cart: "default", compact: true, compactcols: 12 });
    // Two content-sized cards sharing a row: both fill the row's height.
    list.push({ pointer, width: 600, state: "arriving", lang: "cs", cart: "default", pair: true });
    // The same fixed height set the pre-2024.11 way (layout_options.grid_rows).
    list.push({ pointer, width: 400, state: "arriving", lang: "cs", cart: "many", rows: 4, legacy: true });
  }
  return list;
}

/** Runs in the page: measures every card cell and returns problems found. */
function inspect({ touch }) {
  const problems = [];
  const cells = [...document.querySelectorAll("#ha-section .card")];
  if (cells.length === 0) return ["no cards rendered in the sections replica"];
  const rects = cells.map((cell) => cell.getBoundingClientRect());

  cells.forEach((cell, i) => {
    const tag = cell.dataset.tag;
    const card = cell.querySelector(tag);
    const haCard = card?.shadowRoot?.querySelector("ha-card");
    if (!haCard) {
      problems.push(`${tag}: not rendered`);
      return;
    }
    const c = rects[i];
    const host = card.getBoundingClientRect();
    const box = haCard.getBoundingClientRect();
    const round = (n) => Math.round(n);

    // A compact delivery card must keep its headline readable at any width.
    const compactBig = haCard.querySelector(".compact-row .big");
    if (compactBig && compactBig.clientWidth < 30) {
      problems.push(`${tag}: compact headline squeezed to ${compactBig.clientWidth}px`);
    }
    if (haCard.scrollWidth > haCard.clientWidth + 1) {
      problems.push(`${tag}: content wider than the card (${haCard.scrollWidth}px in ${haCard.clientWidth}px)`);
    }
    if (box.bottom > c.bottom + 1) {
      problems.push(`${tag}: spills ${round(box.bottom - c.bottom)}px below its cell (overlaps the next card)`);
    }
    // A cell is fixed when it has a numeric row count (`fit-rows`), whether
    // the user forced it or it is the card's own default.
    if (cell.classList.contains("fit-rows")) {
      if (Math.abs(host.height - c.height) > 1) {
        problems.push(`${tag}: does not fill its fixed cell (${round(host.height)}px in ${round(c.height)}px)`);
      }
      if (!card.hasAttribute("fixed")) {
        problems.push(`${tag}: in a fixed cell but not marked fixed`);
      }
      // No block may be squeezed below its content (a scrolling flex column
      // shrinks blocks that clip their own overflow to 0 px).
      for (const child of haCard.children) {
        if (child.scrollHeight > child.offsetHeight + 1) {
          problems.push(`${tag}: .${[...child.classList].join(".") || child.tagName.toLowerCase()} squeezed to ${child.offsetHeight}px (content ${child.scrollHeight}px)`);
        }
      }
      // The card itself may scroll, but nothing inside it: on touch a nested
      // scroller swallows the swipe meant for the dashboard (PR #11), and on
      // any device two nested scrollers are clumsy.
      {
        for (const el of haCard.querySelectorAll("*")) {
          const cs = getComputedStyle(el);
          if (cs.position === "fixed") continue;
          if (/auto|scroll/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 1) {
            problems.push(`${tag}: nested vertical scroller (.${[...el.classList].join(".")})${touch ? " on touch" : ""}`);
          }
        }
      }
      // Everything must stay reachable: overflow is scrolled, never painted outside.
      const overflowY = getComputedStyle(haCard).overflowY;
      if (haCard.scrollHeight > haCard.clientHeight + 1 && !/auto|scroll/.test(overflowY)) {
        problems.push(`${tag}: content cut off (${haCard.scrollHeight}px in ${haCard.clientHeight}px, not scrollable)`);
      }
      // The card's last block (the footer) can be scrolled into view inside the cell.
      const lastBlock = haCard.lastElementChild;
      if (lastBlock) {
        haCard.scrollTop = haCard.scrollHeight;
        const r = lastBlock.getBoundingClientRect();
        const h = haCard.getBoundingClientRect();
        if (r.bottom > h.bottom + 1 || h.bottom > c.bottom + 1) {
          problems.push(`${tag}: footer can't be scrolled into view (${round(r.bottom - h.bottom)}px below)`);
        }
        haCard.scrollTop = 0;
      }
      if (tag === "rohlik-cart-card") {
        const lines = haCard.querySelector(".lines");
        const last = lines?.lastElementChild;
        if (lines && last) {
          // At least one line must be visible, not a 0 px list.
          if (lines.clientHeight < last.getBoundingClientRect().height - 1) {
            problems.push(`rohlik-cart-card: item list only ${lines.clientHeight}px tall (no line fits)`);
          }
          // Reach it the way a user would: whichever of the list and the card
          // scrolls (on touch only the card does) scrolls it into view.
          last.scrollIntoView({ block: "nearest" });
          const l = lines.getBoundingClientRect();
          const r = last.getBoundingClientRect();
          const h = haCard.getBoundingClientRect();
          if (r.bottom > l.bottom + 1 || r.bottom > h.bottom + 1 || r.top < h.top - 1) {
            problems.push(`rohlik-cart-card: last cart line can't be scrolled into view`);
          }
          lines.scrollTop = 0;
          haCard.scrollTop = 0;
        }
      }
    } else {
      if (Math.abs(c.height - host.height) > 1) {
        problems.push(`${tag}: cell ${round(c.height)}px vs card ${round(host.height)}px (should be content-sized)`);
      }
      if (haCard.scrollHeight > haCard.clientHeight + 1) {
        problems.push(`${tag}: card content overflows (${haCard.scrollHeight}px in ${haCard.clientHeight}px)`);
      }
    }
  });

  // No card may paint over another card's cell. Re-measure: the reachability
  // checks above may have scrolled the page.
  window.scrollTo(0, 0);
  const cellRects = cells.map((cell) => cell.getBoundingClientRect());
  cells.forEach((cell, a) => {
    const haCard = cell.querySelector(cell.dataset.tag)?.shadowRoot?.querySelector("ha-card");
    if (!haCard) return;
    const box = haCard.getBoundingClientRect();
    cellRects.forEach((r2, b) => {
      if (a === b) return;
      const overlap = box.left < r2.right - 1 && r2.left < box.right - 1 && box.top < r2.bottom - 1 && r2.top < box.bottom - 1;
      if (overlap) problems.push(`${cell.dataset.tag} paints over ${cells[b].dataset.tag}`);
    });
  });
  return problems;
}

async function main() {
  const server = await startServer();
  const browser = await chromium.launch({ executablePath: chromiumPath() });
  const failures = [];
  let checked = 0;

  try {
    for (const s of scenarios()) {
      const context = await browser.newContext({
        viewport: { width: Math.max(s.width + 100, 420), height: 900 },
        hasTouch: s.pointer === "touch",
        isMobile: s.pointer === "touch",
        timezoneId: "Europe/Prague",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (err) => errors.push(String(err.message || err)));
      const query = new URLSearchParams({
        grid: "sections",
        width: String(s.width),
        state: s.state,
        lang: s.lang,
        cart: s.cart,
        ...(s.rows ? { rows: String(s.rows) } : {}),
        ...(s.legacy ? { legacy: "1" } : {}),
        ...(s.compact ? { compact: "1" } : {}),
        ...(s.compactcols ? { compactcols: String(s.compactcols) } : {}),
        ...(s.pair ? { pair: "1" } : {}),
      });
      await page.goto(`http://127.0.0.1:${PORT}/docs/dev/preview/index.html?${query}`);
      await page.waitForFunction(
        () => window.__PREVIEW_READY__ === true || typeof window.__PREVIEW_ERROR__ === "string",
        { timeout: 15000 },
      );
      // Wait for the cart's todo list to load and render (no fixed sleep).
      if (s.cart !== "empty") {
        await page.waitForFunction(
          () => !!document.querySelector("rohlik-cart-card")?.shadowRoot?.querySelector(".lines .line, .lines > *"),
          { timeout: 10000 },
        );
      }
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const initError = await page.evaluate(() => window.__PREVIEW_ERROR__ || null);
      const problems = initError ? [`preview failed: ${initError}`] : await page.evaluate(inspect, { touch: s.pointer === "touch" });
      const label = `${s.pointer} ${s.width}px ${s.state} ${s.lang} cart=${s.cart}${s.rows ? ` rows=${s.rows}` : ""}${s.legacy ? " (layout_options)" : ""}${s.compact ? " compact" : ""}${s.compactcols ? ` cols=${s.compactcols}` : ""}${s.pair ? " pair" : ""}`;
      for (const p of [...problems, ...errors]) failures.push(`${label}: ${p}`);
      checked++;
      await context.close();
    }
    // The cart's search popover (position: fixed) must follow the search box
    // when a fixed-height card scrolls itself (touch: only the card scrolls).
    {
      const context = await browser.newContext({ viewport: { width: 600, height: 1400 }, hasTouch: true, isMobile: true });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (err) => errors.push(String(err.message || err)));
      await page.goto(`http://127.0.0.1:${PORT}/docs/dev/preview/index.html?grid=sections&width=400&rows=6&cart=many`);
      await page.waitForFunction(() => window.__PREVIEW_READY__ === true, { timeout: 15000 });
      await page.waitForFunction(() => !!document.querySelector("rohlik-cart-card")?.shadowRoot?.querySelector(".lines > *"));
      await page.locator("rohlik-cart-card").locator("input").first().fill("mléko");
      await page.waitForFunction(
        () => !!document.querySelector("rohlik-cart-card")?.shadowRoot?.querySelector(".search-popover .row"),
        { timeout: 5000 },
      );
      const gap = () =>
        page.evaluate(() => {
          const r = document.querySelector("rohlik-cart-card").shadowRoot;
          return r.querySelector(".search-popover").getBoundingClientRect().top - r.querySelector(".search-box").getBoundingClientRect().bottom;
        });
      const before = await gap();
      const scrolled = await page.evaluate(() => {
        const card = document.querySelector("rohlik-cart-card").shadowRoot.querySelector("ha-card");
        card.scrollTop = 80;
        return card.scrollTop;
      });
      await page.waitForTimeout(100);
      const after = await gap();
      const label = "popover: touch rows=6 cart=many";
      if (scrolled <= 0) failures.push(`${label}: the card didn't scroll, so the check proves nothing`);
      if (Math.abs(after - before) > 1) {
        failures.push(`${label}: search popover detaches when the card scrolls (${Math.round(after - before)}px)`);
      }
      // Scrolled out of the card the results hide; scrolled back they return.
      const popoverShown = () =>
        page.evaluate(() => !!document.querySelector("rohlik-cart-card").shadowRoot.querySelector(".search-popover"));
      const setScroll = (y) =>
        page.evaluate((top) => {
          document.querySelector("rohlik-cart-card").shadowRoot.querySelector("ha-card").scrollTop = top;
        }, y);
      await setScroll(600);
      await page.waitForTimeout(100);
      if (await popoverShown()) failures.push(`${label}: results drawn while the search box is scrolled out of the card`);
      // Hidden results must not stay keyboard-active.
      await page.locator("rohlik-cart-card").locator("input").first().press("ArrowDown");
      const aria = await page.evaluate(() => {
        const input = document.querySelector("rohlik-cart-card").shadowRoot.querySelector("input");
        return { expanded: input.getAttribute("aria-expanded"), active: input.getAttribute("aria-activedescendant") };
      });
      if (aria.expanded !== "false" || aria.active) {
        failures.push(`${label}: hidden results still keyboard-active (aria-expanded=${aria.expanded}, activedescendant=${aria.active})`);
      }
      await setScroll(0);
      await page.waitForTimeout(100);
      if (!(await popoverShown())) failures.push(`${label}: results don't come back when the search box scrolls back`);
      for (const e of errors) failures.push(`${label}: ${e}`);
      checked++;
      await context.close();
    }
    // Outside sections: HA's horizontal stack stretches each hui-card wrapper
    // to the tallest card. Every card must fill that slot (no band below), and
    // a parent with a set height must never squeeze a card below its content.
    {
      const context = await browser.newContext({ viewport: { width: 900, height: 1600 } });
      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:${PORT}/docs/dev/preview/index.html?state=arriving&cart=many`);
      await page.waitForFunction(() => window.__PREVIEW_READY__ === true, { timeout: 15000 });
      await page.waitForFunction(() => !!document.querySelector("rohlik-cart-card")?.shadowRoot?.querySelector(".lines > *"));
      const problems = await page.evaluate(async () => {
        const found = [];
        const row = document.createElement("div");
        row.style.cssText = "display:flex;width:700px;gap:8px";
        document.body.prepend(row);
        for (const tag of ["rohlik-delivery-card", "rohlik-account-card"]) {
          const wrapper = document.createElement("hui-card");
          wrapper.style.cssText = "flex:1 1 0;min-width:0";
          wrapper.appendChild(document.getElementById(tag).firstElementChild);
          row.appendChild(wrapper);
        }
        for (const card of row.querySelectorAll("rohlik-delivery-card, rohlik-account-card")) {
          const ha = card.shadowRoot.querySelector("ha-card");
          if (Math.abs(card.parentElement.offsetHeight - ha.offsetHeight) > 1) {
            found.push(`${card.tagName.toLowerCase()}: ${ha.offsetHeight}px in a ${card.parentElement.offsetHeight}px stack slot`);
          }
        }
        // A parent with a set height outside any sections cell: no squeeze.
        const squeeze = document.createElement("div");
        squeeze.style.cssText = "display:flex;height:200px;width:600px";
        document.body.prepend(squeeze);
        const slotsWrapper = document.createElement("hui-card");
        slotsWrapper.style.cssText = "flex:1;min-width:0";
        const slots = document.getElementById("rohlik-slots-card").firstElementChild;
        slotsWrapper.appendChild(slots);
        squeeze.appendChild(slotsWrapper);
        const slotsHa = slots.shadowRoot.querySelector("ha-card");
        if (slotsHa.scrollHeight > slotsHa.clientHeight + 1) {
          found.push(`rohlik-slots-card: squeezed by a 200px parent (${slotsHa.scrollHeight}px in ${slotsHa.clientHeight}px)`);
        }
        // A horizontal stack inside a fixed 4-row sections cell (HA doesn't
        // pass layout to nested cards): the cart must stay inside the cell
        // and scroll, not paint over the cells below.
        const cell = document.createElement("div");
        cell.className = "card fit-rows";
        cell.style.cssText = "display:block;height:248px;width:600px";
        const stack = document.createElement("div");
        stack.style.cssText = "display:flex;height:100%";
        const cartWrapper = document.createElement("hui-card");
        cartWrapper.style.cssText = "flex:1 1 0;min-width:0";
        const cart = document.getElementById("rohlik-cart-card").firstElementChild;
        cartWrapper.appendChild(cart);
        stack.appendChild(cartWrapper);
        cell.appendChild(stack);
        document.body.prepend(cell);
        cart.requestUpdate();
        await cart.updateComplete;
        const cartHa = cart.shadowRoot.querySelector("ha-card");
        const c = cell.getBoundingClientRect();
        const h = cartHa.getBoundingClientRect();
        if (!cart.hasAttribute("fixed")) found.push("rohlik-cart-card: in a stack in a fixed cell but not marked fixed");
        if (h.bottom > c.bottom + 1) {
          found.push(`rohlik-cart-card: in a stack in a fixed cell, spills ${Math.round(h.bottom - c.bottom)}px below it`);
        }
        return found;
      });
      for (const p of problems) failures.push(`stack: ${p}`);
      checked++;
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (failures.length) {
    console.error(`Layout check FAILED (${failures.length} problem(s) in ${checked} scenarios):`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`Layout check passed: ${checked} scenarios, no card spills over or leaves its sections cell.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
