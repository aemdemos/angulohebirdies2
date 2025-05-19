/* global WebImporter */
export default function parse(element, { document }) {
  // Check if element has a valid src attribute
  const src = element.getAttribute('src');
  if (!src) {
    console.warn('Element does not have a valid src attribute');
    return;
  }

  // Prepare the video block table content dynamically
  const headerRow = ['Video'];
  const contentRow = [
    element.cloneNode(true),
    (() => {
      const link = document.createElement('a');
      link.setAttribute('href', src);
      link.textContent = src; // Display the video source as text
      return link;
    })()
  ];

  const cells = [headerRow, contentRow];
  
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly structured block table
  element.replaceWith(table);
}