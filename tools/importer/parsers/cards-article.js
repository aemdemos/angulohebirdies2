/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article variant.
 * Base block: cards
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-05-26
 *
 * UE Model (container block):
 *   - card item fields: image (reference), text (richtext)
 *   - Each card = one row with 2 columns: [image] | [text]
 *
 * Source structure:
 *   a.article-card.card-link
 *     > .article-card-image > img.cover-image
 *     > .article-card-body > .article-card-meta (.tag + .paragraph-sm) + h3.h4-heading
 */
export default function parse(element, { document }) {
  // Select only direct child anchor elements that are article cards
  // Using :scope > to avoid nested/duplicate matches
  const cards = Array.from(element.querySelectorAll(':scope > a.article-card'));

  const cells = [];

  cards.forEach((card) => {
    // Extract image from the card image container
    const img = card.querySelector('.article-card-image img');

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src || img.getAttribute('src') || '';
      imgEl.alt = img.alt || img.getAttribute('alt') || '';
      imageCell.appendChild(imgEl);
    }

    // Extract text content from the card body
    const tag = card.querySelector('.article-card-meta .tag');
    const date = card.querySelector('.article-card-meta .utility-text-secondary');
    const heading = card.querySelector('.article-card-body h3');

    // Build text cell with field hint
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));

    // Create a container for the text content
    const textContainer = document.createElement('div');

    // Add tag as paragraph
    if (tag && tag.textContent.trim()) {
      const tagP = document.createElement('p');
      tagP.textContent = tag.textContent.trim();
      textContainer.appendChild(tagP);
    }

    // Add date as paragraph
    if (date && date.textContent.trim()) {
      const dateP = document.createElement('p');
      dateP.textContent = date.textContent.trim();
      textContainer.appendChild(dateP);
    }

    // Add heading as linked h3 (card is an anchor with href)
    if (heading) {
      const href = card.getAttribute('href') || card.href || '';
      const h = document.createElement('h3');
      if (href) {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = heading.textContent.trim();
        h.appendChild(link);
      } else {
        h.textContent = heading.textContent.trim();
      }
      textContainer.appendChild(h);
    }

    textCell.appendChild(textContainer);

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
