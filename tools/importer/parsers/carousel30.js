/* global WebImporter */
export default function parse(element, { document }) {
  // Add a section break
  const hr = document.createElement('hr');

  // Define the header row
  const headerRow = ['Carousel'];

  // Extract unique images from the element ensuring no duplicates and handling missing elements
  const rows = Array.from(element.querySelectorAll('picture img'))
    .filter((img, index, self) => img && self.findIndex((i) => i.src === img.src) === index) // Filter out duplicate images based on src
    .map((img) => { // Ensure images are placed correctly
      return [img];
    });

  // Combine the extracted data into table rows
  const tableData = [headerRow, ...rows];

  // Create the carousel table
  const carouselTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(hr, carouselTable);
}