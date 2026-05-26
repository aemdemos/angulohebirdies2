/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-gallery
 * Base block: cards
 * Description: Gallery-style cards displaying images in a grid layout (1x1 aspect ratio).
 *              Each card contains an image only (no text content).
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-05-26
 */
export default function parse(element, { document }) {
  // Extract all gallery image items from the grid
  // Source structure: div.utility-aspect-1x1 > img.cover-image
  const imageItems = element.querySelectorAll(':scope > .utility-aspect-1x1');

  const cells = [];

  imageItems.forEach((item) => {
    const img = item.querySelector('img.cover-image, img');
    if (img) {
      // Cell 1: Image with field hint (xwalk: field:image)
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(img);

      // Cell 2: Text - empty for gallery cards (no hint for empty cells per xwalk rules)
      const textCell = document.createDocumentFragment();

      cells.push([imageCell, textCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
