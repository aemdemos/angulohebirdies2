/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in example
  const headerRow = ['Columns (columns5)'];

  // Get the content wrapper
  const wrapper = element.querySelector('.default-content-wrapper');
  if (!wrapper) return;

  // We want to create one row with five columns, as the block is 'columns5'.
  // We'll extract the five logical sections from the HTML:
  // 1. Founding Partners (intro + founding content)
  // 2. 4 Star Partners
  // 3. 2 Star Partners
  // 4. 1 Star Partners
  // 5. Become a Partner (final call to action)

  // 1. Founding Partners: from first <p> to before '4 STAR PARTNERS' h2
  // 2. 4 Star Partners: from '4 STAR PARTNERS' h2 to before '2 STAR PARTNERS' h2
  // 3. 2 Star Partners: from '2 STAR PARTNERS' h2 to before '1 STAR PARTNERS' h2
  // 4. 1 Star Partners: from '1 STAR PARTNERS' h2 to before 'BECOME A BIRDIES FOR THE BRAVE PARTNER' h2
  // 5. Become a Partner: from 'BECOME A BIRDIES FOR THE BRAVE PARTNER' h2 to end

  const nodes = Array.from(wrapper.childNodes);
  function findIndexByTagAndText(tag, text) {
    return nodes.findIndex(n => n.nodeType === 1 && n.tagName === tag && n.textContent.trim().toUpperCase() === text.toUpperCase());
  }
  // Find main H2 indices
  const h2Founding = findIndexByTagAndText('H2', 'FOUNDING PARTNERS');
  const h2Star4 = findIndexByTagAndText('H2', '4 STAR PARTNERS');
  const h2Star2 = findIndexByTagAndText('H2', '2 STAR PARTNERS');
  const h2Star1 = findIndexByTagAndText('H2', '1 STAR PARTNERS');
  const h2Become = findIndexByTagAndText('H2', 'BECOME A BIRDIES FOR THE BRAVE PARTNER');

  // Helper to collect a slice and wrap it in a <div>
  function collectSection(startIdx, endIdx) {
    const div = document.createElement('div');
    for (let i = startIdx; i < endIdx; i++) {
      // Only append if the node has content
      const node = nodes[i];
      if (!node) continue;
      // Don't lose whitespace between block-level elements
      div.appendChild(node);
    }
    return div;
  }

  // Section 1: Founding Partners (from 0 to h2Star4)
  const col1 = collectSection(0, h2Star4);
  // Section 2: 4 Star Partners (from h2Star4 to h2Star2)
  const col2 = collectSection(h2Star4, h2Star2);
  // Section 3: 2 Star Partners (from h2Star2 to h2Star1)
  const col3 = collectSection(h2Star2, h2Star1);
  // Section 4: 1 Star Partners (from h2Star1 to h2Become)
  const col4 = collectSection(h2Star1, h2Become);
  // Section 5: Become a Partner (from h2Become to end)
  const col5 = collectSection(h2Become, nodes.length);

  // Remove empty columns if any (shouldn't be in this HTML)
  const columnRow = [col1, col2, col3, col4, col5];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, columnRow], document);
  element.replaceWith(table);
}
