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
  function parse(element, { document }) {
    const images = Array.from(element.querySelectorAll("img.cover-image, .grid-layout .grid-layout img"));
    const heading = element.querySelector("h1.h1-heading, h1, h2, h3");
    const description = element.querySelector("p.subheading, .container > .grid-layout > div > p");
    const ctaLinks = Array.from(element.querySelectorAll(".button-group a.button, .button-group a"));
    const cells = [];
    if (images.length > 0) {
      cells.push([images]);
    }
    const contentCell = [];
    if (heading) {
      contentCell.push(heading);
    }
    if (description) {
      contentCell.push(description);
    }
    if (ctaLinks.length > 0) {
      contentCell.push(...ctaLinks);
    }
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-homepage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse2(element, { document }) {
    const columns = element.querySelectorAll(":scope > div");
    const cells = [];
    if (columns.length >= 2) {
      const imageCol = columns[0];
      const image = imageCol.querySelector("img.cover-image, img");
      const col1Content = [];
      if (image) {
        col1Content.push(image);
      }
      const textCol = columns[1];
      const col2Content = [];
      const breadcrumbs = textCol.querySelector(".breadcrumbs");
      if (breadcrumbs) {
        col2Content.push(breadcrumbs);
      }
      const heading = textCol.querySelector("h2.h2-heading, h2, h1, h3");
      if (heading) {
        col2Content.push(heading);
      }
      const metaDivs = textCol.querySelectorAll(":scope > div:not(.breadcrumbs)");
      metaDivs.forEach((div) => {
        if (!div.querySelector("h2, h1, h3") && div !== heading) {
          col2Content.push(div);
        }
      });
      cells.push([
        col1Content.length === 1 ? col1Content[0] : col1Content,
        col2Content.length === 1 ? col2Content[0] : col2Content
      ]);
    } else {
      const allContent = Array.from(element.children);
      cells.push(allContent);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document }) {
    const cardItems = element.querySelectorAll(":scope > div.utility-aspect-1x1, :scope > div");
    const cells = [];
    cardItems.forEach((item) => {
      const img = item.querySelector("img.cover-image, img");
      if (img) {
        cells.push([img]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document }) {
    const tabPanes = element.querySelectorAll(".tab-pane");
    const tabButtons = element.querySelectorAll(".tab-menu-link");
    const cells = [];
    tabPanes.forEach((pane, index) => {
      let tabLabel = "";
      if (tabButtons[index]) {
        const buttonStrong = tabButtons[index].querySelector("strong");
        tabLabel = buttonStrong ? buttonStrong.textContent.trim() : tabButtons[index].textContent.trim();
      } else {
        const paneStrong = pane.querySelector(".paragraph-xl strong, strong");
        tabLabel = paneStrong ? paneStrong.textContent.trim() : `Tab ${index + 1}`;
      }
      const contentElements = [];
      const image = pane.querySelector("img.cover-image, img");
      if (image) {
        contentElements.push(image);
      }
      const nameDiv = pane.querySelector(".paragraph-xl.utility-margin-bottom-0");
      if (nameDiv) {
        contentElements.push(nameDiv);
      }
      const nameContainer = nameDiv ? nameDiv.parentElement : null;
      if (nameContainer) {
        const roleDiv = nameContainer.querySelector(":scope > div:not(.paragraph-xl)");
        if (roleDiv) {
          contentElements.push(roleDiv);
        }
      }
      const quote = pane.querySelector("p.paragraph-xl, p");
      if (quote) {
        contentElements.push(quote);
      }
      cells.push([tabLabel, contentElements]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-articles.js
  function parse5(element, { document }) {
    const cards = element.querySelectorAll("a.article-card, a.card-link");
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(".article-card-image img, img.cover-image");
      const contentCell = [];
      const tag = card.querySelector(".article-card-meta .tag, .tag");
      if (tag) {
        const tagEl = document.createElement("em");
        tagEl.textContent = tag.textContent.trim();
        contentCell.push(tagEl);
      }
      const date = card.querySelector(".article-card-meta .paragraph-sm, .utility-text-secondary");
      if (date) {
        const dateEl = document.createElement("span");
        dateEl.textContent = date.textContent.trim();
        contentCell.push(dateEl);
      }
      const heading = card.querySelector("h3, h2, h4, .h4-heading");
      if (heading) {
        contentCell.push(heading);
      }
      const link = document.createElement("a");
      link.href = card.href || card.getAttribute("href");
      link.textContent = heading ? heading.textContent.trim() : "Read more";
      contentCell.push(link);
      const row = [];
      if (image) {
        row.push(image);
      }
      row.push(contentCell);
      cells.push(row);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-articles", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document }) {
    const faqItems = element.querySelectorAll("details.faq-item, details");
    const cells = [];
    faqItems.forEach((item) => {
      const questionSpan = item.querySelector("summary span, summary");
      const answerContainer = item.querySelector(".faq-answer, summary ~ div, summary ~ p");
      if (questionSpan && answerContainer) {
        const questionEl = document.createElement("p");
        questionEl.textContent = questionSpan.textContent.trim();
        const answerEls = Array.from(answerContainer.querySelectorAll("p, ul, ol, a, h2, h3, h4, h5, h6"));
        if (answerEls.length > 0) {
          cells.push([[questionEl], answerEls]);
        } else {
          cells.push([[questionEl], [answerContainer]]);
        }
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse7(element, { document }) {
    const bgImage = element.querySelector('img.cover-image, img.utility-overlay, img[class*="cover"]');
    const heading = element.querySelector('h2.h1-heading, h1, h2, h3, [class*="heading"]');
    const description = element.querySelector('p.subheading, p[class*="subheading"], .card-body p');
    const ctaLinks = Array.from(
      element.querySelectorAll(".button-group a.button, .button-group a, a.button, a.inverse-button")
    );
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentWrapper = document.createElement("div");
    if (heading) {
      contentWrapper.append(heading);
    }
    if (description) {
      contentWrapper.append(description);
    }
    if (ctaLinks.length > 0) {
      ctaLinks.forEach((link) => contentWrapper.append(link));
    }
    if (contentWrapper.childNodes.length > 0) {
      cells.push([contentWrapper]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/transform.js
  var TransformHook = Object.freeze({
    // Before import transformation begins
    beforeTransform: "beforeTransform",
    // Before page transformation begins
    beforePageTransform: "beforePageTransform",
    // Before each block parsing begins
    beforeParse: "beforeParse",
    // After each block parsing completes
    afterParse: "afterParse",
    // After import transformation completes
    afterTransform: "afterTransform"
  });

  // tools/importer/transformers/cleanup.js
  function cleanUpAttributes(e) {
    e.removeAttribute("class");
    e.removeAttribute("style");
    const attrNames = e.getAttributeNames().filter((a) => a.startsWith("data-") || a.startsWith("aria-"));
    if (attrNames.length > 0) {
      attrNames.forEach((a) => {
        e.removeAttribute(a);
      });
    }
    [...e.children].forEach((child) => cleanUpAttributes(child));
  }
  function transform(hookName, element) {
    if (hookName === TransformHook.beforeParse) {
      WebImporter.DOMUtils.remove(element, [
        "style",
        "script",
        "noscript"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      cleanUpAttributes(element);
      WebImporter.DOMUtils.remove(element, [
        "source",
        "iframe",
        "link"
      ]);
    }
  }

  // tools/importer/transformers/images.js
  function adjustImageUrls(main, url, current) {
    [...main.querySelectorAll("img")].forEach((img) => {
      let src = img.getAttribute("src");
      if (src) {
        try {
          new URL(src);
        } catch (e) {
          if (!src.startsWith("/")) {
            src = `./${src}`;
          }
        }
        try {
          if (src.startsWith("./") || src.startsWith("/") || src.startsWith("../")) {
            const targetUrl = new URL(src, url);
            img.src = targetUrl.toString();
          } else if (current) {
            const currentSrc = new URL(src);
            const currentUrl = new URL(current);
            if (currentSrc.host === currentUrl.host) {
              const targetUrl = new URL(url);
              const newSrc = new URL(`${currentSrc.pathname}${currentSrc.search}${currentSrc.hash}`, `${targetUrl.protocol}//${targetUrl.host}`);
              img.src = newSrc.toString();
            }
          }
        } catch (e) {
          console.log(`Unable to adjust image URL ${img.src} - removing image`);
          img.remove();
        }
      }
    });
  }
  function transform2(hookName, element, { url, originalURL }) {
    if (hookName === TransformHook.beforeTransform) {
      adjustImageUrls(element, url, originalURL);
    }
  }

  // tools/importer/transformers/links.js
  function transform3(hookName, element, { document, params: { originalURL }, inventory }) {
    if (hookName === TransformHook.beforeTransform) {
      [...document.querySelectorAll("a")].forEach((a) => {
        const href = a.getAttribute("href");
        if (href) {
          try {
            const sourceUrl = new URL(href, inventory.originUrl);
            const siteUrl = inventory.urls.find(({ url }) => url === sourceUrl.href);
            if (siteUrl) {
              const { host: targetHost } = new URL(inventory.targetUrl);
              const targetUrl = targetHost === "localhost" ? "https://main----.aem.page" : inventory.targetUrl;
              a.href = new URL(siteUrl.targetPath, targetUrl).href;
            }
          } catch (e) {
            console.warn(`Unable to adjust link ${href}`);
          }
        }
      });
    }
    if (hookName === TransformHook.afterTransform) {
      if (element.querySelector('a[href^="#"]')) {
        const u = new URL(originalURL);
        const links = element.querySelectorAll('a[href^="#"]');
        for (let i = 0; i < links.length; i += 1) {
          const a = links[i];
          a.href = `${u.pathname}${a.getAttribute("href")}`;
        }
      }
    }
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform4(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, ["a.skip-link"]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        ".navbar",
        "footer.footer",
        ".breadcrumbs"
      ]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var H2 = { after: "afterTransform" };
  function transform5(hookName, element, payload) {
    if (hookName === H2.after) {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversed = [...sections].reverse();
      reversed.forEach((section, reverseIndex) => {
        const originalIndex = sections.length - 1 - reverseIndex;
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) return;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(metaBlock);
        }
        if (originalIndex > 0 && sectionEl.previousElementSibling) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-homepage": parse,
    "columns-feature": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-articles": parse5,
    "accordion-faq": parse6,
    "hero-banner": parse7
  };
  var transformers = [
    transform,
    transform2,
    transform3,
    transform4,
    transform5
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage template for WKND Trendsetters site",
    urls: ["https://www.wknd-trendsetters.site/"],
    blocks: [
      {
        name: "hero-homepage",
        instances: ["header.section.secondary-section"]
      },
      {
        name: "columns-feature",
        instances: ["main > section:nth-of-type(1) > .container > .grid-layout"]
      },
      {
        name: "cards-gallery",
        instances: ["main > section:nth-of-type(2) .grid-layout.desktop-4-column"]
      },
      {
        name: "tabs-testimonial",
        instances: [".tabs-wrapper"]
      },
      {
        name: "cards-articles",
        instances: ["main > section:nth-of-type(4) .grid-layout.desktop-4-column"]
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
        name: "Feature",
        selector: "main > section:nth-of-type(1)",
        style: null,
        blocks: ["columns-feature"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Image Gallery",
        selector: "main > section:nth-of-type(2)",
        style: "light",
        blocks: ["cards-gallery"],
        defaultContent: [".utility-text-align-center"]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "main > section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "main > section:nth-of-type(4)",
        style: "light",
        blocks: ["cards-articles"],
        defaultContent: [".utility-text-align-center"]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "main > section:nth-of-type(5)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: [".grid-layout > div:first-child"]
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
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
