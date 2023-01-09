import { getDirname, path } from "@vuepress/utils";
import { watch } from "chokidar";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { addViteSsrNoExternal, getLocales } from "vuepress-shared/node";
import { searchProLocales } from "./locales.js";
import {
  prepareSearchIndex,
  removeSearchIndex,
  updateSearchIndex,
} from "./prepare.js";

import type { PluginFunction } from "@vuepress/core";
import type { SearchProOptions } from "./options.js";

const __dirname = getDirname(import.meta.url);

export const searchProPlugin =
  (options: SearchProOptions): PluginFunction =>
  (app) => {
    useSassPalettePlugin(app, { id: "hope" });

    const isBlogPluginEnabled = app.pluginApi.plugins.some(
      ({ name }) => name === "vuepress-plugin-blog2"
    );

    return {
      name: "vuepress-plugin-search-pro",

      alias: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "vuepress-plugin-search-pro/result": path.resolve(
          __dirname,
          "../client/components/SearchResult.js"
        ),
      },

      define: {
        SEARCH_PRO_CUSTOM_FIELDS: Object.fromEntries(
          (options.customFields || [])
            .map(({ formatter }, index) =>
              formatter ? [index.toString(), formatter] : null
            )
            .filter((item): item is [string, string] => item !== null)
        ),
        SEARCH_PRO_DELAY: options.delay || 300,
        SEARCH_PRO_HISTORY_COUNT: options.historyCount || 5,
        SEARCH_PRO_HOTKEYS: options.hotKeys || [{ key: "k", ctrl: true }],
        SEARCH_PRO_LOCALES: getLocales({
          app,
          name: "search-pro",
          config: options.locales,
          default: searchProLocales,
        }),
      },

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, [
          "fflate",
          "vuepress-shared",
        ]);
      },

      onPrepared: (app): Promise<void> =>
        prepareSearchIndex(app, options, isBlogPluginEnabled),

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
    };
  };
