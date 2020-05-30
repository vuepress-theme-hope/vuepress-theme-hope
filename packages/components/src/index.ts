import { PluginOptionAPI } from "@mr-hope/vuepress-types";
import { resolve } from "path";

export = {
  name: "components",

  enhanceAppFiles: resolve(__dirname, "enhanceAppFile.ts"),

  plugins: ["typescript"],

  globalUIComponents: "BackToTop",
} as PluginOptionAPI;
