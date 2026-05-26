/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters site-wide cleanup.
 * Removes non-authorable content (navigation, footer, skip-link, breadcrumbs).
 * Selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove skip-link (accessibility link not authored by content editors)
    // Found in cleaned.html: <a href="#main-content" class="skip-link">
    WebImporter.DOMUtils.remove(element, ['a.skip-link']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site chrome
    // Found in cleaned.html: <div class="navbar">
    // Found in cleaned.html: <footer class="footer inverse-footer">
    // Found in cleaned.html: <div class="breadcrumbs">
    WebImporter.DOMUtils.remove(element, [
      '.navbar',
      'footer.footer',
      '.breadcrumbs'
    ]);

    // Remove noscript and link elements if present
    WebImporter.DOMUtils.remove(element, ['noscript', 'link']);
  }
}
