/* global WebImporter */
export default function parse(element, { document }) {
  const columnsBlockHeader = ['Columns'];

  // Parse content within the element
  const defaultContentWrapper = element.querySelector('.default-content-wrapper');
  const title = defaultContentWrapper.querySelector('h2');
  const paragraphs = defaultContentWrapper.querySelectorAll('p');

  const tournamentWrapper = element.querySelector('.tournament-wrapper');
  const tournamentBlocks = tournamentWrapper.querySelectorAll('.tournament > div');

  // Extract image
  const imageElement = paragraphs[0].querySelector('img');

  // First column content
  const firstColumnContent = document.createElement('div');
  firstColumnContent.innerHTML = `<strong>${title.textContent}</strong>`;
  paragraphs.forEach((p, index) => {
    if (index > 0) {
      firstColumnContent.appendChild(p.cloneNode(true));
    }
  });

  // Tournament content for second column
  const secondColumnContent = document.createElement('div');
  tournamentBlocks.forEach((block) => {
    block.childNodes.forEach((child) => {
      secondColumnContent.appendChild(child.cloneNode(true));
    });
  });

  // Create a table block
  const cells = [
    columnsBlockHeader,
    [firstColumnContent, imageElement],
    [secondColumnContent],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}