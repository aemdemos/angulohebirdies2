/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters sections.
 * Inserts section breaks (<hr>) and Section Metadata blocks based on
 * payload.template.sections from page-templates.json.
 * All selectors verified from captured DOM (migration-work/cleaned.html).
 *
 * Sections (7 total, 2 with style):
 *   1. Hero: header.section.secondary-section (no style)
 *   2. Feature: main > section:nth-of-type(1) (no style)
 *   3. Image Gallery: main > section:nth-of-type(2) (style: "light")
 *   4. Testimonials: main > section:nth-of-type(3) (no style)
 *   5. Latest Articles: main > section:nth-of-type(4) (style: "light")
 *   6. FAQ: main > section:nth-of-type(5) (no style)
 *   7. CTA Banner: section.inverse-section (no style)
 */
const H = { after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.after) {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid shifting selectors
    const reversed = [...sections].reverse();
    reversed.forEach((section, reverseIndex) => {
      const originalIndex = sections.length - 1 - reverseIndex;
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) return;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(metaBlock);
      }

      // Add <hr> before every section except the first,
      // only when there is content before it
      if (originalIndex > 0 && sectionEl.previousElementSibling) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
