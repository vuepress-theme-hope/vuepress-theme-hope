import { entries } from "@vuepress/helper";
import { rtlPlugin } from "@vuepress/plugin-rtl";
import type { Plugin } from "vuepress/core";

import type { ThemeData } from "../../shared/index.js";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-rt
 */
export const getRtlPlugin = (themeData: ThemeData): Plugin | null => {
  const rtlLocales = entries(themeData.locales)
    .filter(([, { rtl }]) => rtl)
    .map(([localePath]) => localePath);

  return rtlLocales.length ? rtlPlugin({ locales: rtlLocales }) : null;
};
