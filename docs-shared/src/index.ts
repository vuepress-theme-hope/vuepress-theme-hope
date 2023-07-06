export { fs, getDirname, path } from "@vuepress/utils";
export {
  addChainWebpack,
  addCustomElement,
  addViteConfig,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrExternal,
  addViteSsrNoExternal,
} from "vuepress-shared/node";
export { navbar, sidebar } from "vuepress-theme-hope";
export * from "./config-wrapper.js";
export * from "./theme-wrapper.js";
