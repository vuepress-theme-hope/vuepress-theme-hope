import { isLinkHttp, removeEndingSlash } from "@vuepress/shared";
import { load } from "cheerio";
import matter from "gray-matter";
import { HTML_TAGS, SVG_TAGS } from "vuepress-shared/node";

import type { App, Page } from "@vuepress/core";
import type { AnyNode } from "cheerio";

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

const handleNode = (app: App, node: AnyNode): AnyNode | null => {
  if (node.type === "tag") {
    // image using relative urls shall be dropped
    if (node.tagName === "img") {
      const { src } = node.attribs;

      // this is a valid image link so we preserve it
      if (isLinkHttp(src) || src.startsWith("/")) return node;

      // The img is probably using alias
      return null;
    }

    // remove `v-pre` attribute
    if (node.tagName === "code" || node.tagName === "pre")
      delete node.attribs["v-pre"];

    // remove heading id tabindex and anchor inside
    if (HEADING_TAGS.includes(node.tagName)) {
      delete node.attribs["id"];
      delete node.attribs["tabindex"];
      node.children = node.children.filter(
        (child) =>
          child.type !== "tag" ||
          child.tagName !== "a" ||
          child.attribs["class"] !== "header-anchor"
      );
    }

    if (HTML_TAGS.includes(node.tagName) || SVG_TAGS.includes(node.tagName)) {
      node.children = handleNodes(app, node.children);

      return node;
    }

    // we shall convert `<RouterLink>` to `<a>` tag
    if (node.tagName === "routerlink") {
      node.tagName = "a";
      node.attribs["href"] = `${removeEndingSlash(app.options.base)}${
        node.attribs["to"]
      }`;
      node.attribs["target"] = "blank";
      delete node.attribs["to"];
      node.children = handleNodes(app, node.children);

      return node;
    }

    return null;
  }

  return node;
};

const handleNodes = (app: App, nodes: AnyNode[] | null): AnyNode[] =>
  Array.isArray(nodes)
    ? nodes
        .map((node) => handleNode(app, node))
        .filter((node): node is AnyNode => node !== null)
    : [];

const $ = load("");

export const getPageExcerpt = (
  app: App,
  page: Page,
  excerptSeparator: string,
  autoExcerptLength: number
): string => {
  // get page content
  const { excerpt } = matter(page.content, {
    excerpt: true,
    excerpt_separator: excerptSeparator,
  });

  if (excerpt) {
    const renderedContent = app.markdown.render(
      excerpt,
      // markdown env
      {
        base: app.options.base,
        filePath: page.filePath,
        filePathRelative: page.filePathRelative,
        frontmatter: { ...page.frontmatter },
      }
    );

    return $.html(handleNodes(app, $.parseHTML(renderedContent)) || []);
  } else {
    let excerpt = "";
    const rootNodes = $.parseHTML(page.contentRendered) || [];

    for (const node of rootNodes) {
      const resolvedNode = handleNode(app, node);

      if (resolvedNode) {
        excerpt += `${$.html(resolvedNode)}`;
        if (excerpt.length >= autoExcerptLength) break;
      }
    }

    return excerpt;
  }
};
