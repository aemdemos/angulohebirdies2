/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-homepage.js
  function parse(element, { document: document2 }) {
    const image = element.querySelector('img.cover-image, img[class*="cover"], img');
    const imageCell = [];
    if (image) {
      const fieldHint = document2.createComment(" field:image ");
      const frag = document2.createDocumentFragment();
      frag.appendChild(fieldHint);
      frag.appendChild(image);
      imageCell.push(frag);
    }
    const heading = element.querySelector('h1.h1-heading, h1, h2, [class*="heading"]');
    const description = element.querySelector('p.subheading, p[class*="subheading"], .subheading');
    const ctaLinks = Array.from(
      element.querySelectorAll(".button-group a.button, .button-group a, a.button")
    );
    const textFrag = document2.createDocumentFragment();
    const textFieldHint = document2.createComment(" field:text ");
    textFrag.appendChild(textFieldHint);
    if (heading) textFrag.appendChild(heading);
    if (description) textFrag.appendChild(description);
    if (ctaLinks.length > 0) {
      const ctaWrapper = document2.createElement("p");
      ctaLinks.forEach((link) => {
        ctaWrapper.appendChild(link);
      });
      textFrag.appendChild(ctaWrapper);
    }
    const cells = [];
    if (imageCell.length > 0) {
      cells.push(imageCell);
    }
    if (textFrag.childNodes.length > 1) {
      cells.push([textFrag]);
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-homepage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse2(element, { document: document2 }) {
    const gridLayout = element.querySelector(".grid-layout");
    const columns = gridLayout ? Array.from(gridLayout.querySelectorAll(":scope > div")) : [];
    const col1Content = [];
    const featureImage = element.querySelector('img.cover-image, img[class*="cover-image"]');
    if (featureImage) {
      col1Content.push(featureImage);
    }
    const col2Content = [];
    const breadcrumbs = element.querySelector(".breadcrumbs");
    if (breadcrumbs) {
      col2Content.push(breadcrumbs);
    }
    const heading = element.querySelector('h2, h1, h3, [class*="heading"]');
    if (heading) {
      col2Content.push(heading);
    }
    const metaContainer = columns[1];
    if (metaContainer) {
      const metaDivs = metaContainer.querySelectorAll(":scope > div > div.flex-horizontal, :scope > div > div > div.flex-horizontal");
      metaDivs.forEach((div) => {
        col2Content.push(div);
      });
    }
    const cells = [
      [col1Content, col2Content]
    ];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document: document2 }) {
    const imageItems = element.querySelectorAll(":scope > .utility-aspect-1x1");
    const cells = [];
    imageItems.forEach((item) => {
      const img = item.querySelector("img.cover-image, img");
      if (img) {
        const imageCell = document2.createDocumentFragment();
        imageCell.appendChild(document2.createComment(" field:image "));
        imageCell.appendChild(img);
        const textCell = document2.createDocumentFragment();
        cells.push([imageCell, textCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document: document2 }) {
    const tabPanes = element.querySelectorAll(".tabs-content .tab-pane");
    const tabButtons = element.querySelectorAll(".tab-menu .tab-menu-link, button.tab-menu-link");
    const cells = [];
    tabPanes.forEach((pane, index) => {
      const tabLabelFrag = document2.createDocumentFragment();
      tabLabelFrag.appendChild(document2.createComment(" field:tabName "));
      let tabLabelText = "";
      const correspondingButton = tabButtons[index];
      if (correspondingButton) {
        const nameEl2 = correspondingButton.querySelector("strong");
        tabLabelText = nameEl2 ? nameEl2.textContent.trim() : "";
      }
      if (!tabLabelText) {
        const paneName = pane.querySelector(".paragraph-xl strong, strong");
        tabLabelText = paneName ? paneName.textContent.trim() : `Tab ${index + 1}`;
      }
      const labelTextNode = document2.createTextNode(tabLabelText);
      tabLabelFrag.appendChild(labelTextNode);
      const contentFrag = document2.createDocumentFragment();
      contentFrag.appendChild(document2.createComment(" field:content "));
      const img = pane.querySelector("img.cover-image, img");
      if (img) {
        const picture = document2.createElement("picture");
        const imgClone = img.cloneNode(true);
        picture.appendChild(imgClone);
        contentFrag.appendChild(picture);
      }
      const nameEl = pane.querySelector(".paragraph-xl strong, strong");
      if (nameEl) {
        const p = document2.createElement("p");
        const strong = document2.createElement("strong");
        strong.textContent = nameEl.textContent.trim();
        p.appendChild(strong);
        contentFrag.appendChild(p);
      }
      const nameContainer = pane.querySelector(".paragraph-xl.utility-margin-bottom-0");
      if (nameContainer) {
        const roleEl = nameContainer.parentElement ? nameContainer.parentElement.querySelector(":scope > div:not(.paragraph-xl)") : null;
        if (roleEl && roleEl.textContent.trim()) {
          const roleP = document2.createElement("p");
          roleP.textContent = roleEl.textContent.trim();
          contentFrag.appendChild(roleP);
        }
      }
      const quote = pane.querySelector("p.paragraph-xl");
      if (quote) {
        const quoteP = document2.createElement("p");
        quoteP.textContent = quote.textContent.trim();
        contentFrag.appendChild(quoteP);
      }
      cells.push([tabLabelFrag, contentFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document: document2 }) {
    const cards = Array.from(element.querySelectorAll(":scope > a.article-card"));
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".article-card-image img");
      const imageCell = document2.createDocumentFragment();
      imageCell.appendChild(document2.createComment(" field:image "));
      if (img) {
        const imgEl = document2.createElement("img");
        imgEl.src = img.src || img.getAttribute("src") || "";
        imgEl.alt = img.alt || img.getAttribute("alt") || "";
        imageCell.appendChild(imgEl);
      }
      const tag = card.querySelector(".article-card-meta .tag");
      const date = card.querySelector(".article-card-meta .utility-text-secondary");
      const heading = card.querySelector(".article-card-body h3");
      const textCell = document2.createDocumentFragment();
      textCell.appendChild(document2.createComment(" field:text "));
      const textContainer = document2.createElement("div");
      if (tag && tag.textContent.trim()) {
        const tagP = document2.createElement("p");
        tagP.textContent = tag.textContent.trim();
        textContainer.appendChild(tagP);
      }
      if (date && date.textContent.trim()) {
        const dateP = document2.createElement("p");
        dateP.textContent = date.textContent.trim();
        textContainer.appendChild(dateP);
      }
      if (heading) {
        const href = card.getAttribute("href") || card.href || "";
        const h = document2.createElement("h3");
        if (href) {
          const link = document2.createElement("a");
          link.href = href;
          link.textContent = heading.textContent.trim();
          h.appendChild(link);
        } else {
          h.textContent = heading.textContent.trim();
        }
        textContainer.appendChild(h);
      }
      textCell.appendChild(textContainer);
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document: document2 }) {
    const faqItems = element.querySelectorAll(":scope > details.faq-item, :scope > .faq-item");
    const cells = [];
    faqItems.forEach((item) => {
      const questionSpan = item.querySelector("summary .faq-question span, summary span, summary");
      const questionText = questionSpan ? questionSpan.textContent.trim() : "";
      const answerDiv = item.querySelector(".faq-answer, summary + div");
      const answerContent = answerDiv ? answerDiv.innerHTML.trim() : "";
      const summaryFrag = document2.createDocumentFragment();
      summaryFrag.appendChild(document2.createComment(" field:summary "));
      const summaryEl = document2.createElement("p");
      summaryEl.textContent = questionText;
      summaryFrag.appendChild(summaryEl);
      const textFrag = document2.createDocumentFragment();
      textFrag.appendChild(document2.createComment(" field:text "));
      if (answerDiv) {
        const clonedAnswer = answerDiv.cloneNode(true);
        textFrag.appendChild(clonedAnswer);
      }
      cells.push([summaryFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse7(element, { document: document2 }) {
    const bgImage = element.querySelector('img.cover-image, img[class*="cover"], img[class*="background"], img[class*="overlay"]');
    const heading = element.querySelector('h2.h1-heading, h1, h2, h3, [class*="heading"]');
    const description = element.querySelector('p.subheading, p[class*="subheading"], .card-body p, .utility-text-on-overlay p');
    const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button, a.inverse-button, a[class*="button"]'));
    const cells = [];
    if (bgImage) {
      const imageFragment = document2.createDocumentFragment();
      imageFragment.appendChild(document2.createComment(" field:image "));
      imageFragment.appendChild(bgImage);
      cells.push([imageFragment]);
    } else {
      cells.push([""]);
    }
    const textFragment = document2.createDocumentFragment();
    textFragment.appendChild(document2.createComment(" field:text "));
    if (heading) {
      textFragment.appendChild(heading);
    }
    if (description) {
      textFragment.appendChild(description);
    }
    if (ctaLinks.length > 0) {
      const buttonContainer = document2.createElement("p");
      ctaLinks.forEach((link) => {
        buttonContainer.appendChild(link);
      });
      textFragment.appendChild(buttonContainer);
    }
    cells.push([textFragment]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, ["a.skip-link"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".navbar",
        "footer.footer",
        ".breadcrumbs"
      ]);
      WebImporter.DOMUtils.remove(element, ["noscript", "link"]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const doc = element.ownerDocument || document;
      const main = element.querySelector("main") || element;
      const directChildren = Array.from(main.children).filter(
        (child) => child.tagName === "HEADER" || child.tagName === "SECTION"
      );
      const sectionPairs = [];
      for (let i = 0; i < Math.min(directChildren.length, sections.length); i++) {
        sectionPairs.push({ el: directChildren[i], section: sections[i] });
      }
      for (let i = sectionPairs.length - 1; i >= 0; i--) {
        const { el, section } = sectionPairs[i];
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          el.append(sectionMetadata);
        }
        if (i > 0) {
          const hr = doc.createElement("hr");
          el.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-homepage": parse,
    "columns-feature": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-banner": parse7
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "WKND Trendsetters homepage with hero, featured content, and promotional sections",
    urls: [
      "https://www.wknd-trendsetters.site/"
    ],
    blocks: [
      {
        name: "hero-homepage",
        instances: ["header.section.secondary-section"]
      },
      {
        name: "columns-feature",
        instances: ["main > section.section:nth-of-type(1)"]
      },
      {
        name: "cards-gallery",
        instances: ["section.secondary-section .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-sm"]
      },
      {
        name: "tabs-testimonial",
        instances: ["section .tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: ["section.secondary-section .grid-layout.desktop-4-column.grid-gap-md"]
      },
      {
        name: "accordion-faq",
        instances: [".faq-list"]
      },
      {
        name: "hero-banner",
        instances: ["section.inverse-section"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: null,
        blocks: ["hero-homepage"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Featured Article",
        selector: "main > section.section:nth-of-type(1)",
        style: null,
        blocks: ["columns-feature"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Photo Gallery",
        selector: "main > section.section.secondary-section:nth-of-type(1)",
        style: "grey",
        blocks: ["cards-gallery"],
        defaultContent: [".utility-text-align-center h2", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "main > section.section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "main > section.section.secondary-section:nth-of-type(2)",
        style: "grey",
        blocks: ["cards-article"],
        defaultContent: [".utility-text-align-center h2", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "main > section.section:nth-of-type(5)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: [".grid-layout.grid-gap-xxl > div:first-child h2", ".grid-layout.grid-gap-xxl > div:first-child .subheading"]
      },
      {
        id: "section-7",
        name: "CTA Banner",
        selector: "section.inverse-section",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document: document2, url, html, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path: path || "/index",
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
