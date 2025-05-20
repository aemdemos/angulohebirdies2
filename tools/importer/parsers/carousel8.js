/* global WebImporter */
export default function parse(element, { document }) {
  const slides = Array.from(element.querySelectorAll('.carousel > div'));

  const tableContent = slides.map((slide) => {
    const imageContainer = slide.querySelector('.carousel-image img');

    if (!imageContainer) {
      console.warn('Missing image in carousel slide');
      return ['', ''];
    }

    const image = document.createElement('img');
    image.src = imageContainer.getAttribute('src');
    image.alt = imageContainer.getAttribute('alt') || '';

    const textContainer = slide.querySelector('.carousel-text');
    const heading = textContainer ? textContainer.querySelector('h1, h2') : null;
    const paragraphs = textContainer ? Array.from(textContainer.querySelectorAll('p')) : [];

    const textElements = [];

    if (heading) {
      const headingElement = document.createElement(heading.tagName);
      headingElement.textContent = heading.textContent.trim();
      textElements.push(headingElement);
    }

    paragraphs.forEach((paragraph) => {
      const link = paragraph.querySelector('a');
      if (link) {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent.trim();
        textElements.push(anchor);
      } else {
        const pElement = document.createElement('p');
        pElement.textContent = paragraph.textContent.trim();
        textElements.push(pElement);
      }
    });

    return [image, textElements.length > 0 ? textElements : ''];
  });

  const headerRow = ['Carousel'];
  const cells = [headerRow, ...tableContent];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}