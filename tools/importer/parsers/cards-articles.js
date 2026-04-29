/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-articles
 * Base block: cards
 * Source: https://www.wknd-trendsetters.site/
 * Selector: main > section:nth-of-type(4) .grid-layout.desktop-4-column
 * Generated: 2026-04-27
 *
 * Source structure:
 *   div.grid-layout.desktop-4-column
 *     a.article-card.card-link (repeated)
 *       div.article-card-image > img.cover-image
 *       div.article-card-body
 *         div.article-card-meta > span.tag + span.paragraph-sm (date)
 *         h3.h4-heading (title)
 *
 * Target: Cards block with one row per card.
 *   Row: [ image, [tag, date, heading, link] ]
 */
export default function parse(element, { document }) {
  // Select all article card links within the grid
  const cards = element.querySelectorAll('a.article-card, a.card-link');

  const cells = [];

  cards.forEach((card) => {
    // Extract image
    const image = card.querySelector('.article-card-image img, img.cover-image');

    // Build content cell: tag, date, heading
    const contentCell = [];

    // Extract tag/category
    const tag = card.querySelector('.article-card-meta .tag, .tag');
    if (tag) {
      const tagEl = document.createElement('em');
      tagEl.textContent = tag.textContent.trim();
      contentCell.push(tagEl);
    }

    // Extract date
    const date = card.querySelector('.article-card-meta .paragraph-sm, .utility-text-secondary');
    if (date) {
      const dateEl = document.createElement('span');
      dateEl.textContent = date.textContent.trim();
      contentCell.push(dateEl);
    }

    // Extract heading
    const heading = card.querySelector('h3, h2, h4, .h4-heading');
    if (heading) {
      contentCell.push(heading);
    }

    // Preserve the card link as a CTA
    const link = document.createElement('a');
    link.href = card.href || card.getAttribute('href');
    link.textContent = heading ? heading.textContent.trim() : 'Read more';
    contentCell.push(link);

    // Build row: [image, content]
    const row = [];
    if (image) {
      row.push(image);
    }
    row.push(contentCell);

    cells.push(row);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-articles', cells });
  element.replaceWith(block);
}
