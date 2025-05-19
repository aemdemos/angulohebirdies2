/* global WebImporter */
export default function parse(element, { document }) {
  // Validate the input
  if (!element || !document) {
    console.error('Invalid input: element or document is missing');
    return;
  }

  // Extract content dynamically and guard against null cases
  const navBrand = element.querySelector('.nav-brand a');
  const navLogo = navBrand && navBrand.querySelector('img') ? navBrand.querySelector('img') : null;
  const navSectionsContainer = element.querySelector('.nav-sections');
  const navSections = navSectionsContainer ? Array.from(navSectionsContainer.querySelectorAll('li a')) : [];
  const navTools = element.querySelector('.nav-tools .button-container a') || null;

  // Ensure all extracted elements exist
  if (!navBrand || !navLogo || navSections.length === 0 || !navTools) {
    console.error('Missing required content in the provided HTML element');
    return;
  }

  // Create the table structure dynamically
  const headerRow = ['Columns']; // Block header matches the example exactly

  const contentRow1 = [
    ['Columns block', ...navSections],
    [navLogo]
  ];

  const contentRow2 = [
    [navTools]
  ];

  const tableStructure = [
    headerRow,
    contentRow1,
    contentRow2
  ];

  // Create the block table using WebImporter helper
  const blockTable = WebImporter.DOMUtils.createTable(tableStructure, document);

  // Replace the provided element with the newly created block
  element.replaceWith(blockTable);
}