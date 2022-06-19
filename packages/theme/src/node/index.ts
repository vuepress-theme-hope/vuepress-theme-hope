// TODO: remove in v2 stable version
import {
  // v1
  covertFrontmatter,
  covertNavbarConfig,
  convertSidebarConfig,
  covertThemeConfig,
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
  covertFrontmatter,
  covertNavbarConfig,
  convertSidebarConfig,
  covertThemeConfig,
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
