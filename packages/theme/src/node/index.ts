// TODO: remove in v2 stable version
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
} from "./compact";

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

export * from "./themeConfig";
export * from "./helpers";
export * from "./locales";
export * from "./theme";
export * from "../shared";

export default {
  config,
  navbarConfig,
  sidebarConfig,
  themeConfig,
};
