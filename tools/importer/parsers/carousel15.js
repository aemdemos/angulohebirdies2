/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row for the block type
  const headerRow = ['Carousel'];
  rows.push(headerRow);

  // Process each image and optional text content
  const slides = element.querySelectorAll('.logos.block > div:not(.overflow)');
  slides.forEach((slide) => {
    const imageCell = [];
    const textCell = [];

    // Extract image
    const picture = slide.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        imageCell.push(img);
      }
    }

    // Extract text content (if applicable)
    const textContent = slide.querySelector('div:nth-of-type(2)');
    if (textContent && textContent.textContent.trim()) {
      const title = textContent.querySelector('h2, h3');
      const description = textContent.querySelector('p');
      const callToAction = textContent.querySelector('a');

      if (title) {
        const titleElem = document.createElement('h2');
        titleElem.textContent = title.textContent;
        textCell.push(titleElem);
      }
      if (description) {
        const descriptionElem = document.createElement('p');
        descriptionElem.textContent = description.textContent;
        textCell.push(descriptionElem);
      }
      if (callToAction) {
        const link = document.createElement('a');
        link.href = callToAction.href;
        link.textContent = callToAction.textContent;
        textCell.push(link);
      }
    }

    rows.push([imageCell.length ? imageCell : null, textCell.length ? textCell : '']);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}