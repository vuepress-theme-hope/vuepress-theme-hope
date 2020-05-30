import { ResolvedHopeThemeConfig } from "../types";
import { i18n } from "@mr-hope/vuepress-shared-utils";
import resolveEncrypt from "./resolveEncrypt";

const { checkLang, getLocale, lang2path, path2lang } = i18n;

/**
 * 处理主题配置
 *
 * @param themeConfig
 * @param baseLang
 */
const setThemeLocales = (
  themeConfig: ResolvedHopeThemeConfig,
  baseLang: string
): void => {
  /** 默认语言对应的路径 */
  const baseLangPath = lang2path(baseLang);

  // 设置根目录语言配置
  themeConfig.locales["/"] = {
    ...getLocale(baseLang),
    ...(themeConfig.locales[baseLangPath] || {}),
    ...(themeConfig.locales["/"] || {}),
  };

  // 处理其他语言
  Object.keys(themeConfig.locales).forEach((path) => {
    if (path === "/") return;

    const lang = path2lang(path);

    themeConfig.locales[path] = {
      ...getLocale(lang),
      ...themeConfig.locales[path],
    };
  });
};

/**
 * 处理主题配置
 *
 * @param themeConfig 主题配置
 */
const resolveThemeConfig = (themeConfig: ResolvedHopeThemeConfig): void => {
  /** 主目录对应语言 */
  const { baseLang = "zh-CN" } = themeConfig;

  // 如果主目录启用了未适配的语言，抛出错误
  if (!checkLang(baseLang))
    throw new Error(
      "Base lang not supported. Make a PR to https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/shared-utils/src/i18n/config.ts first!"
    );

  setThemeLocales(themeConfig, baseLang);

  if (themeConfig.encrypt) resolveEncrypt(themeConfig.encrypt);
};

export default resolveThemeConfig;
