import { css } from "lit";

/**
 * `rohlik-delivery-card`-specific styles, layered on top of
 * `core/styles.ts#sharedStyles` (chips, `.row`, `.big`, `.btn`, `.error`, …).
 */
export const deliveryCardStyles = css`
  .header {
    cursor: pointer;
  }

  /* Courier close (last mile) / at the door: tint the card's own border,
     which ha-card draws from these variables. */
  ha-card.last-mile {
    --ha-card-border-color: var(--rohlik-accent, var(--primary-color));
    --ha-card-border-width: 2px;
  }

  ha-card.at-door {
    --ha-card-border-color: var(--warning-color, #ff9800);
    --ha-card-border-width: 2px;
  }

  ha-card.last-mile .headline .big {
    color: var(--rohlik-accent, var(--primary-color));
  }

  ha-card.at-door .headline .big {
    color: var(--warning-color, #ff9800);
  }

  .header.static {
    cursor: default;
  }

  .header:focus-visible,
  .compact-row:focus-visible {
    outline: 2px solid var(--rohlik-accent, var(--primary-color));
    outline-offset: 2px;
  }

  /* The title keeps a floor and the chips shrink (wrapping) first, so three
     chips can never squeeze the title to zero width in a mid-width card. */
  .header .title {
    flex: 1 1 auto;
    min-width: 5em;
  }

  .chips {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    flex: 0 1 auto;
    min-width: 0;
    flex-wrap: wrap;
  }

  .headline {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin: 4px 0 2px;
  }

  .caption {
    display: block;
    color: var(--secondary-text-color);
    font-size: 13px;
    margin: 0 0 4px;
  }

  .sub {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
    margin-bottom: 4px;
  }

  .track-wrap {
    margin: 16px 0 6px;
  }

  /* Tracking stepper: four dots on a line, done ones filled with the accent. */
  .steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    list-style: none;
    margin: var(--ha-space-3, 12px) 0 var(--ha-space-1, 4px);
    padding: 0;
  }

  .step {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--ha-space-1, 4px);
    min-width: 0;
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-xs, 10px);
    text-align: center;
  }

  /* Connector to the previous step. */
  .step + .step::before {
    content: "";
    position: absolute;
    top: 4px;
    inset-inline-end: 50%;
    width: 100%;
    height: 2px;
    background: var(--divider-color);
  }

  .step.done + .step::before,
  .step.done + .step.current::before {
    background: var(--rohlik-accent, var(--primary-color));
  }

  .step .dot {
    position: relative;
    z-index: 1;
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    border-radius: var(--ha-border-radius-circle, 50%);
    border: 2px solid var(--divider-color);
    background: var(--card-background-color, #fff);
  }

  .step.done .dot,
  .step.current .dot {
    border-color: var(--rohlik-accent, var(--primary-color));
    background: var(--rohlik-accent, var(--primary-color));
  }

  .step.current .dot {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--rohlik-accent, var(--primary-color)) 25%, transparent);
  }

  .step.current {
    color: var(--primary-text-color);
    font-weight: var(--ha-font-weight-medium, 500);
  }

  .step-label {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tracking-facts {
    display: flex;
    align-items: center;
    gap: var(--ha-space-2, 8px);
    margin: var(--ha-space-2, 8px) 0 var(--ha-space-1, 4px);
    color: var(--primary-text-color);
    font-size: var(--ha-font-size-m, 14px);
  }

  .tracking-facts ha-icon {
    --mdc-icon-size: 18px;
    color: var(--rohlik-accent, var(--primary-color));
    flex-shrink: 0;
  }

  .tracking-facts.alert {
    font-weight: var(--ha-font-weight-medium, 500);
  }

  .tracking-facts.alert ha-icon {
    color: var(--warning-color);
  }

  .track {
    position: relative;
    height: 6px;
    border-radius: 3px;
    background: var(--divider-color);
    overflow: visible;
  }

  .track-fill {
    position: absolute;
    inset: 0 auto 0 0;
    height: 100%;
    border-radius: 3px;
    background: var(--rohlik-accent, var(--primary-color));
  }

  .track-marker {
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--rohlik-accent, var(--primary-color));
    border: 2px solid var(--card-background-color, #fff);
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 1px var(--rohlik-accent, var(--primary-color));
  }

  .ticks {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    color: var(--secondary-text-color);
    font-size: 0.7rem;
  }

  .announce {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .announce .text {
    color: var(--primary-text-color);
  }

  .announce .meta {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  /* Flexbox won't let a flex child's text wrap unless it can shrink below
     its content width — the announcement row is inside .row (a flex
     container from core/styles.ts), so give it a floor of 0 explicitly. */
  .row .announce {
    min-width: 0;
    flex: 1;
  }

  .reserved-line {
    color: var(--secondary-text-color);
    font-size: 0.8rem;
    margin-bottom: 4px;
  }

  .slots {
    display: flex;
    flex-direction: column;
    margin: 4px 0;
  }

  .slot-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid var(--divider-color);
    font-size: 0.85rem;
  }

  .slot-row:last-child {
    border-bottom: none;
  }

  .slot-row ha-icon {
    color: var(--rohlik-accent, var(--primary-color));
    --mdc-icon-size: 18px;
    flex-shrink: 0;
  }

  .slot-label {
    flex: 1;
    min-width: 0;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .slot-day {
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  .slot-price {
    font-weight: 500;
    color: var(--primary-text-color);
    min-width: 60px;
    text-align: end;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }

  .actions a.btn {
    text-decoration: none;
  }

  ha-icon.spin {
    animation: rohlik-spin 1s linear infinite;
  }

  @keyframes rohlik-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* The compact card can fill a taller slot (2-row cell, a row stretched by
     a taller neighbour, a square grid card); keep its single line centred.
     A no-op when the card is content-sized. */
  .compact-row {
    margin-block: auto;
  }

  /* On a narrow compact card the chip gives way (ellipsis) instead of
     pushing the row wider than the card. */
  .compact-row .chip {
    /* Block (not inline-flex), so text-overflow: ellipsis applies. Shrinks
       far faster than the headline, so it gives way first. */
    display: block;
    flex: 0 1000 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .compact-row {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  .compact-row ha-icon {
    color: var(--rohlik-accent, var(--primary-color));
    --mdc-icon-size: 24px;
    flex-shrink: 0;
  }

  /* The headline (the time) keeps priority over the chip on a narrow card:
     it shrinks only down to a readable floor, the chip gives way first. */
  .compact-row .headline {
    flex: 1 1 auto;
    min-width: 3.5em;
    margin: 0;
    overflow: hidden;
  }

  .compact-row .big {
    font-size: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Too narrow for the chip and the full time: drop the chip, keep the time. */
  @container (max-width: 260px) {
    .compact-row .chip {
      display: none;
    }
  }

  /* :host sets container-type: inline-size (core/styles.ts) — this queries
     the card's own rendered width, not the viewport, so it also kicks in
     for a narrow column in a dashboard grid, not just a phone screen. */
  @container (max-width: 520px) {
    .header {
      flex-wrap: wrap;
      row-gap: 6px;
    }

    .header .chips {
      /* Forces a wrap point right before the chips, so they always land on
         their own line under the title instead of just shrinking it. */
      flex-basis: 100%;
    }

    .big {
      font-size: 26px;
    }

    .track-wrap {
      overflow: hidden;
    }

    .announce .text {
      overflow-wrap: break-word;
      word-break: break-word;
    }

    .slot-label {
      white-space: normal;
    }

    .actions {
      flex-direction: column;
      align-items: stretch;
    }

    .actions .btn {
      width: 100%;
    }
  }
`;
