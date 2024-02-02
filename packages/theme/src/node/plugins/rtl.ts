import { entries } from "@vuepress/helper";
import { rltPlugin } from "@vuepress/plugin-rtl";
import type { Plugin } from "vuepress/core";

import type { ThemeData } from "../../shared/index.js";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-rt
 */
export const getRtlPlugin = (themeData: ThemeData): Plugin | null => {
  const rltLocales = entries(themeData.locales)
    .filter(([, { rtl }]) => rtl)
    .map(([localePath]) => localePath);

  return rltLocales.length ? rltPlugin({ locales: rltLocales }) : null;
};
