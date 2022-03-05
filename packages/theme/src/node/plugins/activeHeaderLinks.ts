import type { PluginConfig } from "@vuepress/core";
import type { ActiveHeaderLinksPluginOptions } from "@vuepress/plugin-active-header-links";

/**
 * Resolve options for @vuepress/plugin-active-header-links
 */
export const resolveActiveHeaderLinksPlugin = (
  activeHeaderLinks?: boolean
): PluginConfig => {
  if (activeHeaderLinks === false) return ["", false];

  const options: ActiveHeaderLinksPluginOptions = {
    headerLinkSelector: ".sidebar-link, .toc-link",
    headerAnchorSelector: ".header-anchor",
  };

  return ["@vuepress/active-header-links", options];
};
