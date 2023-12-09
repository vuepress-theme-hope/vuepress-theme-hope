import type { PluginFunction } from "@vuepress/core";
import { watch } from "chokidar";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  checkVersion,
  fromEntries,
  getLocales,
} from "vuepress-shared/node";

import { convertOptions } from "./compact.js";
import { setPageExcerpt } from "./excerpt.js";
import { generateWorker } from "./generateWorker.js";
import { searchProLocales } from "./locales.js";
import type { SearchProOptions } from "./options.js";
import {
  prepareSearchIndex,
  removeSearchIndex,
  updateSearchIndex,
} from "./prepare.js";
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from "./utils.js";

export const searchProPlugin =
  (options: SearchProOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as SearchProOptions & Record<string, unknown>);

    useSassPalettePlugin(app, { id: "hope" });

    checkVersion(app, PLUGIN_NAME, "2.0.0-rc.0");

    if (app.env.isDebug) logger.info("Options:", options);

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
        SEARCH_PRO_LOCALES: getLocales({
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
        addViteOptimizeDepsInclude(bundlerOptions, app, "slimsearch");
        addViteSsrNoExternal(bundlerOptions, app, [
          "fflate",
          "vuepress-shared",
        ]);
      },

      onInitialized: (app): void => setPageExcerpt(app),

      onPrepared: (app): Promise<void> => prepareSearchIndex(app, options),

      onWatched: (app, watchers): void => {
        const hotReload =
          "hotReload" in options ? options.hotReload : app.env.isDebug;

        if (hotReload) {
          // this ensure the page is generated or updated
          const searchIndexWatcher = watch("pages/**/*.vue", {
            cwd: app.dir.temp(),
            ignoreInitial: true,
          });

          searchIndexWatcher.on("add", (path) => {
            void updateSearchIndex(app, options, path);
          });
          searchIndexWatcher.on("change", (path) => {
            void updateSearchIndex(app, options, path);
          });
          searchIndexWatcher.on("unlink", (path) => {
            void removeSearchIndex(app, options, path);
          });

          watchers.push(searchIndexWatcher);
        }
      },

      onGenerated: (app) => generateWorker(app, options),
    };
  };
