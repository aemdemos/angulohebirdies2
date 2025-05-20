/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract columns content
  const columnsContent = [];
  const columnElements = element.querySelectorAll('.columns > div');

  columnElements.forEach((column) => {
    // Extract text content
    const textElement = column.querySelector('div:last-child');
    const textContent = textElement ? textElement.cloneNode(true) : document.createTextNode('No content available');

    // Extract image
    const pictureElement = column.querySelector('picture');
    const imageElement = pictureElement ? pictureElement.querySelector('img') : null;
    const imageContent = imageElement ? document.createElement('img') : null;

    if (imageElement) {
      imageContent.src = imageElement.src;
      imageContent.alt = imageElement.alt;
    }

    // Ensure proper structure: separate text and image into different cells
    columnsContent.push([textContent, imageContent || document.createTextNode('')]);
  });

  // Create table data
  const cells = [
    headerRow,
    ...columnsContent.map((content) => content),
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}