import { entries } from "@vuepress/helper";
import { rtlPlugin } from "@vuepress/plugin-rtl";
import type { Plugin } from "vuepress/core";

import type { ThemeData } from "../../shared/index.js";

/**
 * Resolve options for `@vuepress/plugin-rtl`
 *
 * @param themeData Theme data
 * @returns RTL plugin instance or null
 */
export const getRtlPlugin = (themeData: ThemeData): Plugin | null => {
  const rtlLocales = entries(themeData.locales)
    .filter(([, { rtl }]) => rtl)
    .map(([localePath]) => localePath);

  return rtlLocales.length > 0 ? rtlPlugin({ locales: rtlLocales }) : null;
};
