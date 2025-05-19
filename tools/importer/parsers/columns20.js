/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create an <hr> section break
  const createSectionBreak = () => document.createElement('hr');

  // Extract cards from the HTML
  const cards = Array.from(element.querySelectorAll('.cards-wrapper .cards-card-body')).map((card) => {
    const titleLink = card.querySelector('h3 a');
    const title = titleLink ? titleLink.textContent.trim() : '';
    const link = titleLink ? document.createElement('a') : null;
    if (link) {
      link.setAttribute('href', titleLink.href);
      link.textContent = title;
    }

    const description = card.querySelector('p') ? card.querySelector('p').textContent.trim() : '';
    return [title, link, description].filter(item => item !== null); // Ensure no null values
  });

  // Extract images from the HTML
  const images = Array.from(element.querySelectorAll('.cards-wrapper .cards-card-image img')).map((img) => {
    const image = document.createElement('img');
    image.setAttribute('src', img.src);
    image.setAttribute('alt', img.alt);
    return image;
  });

  // Combine images and card data into rows
  const rows = images.map((image, index) => {
    const cardData = cards[index];
    return [image, ...cardData];
  });

  // Add a header row to the table
  const tableData = [['Columns'], ...rows];

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Insert the block table into the document
  element.replaceWith(blockTable);
}