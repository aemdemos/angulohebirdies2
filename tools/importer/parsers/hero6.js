/* global WebImporter */
export default function parse(element, { document }) {
    // Define helper function to extract heading text
    const heading = element.querySelector('h1');
    let title = null;
    if (heading) {
        title = document.createElement('h1');
        title.textContent = heading.textContent.trim();
    }

    // Define helper function to extract image source
    const picture = element.querySelector('picture img');
    let image = null;
    if (picture) {
        image = document.createElement('img');
        image.src = picture.src;
        image.alt = picture.alt;
    }

    // Define table structure with proper content extraction
    const cells = [
        ['Hero'], // Header row matches example
        [title, image] // Content row with extracted heading and image
    ];

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block
    element.replaceWith(block);
}