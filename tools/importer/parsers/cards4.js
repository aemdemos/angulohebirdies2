/* global WebImporter */
export default function parse(element, { document }) {
  // Find .cards.block (could be element, or child)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards') || !cardsBlock.classList.contains('block')) {
    cardsBlock = element.querySelector('.cards.block');
  }
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  const rows = [['Cards']]; // Header exactly as in the example

  // Process each card
  for (const li of ul.children) {
    // Image cell: find <picture> if present, else <img>, else .cards-card-image div
    const imageDiv = li.querySelector('.cards-card-image');
    let imageCell = null;
    if (imageDiv) {
      const pic = imageDiv.querySelector('picture');
      const img = imageDiv.querySelector('img');
      imageCell = pic || img || imageDiv;
    } else {
      imageCell = document.createElement('div'); // fallback empty
    }

    // Text cell: use .cards-card-body (preserves p/strong structure)
    const textDiv = li.querySelector('.cards-card-body');
    const textCell = textDiv || document.createElement('div');

    rows.push([imageCell, textCell]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the outermost wrapper if present, else the block itself
  let wrapper = element.classList.contains('cards-wrapper') ? element : element.closest('.cards-wrapper');
  (wrapper || cardsBlock).replaceWith(table);
}
