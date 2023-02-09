import { type Plugin } from "@vuepress/core";
import { rltPlugin } from "vuepress-plugin-rtl";
import { entries } from "vuepress-shared/node";

import { type ThemeData } from "../../shared/index.js";

export const getRtlPlugin = (themeData: ThemeData): Plugin | null => {
  const rltLocales = entries(themeData.locales)
    .filter(([, { rtl }]) => rtl)
    .map(([localePath]) => localePath);

  return rltLocales.length ? rltPlugin({ locales: rltLocales }) : null;
};
