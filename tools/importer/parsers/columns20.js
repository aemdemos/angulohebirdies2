/* global WebImporter */
export default function parse(element, { document }) {
  // Create a section break
  const hr = document.createElement('hr');

  // Extract cards and their content dynamically
  const cards = Array.from(element.querySelectorAll('li')).map((card) => {
    const imageEl = card.querySelector('img');
    const image = imageEl ? document.createElement('img') : null;
    if (image) {
      image.src = imageEl.src;
      image.alt = imageEl.alt || '';
    }

    const headerLinkEl = card.querySelector('h3 a');
    const link = headerLinkEl ? document.createElement('a') : null;
    if (link) {
      link.href = headerLinkEl.href;
      link.textContent = headerLinkEl.textContent.trim();
    }

    const descriptionEl = card.querySelector('p');
    const descriptionText = descriptionEl ? descriptionEl.textContent.trim() : '';

    return [
      image,
      link,
      descriptionText
    ];
  });

  // Prepare the first row containing the block name
  const headerRow = ['Columns'];

  // Combine the header row and card rows into the table data
  const tableData = [headerRow, ...cards];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the hr and block table
  element.replaceWith(hr, blockTable);
}