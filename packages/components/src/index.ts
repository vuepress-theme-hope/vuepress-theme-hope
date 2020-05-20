import { PluginOptionAPI } from "vuepress-types";
import { resolve } from "path";

export = {
  name: "components",

  enhanceAppFiles: resolve(__dirname, "enhanceAppFile.ts"),

  plugins: [
    /** typescript 支持 */
    ["typescript"],
  ],

  globalUIComponents: "BackToTop",
} as PluginOptionAPI;
