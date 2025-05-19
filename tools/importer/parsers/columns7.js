/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const imageWrapper = element.querySelector('picture img');
  const image = document.createElement('img');
  image.src = imageWrapper?.src;
  image.alt = imageWrapper?.alt || '';

  const heading = element.querySelector('h2')?.textContent.trim() || '';
  const paragraphs = [...element.querySelectorAll('p')].map(p => p.textContent.trim()).join(' ');

  const links = [...element.querySelectorAll('a')].map(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.title || link.textContent;
    return a;
  });

  const listItems = [...element.querySelectorAll('ul li')].map(listItem => listItem.textContent.trim());

  const contentCell = document.createElement('div');
  const headingNode = document.createElement('h2');
  headingNode.textContent = heading;

  const paragraphsNode = document.createElement('p');
  paragraphsNode.textContent = paragraphs;

  const listNode = document.createElement('ul');
  listItems.forEach(item => {
    const listItemNode = document.createElement('li');
    listItemNode.textContent = item;
    listNode.appendChild(listItemNode);
  });

  contentCell.appendChild(headingNode);
  contentCell.appendChild(image);
  contentCell.appendChild(paragraphsNode);
  contentCell.appendChild(listNode);
  links.forEach(link => contentCell.appendChild(link));

  const cells = [
    headerRow,
    [contentCell]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}