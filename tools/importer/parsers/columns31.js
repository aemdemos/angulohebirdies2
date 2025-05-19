/* global WebImporter */
export default function parse(element, { document }) {
    const createTable = WebImporter.DOMUtils.createTable;

    // Extract content from the provided element
    const headerRow = ['Columns'];
    const cells = [];

    // Add header row
    cells.push(headerRow);

    // Extract relevant content for the second row
    const columns = [];

    // Extract logo image
    const logoImage = element.querySelector('nav .nav-brand a picture img');
    if (logoImage) {
        const img = document.createElement('img');
        img.src = logoImage.src;
        img.alt = logoImage.alt || '';
        columns.push(img);
    }

    // Extract navigation links
    const navLinks = Array.from(element.querySelectorAll('nav .nav-sections ul li a')).map(link => {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent.trim();
        return anchor;
    });
    if (navLinks.length > 0) {
        const navContainer = document.createElement('ul');
        navLinks.forEach((link) => {
            const listItem = document.createElement('li');
            listItem.append(link);
            navContainer.append(listItem);
        });
        columns.push(navContainer);
    }

    // Extract donate button
    const donateButton = element.querySelector('nav .nav-tools .button-container a');
    if (donateButton) {
        const button = document.createElement('a');
        button.href = donateButton.href;
        button.textContent = donateButton.textContent.trim();
        columns.push(button);
    }

    if (columns.length > 0) {
        cells.push(columns);
    }

    // Create block table
    const table = createTable(cells, { document });

    // Replace original element with new block table
    element.replaceWith(table);
}