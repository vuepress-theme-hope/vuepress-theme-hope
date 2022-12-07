import { isLinkHttp, removeEndingSlash } from "@vuepress/shared";
import { load } from "cheerio";
import matter from "gray-matter";
import {
  HTML_TAGS,
  SVG_TAGS,
  getDate,
  timeTransformer,
} from "vuepress-shared/node";

import { ArticleInfoType, PageType } from "../../shared/index.js";

import type { App, Page } from "@vuepress/core";
import type { AnyNode } from "cheerio";
import type {
  ThemeData,
  ThemePageData,
  ThemeBlogHomePageFrontmatter,
  ThemeProjectHomePageFrontmatter,
  ThemeNormalPageFrontmatter,
} from "../../shared/index.js";

const renderNodes = (app: App, nodes: AnyNode[]): AnyNode[] | [] =>
  Array.isArray(nodes)
    ? nodes
        .map((node) => {
          if (node.type === "tag") {
            // image using relative urls shall be dropped
            if (node.tagName === "img") {
              const { src } = node.attribs;

              // this is a valid image link so we preserve it
              if (isLinkHttp(src) || src.startsWith("/")) return node;

              // The img is probably using alias
              return null;
            }

            if (
              HTML_TAGS.includes(node.tagName) ||
              SVG_TAGS.includes(node.tagName)
            ) {
              // console.log(node.tagName);
              node.children = renderNodes(app, node.children);

              return node;
            }

            // we shall convert `<RouterLink>` to `<a>` tag
            if (node.tagName === "routerlink") {
              console.log("found");

              node.tagName = "a";
              node.attribs["href"] = `${removeEndingSlash(app.options.base)}${
                node.attribs["to"]
              }`;
              node.attribs["target"] = "blank";
              delete node.attribs["to"];
              node.children = renderNodes(app, node.children);

              return node;
            }

            return null;
          }

          return node;
        })
        .filter((node): node is AnyNode => node !== null)
    : nodes;

const $ = load("");

export const getPageExcerpt = (
  app: App,
  page: Page<ThemePageData>,
  autoExcerptLength: number
): string => {
  // get page content
  const content = matter(page.content)
    .content.trim()
    // remove first heading1 as title
    .replace(/^# (.*)$/gm, "");
  let excerpt = "";

  for (const line of content.split("\n")) {
    excerpt += `\n${line}`;
    if (excerpt.length >= autoExcerptLength) break;
  }

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

  return $.html(renderNodes(app, $.parseHTML(renderedContent)) || []);
};

export const injectBlogInfo = (
  app: App,
  themeData: ThemeData,
  page: Page<ThemePageData>,
  autoExcerpt: number | false,
  injectContentSensitiveData = false
): void => {
  const { config = {} } = themeData.encrypt;
  const frontmatter = page.frontmatter as
    | ThemeProjectHomePageFrontmatter
    | ThemeBlogHomePageFrontmatter
    | ThemeNormalPageFrontmatter;
  const { filePathRelative, path } = page;
  const { createdTime } = page.data.git || {};

  const isArticle =
    // declaring this is an article
    frontmatter.article ||
    // generated from markdown files
    Boolean(frontmatter.article !== false && filePathRelative);
  const isEncrypted = Object.keys(config).some((key) =>
    decodeURI(path).startsWith(key)
  );
  const isSlide = isArticle && frontmatter.layout === "Slide";

  // save page type to routeMeta
  page.routeMeta[ArticleInfoType.type] = frontmatter.home
    ? PageType.home
    : isSlide
    ? PageType.slide
    : isArticle
    ? PageType.article
    : PageType.page;

  // resolve author
  if ("author" in frontmatter)
    page.routeMeta[ArticleInfoType.author] = frontmatter.author;

  // resolve date
  if ("date" in frontmatter) {
    const date = getDate(page.frontmatter.date)?.value;

    if (date) {
      page.routeMeta[ArticleInfoType.date] = frontmatter.date;

      page.routeMeta[ArticleInfoType.localizedDate] = timeTransformer(date, {
        lang: page.lang,
        type: "date",
      });
    }
  } else if (createdTime)
    page.routeMeta[ArticleInfoType.date] = new Date(createdTime);

  if ("category" in frontmatter)
    // resolve category
    // resolve category
    page.routeMeta[ArticleInfoType.category] = frontmatter.category;

  // resolve tag
  if ("tag" in frontmatter)
    page.routeMeta[ArticleInfoType.tag] = frontmatter.tag;

  // resolve sticky
  if ("sticky" in frontmatter)
    page.routeMeta[ArticleInfoType.sticky] = frontmatter.sticky;

  // resolve image
  if ("cover" in frontmatter)
    page.routeMeta[ArticleInfoType.cover] = frontmatter.cover;

  // resolve isOriginal
  if ("isOriginal" in frontmatter)
    page.routeMeta[ArticleInfoType.isOriginal] = frontmatter.isOriginal;

  // resolve encrypted
  if (isEncrypted) page.routeMeta[ArticleInfoType.isEncrypted] = true;

  const excerpt = isEncrypted
    ? ""
    : frontmatter.excerpt ||
      page.excerpt ||
      // special handle auto generated description by seo2 plugin
      (page.data.autoDesc ? "" : frontmatter.description) ||
      // generate excerpt from content
      // excerpt is sensitive with markdown contents
      (injectContentSensitiveData && autoExcerpt
        ? app.markdown.render(
            getPageExcerpt(app, page, autoExcerpt),
            // markdown env
            {
              base: app.options.base,
              filePath: page.filePath,
              filePathRelative: page.filePathRelative,
              frontmatter: { ...page.frontmatter },
            }
          )
        : "");

  // save page excerpt to routeMeta
  if (excerpt) page.routeMeta[ArticleInfoType.excerpt] = excerpt;

  if (
    // reading time data is sensitive with markdown contents
    injectContentSensitiveData &&
    // ensure a valid reading time exists
    page.data.readingTime &&
    page.data.readingTime.words !== 0
  )
    page.routeMeta[ArticleInfoType.readingTime] = page.data.readingTime;
};
