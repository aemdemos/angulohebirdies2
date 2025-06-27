/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual cards block (not carousel buttons)
  const cardsBlock = element.querySelector('.cards.icons.block');
  if (!cardsBlock) return;

  // Get all li cards
  const cards = Array.from(cardsBlock.querySelectorAll('ul > li'));
  if (cards.length === 0) return;

  // Each card will be rendered as a column
  const columns = cards.map((li) => {
    const cellNodes = [];
    // Image
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      const pic = imgDiv.querySelector('picture');
      if (pic) cellNodes.push(pic);
      else {
        const img = imgDiv.querySelector('img');
        if (img) cellNodes.push(img);
      }
    }
    // Card body (title + text)
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      Array.from(bodyDiv.children).forEach(node => cellNodes.push(node));
    }
    return cellNodes;
  });

  // Build the cells array: header row with EXACTLY ONE cell, then one row with all columns
  const headerRow = ['Columns (columns9)'];
  const contentRow = columns;

  const rows = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}
