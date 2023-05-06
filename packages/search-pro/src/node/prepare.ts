import { type App } from "@vuepress/core";

import { generatePageIndex, getSearchIndex } from "./generateIndex.js";
import { type SearchProOptions } from "./options.js";
import { type SearchIndex } from "../shared/index.js";

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
  options: SearchProOptions
): Promise<void> => {
  if (app.env.isDev) {
    const searchIndex = getSearchIndex(app, options);

    previousSearchIndex = searchIndex;

    // search index file content
    const content = `\
export const database = ${JSON.stringify(searchIndex)};

${HMR_CODE}
`;

    await app.writeTemp("search-pro/database.js", content);
  }
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
export const database = ${JSON.stringify(previousSearchIndex)}
`;

        // inject HMR code
        if (env.isDev) content += HMR_CODE;

        await writeTemp("search-pro/database.js", content);

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
export const database = ${JSON.stringify(previousSearchIndex)}
`;

      // inject HMR code
      if (env.isDev) content += HMR_CODE;

      await writeTemp("search-pro/database.js", content);

      return;
    }
  }

  await prepareSearchIndex(app, options);
};
