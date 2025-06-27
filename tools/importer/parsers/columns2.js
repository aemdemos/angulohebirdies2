/* global WebImporter */
export default function parse(element, { document }) {
  // Get the nav block inside the header
  const nav = element.querySelector('nav');
  if (!nav) return;

  // Get logo block (brand)
  const brand = nav.querySelector('.nav-brand');
  // Get navigation links (sections)
  const navSections = nav.querySelector('.nav-sections');
  // Get the donate button (tools)
  const navTools = nav.querySelector('.nav-tools');

  // Compose left column: logo above nav links
  const leftCol = document.createElement('div');
  if (brand) leftCol.appendChild(brand);
  if (navSections) leftCol.appendChild(navSections);

  // Compose right column: donate button
  const rightCol = document.createElement('div');
  if (navTools) rightCol.appendChild(navTools);

  // Build the cells: header row has only ONE column, then 2-column content row
  const cells = [
    ['Columns (columns2)'],
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
