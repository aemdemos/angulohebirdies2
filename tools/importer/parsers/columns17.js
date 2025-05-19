/* global WebImporter */
export default function parse(element, { document }) {
    const rows = [];

    // Founding Partners Section
    const foundingPartnersHeader = ['Founding Partners'];
    rows.push(foundingPartnersHeader);

    const foundingPartnersImage = element.querySelector('#founding-partners + p img');
    const foundingPartnersDescription = element.querySelector('#phil-and-amy-mickelson').nextElementSibling;
    rows.push([foundingPartnersImage]);
    rows.push([foundingPartnersDescription]);

    // 4 Star Partners Section
    const fourStarPartnersHeader = ['4 Star Partners'];
    rows.push(fourStarPartnersHeader);

    const fourStarPartnersImage = element.querySelector('#star-partners + ul img');
    rows.push([fourStarPartnersImage]);

    // 3 Star Partners Section
    const threeStarPartnersHeader = ['3 Star Partners'];
    rows.push(threeStarPartnersHeader);

    const threeStarPartnersDescription = element.querySelector('#star-partners-1 + ul');
    rows.push([threeStarPartnersDescription]);

    // 2 Star Partners Section
    const twoStarPartnersHeader = ['2 Star Partners'];
    rows.push(twoStarPartnersHeader);

    const twoStarPartnersImages = Array.from(element.querySelectorAll('#star-partners-2 + ul img'));
    twoStarPartnersImages.forEach((img) => rows.push([img]));

    // 1 Star Partners Section
    const oneStarPartnersHeader = ['1 Star Partners'];
    rows.push(oneStarPartnersHeader);

    const oneStarPartnersItems = Array.from(element.querySelectorAll('#star-partners-3 + ul li')).map(item => item.textContent);
    rows.push([oneStarPartnersItems.join(' ')]); // Combine all items into plain text within a single cell

    // Become a Partner Section
    const becomePartnerHeader = ['Become a Partner'];
    rows.push(becomePartnerHeader);

    const becomePartnerDescription = element.querySelector('#become-a-birdies-for-the-brave-partner + p');
    rows.push([becomePartnerDescription]);

    // Generate table
    const table = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the new table
    element.replaceWith(table);
}