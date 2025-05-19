/* global WebImporter */
export default function parse(element, { document }) {
    const sectionBreak = document.createElement('hr');

    // Extract image
    const imageElement = element.querySelector('picture img');
    const image = imageElement ? imageElement.cloneNode(true) : null;

    // Extract links from list
    const list = element.querySelectorAll('ul li a');
    const links = Array.from(list).map(link => link.cloneNode(true));

    // Extract mail and copyright details
    const copyrightElement = element.querySelector('p a[href^="mailto"]');
    const copyrightTextElement = element.querySelector('p');
    const copyrightText = copyrightTextElement ? copyrightTextElement.textContent.trim() : '';

    // Extract social media links
    const socialMediaList = element.querySelectorAll('ul:last-of-type li a');
    const socialMediaLinks = Array.from(socialMediaList).map(link => link.cloneNode(true));

    // Create table rows
    const headerRow = ['Columns']; // Header row matching example exactly
    const firstRow = image ? [image] : [document.createTextNode('Image not found')];
    const secondRow = links.map(link => [link]);
    const thirdRow = copyrightElement ? [[copyrightElement, document.createTextNode(copyrightText)]] : [[document.createTextNode('Copyright details not found')]];
    const fourthRow = socialMediaLinks.length > 0 ? socialMediaLinks.map(link => [link]) : [[document.createTextNode('Social media links not found')]];

    // Generate table using WebImporter
    const tableData = [
        headerRow,
        ...firstRow,
        ...secondRow,
        ...thirdRow,
        ...fourthRow
    ];
    const table = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace element
    element.replaceWith(sectionBreak, table);
}