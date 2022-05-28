import { activeHeaderLinksPlugin } from "@vuepress/plugin-active-header-links";
import type { Plugin } from "@vuepress/core";

/**
 * Resolve options for @vuepress/plugin-active-header-links
 */
export const getActiveHeaderLinksPlugin = (
  activeHeaderLinks?: boolean
): Plugin | null => {
  if (activeHeaderLinks === false) return null;

  return activeHeaderLinksPlugin({
    headerLinkSelector: ".sidebar-link, .toc-link",
    headerAnchorSelector: ".header-anchor",
  });
};
