/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Extracting header row
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Extracting content row
  const pictureElement = element.querySelector('picture img');
  const headingElement = element.querySelector('h1');

  if (pictureElement && headingElement) {
    // Ensure valid content for each cell
    const imageClone = pictureElement.cloneNode(true);
    const headingClone = headingElement.cloneNode(true);

    const contentRow = [[imageClone, headingClone]];
    cells.push(...contentRow);
  } else {
    console.warn('Missing image or heading element in the hero block.');
  }

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}