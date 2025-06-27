/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all direct child column divs
  const columnDivs = Array.from(columnsBlock.children).filter(d => d.tagName === 'DIV');
  if (columnDivs.length === 0) return;

  // Split columns into two groups for two columns, as in the example
  const half = Math.ceil(columnDivs.length / 2);
  const groups = [
    columnDivs.slice(0, half),
    columnDivs.slice(half)
  ];

  // Create a wrapper for each group and append the original elements
  const cells = groups.map(group => {
    const wrapper = document.createElement('div');
    group.forEach(item => wrapper.appendChild(item));
    return wrapper;
  });

  // Create table: first row is header, second row is two columns
  const tableRows = [
    ['Columns (columns6)'],
    cells
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
