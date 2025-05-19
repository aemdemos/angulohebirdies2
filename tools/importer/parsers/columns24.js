/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Section Metadata
  const sectionMetadata = [
    ['Section Metadata'],
    ['Cards'],
  ];
  const sectionMetadataTable = WebImporter.DOMUtils.createTable(sectionMetadata, document);

  // Extract content
  const header = element.querySelector('h2').textContent.trim();
  const paragraphs = Array.from(element.querySelectorAll('.default-content-wrapper p')).map(p => p.cloneNode(true));
  const cardsContent = Array.from(element.querySelectorAll('.cards-card-body strong a')).map(a => {
    const title = a.textContent.trim();
    const href = a.href;
    const link = document.createElement('a');
    link.href = href;
    link.textContent = title;
    return link;
  });

  const images = Array.from(element.querySelectorAll('.cards-card-image img')).map(img => {
    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.alt;
    return image;
  });

  // Create columns block
  const columnsHeader = ['Columns'];
  const columnsContent = [
    [header, paragraphs],
    [...images, ...cardsContent],
  ];
  const columnsTable = WebImporter.DOMUtils.createTable([columnsHeader, ...columnsContent], document);

  // Replace element
  element.replaceWith(hr, sectionMetadataTable, columnsTable);
}