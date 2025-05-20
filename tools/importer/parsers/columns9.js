/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row dynamically based on the example
  cells.push(['Columns']);

  // Extract card details dynamically
  const cards = element.querySelectorAll('.cards-card-body');
  const images = element.querySelectorAll('.cards-card-image img');

  const cardData = Array.from(cards).map((card, index) => {
    const titleLink = card.querySelector('h3 a');
    const titleText = titleLink ? titleLink.textContent.trim() : '';
    const description = card.querySelector('p') ? card.querySelector('p').textContent.trim() : '';
    const image = images[index];

    const imageElement = document.createElement('img');
    if (image) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
    }

    const titleElement = document.createElement('a');
    if (titleLink) {
      titleElement.href = titleLink.href;
      titleElement.textContent = titleText;
    }

    const content = document.createElement('div');
    content.append(titleElement, document.createElement('br'), description);

    return [imageElement, content];
  });

  // Ensure card data is added dynamically
  cells.push(...cardData);

  // Create the final block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(table);
}