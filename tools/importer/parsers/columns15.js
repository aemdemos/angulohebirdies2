/* global WebImporter */
export default function parse(element, { document }) {
    const cells = [];

    // First row: Header row
    cells.push(['Columns']);

    // Second row: Extract and properly group content into cells
    const contentCells = [];

    // Extract paragraphs and lists from the footer
    const footerWrapper = element.querySelector('.footer-wrapper');
    if (footerWrapper) {
        const paragraphs = footerWrapper.querySelectorAll('p');
        paragraphs.forEach((p) => {
            const list = p.querySelector('ul');
            if (list) {
                const listItems = Array.from(list.querySelectorAll('li')).map((li) => li.textContent);
                contentCells.push(listItems.join('<br>'));
            } else {
                contentCells.push(p.textContent.trim());
            }
        });
    }

    // Extract relevant links (not social media links)
    const linksToInclude = ['/birdies-for-the-brave-charitable-solicitation-info-1.pdf', '/terms-of-service', '/connect'];
    const links = element.querySelectorAll('a');
    links.forEach((link) => {
        const href = link.getAttribute('href');
        if (linksToInclude.includes(href)) {
            const relevantLink = document.createElement('a');
            relevantLink.href = href;
            relevantLink.textContent = link.textContent.trim();
            contentCells.push(relevantLink);
        }
    });

    // Extract images
    const images = element.querySelectorAll('img');
    images.forEach((img) => {
        const imageElement = document.createElement('img');
        imageElement.src = img.src;
        imageElement.alt = img.alt || '';
        contentCells.push(imageElement);
    });

    // Add structured rows to the table
    if (contentCells.length > 0) {
        cells.push(contentCells);
    } else {
        cells.push(['']); // Handle edge case of empty content
    }

    // Create the table using WebImporter.DOMUtils.createTable
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(table);
}