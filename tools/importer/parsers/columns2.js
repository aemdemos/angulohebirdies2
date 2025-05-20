/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row matches the example exactly
  const headerRow = ['Navigation'];

  // Extract the image from the nav-brand
  const img = element.querySelector('.nav-brand img');

  // Extract the navigation links
  const navLinks = [...element.querySelectorAll('.nav-sections ul li a')].map((link) => {
    const p = document.createElement('p');
    p.appendChild(link.cloneNode(true));
    return p;
  });

  // Extract the donation link
  const donateLink = element.querySelector('.nav-tools a');
  const donateParagraph = document.createElement('p');
  if (donateLink) {
    donateParagraph.appendChild(donateLink.cloneNode(true));
  }

  // Create the table structure with all extracted content
  const cells = [
    headerRow,
    [img ? img.cloneNode(true) : ''],
    [navLinks.length > 0 ? navLinks : ''],
    [donateLink ? donateParagraph : ''],
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}