/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero.block inside the provided section
  const heroBlock = element.querySelector('.hero.block');
  let pictureElem = null;
  let headingElem = null;

  if (heroBlock) {
    // Look for picture and heading inside hero block's descendants
    pictureElem = heroBlock.querySelector('picture');
    // Headline: prefer h1, fallback to any heading level
    headingElem = heroBlock.querySelector('h1, h2, h3, h4, h5, h6');
  }
  // Fallback: search entire element if not found
  if (!pictureElem) pictureElem = element.querySelector('picture');
  if (!headingElem) headingElem = element.querySelector('h1, h2, h3, h4, h5, h6');

  // Table rows per spec
  const rows = [];
  // Header row: block type, exactly as in example
  rows.push(['Hero']);
  // Second row: image element, optional
  rows.push([pictureElem || '']);
  // Third row: all headline/subheadline/cta content, can be empty
  rows.push([headingElem ? [headingElem] : '']);

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}
