/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row matching the example exactly
  const headerRow = ['Columns'];

  // Extract navigation links from the nav sections
  const navSections = element.querySelector('.nav-sections ul');
  const navLinks = Array.from(navSections.querySelectorAll('a')).map(link => {
    const clonedLink = link.cloneNode(true);
    clonedLink.textContent = link.textContent.trim();
    clonedLink.href = link.href;
    return clonedLink;
  });

  // Extract the logo image
  const logoImage = element.querySelector('.nav-brand img');
  const logo = logoImage ? logoImage.cloneNode(true) : '';

  // Extract the donate button
  const donateButton = element.querySelector('.nav-tools a.button');
  const donateButtonClone = donateButton ? donateButton.cloneNode(true) : '';

  // Create the table structure based on the extracted elements
  const cells = [
    headerRow,
    [
      logo,
      [
        ...navLinks,
        donateButtonClone
      ],
    ],
  ];

  // Generate the table using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}