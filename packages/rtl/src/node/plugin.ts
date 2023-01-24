import { isArray } from "@vuepress/shared";
import { CLIENT_FOLDER } from "./utils.js";

import type { PluginObject } from "@vuepress/core";
import type { RTLOptions } from "./options.js";

export const rltPlugin = (options: RTLOptions = {}): PluginObject => ({
  name: "vuepress-plugin-rtl",

  define: {
    _RTL_LOCALES_: isArray(options.locales) ? options.locales : ["/"],
    _RTL_SELECTOR_: options.selector || { html: { dir: "rtl" } },
  },

  clientConfigFile: `${CLIENT_FOLDER}config.js`,
});
