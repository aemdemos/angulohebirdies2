/* global WebImporter */

export default function parse(element, { document }) {
  // Initialize an array to store the slides
  const slides = [];

  // Collect image and text content from each slide
  const logos = element.querySelectorAll('.logos-wrapper .block div');

  // Use a Set to ensure unique images in slides
  const uniqueImages = new Set();

  logos.forEach((logo) => {
    const image = logo.querySelector('img');
    // Handle the case where an image might not exist
    if (!image || uniqueImages.has(image.src)) return; // Skip if no image or duplicate

    uniqueImages.add(image.src); // Track unique images

    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt;
    imageElement.width = image.width;
    imageElement.height = image.height;

    slides.push([imageElement]);
  });

  // Ensure the header row matches the example structure exactly
  const headerRow = ['Carousel'];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, ...slides], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}