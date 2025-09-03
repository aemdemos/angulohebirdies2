/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the <ul> with cards inside the block
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children);
  const rows = [['Cards']]; // Header row as in the example

  lis.forEach(li => {
    // Each card has an image and a body
    const imgDiv = li.querySelector('.cards-card-image');
    let imgCell = '';
    if (imgDiv) {
      // Use the <picture> element if present, else the <img> element
      const pic = imgDiv.querySelector('picture');
      if (pic) {
        imgCell = pic;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imgCell = img;
      }
    }
    // Use the body div as-is for text cell
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = '';
    if (bodyDiv) {
      textCell = bodyDiv;
    }
    rows.push([imgCell, textCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
