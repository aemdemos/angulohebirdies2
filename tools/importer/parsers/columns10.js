/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  const sectionMetadataTable = WebImporter.DOMUtils.createTable(
    [
      ['Section Metadata'],
      ['tournament-container'],
    ],
    document
  );

  const headerRow = ['Columns'];

  const blockContentRows = [
    [
      document.createTextNode('Columns block\n- One\n- Two\n- Three'),
      (() => {
        const image = document.createElement('img');
        image.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500';
        return image;
      })(),
    ],
    [
      (() => {
        const image = document.createElement('img');
        image.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
        return image;
      })(),
      document.createTextNode('Or you can just view the preview\n\nPreview'),
    ],
  ];

  const tableStructure = [headerRow, ...blockContentRows];
  const blockTable = WebImporter.DOMUtils.createTable(tableStructure, document);

  element.replaceWith(hr, sectionMetadataTable, blockTable);
}