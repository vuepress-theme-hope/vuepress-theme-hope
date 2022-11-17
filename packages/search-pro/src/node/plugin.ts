import { getDirname, path } from "@vuepress/utils";
import { watch } from "chokidar";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { addViteSsrNoExternal, getLocales } from "vuepress-shared/node";
import { searchProLocales } from "./locales.js";
import { prepareSearchIndex } from "./prepare.js";

import type { PluginFunction } from "@vuepress/core";
import type { SearchProOptions } from "../shared/index.js";

const __dirname = getDirname(import.meta.url);

export const searchProPlugin =
  (options: SearchProOptions): PluginFunction =>
  (app) => {
    useSassPalettePlugin(app, { id: "hope" });

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
        // eslint-disable-next-line @typescript-eslint/naming-convention
        SEARCH_PRO_CUSTOM_FIELDS: Object.fromEntries(
          (options.customFields || [])
            .filter((item) => "formatter" in item)
            .map(({ name, formatter }) => [name, formatter])
        ),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        SEARCH_PRO_LOCALES: getLocales({
          app,
          name: "search-pro",
          config: options.locales,
          default: searchProLocales,
        }),
      },

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),

      extendsBundlerOptions: (config: unknown, app): void => {
        addViteSsrNoExternal({ app, config }, "vuepress-shared");
      },

      onPrepared: (app): Promise<void> => prepareSearchIndex(app, options),

      onWatched: (app, watchers): void => {
        if (options.hotReload) {
          const searchIndexWatcher = watch("internal/pageData/*", {
            cwd: app.dir.temp(),
            ignoreInitial: true,
          });

          searchIndexWatcher.on("add", () => {
            void prepareSearchIndex(app, options);
          });
          searchIndexWatcher.on("change", () => {
            void prepareSearchIndex(app, options);
          });
          searchIndexWatcher.on("unlink", () => {
            void prepareSearchIndex(app, options);
          });

          watchers.push(searchIndexWatcher);
        }
      },
    };
  };
