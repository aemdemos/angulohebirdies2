/* global WebImporter */
export default function parse(element, { document }) {
  // Creating a section break
  const hr = document.createElement('hr');

  // Extracting the hero image and heading dynamically
  const heroImage = element.querySelector('picture');
  const heroHeading = element.querySelector('h1');

  // Handle missing elements gracefully
  const imageContent = heroImage ? heroImage : document.createTextNode('No Image Available');
  const headingContent = heroHeading ? document.createElement('h1') : document.createTextNode('No Heading Available');
  if (heroHeading) headingContent.textContent = heroHeading.textContent;

  // Correcting the header row to match example exactly
  const headerRow = ['Hero']; // Matches the example header specifically

  // Structure for the Hero block table - single cell in the content row
  const tableCells = [
    headerRow,  // Header row with exact match to example
    [[imageContent, headingContent]],  // Content row combining image and heading into a single cell
  ];

  // Creating the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replacing the original element with the section break and block table
  element.replaceWith(hr, blockTable);
}