/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the hero block (handles both .hero.block and direct content)
  let image = null;
  let heading = null;

  // Try to find the hero block wrapper
  const heroBlock = element.querySelector('.hero.block');
  if (heroBlock) {
    // Try to find a div > div in hero block
    // Sometimes .hero.block > div > div
    // (But could be just .hero.block > div)
    let innerDiv = heroBlock.querySelector('div > div');
    if (!innerDiv) {
      innerDiv = heroBlock.querySelector('div');
    }
    if (innerDiv) {
      // Find the first <picture> or, if not, <img>
      image = innerDiv.querySelector('picture') || innerDiv.querySelector('img');
      // Find the first heading (h1-h6)
      heading = innerDiv.querySelector('h1, h2, h3, h4, h5, h6');
    }
  }

  // Fallback: if missing, also check directly inside element
  if (!image) {
    image = element.querySelector('picture') || element.querySelector('img');
  }
  if (!heading) {
    heading = element.querySelector('h1, h2, h3, h4, h5, h6');
  }

  // Table structure from example:
  // 1st row: ['Hero']
  // 2nd row: [image] (optional)
  // 3rd row: [heading] (optional)
  // Always produce 3 rows for consistency with the example
  const rows = [];
  rows.push(['Hero']);
  rows.push([image ? image : '']);
  rows.push([heading ? heading : '']);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
