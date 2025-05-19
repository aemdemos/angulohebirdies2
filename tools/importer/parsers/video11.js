/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Extract image from the footer
  const imgElement = element.querySelector('img');
  const img = imgElement ? imgElement.cloneNode(true) : null;

  // Extract links
  const linkElements = element.querySelectorAll('a');
  const links = Array.from(linkElements).map((link) => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim();
    return a;
  });

  // Extract social media links
  const socialLinks = element.querySelectorAll('ul:nth-of-type(2) li a');
  const socialMediaLinks = Array.from(socialLinks).map((link) => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.href.trim(); // Use href as text for social media links
    return a;
  });

  // Prepare header row that matches the example exactly
  const headerRow = ['Footer'];

  // Prepare table content rows
  const contentRows = [];
  if (img) {
    contentRows.push([img]);
  }
  links.forEach(link => {
    contentRows.push([link]);
  });
  socialMediaLinks.forEach(socialLink => {
    contentRows.push([socialLink]);
  });

  // Combine content for the table
  cells.push(headerRow); // Ensure header matches example markdown structure
  cells.push(...contentRows);

  // Create the table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}