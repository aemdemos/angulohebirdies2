/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract images and links
  const extractImage = (imgElement) => {
    if (!imgElement) return null;
    const img = document.createElement('img');
    img.src = imgElement.getAttribute('src');
    img.alt = imgElement.getAttribute('alt') || '';
    return img;
  };

  const extractLink = (linkElement) => {
    if (!linkElement) return null;
    const link = document.createElement('a');
    link.href = linkElement.getAttribute('href');
    link.textContent = linkElement.textContent;
    return link;
  };

  const cardsWrapper = element.querySelector('.cards-wrapper');
  if (!cardsWrapper) {
    console.error('Cards wrapper not found');
    return;
  }

  const cardElements = cardsWrapper.querySelectorAll('li');

  const cardRows = Array.from(cardElements).map((card) => {
    const cardImageElement = card.querySelector('img');
    const cardImage = extractImage(cardImageElement);

    const cardLinkElement = card.querySelector('a');
    const cardLink = extractLink(cardLinkElement);

    return [cardImage, cardLink];
  });

  const headerRow = ['Cards'];
  const rows = [headerRow, ...cardRows];

  const block = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(block);
}