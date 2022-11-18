// TODO: Remove this in v2 stable
import {
  // v1
  convertFrontmatter,
  convertNavbarConfig,
  convertSidebarConfig,
  convertThemeConfig,
  config,
  navbarConfig,
  sidebarConfig,
  themeConfig,

  // v2
  defineHopeConfig,
  defineThemeConfig,
  defineNavbarConfig,
  defineSidebarArrayConfig,
  defineSidebarConfig,
  defineSidebarObjectConfig,
} from "./compact/index.js";

export {
  config,
  navbarConfig,
  sidebarConfig,
  themeConfig,
  convertFrontmatter,
  convertNavbarConfig,
  convertSidebarConfig,
  convertThemeConfig,
  defineHopeConfig,
  defineThemeConfig,
  defineNavbarConfig,
  defineSidebarArrayConfig,
  defineSidebarConfig,
  defineSidebarObjectConfig,
};

export * from "./themeConfig.js";
export * from "./helpers.js";
export * from "./locales/index.js";
export * from "./theme.js";
export * from "../shared/index.js";

export default {
  config,
  navbarConfig,
  sidebarConfig,
  themeConfig,
};
