import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { AddThisOptions } from "../types";
import { resolve } from "path";

export = (
  options: AddThisOptions,
  { themeConfig }: Context
): PluginOptionAPI => ({
  name: "add-this",

  define: { PUB_ID: options.pubid || themeConfig.addThis || "" },

  globalUIComponents: "AddThis",

  enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),
});
