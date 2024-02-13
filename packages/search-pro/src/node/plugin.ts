import {
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  fromEntries,
  getLocaleConfig,
} from "@vuepress/helper";
import { watch } from "chokidar";
import type { PluginFunction } from "vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

import { convertOptions } from "./compact.js";
import { setPageExcerpt } from "./excerpt.js";
import { getSearchIndexStore } from "./generateIndex.js";
import { generateWorker } from "./generateWorker.js";
import { searchProLocales } from "./locales.js";
import type { SearchProOptions } from "./options.js";
import {
  prepareSearchIndex,
  prepareStore,
  removeSearchIndex,
  updateSearchIndex,
} from "./prepare/index.js";
import { CLIENT_FOLDER, PLUGIN_NAME, Store, logger } from "./utils.js";
import type { SearchIndexStore } from "../shared/index.js";

export const searchProPlugin =
  (options: SearchProOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as SearchProOptions & Record<string, unknown>);

    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    const store = new Store();
    let searchIndexStore: SearchIndexStore | null = null;

    return {
      name: PLUGIN_NAME,

      alias: {
        [`${PLUGIN_NAME}/result`]: `${CLIENT_FOLDER}components/SearchResult.js`,
      },

      define: {
        SEARCH_PRO_ENABLE_AUTO_SUGGESTIONS: options.autoSuggestions !== false,
        SEARCH_PRO_CUSTOM_FIELDS: fromEntries(
          (options.customFields || [])
            .map(({ formatter }, index) =>
              formatter ? [index.toString(), formatter] : null,
            )
            .filter((item): item is [string, string] => item !== null),
        ),
        SEARCH_PRO_LOCALES: getLocaleConfig({
          app,
          name: PLUGIN_NAME,
          config: options.locales,
          default: searchProLocales,
        }),
        SEARCH_PRO_OPTIONS: {
          searchDelay: options.searchDelay ?? 150,
          suggestDelay: options.suggestDelay ?? 0,
          queryHistoryCount: options.queryHistoryCount ?? 5,
          resultHistoryCount: options.resultHistoryCount ?? 5,
          hotKeys: options.hotKeys || [
            { key: "k", ctrl: true },
            { key: "/", ctrl: true },
          ],
          worker: options.worker || "search-pro.worker.js",
        },
        SEARCH_PRO_SORT_STRATEGY: JSON.stringify(options.sortStrategy || "max"),
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteOptimizeDepsInclude(bundlerOptions, app, "slimsearch", true);
        addViteSsrNoExternal(bundlerOptions, app, [
          "@vuepress/helper",
          "fflate",
          "vuepress-shared",
        ]);
      },

      onInitialized: async (app): Promise<void> => {
        setPageExcerpt(app);
        searchIndexStore = await getSearchIndexStore(app, options, store);
      },

      onPrepared: async (app): Promise<void> => {
        if (app.env.isDev) await prepareSearchIndex(app, searchIndexStore!);
        await prepareStore(app, store);
      },

      onWatched: (app, watchers): void => {
        const hotReload =
          "hotReload" in options ? options.hotReload : app.env.isDebug;

        if (hotReload) {
          // This ensure the page is generated or updated
          const searchIndexWatcher = watch("pages/**/*.vue", {
            cwd: app.dir.temp(),
            ignoreInitial: true,
          });

          searchIndexWatcher.on("add", (path) => {
            void updateSearchIndex(
              app,
              options,
              searchIndexStore!,
              store,
              path,
            );
          });
          searchIndexWatcher.on("change", (path) => {
            void updateSearchIndex(
              app,
              options,
              searchIndexStore!,
              store,
              path,
            );
          });
          searchIndexWatcher.on("unlink", (path) => {
            void removeSearchIndex(app, searchIndexStore!, store, path);
          });

          watchers.push(searchIndexWatcher);
        }
      },

      onGenerated: (app) => generateWorker(app, options, searchIndexStore!),
    };
  };
