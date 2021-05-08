import { resolve } from "path";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { AddThisOptions } from "../types";

const addThisPlugin: Plugin<AddThisOptions> = (options, { themeConfig }) => ({
  name: "add-this",

  define: { PUB_ID: options.pubid || themeConfig.addThis || "" },

  globalUIComponents: "AddThis",

  enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),
});

export = addThisPlugin;
