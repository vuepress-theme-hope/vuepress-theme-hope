import { ResolvedHopeThemeConfig } from "../types";
import {
  checkLang,
  getLocale,
  lang2path,
  path2lang,
} from "@mr-hope/vuepress-utils";
import { resolveEncrypt } from "./encrypt";

const setThemeLocales = (
  themeConfig: ResolvedHopeThemeConfig,
  baseLang: string
): void => {
  const baseLangPath = lang2path(baseLang);

  // set locate for base
  themeConfig.locales["/"] = {
    ...getLocale(baseLang),
    ...(themeConfig.locales[baseLangPath] || {}),
    ...(themeConfig.locales["/"] || {}),
  };

  // handle other languages
  Object.keys(themeConfig.locales).forEach((path) => {
    if (path === "/") return;

    const lang = path2lang(path);

    themeConfig.locales[path] = {
      ...getLocale(lang),
      ...themeConfig.locales[path],
    };
  });
};

export const resolveThemeConfig = (
  themeConfig: ResolvedHopeThemeConfig
): void => {
  const { baseLang = "en-US" } = themeConfig;

  // throw error when meeting an unsupported language
  if (!checkLang(baseLang))
    throw new Error(
      "Base lang not supported. Make a PR to https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/packages//shared/config/i18n.json first!"
    );

  setThemeLocales(themeConfig, baseLang);

  if (themeConfig.encrypt) resolveEncrypt(themeConfig.encrypt);
};
