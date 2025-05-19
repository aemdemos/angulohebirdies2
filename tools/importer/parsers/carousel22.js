/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Create header row with block name
  const headerRow = ['Carousel'];
  rows.push(headerRow);

  // Extract slides from the carousel
  const slides = element.querySelectorAll(':scope > div > div');
  slides.forEach((slide) => {
    const imageContainer = slide.querySelector('.carousel-image img');
    const textContainer = slide.querySelector('.carousel-text');

    // Handle image content
    let image = null;
    if (imageContainer) {
      image = document.createElement('img');
      image.src = imageContainer.src;
      image.alt = imageContainer.alt || '';
    }

    // Handle text content
    const textContent = document.createElement('div');
    if (textContainer) {
      const title = textContainer.querySelector('h1, h2');
      if (title) {
        const titleElement = document.createElement(title.tagName);
        titleElement.textContent = title.textContent;
        textContent.appendChild(titleElement);
      }

      const paragraphs = textContainer.querySelectorAll('p');
      paragraphs.forEach((p) => {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = p.textContent;
        textContent.appendChild(paragraphElement);
      });

      const link = textContainer.querySelector('a');
      if (link) {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent;
        textContent.appendChild(linkElement);
      }
    }

    if (image || textContent.hasChildNodes()) {
      rows.push([image, textContent]);
    }
  });

  // Create the table using the helper method
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}