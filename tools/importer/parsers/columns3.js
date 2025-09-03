/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block inside the wrapper
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Each direct child <div> of .columns.block is a row
  const rowDivs = Array.from(block.children);

  // Determine the number of columns (maximum among the rowDivs)
  let numColumns = 0;
  const allCols = [];
  rowDivs.forEach(rowDiv => {
    const cols = Array.from(rowDiv.children);
    allCols.push(cols);
    if (cols.length > numColumns) numColumns = cols.length;
  });

  // Header row: as many columns as body, with first cell 'Columns', rest are ''
  const headerRow = Array(numColumns).fill('');
  headerRow[0] = 'Columns';

  const tableRows = [headerRow];

  allCols.forEach(cols => {
    // Pad with empty strings if fewer columns than numColumns
    while (cols.length < numColumns) cols.push('');
    tableRows.push(cols);
  });

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
