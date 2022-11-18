import { utoa } from "vuepress-shared/node";
import { generatePageIndex } from "./generateIndex.js";

import type { App } from "@vuepress/core";
import type { PageIndex, SearchProOptions } from "../shared/index.js";

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

export const prepareSearchIndex = async (
  { env, pages, options: appOptions, writeTemp }: App,
  options: SearchProOptions
): Promise<void> => {
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
      { "/": {}, ...appOptions.locales }
    ).map((localePath) => [
      localePath,
      Object.fromEntries(
        pagesSearchIndex
          .filter((item) => item.localePath === localePath)
          .map((item) => [item.path, item.index])
      ),
    ])
  );

  // search index file content
  let content = `\
export const database = "${utoa(JSON.stringify(searchIndex))}"
`;

  // inject HMR code
  if (env.isDev) content += HMR_CODE;

  await writeTemp("search-pro/index.js", content);
};
