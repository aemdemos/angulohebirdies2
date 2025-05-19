/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a table cell with content
  const createCell = (content) => {
    if (typeof content === 'string') {
      return content;
    } else if (Array.isArray(content)) {
      return content.map(createCell);
    } else if (content instanceof HTMLElement) {
      return content;
    } else {
      return ''; // Handle edge case where content is invalid
    }
  };

  // Extract content dynamically from the element
  const content = [];
  const paragraphs = Array.from(element.querySelectorAll('p'));
  const images = Array.from(element.querySelectorAll('img'));
  const headings = Array.from(element.querySelectorAll('h2, h3, h4'));

  paragraphs.forEach((p) => {
    content.push(createCell(p.cloneNode(true))); // Clone node to extract its content
  });

  images.forEach((img) => {
    const imageElement = document.createElement('img');
    imageElement.src = img.getAttribute('src'); // Use dynamic src extraction
    imageElement.alt = img.getAttribute('alt') || ''; // Handle missing alt
    content.push(createCell(imageElement));
  });

  headings.forEach((heading) => {
    content.push(createCell(heading.cloneNode(true))); // Clone node for dynamic content extraction
  });

  // Create header row that matches the example exactly
  const headerRow = ['Columns'];

  // Prepare rows for the table
  const rows = [headerRow];

  if (content.length > 0) {
    rows.push(content); // Add extracted content only if available
  } else {
    rows.push(['']); // Handle edge case of empty content
  }

  // Create the table using the WebImporter helper function
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}