/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content dynamically from the provided HTML element

  // Header row based on the example
  const headerRow = ['Columns'];

  // Extract dynamic content for the first row
  const contentRow1 = [];
  const listContainer = document.createElement('div');
  const list = document.createElement('ul');
  const listItems = element.querySelectorAll('.nav-sections ul li a');
  listItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item.textContent;
    list.appendChild(listItem);
  });
  listContainer.appendChild(list);

  const liveLink = element.querySelector('.nav-tools a');
  if (liveLink) {
    const liveAnchor = document.createElement('a');
    liveAnchor.href = liveLink.href;
    liveAnchor.textContent = liveLink.textContent;
    listContainer.appendChild(liveAnchor);
  }
  contentRow1.push(listContainer);

  // Extract dynamic content for the second row
  const contentRow2 = [];

  const image = element.querySelector('.nav-brand img');
  if (image) {
    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    contentRow2.push(imageElement);
  }

  const previewContainer = document.createElement('div');
  const previewText = 'Or you can just view the preview';
  previewContainer.textContent = previewText;

  const previewLink = document.createElement('a');
  previewLink.href = liveLink ? liveLink.href : '#';
  previewLink.textContent = 'Preview';
  previewContainer.appendChild(previewLink);
  contentRow2.push(previewContainer);

  // Create the block table
  const tableContent = [
    headerRow,
    contentRow1,
    contentRow2
  ];

  const createdTable = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the original element with the new block table
  element.replaceWith(createdTable);
}