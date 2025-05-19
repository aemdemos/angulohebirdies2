/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const navSections = element.querySelector('.nav-sections');
  const navBrand = element.querySelector('.nav-brand picture');
  const donateButtonElement = element.querySelector('.nav-tools .button-container .button.primary');

  // Create header row exactly as required
  const headerRow = ['Columns'];

  // Extract navigation links
  const navLinks = [];
  if (navSections) {
    navSections.querySelectorAll('a').forEach(link => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent;
      navLinks.push(anchor);
    });
  }

  // Extract brand image as <picture> element
  let brandPicture;
  if (navBrand) {
    brandPicture = navBrand.cloneNode(true); // Clone <picture> element to preserve hierarchy
  }

  // Extract donations button if available
  let donateButton;
  if (donateButtonElement) {
    const button = document.createElement('a');
    button.href = donateButtonElement.href;
    button.textContent = donateButtonElement.textContent;
    donateButton = button;
  }

  // Ensure all extracted content is structured properly in rows
  const rows = [
    headerRow,
    [navLinks.length > 0 ? navLinks : ''], // Place nav links properly
    [brandPicture ? brandPicture : ''], // Place brand image properly with full <picture> hierarchy
    [donateButton ? donateButton : ''], // Place donate button properly
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}