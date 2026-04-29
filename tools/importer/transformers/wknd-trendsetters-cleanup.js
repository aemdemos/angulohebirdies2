/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters cleanup.
 * Removes non-authorable site chrome (navbar, footer, breadcrumbs, skip link).
 * All selectors verified from captured DOM (migration-work/cleaned.html).
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove skip-to-content link (site chrome, not authorable)
    // Found in DOM: <a href="#main-content" class="skip-link">
    WebImporter.DOMUtils.remove(element, ['a.skip-link']);
  }
  if (hookName === H.after) {
    // Remove navbar (site-wide navigation, not authorable)
    // Found in DOM: <div class="navbar">
    // Remove footer (site-wide footer, not authorable)
    // Found in DOM: <footer class="footer inverse-footer">
    // Remove breadcrumbs (navigation chrome, not authorable)
    // Found in DOM: <div class="breadcrumbs">
    WebImporter.DOMUtils.remove(element, [
      '.navbar',
      'footer.footer',
      '.breadcrumbs',
    ]);
  }
}
