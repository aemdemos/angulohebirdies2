/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-faq
 * Base block: accordion
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-05-26
 *
 * UE Model: accordion-faq-item (container block)
 *   - summary (text/string): The question/label text
 *   - text (richtext/string): The answer content
 *
 * Source structure: div.faq-list > details.faq-item > summary.faq-question > span + div.faq-answer > p
 * Target structure: Each FAQ item becomes a row with 2 columns: [summary, text]
 */
export default function parse(element, { document }) {
  // Extract all FAQ items from the source
  const faqItems = element.querySelectorAll(':scope > details.faq-item, :scope > .faq-item');

  const cells = [];

  faqItems.forEach((item) => {
    // Extract question text from summary > span
    const questionSpan = item.querySelector('summary .faq-question span, summary span, summary');
    const questionText = questionSpan ? questionSpan.textContent.trim() : '';

    // Extract answer content from .faq-answer
    const answerDiv = item.querySelector('.faq-answer, summary + div');
    const answerContent = answerDiv ? answerDiv.innerHTML.trim() : '';

    // Build row with field hints for xwalk
    // Column 1: summary field (question)
    const summaryFrag = document.createDocumentFragment();
    summaryFrag.appendChild(document.createComment(' field:summary '));
    const summaryEl = document.createElement('p');
    summaryEl.textContent = questionText;
    summaryFrag.appendChild(summaryEl);

    // Column 2: text field (answer - richtext)
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (answerDiv) {
      // Clone answer content to preserve richtext structure
      const clonedAnswer = answerDiv.cloneNode(true);
      textFrag.appendChild(clonedAnswer);
    }

    cells.push([summaryFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
