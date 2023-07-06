import type { App } from "@vuepress/core";
import { addAll, discard, vacuum } from "slimsearch";
import { entries, keys } from "vuepress-shared/node";

import { generatePageIndex, getSearchIndexStore } from "./generateIndex.js";
import type { SearchProOptions } from "./options.js";
import { getLocaleChunkName } from "./utils.js";
import type { SearchIndexStore } from "../shared/index.js";

let previousSearchIndexStore: SearchIndexStore | null = null;

export const prepareSearchIndex = async (
  app: App,
  options: SearchProOptions,
): Promise<void> => {
  if (app.env.isDev) {
    const searchIndexStore = await getSearchIndexStore(app, options);

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
        options.customFields,
        options.indexContent,
      );
      const { pathLocale, key } = page;
      const localeSearchIndex = previousSearchIndexStore[pathLocale];

      // update index
      if (pageIndexes) {
        // remove previous index
        Array.from(localeSearchIndex._documentIds.values())
          .filter((id) => id.startsWith(key))
          .forEach((id) => discard(localeSearchIndex, id));

        addAll(localeSearchIndex, pageIndexes);

        await vacuum(localeSearchIndex);

        // search index file content
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

  await prepareSearchIndex(app, options);
};

export const removeSearchIndex = async (
  app: App,
  options: SearchProOptions,
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
      const { pathLocale, key } = page;
      const localeSearchIndex = previousSearchIndexStore[pathLocale];

      // remove previous index
      Array.from(localeSearchIndex._documentIds.values())
        .filter((id) => id.startsWith(key))
        .forEach((id) => discard(localeSearchIndex, id));

      await vacuum(localeSearchIndex);

      // search index file content
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

  await prepareSearchIndex(app, options);
};
