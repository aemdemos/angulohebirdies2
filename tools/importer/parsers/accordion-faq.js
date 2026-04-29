/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-faq
 * Base block: accordion
 * Source selector: .faq-list
 * Generated: 2026-04-27
 *
 * Source HTML structure:
 *   div.faq-list > details.faq-item
 *     summary.faq-question > span (question text)
 *     div.faq-answer > p (answer text)
 *
 * Target table: Accordion block with one row per FAQ item.
 *   Col 1: question text, Col 2: answer content.
 */
export default function parse(element, { document }) {
  // Extract all FAQ items from the source element
  const faqItems = element.querySelectorAll('details.faq-item, details');

  const cells = [];

  faqItems.forEach((item) => {
    // Extract question text from summary > span, fallback to summary text
    const questionSpan = item.querySelector('summary span, summary');
    // Extract answer content from .faq-answer, fallback to any div or p after summary
    const answerContainer = item.querySelector('.faq-answer, summary ~ div, summary ~ p');

    if (questionSpan && answerContainer) {
      // Clone question text as plain text to avoid pulling in the decorative SVG icon
      const questionEl = document.createElement('p');
      questionEl.textContent = questionSpan.textContent.trim();

      // Use the answer container's children to preserve semantic HTML
      const answerEls = Array.from(answerContainer.querySelectorAll('p, ul, ol, a, h2, h3, h4, h5, h6'));
      if (answerEls.length > 0) {
        cells.push([[questionEl], answerEls]);
      } else {
        // Fallback: use the answer container itself
        cells.push([[questionEl], [answerContainer]]);
      }
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
