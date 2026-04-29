/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroHomepageParser from './parsers/hero-homepage.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import cardsGalleryParser from './parsers/cards-gallery.js';
import tabsTestimonialParser from './parsers/tabs-testimonial.js';
import cardsArticlesParser from './parsers/cards-articles.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import heroBannerParser from './parsers/hero-banner.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/cleanup.js';
import imagesTransformer from './transformers/images.js';
import linksTransformer from './transformers/links.js';
import wkndTrendsettersCleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import wkndTrendsettersSectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-homepage': heroHomepageParser,
  'columns-feature': columnsFeatureParser,
  'cards-gallery': cardsGalleryParser,
  'tabs-testimonial': tabsTestimonialParser,
  'cards-articles': cardsArticlesParser,
  'accordion-faq': accordionFaqParser,
  'hero-banner': heroBannerParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  imagesTransformer,
  linksTransformer,
  wkndTrendsettersCleanupTransformer,
  wkndTrendsettersSectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Homepage template for WKND Trendsetters site',
  urls: ['https://www.wknd-trendsetters.site/'],
  blocks: [
    {
      name: 'hero-homepage',
      instances: ['header.section.secondary-section'],
    },
    {
      name: 'columns-feature',
      instances: ['main > section:nth-of-type(1) > .container > .grid-layout'],
    },
    {
      name: 'cards-gallery',
      instances: ['main > section:nth-of-type(2) .grid-layout.desktop-4-column'],
    },
    {
      name: 'tabs-testimonial',
      instances: ['.tabs-wrapper'],
    },
    {
      name: 'cards-articles',
      instances: ['main > section:nth-of-type(4) .grid-layout.desktop-4-column'],
    },
    {
      name: 'accordion-faq',
      instances: ['.faq-list'],
    },
    {
      name: 'hero-banner',
      instances: ['section.inverse-section'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'header.section.secondary-section',
      style: null,
      blocks: ['hero-homepage'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Feature',
      selector: 'main > section:nth-of-type(1)',
      style: null,
      blocks: ['columns-feature'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Image Gallery',
      selector: 'main > section:nth-of-type(2)',
      style: 'light',
      blocks: ['cards-gallery'],
      defaultContent: ['.utility-text-align-center'],
    },
    {
      id: 'section-4',
      name: 'Testimonials',
      selector: 'main > section:nth-of-type(3)',
      style: null,
      blocks: ['tabs-testimonial'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Latest Articles',
      selector: 'main > section:nth-of-type(4)',
      style: 'light',
      blocks: ['cards-articles'],
      defaultContent: ['.utility-text-align-center'],
    },
    {
      id: 'section-6',
      name: 'FAQ',
      selector: 'main > section:nth-of-type(5)',
      style: null,
      blocks: ['accordion-faq'],
      defaultContent: ['.grid-layout > div:first-child'],
    },
    {
      id: 'section-7',
      name: 'CTA Banner',
      selector: 'section.inverse-section',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: [],
    },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
