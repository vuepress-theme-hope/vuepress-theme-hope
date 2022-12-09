import { isLinkHttp, removeEndingSlash } from "@vuepress/shared";
import { load } from "cheerio";
import matter from "gray-matter";
import { HTML_TAGS, SVG_TAGS } from "vuepress-shared/node";

import type { App, Page } from "@vuepress/core";
import type { AnyNode } from "cheerio";
import { BlogOptions } from "./options.js";

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

const handleNode = (
  node: AnyNode,
  base: string,
  customElement: (tagName: string) => boolean
): AnyNode | null => {
  if (node.type === "tag") {
    // image using relative urls shall be dropped
    if (node.tagName === "img") {
      const { src } = node.attribs;

      // this is not a resolvable image link
      if (!isLinkHttp(src) && !src.startsWith("/")) return null;
    }

    // standard tags can be returned
    if (HTML_TAGS.includes(node.tagName) || SVG_TAGS.includes(node.tagName)) {
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

      // remove `v-pre` attribute
      if (node.tagName === "code" || node.tagName === "pre")
        delete node.attribs["v-pre"];

      node.children = handleNodes(node.children, base, customElement);

      return node;
    }

    // we shall convert `<RouterLink>` to `<a>` tag
    if (node.tagName === "routerlink") {
      node.tagName = "a";
      node.attribs["href"] = `${removeEndingSlash(base)}${node.attribs["to"]}`;
      node.attribs["target"] = "blank";
      delete node.attribs["to"];
      node.children = handleNodes(node.children, base, customElement);

      return node;
    }

    if (customElement(node.tagName)) return node;

    // other tags will be considered as vue components and will be dropped
    return null;
  }

  return node;
};

const handleNodes = (
  nodes: AnyNode[] | null,
  base: string,
  customElement: (tagName: string) => boolean
): AnyNode[] =>
  Array.isArray(nodes)
    ? nodes
        .map((node) => handleNode(node, base, customElement))
        .filter((node): node is AnyNode => node !== null)
    : [];

const $ = load("");

export const getPageExcerpt = (
  app: App,
  page: Page,
  {
    customElement,
    excerptSeparator,
    excerptLength,
  }: Required<
    Pick<BlogOptions, "customElement" | "excerptLength" | "excerptSeparator">
  >
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

    return $.html(
      handleNodes(
        $.parseHTML(renderedContent),
        app.options.base,
        customElement
      ) || []
    );
  } else {
    let excerpt = "";
    const rootNodes = $.parseHTML(page.contentRendered) || [];

    for (const node of rootNodes) {
      const resolvedNode = handleNode(node, app.options.base, customElement);

      if (resolvedNode) {
        excerpt += `${$.html(resolvedNode)}`;
        if (excerpt.length >= excerptLength) break;
      }
    }

    return excerpt;
  }
};
