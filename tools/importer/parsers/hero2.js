/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the image
  const picture = element.querySelector('picture');
  const img = picture ? picture.querySelector('img') : null;
  const image = img ? document.createElement('img') : null;
  if (img && image) {
    image.src = img.src;
    image.alt = img.alt || '';
  }

  // Extract the headline
  const headline = element.querySelector('h1');
  const headingElement = headline ? document.createElement('h1') : null;
  if (headline && headingElement) {
    headingElement.textContent = headline.textContent;
  }

  // Content array for the block
  const blockContent = [image, headingElement].filter(Boolean); // Filter out null/undefined values

  // Create the hero block table
  const heroTableCells = [
    ['Hero'],
    blockContent
  ];
  const heroTable = WebImporter.DOMUtils.createTable(heroTableCells, document);

  // Replace the original element properly
  element.replaceWith(heroTable);
}