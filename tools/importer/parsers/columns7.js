/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row that precisely matches the example
  const headerRow = ['Columns'];

  // Extract image
  const img = element.querySelector('img');
  let imgElement = null;
  if (img) {
    imgElement = document.createElement('img');
    imgElement.src = img.src;
    imgElement.alt = img.alt;
  }

  // Extract list content from <ul>
  const listItems = [...element.querySelectorAll('ul li')].map((li) => li.textContent.trim());
  const listContent = document.createElement('ul');
  listItems.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    listContent.appendChild(li);
  });

  // Extract paragraphs logically into another cell
  const paragraphs = [...element.querySelectorAll('p')].map((p) => {
    const div = document.createElement('div');
    div.textContent = p.textContent.trim();
    return div;
  });

  // Combine extracted elements into table rows
  const cells = [
    headerRow, // Header row as per example
    [listContent, imgElement, paragraphs],
  ];

  // Create table using helper method
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}