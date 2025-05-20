/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract text content and links
  const extractContent = (container) => {
    const content = [];
    if (container) {
      const titleElement = container.querySelector('strong');
      const linkElement = container.querySelector('a');

      if (titleElement) {
        const title = document.createElement('p');
        title.textContent = titleElement.textContent;
        content.push(title);
      }

      if (linkElement) {
        const link = document.createElement('a');
        link.href = linkElement.href;
        link.title = linkElement.title;
        link.textContent = linkElement.textContent;
        content.push(link);
      }

      const paragraphs = container.querySelectorAll('p'); // Ensure all paragraphs are captured
      paragraphs.forEach((para) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = para.textContent;
        content.push(paragraph);
      });
    }

    return content;
  };

  const cards = [];

  const sections = element.querySelectorAll('div > div');
  sections.forEach((section) => {
    const imageContainer = section.querySelector('picture img');
    const textContainer = section.querySelector('div:nth-child(2)');

    let image = null;

    if (imageContainer) {
      image = imageContainer.cloneNode(true);
    }

    const content = textContainer ? extractContent(textContainer) : [];

    if (image && content.length > 0) {
      // Ensure unique rows by checking for duplicates
      const existingRow = cards.find((card) => card[1][0]?.textContent === content[0]?.textContent);
      if (!existingRow) {
        cards.push([image, content]);
      }
    }
  });

  const blockHeader = ['Cards'];

  const table = WebImporter.DOMUtils.createTable([blockHeader, ...cards], document);

  element.replaceWith(table);
}