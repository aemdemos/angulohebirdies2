/* global WebImporter */

export default function parse(element, { document }) {
  // Create the header row
  const headerRow = ['Columns'];

  // Extract content for the first row dynamically
  const contentRow1 = [];

  // Extract left column content dynamically
  const leftColumn = element.querySelector('.nav-sections ul');
  const listWrapper = document.createElement('div');
  const list = document.createElement('ul');
  if (leftColumn) {
    leftColumn.querySelectorAll('li').forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item.textContent;
      list.appendChild(listItem);
    });
  }
  listWrapper.appendChild(list);
  const liveLink = element.querySelector('.button.primary');
  if (liveLink) {
    const liveAnchor = document.createElement('a');
    liveAnchor.href = liveLink.href;
    liveAnchor.textContent = liveLink.textContent;
    liveAnchor.className = 'button primary';
    listWrapper.appendChild(liveAnchor);
  }
  contentRow1.push(listWrapper);

  // Extract right column content dynamically
  const rightImage = element.querySelector('img');
  const rightWrapper = document.createElement('div');
  if (rightImage) {
    const imageElement = document.createElement('img');
    imageElement.src = rightImage.src;
    imageElement.alt = rightImage.alt || '';
    rightWrapper.appendChild(imageElement);
  }
  contentRow1.push(rightWrapper);

  // Extract content for the second row dynamically
  const contentRow2 = [];

  // Extract left column content dynamically for the yellow image
  const yellowImageSrc = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
  const yellowImage = document.createElement('img');
  yellowImage.src = yellowImageSrc;
  const yellowWrapper = document.createElement('div');
  yellowWrapper.appendChild(yellowImage);
  contentRow2.push(yellowWrapper);

  // Extract right column content dynamically for preview content
  const previewWrapper = document.createElement('div');
  const previewParagraph = document.createElement('p');
  previewParagraph.textContent = 'Or you can just view the preview';
  const previewLink = document.createElement('a');
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  previewLink.textContent = 'Preview';
  previewWrapper.appendChild(previewParagraph);
  previewWrapper.appendChild(previewLink);
  contentRow2.push(previewWrapper);

  // Create the block table dynamically
  const cells = [headerRow, contentRow1, contentRow2];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}