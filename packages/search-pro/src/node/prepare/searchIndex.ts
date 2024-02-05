import { entries, keys } from "@vuepress/helper";
import { addAll, discard, vacuum } from "slimsearch";
import type { App } from "vuepress/core";

import { prepareStore } from "./store.js";
import type { PageIndexId, SearchIndexStore } from "../../shared/index.js";
import { generatePageIndex, getSearchIndexStore } from "../generateIndex.js";
import type { SearchProOptions } from "../options.js";
import type { Store } from "../store.js";
import { getLocaleChunkName } from "../utils.js";

let previousSearchIndexStore: SearchIndexStore | null = null;

export const prepareSearchIndex = async (
  app: App,
  options: SearchProOptions,
  store: Store,
): Promise<void> => {
  if (app.env.isDev) {
    const searchIndexStore = await getSearchIndexStore(app, options, store);

    previousSearchIndexStore = searchIndexStore;

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
  }
};

export const updateSearchIndex = async (
  app: App,
  options: SearchProOptions,
  store: Store,
  path: string,
): Promise<void> => {
  if (previousSearchIndexStore) {
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
      const pageIndexes = generatePageIndex(
        page,
        store,
        options.customFields,
        options.indexContent,
      );
      const { pathLocale } = page;
      const pageId = <PageIndexId>store.addItem(page.path).toString();
      const localeSearchIndex = previousSearchIndexStore[pathLocale];

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

        await writeTemp(
          `search-pro/${getLocaleChunkName(pathLocale)}.js`,
          content,
        );

        return;
      }
    }
  }

  await prepareSearchIndex(app, options, store);
  await prepareStore(app, store);
};

export const removeSearchIndex = async (
  app: App,
  options: SearchProOptions,
  store: Store,
  path: string,
): Promise<void> => {
  if (previousSearchIndexStore) {
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
      const localeSearchIndex = previousSearchIndexStore[pathLocale];

      // Remove previous index
      Array.from(localeSearchIndex._documentIds.values())
        .filter((id) => id.startsWith(pageId))
        .forEach((id) => discard(localeSearchIndex, id));

      await vacuum(localeSearchIndex);

      // Search index file content
      const content = `\
export default ${JSON.stringify(JSON.stringify(localeSearchIndex))}
`;

      await writeTemp(
        `search-pro/${getLocaleChunkName(pathLocale)}.js`,
        content,
      );

      return;
    }
  }

  await prepareSearchIndex(app, options, store);
  await prepareStore(app, store);
};
