/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the carousel block
  const headerRow = ['Carousel (carousel8)'];

  // Get all carousel slides (direct children)
  const slideDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Helper to extract the image cell from a slide
  function getImageCell(slide) {
    const imgDiv = slide.querySelector('.carousel-image');
    if (imgDiv) {
      // Use the first <picture> if present, else the <img>
      const picture = imgDiv.querySelector('picture');
      if (picture) return picture;
      const img = imgDiv.querySelector('img');
      if (img) return img;
    }
    return '';
  }

  // Helper to extract the text cell from a slide. Only reference existing elements.
  function getTextCell(slide) {
    const textDiv = slide.querySelector('.carousel-text');
    if (!textDiv) return '';
    // Remove the carousel-buttons from the content cell (reference all other direct children)
    const cellContent = [];
    Array.from(textDiv.childNodes).forEach((node) => {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.classList.contains('carousel-buttons')
      ) {
        // skip carousel nav dots
        return;
      }
      // Otherwise include the node (reference it as-is)
      cellContent.push(node);
    });
    // If only one node, return the node directly, otherwise array
    if (cellContent.length === 1) return cellContent[0];
    if (cellContent.length > 1) return cellContent;
    return '';
  }

  // Compose the rows for each slide
  const rows = slideDivs.map(slide => [getImageCell(slide), getTextCell(slide)]);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
