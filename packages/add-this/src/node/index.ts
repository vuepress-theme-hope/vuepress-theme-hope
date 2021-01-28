import { resolve } from "path";

import type { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import type { AddThisOptions } from "../types";

export = (
  options: AddThisOptions,
  { themeConfig }: Context
): PluginOptionAPI => ({
  name: "add-this",

  define: { PUB_ID: options.pubid || themeConfig.addThis || "" },

  globalUIComponents: "AddThis",

  enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),
});
