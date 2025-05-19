/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create links from elements with src attributes
  const createLink = (src, text = 'Link') => {
    const a = document.createElement('a');
    a.href = src;
    a.textContent = text;
    return a;
  };

  // Extract header row from example
  const headerRow = ['Columns'];

  // Extract dynamic content from the HTML
  const navSections = element.querySelector('.nav-sections ul')?.cloneNode(true);
  const donateLinkHref = element.querySelector('.nav-tools a')?.href;
  const donateLink = donateLinkHref ? createLink(donateLinkHref, 'Donate') : null;

  const columnContent1 = document.createElement('div');
  if (navSections) {
    columnContent1.appendChild(navSections);
  }
  if (donateLink) {
    columnContent1.appendChild(donateLink);
  }

  const greenDoubleHelixImageSrc = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500';
  const greenDoubleHelixImage = document.createElement('img');
  greenDoubleHelixImage.src = greenDoubleHelixImageSrc;

  const columnContent2 = document.createElement('div');
  columnContent2.appendChild(greenDoubleHelixImage);

  const yellowDoubleHelixImageSrc = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
  const yellowDoubleHelixImage = document.createElement('img');
  yellowDoubleHelixImage.src = yellowDoubleHelixImageSrc;

  const previewParagraph = document.createElement('p');
  previewParagraph.textContent = 'Or you can just view the preview';

  const previewLinkHref = 'https://word-edit.officeapps.live.com/';
  const previewLink = createLink(previewLinkHref, 'Preview');

  const columnContent3 = document.createElement('div');
  columnContent3.appendChild(yellowDoubleHelixImage);
  columnContent3.appendChild(previewParagraph);
  columnContent3.appendChild(previewLink);

  // Compile the table structure
  const cells = [
    headerRow,
    [columnContent1, columnContent2, columnContent3],
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(blockTable);
}