/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row, matching the example exactly
  const cells = [['Carousel']];

  // Extract slides from the carousel block
  const slides = Array.from(element.querySelectorAll('div > div'));

  slides.forEach((slide) => {
    // Extract image element
    const imageContainer = slide.querySelector('.carousel-image picture img');

    // Ensure image exists
    if (!imageContainer) return;

    const image = document.createElement('img');
    image.src = imageContainer.src;
    image.alt = imageContainer.alt || '';

    // Extract text content
    const textContainer = slide.querySelector('.carousel-text');
    const textContent = document.createElement('div');

    let hasContent = false; // Track if meaningful content exists

    if (textContainer) {
      // Add title if present
      const title = textContainer.querySelector('h1, h2');
      if (title) {
        const titleElement = document.createElement('h2');
        titleElement.textContent = title.textContent;
        textContent.appendChild(titleElement);
        hasContent = true;
      }

      // Add paragraphs and links
      const paragraphs = textContainer.querySelectorAll('p');
      paragraphs.forEach((paragraph) => {
        if (!paragraph.classList.contains('button-container')) {
          const pElement = document.createElement('p');
          pElement.textContent = paragraph.textContent;
          textContent.appendChild(pElement);
          hasContent = true;
        } else {
          const link = paragraph.querySelector('a');
          if (link) {
            const linkElement = document.createElement('a');
            linkElement.href = link.href;
            linkElement.textContent = link.textContent;
            textContent.appendChild(linkElement);
            hasContent = true;
          }
        }
      });
    }

    // Only add the row if content exists
    if (hasContent) {
      cells.push([image, textContent]);
    }
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured block table
  element.replaceWith(blockTable);
}