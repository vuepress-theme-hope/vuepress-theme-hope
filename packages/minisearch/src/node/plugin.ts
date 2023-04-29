import { type Plugin } from "@vuepress/core";
import { getLocales } from "vuepress-shared/node";

import { minisearchLocales } from "./locales.js";
import { type MinisearchOptions } from "./options.js";
import { CLIENT_FOLDER } from "./utils.js";

export const minisearchPlugin =
  (options: MinisearchOptions): Plugin =>
  (app) => {
    return {
      name: "vuepress-plugin-minisearch",

      define: {
        MINISEARCH_LOCALES: getLocales({
          app,
          name: "minisearch",
          config: options.locales,
          default: minisearchLocales,
        }),
        MINISEARCH_QUERY_HISTORY: options.queryHistory ?? true,
        MINISEARCH_DETAILED_VIEW: options.detailedView ?? true,
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,
    };
  };
