import { addViteSsrNoExternal, isArray } from "@vuepress/helper/node";
import type { PluginObject } from "vuepress/core";

import type { RTLOptions } from "./options.js";
import { CLIENT_FOLDER } from "./utils.js";

export const rltPlugin = (options: RTLOptions = {}): PluginObject => ({
  name: "vuepress-plugin-rtl",

  define: {
    _RTL_LOCALES_: isArray(options.locales) ? options.locales : ["/"],
    _RTL_SELECTOR_: options.selector || { html: { dir: "rtl" } },
  },

  extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
    addViteSsrNoExternal(bundlerOptions, app, [
      "@vuepress/helper",
      "vuepress-shared",
    ]);
  },

  clientConfigFile: `${CLIENT_FOLDER}config.js`,
});
