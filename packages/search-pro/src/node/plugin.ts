import { type PluginFunction } from "@vuepress/core";
import { watch } from "chokidar";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addViteSsrNoExternal,
  fromEntries,
  getLocales,
} from "vuepress-shared/node";

import { setPageExcerpt } from "./excerpt.js";
import { generateWorker } from "./generateWorker.js";
import { searchProLocales } from "./locales.js";
import { type SearchProOptions } from "./options.js";
import {
  prepareSearchIndex,
  removeSearchIndex,
  updateSearchIndex,
} from "./prepare.js";
import { CLIENT_FOLDER } from "./utils.js";

export const searchProPlugin =
  (options: SearchProOptions): PluginFunction =>
  (app) => {
    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: "vuepress-plugin-search-pro",

      alias: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "vuepress-plugin-search-pro/result": `${CLIENT_FOLDER}components/SearchResult.js`,
      },

      define: {
        SEARCH_PRO_CUSTOM_FIELDS: fromEntries(
          (options.customFields || [])
            .map(({ formatter }, index) =>
              formatter ? [index.toString(), formatter] : null
            )
            .filter((item): item is [string, string] => item !== null)
        ),
        SEARCH_PRO_LOCALES: getLocales({
          app,
          name: "search-pro",
          config: options.locales,
          default: searchProLocales,
        }),
        SEARCH_PRO_OPTIONS: {
          delay: options.delay || 300,
          historyCount: options.historyCount || 5,
          hotKeys: options.hotKeys || [{ key: "k", ctrl: true }],
          worker: options.worker || "search-pro.worker.js",
        },
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
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
