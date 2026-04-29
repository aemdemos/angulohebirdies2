/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-banner
 * Base block: hero
 * Selector: section.inverse-section
 * Generated: 2026-04-27
 *
 * Source structure:
 *   section.inverse-section > .container > .grid-layout > div
 *     img.cover-image          — background image
 *     .card-body               — content overlay
 *       h2.h1-heading          — heading
 *       p.subheading           — description
 *       .button-group > a.button — CTA link(s)
 *
 * Target table (from library example):
 *   Row 1: background image
 *   Row 2: heading, description, CTA buttons (content cell)
 */
export default function parse(element, { document }) {
  // Extract background image
  const bgImage = element.querySelector('img.cover-image, img.utility-overlay, img[class*="cover"]');

  // Extract heading (h2.h1-heading in source, fallback to h1, h2, h3)
  const heading = element.querySelector('h2.h1-heading, h1, h2, h3, [class*="heading"]');

  // Extract description paragraph
  const description = element.querySelector('p.subheading, p[class*="subheading"], .card-body p');

  // Extract CTA buttons
  const ctaLinks = Array.from(
    element.querySelectorAll('.button-group a.button, .button-group a, a.button, a.inverse-button')
  );

  // Build cells array matching library example structure
  const cells = [];

  // Row 1: Background image (if present)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Content cell — heading, description, and CTA buttons in a single cell
  const contentWrapper = document.createElement('div');
  if (heading) {
    contentWrapper.append(heading);
  }
  if (description) {
    contentWrapper.append(description);
  }
  if (ctaLinks.length > 0) {
    ctaLinks.forEach((link) => contentWrapper.append(link));
  }
  if (contentWrapper.childNodes.length > 0) {
    cells.push([contentWrapper]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
