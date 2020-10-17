import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { AddThisOptions } from "../types";
import { resolve } from "path";

export = (
  options: AddThisOptions,
  { themeConfig }: Context
): PluginOptionAPI => ({
  name: "add-this",

  // eslint-disable-next-line @typescript-eslint/naming-convention
  define: { PUB_ID: options.pubid || themeConfig.addThis || "" },

  globalUIComponents: "AddThis",

  enhanceAppFiles: resolve(__dirname, "../src/enhanceAppFile.js"),
});
