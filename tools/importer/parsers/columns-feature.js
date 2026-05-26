/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-feature
 * Base block: columns
 * Source: https://www.wknd-trendsetters.site/
 * Selector: main > section.section:nth-of-type(1)
 * Generated: 2026-05-26
 *
 * Source structure: 2-column grid layout
 *   - Column 1: Feature image (cover-image with 3:2 aspect ratio)
 *   - Column 2: Breadcrumbs, heading (h2), author info, date/read time
 *
 * Target: Columns block with 2 columns, 1 row of content
 * xwalk note: Columns blocks do NOT require field hint comments per hinting rules.
 */
export default function parse(element, { document }) {
  // Find the grid layout container with the two columns
  const gridLayout = element.querySelector('.grid-layout');
  const columns = gridLayout ? Array.from(gridLayout.querySelectorAll(':scope > div')) : [];

  // Column 1: Feature image
  const col1Content = [];
  const featureImage = element.querySelector('img.cover-image, img[class*="cover-image"]');
  if (featureImage) {
    col1Content.push(featureImage);
  }

  // Column 2: Heading, breadcrumbs, author metadata
  const col2Content = [];

  // Breadcrumbs
  const breadcrumbs = element.querySelector('.breadcrumbs');
  if (breadcrumbs) {
    col2Content.push(breadcrumbs);
  }

  // Heading
  const heading = element.querySelector('h2, h1, h3, [class*="heading"]');
  if (heading) {
    col2Content.push(heading);
  }

  // Author and date metadata (all the spans with paragraph-sm class)
  const metaContainer = columns[1];
  if (metaContainer) {
    const metaDivs = metaContainer.querySelectorAll(':scope > div > div.flex-horizontal, :scope > div > div > div.flex-horizontal');
    metaDivs.forEach((div) => {
      col2Content.push(div);
    });
  }

  // Build cells: single row with 2 columns
  const cells = [
    [col1Content, col2Content],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
