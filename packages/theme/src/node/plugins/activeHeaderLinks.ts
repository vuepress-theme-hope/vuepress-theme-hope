import type { Plugin } from "@vuepress/core";
import { activeHeaderLinksPlugin } from "@vuepress/plugin-active-header-links";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-active-header-links
 */
export const getActiveHeaderLinksPlugin = (
  activeHeaderLinks?: boolean,
): Plugin | null => {
  if (activeHeaderLinks === false) return null;

  return activeHeaderLinksPlugin({
    headerLinkSelector: ".vp-sidebar-link, .toc-link",
    headerAnchorSelector: ".header-anchor",
  });
};
