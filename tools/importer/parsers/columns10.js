/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the left column: intro content
  const contentWrapper = element.querySelector('.default-content-wrapper');
  // Extract the right column: cards block (cards-wrapper)
  const cardsWrapper = element.querySelector('.cards-wrapper');
  let cardsBlock = null;
  if (cardsWrapper) {
    // Find the .cards.overlay.block inside the cardsWrapper
    const cardsBlockElem = cardsWrapper.querySelector('.cards.overlay.block');
    if (cardsBlockElem) {
      cardsBlock = cardsBlockElem;
    } else {
      cardsBlock = cardsWrapper;
    }
  }

  // Compose table rows
  const headerRow = ['Columns (columns10)'];
  const contentRow = [contentWrapper, cardsBlock];

  // Only include columns with content to avoid empty columns (edge case)
  // But always keep it as a two-column structure to match the visual layout
  const cells = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
