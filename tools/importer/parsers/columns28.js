/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the relevant content
  const columnsContainer = element.querySelector('.columns-container');
  if (!columnsContainer) return;

  const columnsWrapper = columnsContainer.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;

  const blockNameElement = columnsWrapper.querySelector('[data-block-name="columns"]');
  const blockName = blockNameElement ? blockNameElement.dataset.blockName : 'Block';

  const columnElements = columnsWrapper.querySelectorAll('div > div');

  const contentCells = Array.from(columnElements).map((column) => {
    const items = [];

    // Extract heading
    const heading = column.querySelector('h2');
    if (heading) {
      items.push(heading);
    }

    // Extract paragraph
    const paragraph = column.querySelector('p');
    if (paragraph) {
      items.push(paragraph);
    }

    // Extract images
    const image = column.querySelector('picture img');
    if (image) {
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt;
      imgElement.width = image.width;
      imgElement.height = image.height;
      items.push(imgElement);
    }

    return items;
  });

  // Build the table
  const tableData = [
    [blockName],
    ...contentCells,
  ];

  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table
  element.replaceWith(table);
}