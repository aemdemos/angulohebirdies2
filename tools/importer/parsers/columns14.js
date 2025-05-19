/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row to match the example EXACTLY
  const headerRow = ['Columns block'];

  // Helper function to parse images
  const parseImage = (img) => {
    if (!img) return '';
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt') || '';
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', src);
    imageElement.setAttribute('alt', alt);
    return imageElement;
  };

  // Helper function to parse links
  const parseLink = (anchor) => {
    if (!anchor) return '';
    const href = anchor.getAttribute('href');
    const textContent = anchor.textContent.trim();
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', href);
    linkElement.textContent = textContent;
    return linkElement;
  };

  // Extract navigation links
  const navSections = element.querySelector('.nav-sections');
  const navLinks = navSections ? Array.from(navSections.querySelectorAll('a')).map(parseLink) : [];

  // Extract donate button
  const navTools = element.querySelector('.nav-tools');
  const donateButton = navTools ? parseLink(navTools.querySelector('.button.primary')) : '';

  // Extract brand image
  const navBrand = element.querySelector('.nav-brand picture img');
  const brandImage = parseImage(navBrand);

  // Construct the content rows
  const contentRows = [
    [brandImage, navLinks.length ? navLinks : 'No Links Available'],
    [donateButton || 'No Button Available'],
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...contentRows], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}