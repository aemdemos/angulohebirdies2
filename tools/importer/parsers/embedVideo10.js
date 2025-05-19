/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Extract Image
  const imageElement = element.querySelector('img');
  const image = imageElement ? document.createElement('img') : null;
  if (image) {
    image.setAttribute('src', imageElement.getAttribute('src'));
    image.setAttribute('alt', imageElement.getAttribute('alt'));
  }

  // Extract Links
  const links = Array.from(element.querySelectorAll('a')).map((link) => {
    const a = document.createElement('a');
    a.setAttribute('href', link.getAttribute('href'));
    a.textContent = link.textContent;
    return a;
  });

  // Extract Email
  const emailElement = element.querySelector('a[href^="mailto:"]');
  const email = emailElement ? document.createElement('a') : null;
  if (email) {
    email.setAttribute('href', emailElement.getAttribute('href'));
    email.textContent = emailElement.textContent;
  }

  // Prepare header row
  const headerRow = ['Embed'];

  // Prepare content rows
  const contentRows = [];
  if (image) contentRows.push([image]);
  links.forEach((link) => contentRows.push([link]));
  if (email) contentRows.push([email]);

  // Combine rows into cells array
  cells.push(headerRow);
  cells.push(...contentRows);

  // Create and replace element with table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}