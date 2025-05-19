/* global WebImporter */
export default function parse(element, { document }) {
    const hr = document.createElement('hr');

    // Correctly create the header row as per the example
    const headerRow = ['Columns'];

    // Initialize table structure with the header
    const columnsTable = [headerRow];

    // Extract rows dynamically from the element
    const rows = Array.from(element.querySelectorAll('.columns > div')).map((block) => {
        // Extract image element
        const image = block.querySelector('picture img');
        const imageElement = image ? image.cloneNode(true) : document.createTextNode('No Image Available');

        // Extract text content
        const textContent = block.querySelector('div:last-child');
        const contentElement = textContent ? textContent.cloneNode(true) : document.createTextNode('No Content Available');

        // Ensure both cells in the row have valid content
        return [imageElement, contentElement];
    });

    // Add extracted rows to the table
    columnsTable.push(...rows);

    // Create the block table using WebImporter.DOMUtils.createTable
    const columnsBlock = WebImporter.DOMUtils.createTable(columnsTable, document);

    // Replace original element with the new structure
    element.replaceWith(hr, columnsBlock);
}