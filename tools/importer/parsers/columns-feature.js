/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-feature
 * Base block: columns
 * Source selector: main > section:nth-of-type(1) > .container > .grid-layout
 * Generated: 2026-04-27
 *
 * Source structure:
 *   div.grid-layout
 *     div (column 1: image)
 *       img.cover-image
 *     div (column 2: text content)
 *       div.breadcrumbs (links)
 *       h2.h2-heading (heading)
 *       div (author, date, read time metadata)
 *
 * Target structure (from library example):
 *   | Columns |  |
 *   | image   | content text |
 *
 * One row with two cells: left cell = image, right cell = text content.
 */
export default function parse(element, { document }) {
  // Get direct child divs representing columns
  const columns = element.querySelectorAll(':scope > div');

  const cells = [];

  if (columns.length >= 2) {
    // Column 1: image column
    const imageCol = columns[0];
    const image = imageCol.querySelector('img.cover-image, img');
    const col1Content = [];
    if (image) {
      col1Content.push(image);
    }

    // Column 2: text content column
    const textCol = columns[1];
    const col2Content = [];

    // Breadcrumbs
    const breadcrumbs = textCol.querySelector('.breadcrumbs');
    if (breadcrumbs) {
      col2Content.push(breadcrumbs);
    }

    // Heading
    const heading = textCol.querySelector('h2.h2-heading, h2, h1, h3');
    if (heading) {
      col2Content.push(heading);
    }

    // Author/date metadata - the remaining div(s) after breadcrumbs and heading
    const metaDivs = textCol.querySelectorAll(':scope > div:not(.breadcrumbs)');
    metaDivs.forEach((div) => {
      // Skip if this div contains the heading (some structures nest differently)
      if (!div.querySelector('h2, h1, h3') && div !== heading) {
        col2Content.push(div);
      }
    });

    cells.push([
      col1Content.length === 1 ? col1Content[0] : col1Content,
      col2Content.length === 1 ? col2Content[0] : col2Content,
    ]);
  } else {
    // Fallback: treat all content as a single row
    const allContent = Array.from(element.children);
    cells.push(allContent);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
