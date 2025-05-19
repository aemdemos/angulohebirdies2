/* global WebImporter */
export default function parse(element, { document }) {
  // Verify if element is valid and has necessary attributes
  if (!element || !element.getAttribute('src')) {
    console.warn('Invalid element provided for parsing.');
    return;
  }

  // Creating the Carousel block header row
  const headerRow = ['Carousel'];

  // Extracting image source and attributes dynamically
  const imageSrc = element.getAttribute('src');
  const imageAlt = element.getAttribute('alt') || ''; // Handle missing alt attribute

  // Creating the image element
  const image = document.createElement('img');
  image.setAttribute('src', imageSrc);
  image.setAttribute('alt', imageAlt);

  // Constructing table data
  const cells = [
    headerRow, // Header row matches example markdown
    [image], // Image in first cell matches example markdown
  ];

  // Creating the table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block
  element.replaceWith(block);
}