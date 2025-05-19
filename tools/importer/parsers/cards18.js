/* global WebImporter */
export default function parse(element, { document }) {
  // Extract cards block header
  const headerRow = ['Cards'];

  // Extract items inside the block
  const items = Array.from(element.querySelectorAll('.columns > div')).map((card) => {
    // Extract image element
    const image = card.querySelector('img');
    const imageElement = image ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
    }

    // Extract text content
    const textContent = card.querySelector('div:last-child');
    const titleElement = textContent.querySelector('strong');
    const link = textContent.querySelector('a');

    const title = titleElement ? titleElement.textContent : '';
    const description = titleElement ? textContent.innerHTML.replace(titleElement.outerHTML, '').trim() : textContent.innerHTML.trim();

    const descriptionElement = document.createElement('div');
    if (title) {
      const titleHeading = document.createElement('strong');
      titleHeading.textContent = title;
      descriptionElement.appendChild(titleHeading);
    }
    if (description) {
      const descriptionParagraph = document.createElement('p');
      descriptionParagraph.innerHTML = description;
      descriptionElement.appendChild(descriptionParagraph);
    }
    if (link) {
      descriptionElement.appendChild(link);
    }

    return [imageElement, descriptionElement];
  });

  const tableData = [headerRow, ...items];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace element with the newly created block table
  element.replaceWith(blockTable);
}