import { css } from "lit";

/**
 * Shared styles for every Rohlík card/badge. Only Home Assistant CSS
 * variables are used for colour, plus `--rohlik-accent` (defaults to
 * `--primary-color`) so a per-card `accent` config option can override the
 * accent without touching the rest of the theme.
 */
export const sharedStyles = css`
  :host {
    --rohlik-accent: var(--primary-color);
    display: block;
    /* Lets cards adapt to their own width with @container queries. */
    container-type: inline-size;
  }

  ha-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: var(--ha-space-4, 16px);
    box-sizing: border-box;
    /* NOT a scroll container by default. On touch, a scrollable card eats
       the swipe before the dashboard view gets it, so the page stops
       scrolling. Cards are content-sized (rows "auto") instead. */
  }

  /* Only when the user picked a fixed height (see RohlikBaseCard.fixedHeight):
     fill the cell and scroll inside rather than paint over the next card.
     In a sections view (in-grid) a content-sized card also fills its cell,
     which the grid stretches to the tallest card of the row. Elsewhere
     (masonry, stacks) the card keeps its content height, so a parent that
     sets a height (e.g. a horizontal stack) can never squeeze it. */
  :host([fixed]),
  :host([in-grid]) {
    height: 100%;
  }

  :host([fixed]) ha-card {
    overflow-y: auto;
    /* overflow-y: auto would make overflow-x auto too; never scroll sideways. */
    overflow-x: hidden;
  }

  /* In a scrolling flex column, blocks that clip their own overflow (chip
     rows, progress tracks) would shrink to 0 px; keep every block at its
     content height and let the card scroll instead. */
  :host([fixed]) ha-card > * {
    flex-shrink: 0;
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--ha-space-2, 8px);
    font-size: var(--ha-font-size-l, 16px);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--primary-text-color);
    margin-bottom: var(--ha-space-2, 8px);
  }

  .header ha-icon,
  .header ha-svg-icon {
    color: var(--rohlik-accent);
    --mdc-icon-size: 24px;
  }

  .header .title {
    flex: 1 1 auto;
    min-width: 4em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 10px;
    border-radius: var(--ha-border-radius-pill, 9999px);
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: var(--ha-line-height-normal, 1.6);
    white-space: nowrap;
  }

  .chip.ok {
    color: var(--success-color, #4caf50);
    background: color-mix(in srgb, var(--success-color, #4caf50) 15%, transparent);
  }

  .chip.warn {
    color: var(--warning-color, #ff9800);
    background: color-mix(in srgb, var(--warning-color, #ff9800) 15%, transparent);
  }

  .chip.err {
    color: var(--error-color, #db4437);
    background: color-mix(in srgb, var(--error-color, #db4437) 15%, transparent);
  }

  .chip.neutral {
    color: var(--secondary-text-color);
    background: color-mix(in srgb, var(--secondary-text-color) 15%, transparent);
  }

  .big {
    font-size: var(--ha-font-size-3xl, 28px);
    font-weight: 600;
    color: var(--primary-text-color);
    line-height: var(--ha-line-height-condensed, 1.2);
  }

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    border-bottom: 1px solid var(--divider-color);
  }

  .row:last-child {
    border-bottom: none;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 6px 14px;
    /* HA's own buttons are pills. */
    border-radius: var(--ha-border-radius-pill, 9999px);
    /* <button> is border-box by default, a link styled as .btn is not: with
       width: 100% (narrow cards) its padding would stick out of the card. */
    box-sizing: border-box;
    border: none;
    background: var(--rohlik-accent);
    color: var(--text-primary-color, #fff);
    font-family: inherit;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    cursor: pointer;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .btn.ghost {
    background: transparent;
    color: var(--rohlik-accent);
    border: 1px solid var(--rohlik-accent);
  }

  .footer {
    /* Sticks to the bottom of the card when the grid gives it extra height. */
    margin-top: auto;
    padding-top: 8px;
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 12px);
  }

  .footer.stale {
    color: var(--warning-color, #ff9800);
  }

  .error {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: var(--ha-border-radius-md, 8px);
    color: var(--error-color, #db4437);
    background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
    font-size: var(--ha-font-size-m, 14px);
  }
`;
