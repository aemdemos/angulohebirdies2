/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create an image element
  const createImageElement = (img) => {
    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.alt || '';
    image.width = img.width || '';
    image.height = img.height || '';
    return image;
  };

  // Extract relevant content from the element
  const header = element.querySelector('h2');
  const paragraph = element.querySelector('p');
  const image = element.querySelector('picture img');

  // Create the header row
  const headerRow = ['Columns'];

  // Combine the content pieces (header and paragraph) into a single cell
  const contentCell = document.createElement('div');
  if (header) contentCell.appendChild(header);
  if (paragraph) contentCell.appendChild(paragraph);

  // Create the table structure
  const cells = [
    headerRow,
    [contentCell],
    [createImageElement(image)],
  ];

  // Generate the block table using createTable function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}