/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-banner
 * Base block: hero
 * Source: https://www.wknd-trendsetters.site/
 * Selector: section.inverse-section
 * Generated: 2026-05-26
 *
 * UE Model fields:
 *   - image (reference) -> Row 1: background image
 *   - imageAlt (collapsed into image alt attribute)
 *   - text (richtext) -> Row 2: heading + paragraph + CTA
 */
export default function parse(element, { document }) {
  // Extract background/cover image
  const bgImage = element.querySelector('img.cover-image, img[class*="cover"], img[class*="background"], img[class*="overlay"]');

  // Extract heading (h2.h1-heading in source, fallback to h1, h2, h3)
  const heading = element.querySelector('h2.h1-heading, h1, h2, h3, [class*="heading"]');

  // Extract description paragraph
  const description = element.querySelector('p.subheading, p[class*="subheading"], .card-body p, .utility-text-on-overlay p');

  // Extract CTA buttons
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button, a.inverse-button, a[class*="button"]'));

  // Build cells matching UE model structure (2 rows: image, text)
  const cells = [];

  // Row 1: image field (with field hint)
  if (bgImage) {
    const imageFragment = document.createDocumentFragment();
    imageFragment.appendChild(document.createComment(' field:image '));
    imageFragment.appendChild(bgImage);
    cells.push([imageFragment]);
  } else {
    // Empty row for image - model requires it
    cells.push(['']);
  }

  // Row 2: text field (richtext - heading + description + CTAs)
  const textFragment = document.createDocumentFragment();
  textFragment.appendChild(document.createComment(' field:text '));

  if (heading) {
    textFragment.appendChild(heading);
  }
  if (description) {
    textFragment.appendChild(description);
  }
  if (ctaLinks.length > 0) {
    const buttonContainer = document.createElement('p');
    ctaLinks.forEach((link) => {
      buttonContainer.appendChild(link);
    });
    textFragment.appendChild(buttonContainer);
  }

  cells.push([textFragment]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
