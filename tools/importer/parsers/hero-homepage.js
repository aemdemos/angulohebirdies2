/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-homepage
 * Base block: hero
 * Source: https://www.wknd-trendsetters.site/
 * Selector: header.section.secondary-section
 * Generated: 2026-04-27
 *
 * Source structure:
 *   <header class="section secondary-section">
 *     .container > .grid-layout > div (text content: h1, p.subheading, .button-group with 2 CTAs)
 *     .container > .grid-layout > div (images: 3x img.cover-image)
 *
 * Target table (from library example):
 *   Row 1: Image(s)
 *   Row 2: Heading + description + CTAs
 */
export default function parse(element, { document }) {
  // Extract images from the image grid area
  const images = Array.from(element.querySelectorAll('img.cover-image, .grid-layout .grid-layout img'));

  // Extract heading (h1 primary, fallback to h2/h3)
  const heading = element.querySelector('h1.h1-heading, h1, h2, h3');

  // Extract subheading / description paragraph
  const description = element.querySelector('p.subheading, .container > .grid-layout > div > p');

  // Extract CTA buttons from button group
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a.button, .button-group a'));

  // Build cells to match library example structure
  const cells = [];

  // Row 1: Image(s) — place all hero images in a single cell
  if (images.length > 0) {
    cells.push([images]);
  }

  // Row 2: Text content — heading, description, and CTAs combined in one cell
  const contentCell = [];
  if (heading) {
    contentCell.push(heading);
  }
  if (description) {
    contentCell.push(description);
  }
  if (ctaLinks.length > 0) {
    contentCell.push(...ctaLinks);
  }
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-homepage', cells });
  element.replaceWith(block);
}
