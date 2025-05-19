/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image and verify its presence
  const picture = element.querySelector('picture');
  const img = picture ? picture.querySelector('img') : null;

  const imgElement = img ? document.createElement('img') : null;
  if (imgElement) {
    imgElement.src = img.src;
    imgElement.alt = img.alt;
  }

  // Extract links dynamically, ensuring no empty hrefs
  const links = Array.from(element.querySelectorAll('a')).filter(link => link.href);
  const urls = links.map(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.href;
    return a;
  });

  // Define the table structure, ensuring clarity and alignment with example
  const cells = [
    ['Embed'], // Exact header text from example
    [
      [imgElement, ...urls].filter(Boolean) // Combine image and valid links, exclude empty values
    ]
  ];

  // Create block table using helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}