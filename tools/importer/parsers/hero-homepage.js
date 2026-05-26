/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-homepage
 * Base block: hero
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-05-26
 *
 * UE Model fields:
 *   - image (reference, single) + imageAlt (collapsed)
 *   - text (richtext)
 *
 * Source structure: header.section.secondary-section containing
 *   h1.h1-heading, p.subheading, .button-group with 2 CTAs, 3 img.cover-image
 */
export default function parse(element, { document }) {
  // --- Row 1: Image ---
  // Model has single image field (multi: false), use first cover image
  const image = element.querySelector('img.cover-image, img[class*="cover"], img');

  const imageCell = [];
  if (image) {
    const fieldHint = document.createComment(' field:image ');
    const frag = document.createDocumentFragment();
    frag.appendChild(fieldHint);
    frag.appendChild(image);
    imageCell.push(frag);
  }

  // --- Row 2: Text (richtext) - heading + subheading + CTAs ---
  const heading = element.querySelector('h1.h1-heading, h1, h2, [class*="heading"]');
  const description = element.querySelector('p.subheading, p[class*="subheading"], .subheading');
  const ctaLinks = Array.from(
    element.querySelectorAll('.button-group a.button, .button-group a, a.button')
  );

  const textFrag = document.createDocumentFragment();
  const textFieldHint = document.createComment(' field:text ');
  textFrag.appendChild(textFieldHint);
  if (heading) textFrag.appendChild(heading);
  if (description) textFrag.appendChild(description);
  if (ctaLinks.length > 0) {
    // Wrap CTAs in a paragraph for proper richtext structure
    const ctaWrapper = document.createElement('p');
    ctaLinks.forEach((link) => {
      ctaWrapper.appendChild(link);
    });
    textFrag.appendChild(ctaWrapper);
  }

  // Build cells array: Row 1 = image, Row 2 = text (single column simple block)
  const cells = [];
  if (imageCell.length > 0) {
    cells.push(imageCell);
  }
  if (textFrag.childNodes.length > 1) {
    // textFrag has at least the field hint + content
    cells.push([textFrag]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-homepage', cells });
  element.replaceWith(block);
}
