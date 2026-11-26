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
    // min_rows (6 for the cart), rows 8 is the old cart default.
    for (const width of [300, 500]) {
      list.push({ pointer, width, state: "arriving", lang: "cs", cart: "default", rows: 4 });
    }
    list.push({ pointer, width: 400, state: "none", lang: "en", cart: "many", rows: 8 });
    // The same fixed height set the pre-2024.11 way (layout_options.grid_rows).
    list.push({ pointer, width: 400, state: "arriving", lang: "cs", cart: "many", rows: 4, legacy: true });
  }
  return list;
}

/** Runs in the page: measures every card cell and returns problems found. */
function inspect({ fixed, touch }) {
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

    if (box.bottom > c.bottom + 1) {
      problems.push(`${tag}: spills ${round(box.bottom - c.bottom)}px below its cell (overlaps the next card)`);
    }
    if (fixed) {
      if (Math.abs(host.height - c.height) > 1) {
        problems.push(`${tag}: does not fill its fixed cell (${round(host.height)}px in ${round(c.height)}px)`);
      }
      if (!card.hasAttribute("fixed")) {
        problems.push(`${tag}: in a fixed cell but not marked fixed`);
      }
      // No block may be squeezed below its content (a scrolling flex column
      // shrinks blocks that clip their own overflow to 0 px). The cart's list
      // is the one block meant to shrink and scroll.
      for (const child of haCard.children) {
        if (child.classList.contains("lines")) continue;
        if (child.scrollHeight > child.offsetHeight + 1) {
          problems.push(`${tag}: .${[...child.classList].join(".") || child.tagName.toLowerCase()} squeezed to ${child.offsetHeight}px (content ${child.scrollHeight}px)`);
        }
      }
      // On touch the card itself may scroll, but nothing inside it: a nested
      // scroller swallows the swipe meant for the dashboard (PR #11).
      if (touch) {
        for (const el of haCard.querySelectorAll("*")) {
          const cs = getComputedStyle(el);
          if (cs.position === "fixed") continue;
          if (/auto|scroll/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 1) {
            problems.push(`${tag}: nested vertical scroller on touch (.${[...el.classList].join(".")})`);
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
      const problems = initError ? [`preview failed: ${initError}`] : await page.evaluate(inspect, { fixed: Boolean(s.rows), touch: s.pointer === "touch" });
      const label = `${s.pointer} ${s.width}px ${s.state} ${s.lang} cart=${s.cart}${s.rows ? ` rows=${s.rows}` : ""}${s.legacy ? " (layout_options)" : ""}`;
      for (const p of [...problems, ...errors]) failures.push(`${label}: ${p}`);
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
