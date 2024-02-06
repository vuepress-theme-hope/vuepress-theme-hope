import type { PluginObject } from "vuepress/core";

import { appendDateToPage } from "./appendDate.js";
import { isGitPluginEnabled } from "./checkGitPlugin.js";
import type { AppendDateOptions } from "./options.js";
import { PLUGIN_NAME } from "./utils.js";

export const appendDatePlugin = (
  options: AppendDateOptions = {},
): PluginObject => ({
  name: PLUGIN_NAME,

  onInitialized: async (app): Promise<void> => {
    if (isGitPluginEnabled(app))
      await Promise.all(
        (<[]>app.pages).map((page) => appendDateToPage(options, page)),
      );
  },
});
