/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const navBrandImage = element.querySelector('.nav-brand picture img');
  const navLinks = Array.from(element.querySelectorAll('.nav-sections ul li a')).map(link => link);
  const donateButton = element.querySelector('.nav-tools .button-container .button.primary');

  // Create header row for the table
  const headerRow = ['Columns'];

  // Create content rows for the table
  const contentRow = [
    navBrandImage, // Brand image
    [
      ...navLinks, // Navigation links
      donateButton, // Donate button
    ],
  ];

  // Create the block table
  const cells = [
    headerRow,
    contentRow,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}