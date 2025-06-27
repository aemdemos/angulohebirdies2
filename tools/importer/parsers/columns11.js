/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost columns block
  let columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) {
    // fallback to top level if already there
    columnsBlock = element;
  }
  // Get the columns (the direct children of the columns block)
  const columnRows = columnsBlock.querySelectorAll(':scope > div');
  if (columnRows.length === 0) return;
  // Only process first row of columns (columns block typically has a single row of columns)
  const columns = columnRows[0].querySelectorAll(':scope > div');
  if (columns.length === 0) return;
  // Prepare columns content for table cells
  const cells = [];
  // Header row must match the block name exactly
  cells.push(['Columns (columns11)']);
  // Each column cell content must contain all immediate child nodes, not just one
  const contentRow = columns.length === 1
    ? [Array.from(columns[0].childNodes).filter(n => n.nodeType !== Node.TEXT_NODE || n.textContent.trim())]
    : Array.from(columns).map(col => {
        const nodes = Array.from(col.childNodes).filter(n => n.nodeType !== Node.TEXT_NODE || n.textContent.trim());
        // If only one node, use it directly, otherwise use the array
        if (nodes.length === 1) return nodes[0];
        return nodes;
      });
  cells.push(contentRow);
  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
