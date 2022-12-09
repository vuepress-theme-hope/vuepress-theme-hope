import { getPageExcerpt } from "vuepress-plugin-blog2";
import { utoa } from "vuepress-shared/node";
import { generatePageIndex } from "./generateIndex.js";

import type { App, Page } from "@vuepress/core";
import type { SearchProOptions } from "./options.js";
import type { PageIndex, SearchIndex } from "../shared/index.js";

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSearchProDatabase)
    __VUE_HMR_RUNTIME__.updateSearchProDatabase(database)
}

if (import.meta.hot) {
  import.meta.hot.accept(({ database }) => {
    __VUE_HMR_RUNTIME__.updateSearchProDatabase(database);
  })
}
`;

let previousSearchIndex: SearchIndex | null = null;

export const prepareSearchIndex = async (
  app: App,
  options: SearchProOptions,
  isBlogPluginEnabled = false
): Promise<void> => {
  const { pages } = app;
  const hasExcerpt =
    isBlogPluginEnabled || pages.some((page) => "excerpt" in page.data);

  if (!hasExcerpt)
    pages.forEach((page: Page<{ excerpt?: string }>) => {
      page.data["excerpt"] = getPageExcerpt(app, page, { excerptLength: 0 });
    });

  const pagesSearchIndex = pages
    .map((page) => {
      const pageIndex = generatePageIndex(
        page,
        options.customFields,
        options.indexContent
      );

      return pageIndex
        ? { path: page.path, index: pageIndex, localePath: page.pathLocale }
        : null;
    })
    .filter(
      (item): item is { path: string; index: PageIndex; localePath: string } =>
        item !== null
    );

  const searchIndex = Object.fromEntries(
    Object.keys(
      // locales should at least have root locales
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { "/": {}, ...app.options.locales }
    ).map((localePath) => [
      localePath,
      Object.fromEntries(
        pagesSearchIndex
          .filter((item) => item.localePath === localePath)
          .map((item) => [item.path, item.index])
      ),
    ])
  );

  previousSearchIndex = searchIndex;

  // search index file content
  let content = `\
export const database = "${utoa(JSON.stringify(searchIndex))}"
`;

  // inject HMR code
  if (app.env.isDev) content += HMR_CODE;

  await app.writeTemp("search-pro/index.js", content);
};

export const updateSearchIndex = async (
  app: App,
  options: SearchProOptions,
  path: string
): Promise<void> => {
  if (previousSearchIndex) {
    const actualPath = path
      .replace(/^pages\//, "")
      .replace(/\/index\.html\.vue/, "/readme.md")
      .replace(/\.html\.vue/, ".md");

    const { env, pages, writeTemp } = app;

    const page = pages.find(
      ({ filePathRelative }) =>
        filePathRelative?.toLowerCase() === actualPath.toLowerCase()
    )!;

    if (page) {
      const pageIndex = generatePageIndex(
        page,
        options.customFields,
        options.indexContent
      );

      // update index
      if (pageIndex) {
        previousSearchIndex[page.pathLocale][page.path] = pageIndex;

        // search index file content
        let content = `\
export const database = "${utoa(JSON.stringify(previousSearchIndex))}"
`;

        // inject HMR code
        if (env.isDev) content += HMR_CODE;

        await writeTemp("search-pro/index.js", content);

        return;
      }
    }
  }

  await prepareSearchIndex(app, options);
};

export const removeSearchIndex = async (
  app: App,
  options: SearchProOptions,
  path: string
): Promise<void> => {
  if (previousSearchIndex) {
    const actualPath = path
      .replace(/^pages\//, "")
      .replace(/\/index\.html\.vue/, "/readme.md")
      .replace(/\.html\.vue/, ".md");

    const { env, pages, writeTemp } = app;

    const page = pages.find(
      ({ filePathRelative }) =>
        filePathRelative?.toLowerCase() === actualPath.toLowerCase()
    )!;

    if (page) {
      // remove index
      delete previousSearchIndex[page.pathLocale][page.path];

      // search index file content
      let content = `\
export const database = "${utoa(JSON.stringify(previousSearchIndex))}"
`;

      // inject HMR code
      if (env.isDev) content += HMR_CODE;

      await writeTemp("search-pro/index.js", content);

      return;
    }
  }

  await prepareSearchIndex(app, options);
};
