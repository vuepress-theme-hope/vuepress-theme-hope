// TODO: Remove this in v2 stable
import {
  // v1
  config,
  convertFrontmatter,
  convertNavbarOptions,
  convertSidebarOptions,
  convertThemeOptions,
  navbarConfig,
  sidebarConfig,
  themeConfig,

  // v2
  // eslint-disable-next-line sort-imports
  defineHopeConfig,
  defineNavbarConfig,
  defineSidebarArrayConfig,
  defineSidebarConfig,
  defineSidebarObjectConfig,
  defineThemeConfig,
} from "./compact/index.js";

export {
  config,
  navbarConfig,
  sidebarConfig,
  themeConfig,
  convertFrontmatter,
  convertNavbarOptions,
  convertSidebarOptions,
  convertThemeOptions,
  defineHopeConfig,
  defineThemeConfig,
  defineNavbarConfig,
  defineSidebarArrayConfig,
  defineSidebarConfig,
  defineSidebarObjectConfig,
};
/** @deprecated */
export { hopeTheme as hope } from "./theme.js";

export default {
  config,
  navbarConfig,
  sidebarConfig,
  themeConfig,
};

export * from "./config/index.js";
export * from "./helpers.js";
export * from "./locales/index.js";
export * from "./theme.js";
export * from "../shared/index.js";
