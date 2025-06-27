/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per example
  const headerRow = ['Carousel (carousel12)'];

  // Find the carousel slides container
  const logosWrapper = element.querySelector('.logos-wrapper');
  if (!logosWrapper) return;
  const logosBlock = logosWrapper.querySelector('.logos.block');
  if (!logosBlock) return;

  // Select only the primary slides, not clones or overflow
  const slides = Array.from(logosBlock.children).filter(div =>
    div.nodeType === 1 && !div.classList.contains('overflow') && !div.classList.contains('mirror')
  );

  // Compose rows: [picture, text content]
  const rows = slides.map(slideDiv => {
    // Find the first <picture>
    const picture = slideDiv.querySelector('picture');
    let textCell = '';

    // 1. Try: find a direct child div containing text/elements (not the one with <picture>)
    const directDivs = slideDiv.querySelectorAll(':scope > div');
    // The image is always in the first div, text (if any) in the second
    if (directDivs.length > 1) {
      const textDiv = directDivs[1];
      const textNodes = Array.from(textDiv.childNodes).filter(n => {
        if (n.nodeType === Node.ELEMENT_NODE) return true;
        if (n.nodeType === Node.TEXT_NODE && n.textContent.trim()) return true;
        return false;
      });
      if (textNodes.length) {
        textCell = textNodes;
      } else if (textDiv.textContent && textDiv.textContent.trim()) {
        textCell = textDiv.textContent.trim();
      }
    }

    // 2. Fallback: Any text/elements after the <picture> or outside the <picture>-holding div
    if (!textCell) {
      // Get all nodes of slideDiv that are not in the first direct div (image) or are non-empty text
      const nonImageContent = Array.from(slideDiv.childNodes).filter(n => {
        // Skip the first div (image)
        if (n === directDivs[0]) return false;
        if (n.nodeType === Node.ELEMENT_NODE && n.tagName.toLowerCase() !== 'div') return true;
        if (n.nodeType === Node.TEXT_NODE && n.textContent.trim()) return true;
        return false;
      });
      if (nonImageContent.length) {
        textCell = nonImageContent;
      }
    }

    // 3. If still no text, try to find any heading or p anywhere in slideDiv except inside the picture
    if (!textCell) {
      const possibleTextEls = Array.from(slideDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, span'))
        .filter(el => !el.closest('picture'));
      if (possibleTextEls.length) {
        textCell = possibleTextEls;
      }
    }

    // 4. Fallback: textContent from slide excluding picture
    if (!textCell) {
      let allText = '';
      Array.from(slideDiv.childNodes).forEach(n => {
        if (n.nodeType === Node.TEXT_NODE && n.textContent.trim()) {
          allText += n.textContent.trim() + ' ';
        }
      });
      textCell = allText.trim();
    }

    // If textCell is still empty string, set to ''
    if (!textCell) textCell = '';
    return [picture, textCell];
  });

  // Only include rows with a valid <picture>
  const validRows = rows.filter(row => row[0]);
  if (!validRows.length) return;

  // Build the table and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...validRows
  ], document);
  element.replaceWith(table);
}
