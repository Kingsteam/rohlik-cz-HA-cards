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
    for (const cart of ["default", "many"]) {
      list.push({ pointer, width: 400, state: "arriving", lang: "cs", cart, rows: 4 });
    }
  }
  return list;
}

/** Runs in the page: measures every card cell and returns problems found. */
function inspect(fixed) {
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
      // Everything must stay reachable: overflow is scrolled, never painted outside.
      const overflowY = getComputedStyle(haCard).overflowY;
      if (haCard.scrollHeight > haCard.clientHeight + 1 && !/auto|scroll/.test(overflowY)) {
        // The cart keeps ha-card fixed and scrolls its list instead.
        const lines = haCard.querySelector(".lines");
        const listScrolls = lines && /auto|scroll/.test(getComputedStyle(lines).overflowY);
        if (!listScrolls) problems.push(`${tag}: content cut off (${haCard.scrollHeight}px in ${haCard.clientHeight}px, not scrollable)`);
      }
      if (tag === "rohlik-cart-card") {
        const lines = haCard.querySelector(".lines");
        const last = lines?.lastElementChild;
        if (lines && last) {
          lines.scrollTop = lines.scrollHeight;
          const l = lines.getBoundingClientRect();
          const r = last.getBoundingClientRect();
          if (r.bottom > l.bottom + 1 || l.bottom > c.bottom + 1) {
            problems.push(`rohlik-cart-card: last cart line can't be scrolled into view`);
          }
          lines.scrollTop = 0;
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

  // No two cells may overlap.
  for (let a = 0; a < rects.length; a++) {
    for (let b = a + 1; b < rects.length; b++) {
      const r1 = rects[a];
      const r2 = rects[b];
      const overlap = r1.left < r2.right - 1 && r2.left < r1.right - 1 && r1.top < r2.bottom - 1 && r2.top < r1.bottom - 1;
      if (overlap) problems.push(`${cells[a].dataset.tag} and ${cells[b].dataset.tag} cells overlap`);
    }
  }
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
      });
      await page.goto(`http://127.0.0.1:${PORT}/docs/dev/preview/index.html?${query}`);
      await page.waitForFunction(
        () => window.__PREVIEW_READY__ === true || typeof window.__PREVIEW_ERROR__ === "string",
        { timeout: 15000 },
      );
      // Let the cart's todo list load and re-render.
      await page.waitForTimeout(250);
      const initError = await page.evaluate(() => window.__PREVIEW_ERROR__ || null);
      const problems = initError ? [`preview failed: ${initError}`] : await page.evaluate(inspect, Boolean(s.rows));
      const label = `${s.pointer} ${s.width}px ${s.state} ${s.lang} cart=${s.cart}${s.rows ? ` rows=${s.rows}` : ""}`;
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
