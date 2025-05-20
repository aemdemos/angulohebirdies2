/* global WebImporter */
export default function parse(element, { document }) {
  // Extract Section Header
  const header = element.querySelector('h2')?.textContent.trim() || '';

  // Extract Paragraphs and Group into One Cell
  const paragraphs = Array.from(element.querySelectorAll('p')).map(p => {
    return p.cloneNode(true);
  });
  const combinedParagraphsCell = document.createElement('div');
  combinedParagraphsCell.append(...paragraphs);

  // Extract Cards
  const cards = Array.from(element.querySelectorAll('.cards li')).map(card => {
    const titleElement = card.querySelector('.cards-card-body strong a');
    const title = titleElement?.textContent.trim() || '';

    const imgElement = card.querySelector('img');
    const img = imgElement
      ? (() => {
          const imgTag = document.createElement('img');
          imgTag.setAttribute('src', imgElement.src);
          imgTag.setAttribute('alt', imgElement.alt || '');
          return imgTag;
        })()
      : '';

    const linkElement = card.querySelector('a.callout-overlay-button');
    const link = linkElement
      ? (() => {
          const linkTag = document.createElement('a');
          linkTag.setAttribute('href', linkElement.href);
          linkTag.textContent = linkElement.textContent.trim();
          return linkTag;
        })()
      : '';

    return [title, img, link];
  });

  // Create Table Structure
  const headerRow = ['Columns'];
  const contentRows = [
    [header, combinedParagraphsCell],
    ...cards.map(row => row.filter(cell => cell !== '')),
  ];

  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...contentRows], document);

  // Replace Original Element
  element.replaceWith(blockTable);
}