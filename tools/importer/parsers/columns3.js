/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each logical row in the columns block)
  const rows = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare the table rows
  const table = [];
  // Header row: exactly one column with 'Columns'
  table.push(['Columns']);

  // For each logical row, build its columns
  for (const row of rows) {
    // Each row has two children: left and right column content
    const cols = Array.from(row.children);
    // If there are less than 2 columns, fill empty cells to keep structure
    while (cols.length < 2) cols.push(document.createElement('div'));
    table.push(cols);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(table, document);
  // Replace the original element with the new table
  element.replaceWith(block);
}
