/* eslint-disable */
/* global WebImporter */

/**
 * Parser: tabs-testimonial
 * Base block: tabs
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-05-26
 *
 * Extracts tabbed testimonial content from .tabs-wrapper.
 * Each tab pane contains a testimonial with image, name, role, and quote.
 * Maps to Tabs block with tabName (label) and content (richtext) per row.
 */
export default function parse(element, { document }) {
  // Extract tab panes from the tabs content area
  const tabPanes = element.querySelectorAll('.tabs-content .tab-pane');
  // Extract tab menu buttons for the tab labels
  const tabButtons = element.querySelectorAll('.tab-menu .tab-menu-link, button.tab-menu-link');

  const cells = [];

  tabPanes.forEach((pane, index) => {
    // --- Tab Label (column 1): person's name from the tab button ---
    const tabLabelFrag = document.createDocumentFragment();
    tabLabelFrag.appendChild(document.createComment(' field:tabName '));

    // Get tab label from the corresponding button
    let tabLabelText = '';
    const correspondingButton = tabButtons[index];
    if (correspondingButton) {
      const nameEl = correspondingButton.querySelector('strong');
      tabLabelText = nameEl ? nameEl.textContent.trim() : '';
    }
    // Fallback: extract name from pane content
    if (!tabLabelText) {
      const paneName = pane.querySelector('.paragraph-xl strong, strong');
      tabLabelText = paneName ? paneName.textContent.trim() : `Tab ${index + 1}`;
    }
    const labelTextNode = document.createTextNode(tabLabelText);
    tabLabelFrag.appendChild(labelTextNode);

    // --- Tab Content (column 2): image + name + role + quote as richtext ---
    const contentFrag = document.createDocumentFragment();
    contentFrag.appendChild(document.createComment(' field:content '));

    // Extract image
    const img = pane.querySelector('img.cover-image, img');
    if (img) {
      const picture = document.createElement('picture');
      const imgClone = img.cloneNode(true);
      picture.appendChild(imgClone);
      contentFrag.appendChild(picture);
    }

    // Extract name (strong text)
    const nameEl = pane.querySelector('.paragraph-xl strong, strong');
    if (nameEl) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = nameEl.textContent.trim();
      p.appendChild(strong);
      contentFrag.appendChild(p);
    }

    // Extract role/title (div after the name div)
    const nameContainer = pane.querySelector('.paragraph-xl.utility-margin-bottom-0');
    if (nameContainer) {
      const roleEl = nameContainer.parentElement
        ? nameContainer.parentElement.querySelector(':scope > div:not(.paragraph-xl)')
        : null;
      if (roleEl && roleEl.textContent.trim()) {
        const roleP = document.createElement('p');
        roleP.textContent = roleEl.textContent.trim();
        contentFrag.appendChild(roleP);
      }
    }

    // Extract quote paragraph
    const quote = pane.querySelector('p.paragraph-xl');
    if (quote) {
      const quoteP = document.createElement('p');
      quoteP.textContent = quote.textContent.trim();
      contentFrag.appendChild(quoteP);
    }

    // Each row is [tabLabel, tabContent] - container block: one row per child item
    cells.push([tabLabelFrag, contentFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
