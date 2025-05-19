/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row exactly matching the example
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Extract the column contents dynamically and robustly
  const columns = Array.from(element.querySelectorAll('.columns-wrapper > .columns > div'));
  const rowContents = columns.map((column) => {
    // Handle the image element
    const picture = column.querySelector('picture img');
    let image = null;
    if (picture) {
      image = document.createElement('img');
      image.src = picture.getAttribute('src') || '';
      image.alt = picture.getAttribute('alt') || ''; // Ensure 'alt' attribute is handled robustly
    }

    // Handle the text content
    const textContainer = column.querySelector('div:last-child');
    let textContent = null;
    if (textContainer) {
      textContent = document.createElement('div');
      textContent.innerHTML = textContainer.innerHTML; // Ensure no null or undefined data
    }

    return [image, textContent].filter(item => item !== null); // Filter out null values robustly
  });

  cells.push(...rowContents);

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}