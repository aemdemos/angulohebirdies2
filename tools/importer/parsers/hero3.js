/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  const blocks = [];

  element.querySelectorAll('.hero-wrapper').forEach((heroWrapper) => {
    const imageElement = heroWrapper.querySelector('img');
    const headingElement = heroWrapper.querySelector('h1');

    const image = imageElement ? document.createElement('img') : null;
    if (imageElement) {
      image.src = imageElement.src;
      image.alt = imageElement.alt;
      image.width = imageElement.width;
      image.height = imageElement.height;
    }

    const heading = headingElement ? document.createElement('h1') : null;
    if (headingElement) {
      heading.innerHTML = headingElement.innerHTML;
    }

    const cells = [
      ['Hero'],
      [image, heading]
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);
    blocks.push(block);
  });

  element.replaceWith(hr, ...blocks);
}