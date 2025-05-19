/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // First column content: Extract text, list, and link dynamically
  const column1Content = document.createElement('div');
  const firstColumnText = element.querySelector('.nav-brand p');
  const listItems = element.querySelectorAll('.nav-sections li');
  const linkElement = element.querySelector('.nav-tools .button-container a');

  if (firstColumnText) {
    const textParagraph = document.createElement('p');
    textParagraph.textContent = firstColumnText.textContent.trim();
    column1Content.append(textParagraph);
  }

  if (listItems.length > 0) {
    const list = document.createElement('ul');
    listItems.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item.textContent.trim();
      list.appendChild(listItem);
    });
    column1Content.append(list);
  }

  if (linkElement) {
    const liveLink = document.createElement('a');
    liveLink.href = linkElement.href;
    liveLink.textContent = linkElement.textContent.trim();
    column1Content.append(liveLink);
  }

  // Second column content: Create image dynamically from src
  const column2Content = document.createElement('div');
  const greenHelixImage = element.querySelector('img');
  if (greenHelixImage) {
    const imageElement = document.createElement('img');
    imageElement.src = greenHelixImage.src;
    imageElement.alt = greenHelixImage.alt || '';
    column2Content.append(imageElement);
  }

  // Third column content dynamically created
  const column3Content = document.createElement('div');
  const yellowHelixImage = document.createElement('img');
  yellowHelixImage.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
  yellowHelixImage.alt = 'Yellow Double Helix';
  column3Content.append(yellowHelixImage);

  const previewParagraph = document.createElement('p');
  previewParagraph.textContent = 'Or you can just view the preview';
  const previewLink = document.createElement('a');
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  previewLink.textContent = 'Preview';
  previewParagraph.append(previewLink);
  column3Content.append(previewParagraph);

  // Construct table rows
  const cells = [
    headerRow,
    [column1Content, column2Content],
    [column3Content],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}