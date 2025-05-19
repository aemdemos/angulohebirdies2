/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Safely extract navigation links
  const navSections = element.querySelector('.nav-sections ul');
  const navLinks = navSections ? Array.from(navSections.querySelectorAll('a')).map(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent || 'Unnamed link';
    return a;
  }) : ['No navigation available'];

  // Safely extract donate button
  const navTools = element.querySelector('.nav-tools .button-container a');
  const donateButton = navTools ? document.createElement('a') : document.createTextNode('No donate button available');
  if (navTools) {
    donateButton.href = navTools.href;
    donateButton.textContent = navTools.textContent || 'Donate';
  }

  // Safely extract images
  const images = Array.from(element.querySelectorAll('picture img')).map(img => {
    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.alt || 'Image';
    image.width = img.width;
    image.height = img.height;
    return image;
  });

  const imageCell1 = images[0] || document.createTextNode('No image available');
  const imageCell2 = images[1] || document.createTextNode('No image available');

  // Organize into the table array
  const cells = [
    headerRow,
    [imageCell1, navLinks],
    [imageCell2, donateButton]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}