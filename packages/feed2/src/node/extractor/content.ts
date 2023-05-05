import { type App, type Page } from "@vuepress/core";
import { fs } from "@vuepress/utils";
import { type AnyNode, load } from "cheerio";
import {
  HTML_TAGS,
  MATHML_TAGS,
  SVG_TAGS,
  isAbsoluteUrl,
  isArray,
  isLinkHttp,
  removeEndingSlash,
} from "vuepress-shared/node";

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

const handleNode = (
  node: AnyNode,
  base: string,
  isPreservedElement: (tagName: string) => boolean
): AnyNode | null => {
  if (node.type === "tag") {
    // image using relative urls shall be dropped
    if (node.tagName === "img") {
      const { src } = node.attribs;

      // this is not a resolvable image link
      if (!isLinkHttp(src) && !isAbsoluteUrl(src)) return null;
    }

    // toc should be dropped
    if (
      [node.attribs["class"], node.attribs["id"]].some((item) =>
        ["table-of-contents", "toc"].includes(item)
      )
    )
      return null;

    // remove code block
    if (node.tagName === "pre") return null;

    // standard tags can be returned
    if (
      HTML_TAGS.includes(node.tagName) ||
      SVG_TAGS.includes(node.tagName) ||
      MATHML_TAGS.includes(node.tagName)
    ) {
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
      if (node.tagName === "code") delete node.attribs["v-pre"];

      node.children = handleNodes(node.children, base, isPreservedElement);

      return node;
    }

    // we shall convert `<RouterLink>` to `<a>` tag
    if (node.tagName === "routerlink") {
      node.tagName = "a";
      node.attribs["href"] = `${removeEndingSlash(base)}${node.attribs["to"]}`;
      node.attribs["target"] = "blank";
      delete node.attribs["to"];
      node.children = handleNodes(node.children, base, isPreservedElement);

      return node;
    }

    if (isPreservedElement(node.tagName)) return node;

    // other unknown tags and will be dropped
    return null;
  }

  return node;
};

const handleNodes = (
  nodes: AnyNode[] | null,
  base: string,
  isPreservedElement: (tagName: string) => boolean
): AnyNode[] =>
  isArray(nodes)
    ? nodes
        .map((node) => handleNode(node, base, isPreservedElement))
        .filter((node): node is AnyNode => node !== null)
    : [];

const $ = load("");

export const getPageRenderContent = (
  app: App,
  page: Page,
  isPreservedElement: (tagName: string) => boolean
): string => {
  const pagePath = app.dir.dest(page.path);
  const pageContent = fs.existsSync(pagePath)
    ? fs.readFileSync(pagePath, "utf-8")
    : page.contentRendered;

  let content = "";
  const rootNodes = $.parseHTML(pageContent) || [];

  for (const node of rootNodes) {
    const resolvedNode = handleNode(node, app.options.base, isPreservedElement);

    if (resolvedNode) content += `${$.html(resolvedNode)}`;
  }

  return content;
};
