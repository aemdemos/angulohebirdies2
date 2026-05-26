/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters section breaks and section metadata.
 * Inserts <hr> between sections and adds Section Metadata blocks for styled sections.
 * Selectors from page-templates.json, validated against migration-work/cleaned.html.
 *
 * Sections (7 total):
 *   1. Hero: header.section.secondary-section (no style)
 *   2. Featured Article: section.section (first section without secondary-section/inverse-section)
 *   3. Photo Gallery: section.section.secondary-section (first) (style: grey)
 *   4. Testimonials: section.section (third section element)
 *   5. Latest Articles: section.section.secondary-section (second) (style: grey)
 *   6. FAQ: section.section (fifth section element)
 *   7. CTA Banner: section.inverse-section (no style)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    const doc = element.ownerDocument || document;

    // Find the main content area
    const main = element.querySelector('main') || element;

    // Get all direct header/section children of main - these are the page sections
    // From cleaned.html: main > header.section.secondary-section, then 6 section elements
    const directChildren = Array.from(main.children).filter(
      (child) => child.tagName === 'HEADER' || child.tagName === 'SECTION'
    );

    // Map sections from template to found elements (in order)
    const sectionPairs = [];
    for (let i = 0; i < Math.min(directChildren.length, sections.length); i++) {
      sectionPairs.push({ el: directChildren[i], section: sections[i] });
    }

    // Process in reverse order to preserve DOM positions when inserting
    for (let i = sectionPairs.length - 1; i >= 0; i--) {
      const { el, section } = sectionPairs[i];

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        el.append(sectionMetadata);
      }

      // Insert <hr> before every section except the first
      if (i > 0) {
        const hr = doc.createElement('hr');
        el.before(hr);
      }
    }
  }
}
