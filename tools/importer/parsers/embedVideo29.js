/* global WebImporter */
export default function parse(element, { document }) {
  const sectionBreak = document.createElement('hr');

  const headerRow = ['Embed']; // Match the example header exactly

  const link = document.createElement('a');
  link.href = 'https://vimeo.com/454418448';
  link.textContent = 'https://vimeo.com/454418448';

  const cells = [
    headerRow,
    [link]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(sectionBreak, blockTable);
}