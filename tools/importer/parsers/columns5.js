/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  const cells = [
    ['Columns'],
    [
      'Columns block',
      (() => {
        const list = document.createElement('ul');
        ['One', 'Two', 'Three'].forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          list.appendChild(li);
        });
        const link = document.createElement('a');
        link.setAttribute('href', 'https://word-edit.officeapps.live.com/');
        link.textContent = 'Live';
        return [list, link];
      })(),
      (() => {
        const img = document.createElement('img');
        img.setAttribute('src', 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png');
        img.setAttribute('alt', 'Green Double Helix');
        const span = document.createElement('span');
        span.textContent = 'Or you can just view the preview';
        const previewLink = document.createElement('a');
        previewLink.setAttribute('href', 'https://word-edit.officeapps.live.com/');
        previewLink.textContent = 'Preview';
        return [img, span, previewLink];
      })()
    ]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(hr, blockTable);
}