/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row with block name
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Extract relevant content dynamically from the element

  // First Column
  const firstColumnDiv = document.createElement('div');
  const columnText = element.querySelector('p')?.outerHTML || '';
  const columnList = element.querySelector('ul')?.outerHTML || '';
  firstColumnDiv.innerHTML = `${columnText}${columnList}`;

  const liveLinkElement = element.querySelector('a[href="https://word-edit.officeapps.live.com/"]');
  const liveLink = liveLinkElement ? document.createElement('a') : null;
  if (liveLink) {
    liveLink.href = liveLinkElement.href;
    liveLink.innerHTML = liveLinkElement.textContent;
  }

  const firstCell = [firstColumnDiv, liveLink];

  // Second Column
  const greenDoubleHelixImgElement = element.querySelector('img[src*="media_193050d52a802830d970fde49644ae9a504a61b7f"]');
  const greenDoubleHelixImg = greenDoubleHelixImgElement ? document.createElement('img') : null;
  if (greenDoubleHelixImg) {
    greenDoubleHelixImg.src = greenDoubleHelixImgElement.src;
  }

  const secondCell = [greenDoubleHelixImg];

  // Third Column
  const yellowDoubleHelixImgElement = element.querySelector('img[src*="media_1e562f39bbce4d269e279cbbf8c5674a399fe0070"]');
  const yellowDoubleHelixImg = yellowDoubleHelixImgElement ? document.createElement('img') : null;
  if (yellowDoubleHelixImg) {
    yellowDoubleHelixImg.src = yellowDoubleHelixImgElement.src;
  }

  const previewLinkElement = element.querySelector('a[href="https://word-edit.officeapps.live.com/"]');
  const previewLink = previewLinkElement ? document.createElement('a') : null;
  if (previewLink) {
    previewLink.href = previewLinkElement.href;
    previewLink.innerHTML = previewLinkElement.textContent;
  }

  const thirdCell = [yellowDoubleHelixImg, previewLink];

  // Add columns to cells
  cells.push([firstCell, secondCell, thirdCell]);

  // Create table using WebImporter.DOMUtils.createTable()
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with table
  element.replaceWith(table);
}