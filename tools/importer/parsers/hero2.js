/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name exactly as in the example
  const headerRow = ['Hero'];

  // Try to find the content root containing image and text
  let contentRoot = element;
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (heroWrapper) {
    const heroBlock = heroWrapper.querySelector('.hero.block');
    if (heroBlock) {
      // Go deeper to find the div with image and content
      const inners = heroBlock.querySelectorAll(':scope > div > div');
      if (inners.length > 0) {
        contentRoot = inners[0];
      } else {
        const directDiv = heroBlock.querySelector(':scope > div');
        if (directDiv) contentRoot = directDiv;
      }
    }
  }

  // Find the first image (picture or img) in contentRoot
  let imageEl = null;
  // Look for a <p> that contains a <picture> or <img>
  const imageP = Array.from(contentRoot.children).find(child => {
    if (child.tagName.toLowerCase() === 'p' && child.querySelector('picture')) return true;
    if (child.tagName.toLowerCase() === 'p' && child.querySelector('img')) return true;
    return false;
  });
  if (imageP && imageP.querySelector('picture')) {
    imageEl = imageP.querySelector('picture');
  } else if (imageP && imageP.querySelector('img')) {
    imageEl = imageP.querySelector('img');
  } else {
    // fallback: direct picture or img
    const picture = contentRoot.querySelector('picture');
    if (picture) imageEl = picture;
    else {
      const img = contentRoot.querySelector('img');
      if (img) imageEl = img;
    }
  }

  // Gather content nodes for the main text content
  const contentNodes = [];
  Array.from(contentRoot.children).forEach(child => {
    if (imageEl && (child.contains(imageEl) || child === imageEl)) {
      // skip image-containing element
      return;
    }
    // Only push if there's actual text or an element
    if (child.textContent.trim() !== '' || child.children.length > 0) {
      contentNodes.push(child);
    }
  });

  // Only add the content row if there is non-empty content
  const rows = [headerRow];
  if (imageEl) rows.push([imageEl]);
  if (contentNodes.length) rows.push([contentNodes]);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
