import { activeHeaderLinksPlugin } from "@vuepress/plugin-active-header-links";
import type { Plugin } from "vuepress/core";

/**
 * Resolve options for `@vuepress/plugin-active-header-links`
 *
 * @param activeHeaderLinks - Whether to enable `@vuepress/plugin-active-header-links` plugin
 * @returns active header links plugin config
 */
export const getActiveHeaderLinksPlugin = (activeHeaderLinks?: boolean): Plugin | null =>
  activeHeaderLinks === false
    ? null
    : activeHeaderLinksPlugin({
        headerLinkSelector: ".vp-sidebar-link, .vp-toc-link",
      });
