/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per the block name and variant
  const headerRow = ['Cards (cards7)'];
  const cells = [headerRow];

  // Find the columns block within the wrapper
  const columnsBlock = element.querySelector('.columns.list.block.columns-2-cols');
  if (!columnsBlock) return;
  const cardDivs = Array.from(columnsBlock.children);

  cardDivs.forEach(card => {
    // Each card: two children, first is image div, second is text div
    const cardChildren = Array.from(card.children);
    const imageDiv = cardChildren[0];
    const textDiv = cardChildren[1];
    let imageCell = null;
    if (imageDiv) {
      // Use <picture> if present, otherwise <img>
      const picture = imageDiv.querySelector('picture');
      const img = imageDiv.querySelector('img');
      if (picture) {
        imageCell = picture;
      } else if (img) {
        imageCell = img;
      }
    }
    let textCell = null;
    if (textDiv) {
      // Include all children (paragraphs, links, text, etc) in the text cell
      // Use array of children if present, else the textDiv itself
      if (textDiv.children.length > 0) {
        textCell = Array.from(textDiv.childNodes);
      } else {
        textCell = textDiv;
      }
    }
    // Add this row to the table
    cells.push([imageCell, textCell]);
  });

  // Create and replace with block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
