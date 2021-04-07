import { getLocale, lang2Path, path2Lang } from "@mr-hope/vuepress-shared";
import { resolveEncrypt } from "./encrypt";

import type { HopeLang } from "@mr-hope/vuepress-shared";
import type { ResolvedHopeThemeConfig } from "../types";

const setThemeLocales = (
  themeConfig: ResolvedHopeThemeConfig,
  rootLang: string
): void => {
  const rootLangPath = lang2Path(rootLang);

  // set locate for base
  themeConfig.locales["/"] = {
    ...getLocale(rootLang),
    ...(themeConfig.locales[rootLangPath] || {}),
    ...(themeConfig.locales["/"] || {}),
  };

  // handle other languages
  Object.keys(themeConfig.locales).forEach((path) => {
    if (path === "/") return;

    const lang = path2Lang(path);

    themeConfig.locales[path] = {
      ...getLocale(lang),
      ...themeConfig.locales[path],
    };
  });
};

export const resolveThemeConfig = (
  themeConfig: ResolvedHopeThemeConfig,
  rootLang: HopeLang
): void => {
  setThemeLocales(themeConfig, rootLang);

  if (themeConfig.encrypt) resolveEncrypt(themeConfig.encrypt);
};
