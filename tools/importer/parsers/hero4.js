/* global WebImporter */
export default function parse(element, { document }) {
  // Create section break
  const hr = document.createElement('hr');

  // Extract the image
  const picture = element.querySelector('picture');
  const img = picture?.querySelector('img');

  // Handle edge case for missing image
  let imageEl = null;
  if (img) {
    imageEl = document.createElement('img');
    imageEl.src = img.src;
    imageEl.alt = img.alt;
    imageEl.width = img.width;
    imageEl.height = img.height;
  }

  // Extract the heading
  const heading = element.querySelector('h1');
  const headingEl = heading ? document.createElement('h1') : null;
  if (headingEl && heading) {
    headingEl.textContent = heading.textContent;
  }

  // Create the table structure
  const cells = [
    ['Hero'],
    [
      [imageEl, headingEl].filter(Boolean), // Filter out null values
    ],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(hr, block);
}