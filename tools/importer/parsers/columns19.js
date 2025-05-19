/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns'];

    const contentRows = Array.from(element.querySelectorAll('.columns > div')).map((column) => {
        const picture = column.querySelector('picture');
        const textContainer = column.querySelector('div:last-of-type');
        const textContent = textContainer ? textContainer.textContent.trim() : '';

        let cellContent = [];
        if (picture) {
            const img = picture.querySelector('img');
            if (img) {
                const imageElement = document.createElement('img');
                imageElement.src = img.src;
                imageElement.alt = img.alt || '';
                imageElement.width = img.width;
                imageElement.height = img.height;
                cellContent.push(imageElement);
            }
        }

        if (textContent) {
            const textElement = document.createElement('div');
            textElement.textContent = textContent;
            cellContent.push(textElement);
        }

        return cellContent.length > 0 ? cellContent : [''];
    });

    const tableData = [headerRow, ...contentRows];
    const table = WebImporter.DOMUtils.createTable(tableData, document);
    element.replaceWith(table);
}