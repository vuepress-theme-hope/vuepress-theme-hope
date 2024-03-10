import { activeHeaderLinksPlugin } from "@vuepress/plugin-active-header-links";
import type { Plugin } from "vuepress/core";

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
    headerLinkSelector: ".vp-sidebar-link, .vp-toc-link",
    headerAnchorSelector: ".header-anchor",
  });
};
