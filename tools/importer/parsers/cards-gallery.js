/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-gallery
 * Base block: cards
 * Source selector: main > section:nth-of-type(2) .grid-layout.desktop-4-column
 * Generated: 2026-04-27
 *
 * Source structure: grid of div.utility-aspect-1x1 children, each containing
 * a single img.cover-image (image-only gallery, no text content).
 *
 * Target: Cards block with one row per image. Each row has a single cell
 * containing the image element (image-only variant per block library description).
 */
export default function parse(element, { document }) {
  // Select all card items — each is a div wrapping a cover image
  const cardItems = element.querySelectorAll(':scope > div.utility-aspect-1x1, :scope > div');

  const cells = [];

  cardItems.forEach((item) => {
    // Extract the image from each card item
    const img = item.querySelector('img.cover-image, img');
    if (img) {
      cells.push([img]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
