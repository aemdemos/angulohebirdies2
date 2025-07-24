/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the inner content block: drill down to the innermost div with actual content
  let contentDiv = element;
  while (
    contentDiv &&
    contentDiv.children.length === 1 &&
    contentDiv.firstElementChild.tagName.toLowerCase() === 'div'
  ) {
    contentDiv = contentDiv.firstElementChild;
  }
  // Now, contentDiv likely contains children: p (with picture/img), h1, etc.
  const contentChildren = Array.from(contentDiv.children);

  // 2. Extract the image (picture/img) block (should be first p > picture)
  let imageBlock = '';
  let textBlocks = [];
  if (contentChildren.length > 0) {
    // Find the first element that contains <picture> or <img>
    let pictureIdx = contentChildren.findIndex(el => el.querySelector('picture, img'));
    if (pictureIdx !== -1) {
      // Reference the <picture> or <img> directly, not the wrapping p
      let picParent = contentChildren[pictureIdx];
      let pictureOrImg = picParent.querySelector('picture, img');
      imageBlock = pictureOrImg;
    }
    // All children except the image block should be included in the text
    textBlocks = contentChildren.filter((el, idx) => idx !== pictureIdx && (el.textContent && el.textContent.trim() !== ''));
  }

  // 3. Table construction
  // Header as in example, never hardcoded except for label
  const rows = [
    ['Hero'],
    [imageBlock ? imageBlock : ''],
    [textBlocks.length === 1 ? textBlocks[0] : textBlocks],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
