/* global WebImporter */
export default function parse(element, { document }) {
  const contentWrapper = element.querySelector('.default-content-wrapper');
  const titleElement = contentWrapper.querySelector('h2');
  const paragraphs = contentWrapper.querySelectorAll('p');
  const imageElement = contentWrapper.querySelector('img');

  const title = titleElement ? document.createElement('h1') : null;
  if (title) {
    title.textContent = titleElement.textContent;
  }

  const content = [];

  if (title) {
    content.push(title);
  }

  if (imageElement) {
    content.push(imageElement);
  }

  paragraphs.forEach((p) => {
    content.push(p);
  });

  const headerRow = ['Hero'];
  const tableCells = [headerRow, [content]];

  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  element.replaceWith(blockTable);
}