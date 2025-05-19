/* global WebImporter */
export default function parse(element, { document }) {
    const cells = [];

    // Extracting block name for the header row
    const headerRow = ['Hero'];
    cells.push(headerRow);

    // Extracting content for the second row
    const content = [];

    // Background image
    const imgElement = element.querySelector('picture img');
    if (imgElement) {
        const img = document.createElement('img');
        img.src = imgElement.src;
        img.alt = imgElement.alt;
        content.push(img);
    }

    // Title
    const titleElement = element.querySelector('h1');
    if (titleElement) {
        const title = document.createElement('h1');
        title.textContent = titleElement.textContent;
        content.push(title);
    }

    // Adding content to the second row as a single cell
    cells.push([content]);

    // Creating table
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replacing the element
    element.replaceWith(table);
}