import { entries, keys } from "@vuepress/helper";
import { addAll, discard, vacuum } from "slimsearch";
import type { App } from "vuepress/core";

import type { PageIndexId, SearchIndexStore } from "../../shared/index.js";
import { generatePageIndex } from "../generateIndex.js";
import type { SearchProOptions } from "../options.js";
import type { Store } from "../utils.js";
import { getLocaleChunkName } from "../utils.js";

export const prepareSearchIndex = async (
  app: App,
  searchIndexStore: SearchIndexStore,
): Promise<void> => {
  await Promise.all(
    entries(searchIndexStore).map(([locale, documents]) =>
      app.writeTemp(
        `search-pro/${getLocaleChunkName(locale)}.js`,
        `export default ${JSON.stringify(JSON.stringify(documents))};`,
      ),
    ),
  );

  await app.writeTemp(
    `search-pro/index.js`,
    `export default {${keys(searchIndexStore)
      .map(
        (locale) =>
          `${JSON.stringify(locale)}: () => import('./${getLocaleChunkName(
            locale,
          )}.js')`,
      )
      .join(",")}}`,
  );
};

export const updateSearchIndex = async (
  app: App,
  options: SearchProOptions,
  searchIndexStore: SearchIndexStore,
  store: Store,
  path: string,
): Promise<void> => {
  const actualPath = path
    .replace(/^pages\//, "")
    .replace(/\/index\.html\.vue/, "/README.md")
    .replace(/\.html\.vue/, ".md");

  const page = app.pages.find(
    ({ filePathRelative }) =>
      filePathRelative?.toLowerCase() === actualPath.toLowerCase(),
  )!;

  if (page) {
    const pageIndexes = generatePageIndex(
      page,
      store,
      options.customFields,
      options.indexContent,
    );
    const { pathLocale } = page;
    const pageId = <PageIndexId>store.addItem(page.path).toString();
    const localeSearchIndex = searchIndexStore[pathLocale];

    // Update index
    if (pageIndexes) {
      // Remove previous index
      Array.from(localeSearchIndex._documentIds.values())
        .filter((id) => id.startsWith(pageId))
        .forEach((id) => discard(localeSearchIndex, id));

      addAll(localeSearchIndex, pageIndexes);

      await vacuum(localeSearchIndex);

      // Search index file content
      const content = `\
export default ${JSON.stringify(JSON.stringify(localeSearchIndex))}
`;

      await app.writeTemp(
        `search-pro/${getLocaleChunkName(pathLocale)}.js`,
        content,
      );

      return;
    }
  }
};

export const removeSearchIndex = async (
  app: App,
  searchIndexStore: SearchIndexStore,
  store: Store,
  path: string,
): Promise<void> => {
  const actualPath = path
    .replace(/^pages\//, "")
    .replace(/\/index\.html\.vue/, "/readme.md")
    .replace(/\.html\.vue/, ".md");

  const { pages, writeTemp } = app;

  const page = pages.find(
    ({ filePathRelative }) =>
      filePathRelative?.toLowerCase() === actualPath.toLowerCase(),
  )!;

  if (page) {
    const { pathLocale } = page;
    const pageId = <PageIndexId>store.addItem(page.path).toString();
    const localeSearchIndex = searchIndexStore[pathLocale];

    // Remove previous index
    Array.from(localeSearchIndex._documentIds.values())
      .filter((id) => id.startsWith(pageId))
      .forEach((id) => discard(localeSearchIndex, id));

    await vacuum(localeSearchIndex);

    // Search index file content
    const content = `\
export default ${JSON.stringify(JSON.stringify(localeSearchIndex))}
`;

    await writeTemp(`search-pro/${getLocaleChunkName(pathLocale)}.js`, content);

    return;
  }
};
