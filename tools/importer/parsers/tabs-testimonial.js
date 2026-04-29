/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-testimonial
 * Base block: tabs
 * Source: https://www.wknd-trendsetters.site/
 * Selector: .tabs-wrapper
 * Generated: 2026-04-27
 *
 * Extracts testimonial tabs from source HTML. Each tab pane contains
 * a person's image, name, role, and testimonial quote. The tab menu
 * buttons provide the tab labels (person name).
 *
 * Target structure (from block library):
 *   | Tabs |  |
 *   | Tab Label | Tab Content |
 *   ...one row per tab
 */
export default function parse(element, { document }) {
  const tabPanes = element.querySelectorAll('.tab-pane');
  const tabButtons = element.querySelectorAll('.tab-menu-link');

  const cells = [];

  tabPanes.forEach((pane, index) => {
    // Extract tab label from the corresponding tab button
    // Fall back to the name inside the pane if button is missing
    let tabLabel = '';
    if (tabButtons[index]) {
      const buttonStrong = tabButtons[index].querySelector('strong');
      tabLabel = buttonStrong ? buttonStrong.textContent.trim() : tabButtons[index].textContent.trim();
    } else {
      const paneStrong = pane.querySelector('.paragraph-xl strong, strong');
      tabLabel = paneStrong ? paneStrong.textContent.trim() : `Tab ${index + 1}`;
    }

    // Build tab content: image, name, role, and testimonial quote
    const contentElements = [];

    // Portrait image
    const image = pane.querySelector('img.cover-image, img');
    if (image) {
      contentElements.push(image);
    }

    // Name (strong text in paragraph-xl div)
    const nameDiv = pane.querySelector('.paragraph-xl.utility-margin-bottom-0');
    if (nameDiv) {
      contentElements.push(nameDiv);
    }

    // Role (sibling div after the name container)
    const nameContainer = nameDiv ? nameDiv.parentElement : null;
    if (nameContainer) {
      const roleDiv = nameContainer.querySelector(':scope > div:not(.paragraph-xl)');
      if (roleDiv) {
        contentElements.push(roleDiv);
      }
    }

    // Testimonial quote (p.paragraph-xl)
    const quote = pane.querySelector('p.paragraph-xl, p');
    if (quote) {
      contentElements.push(quote);
    }

    cells.push([tabLabel, contentElements]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
