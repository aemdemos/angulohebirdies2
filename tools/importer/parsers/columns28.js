/* global WebImporter */
 export default function parse(element, { document }) {
  // Helper function to extract image elements
  const extractImage = (imgElement) => {
    if (!imgElement) return '';
    const { src, alt } = imgElement;
    const image = document.createElement('img');
    image.src = src;
    image.alt = alt || '';
    return image;
  };

  // Helper function to extract text content
  const extractTextContent = (parentElement) => {
    if (!parentElement) return '';
    const fragment = document.createDocumentFragment();
    parentElement.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        fragment.appendChild(document.createTextNode(node.textContent));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        fragment.appendChild(node.cloneNode(true));
      }
    });
    return fragment;
  };

  // Extract content from the provided HTML structure
  const contentWrapper = element.querySelector('.columns-wrapper');
  const columnsBlock = contentWrapper.querySelector('.columns.block');

  const firstColumnContent = columnsBlock.querySelector('div:nth-child(1)');
  const secondColumnContent = columnsBlock.querySelector('div:nth-child(2)');

  const headerRow = ['Columns'];
  const contentRow = [
    extractTextContent(firstColumnContent),
    extractImage(secondColumnContent.querySelector('img')),
  ];

  const tableData = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}