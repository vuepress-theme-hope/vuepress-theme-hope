import type { ActiveHeaderLinksPluginOptions } from "@vuepress/plugin-active-header-links";

/**
 * Resolve options for @vuepress/plugin-active-header-links
 */
export const resolveActiveHeaderLinksOptions = (
  activeHeaderLinks?: boolean
): ActiveHeaderLinksPluginOptions | boolean => {
  if (activeHeaderLinks === false) return false;

  return {
    headerLinkSelector: ".sidebar-link",
    headerAnchorSelector: ".header-anchor",
  };
};
