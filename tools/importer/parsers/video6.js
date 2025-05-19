/* global WebImporter */
export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract relevant content from the input element
  const headerRow = ['Video'];

  const image = element.querySelector('img');
  const videoLink = element.querySelector('a');

  // Handle edge cases where these elements might not exist
  const imageTag = image ? image.cloneNode(true) : null;
  const linkTag = videoLink ? document.createElement('a') : null;

  if (linkTag && videoLink) {
    linkTag.href = videoLink.href;
    linkTag.textContent = videoLink.href;
  }

  // Compile the row data dynamically based on available content
  const videoRow = imageTag && linkTag ? [imageTag, linkTag] : linkTag ? [linkTag] : imageTag ? [imageTag] : [];

  if (!videoRow.length) {
    console.error('No valid video or image data found to create the block table.');
    return;
  }

  // Prepare table cells
  const cells = [
    headerRow,
    videoRow,
  ];

  // Create the block table from the cells
  const blockTable = createTable(cells, document);

  // Verify if section metadata is defined in the example markdown structure
  const sectionMetadataBlockExists = false; // Change based on actual metadata requirements

  if (sectionMetadataBlockExists) {
    const sectionBreak = document.createElement('hr');
    const sectionMetadataCells = [
      ['Section Metadata'],
      ['Some metadata content'], // Modify this row based on the actual metadata content
    ];
    const sectionMetadataTable = createTable(sectionMetadataCells, document);

    // Replace the original element with section metadata and the block table
    element.replaceWith(sectionBreak, sectionMetadataTable, blockTable);
  } else {
    // Replace the original element with the block table only
    element.replaceWith(blockTable);
  }
}