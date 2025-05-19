/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create a link element
  function createLink(href, text) {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    return link;
  }

  // Extract brand link and image
  const brandLinkElement = element.querySelector('.nav-brand a');
  const brandImage = brandLinkElement.querySelector('img');
  const brandLink = createLink(brandLinkElement.href, brandImage ? brandImage.outerHTML : '');

  // Extract navigation items
  const navItems = Array.from(element.querySelectorAll('.nav-sections ul li a')).map((navItem) => {
    return createLink(navItem.href, navItem.textContent);
  });

  // Extract donate button
  const donateButtonElement = element.querySelector('.nav-tools .button-container a');
  const donateLink = createLink(donateButtonElement.href, donateButtonElement.textContent);

  // Build the table structure with corrected header row and layout
  const cells = [
    ['Columns block'],
    [brandLink],
    [...navItems],
    [donateLink],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}