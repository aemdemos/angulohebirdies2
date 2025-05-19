/* global WebImporter */
export default function parse(element, { document }) {
  // Extract data dynamically from the provided element
  const navBrandLink = element.querySelector('.nav-brand a'); // Logo link
  const navSectionsLinks = Array.from(element.querySelectorAll('.nav-sections ul li a')); // Navigation links
  const donateLink = element.querySelector('.nav-tools .button-container a'); // Donate button

  // Validate the extracted elements to handle edge cases
  const navBrandContent = navBrandLink ? navBrandLink.cloneNode(true) : document.createTextNode('');
  const navSectionsContent = navSectionsLinks.length ? navSectionsLinks.map(link => link.cloneNode(true)) : [document.createTextNode('')];
  const donateContent = donateLink ? donateLink.cloneNode(true) : document.createTextNode('');

  // Create the table structure dynamically
  const headerRow = ['Columns block']; // Header row must match example exactly
  const row1 = [navBrandContent, ...navSectionsContent]; // First data row
  const row2 = [donateContent, document.createTextNode('')]; // Second data row with consistent columns

  // Create the table using WebImporter.DOMUtils
  const cells = [
    headerRow,
    row1,
    row2
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new table
  element.replaceWith(blockTable);
}