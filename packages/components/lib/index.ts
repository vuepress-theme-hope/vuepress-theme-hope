import { PluginOptionAPI } from "@mr-hope/vuepress-types";
import { resolve } from "path";

export = {
  name: "components",

  enhanceAppFiles: resolve(__dirname, "../src/enhanceAppFile.js"),

  globalUIComponents: "BackToTop",
} as PluginOptionAPI;
