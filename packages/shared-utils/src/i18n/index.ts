/*
 * @Author: Mr.Hope
 * @Date: 2019-11-23 18:48:57
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-21 23:16:52
 * @Description: 多语言配置
 */
import {
  Langs,
  config,
  lang2PathConfig,
  langs,
  localesConfig,
  path2langConfig
} from './config';
import { HopeLangI18nConfig } from '../../types';

export const checkLang = (lang: string): boolean =>
  langs.includes(lang as Langs);

/**
 * 获取语言对应路径
 *
 * @param lang 语言
 */
export const lang2path = (lang: string): string => {
  if (lang2PathConfig[lang]) return lang2PathConfig[lang];

  console.error(
    `${lang} has no path config, and will return '/' instead.
    You can contribute to https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/shared-utils/src/i18n/config.ts`
  );

  return '/';
};

/**
 * 获取路径对应语言
 *
 * @param path 路径
 */
export const path2lang = (path: string): string => {
  if (path2langConfig[path]) return path2langConfig[path];

  console.error(
    `${path} isn't assign with a lang, and will return 'en-US' instead.
    You can contribute to https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/shared-utils/src/i18n/config.ts`
  );

  return 'en-US';
};

/**
 * 获取特定语言的本地化文字
 *
 * @param lang
 */
export const getLocale = (lang: string): HopeLangI18nConfig => {
  if (localesConfig[lang]) return localesConfig[lang];

  console.error(
    `${lang} locates config is missing, and will return 'en-US' instead.
    You can contribute to https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/shared-utils/src/i18n/config.ts`
  );

  return localesConfig['en-US'];
};

/** 获得默认多语言配置 */
export const getDefaultLocale = (): HopeLangI18nConfig =>
  localesConfig['en-US'];

const i18n = {
  checkLang,
  config,
  langs,
  lang2path,
  path2lang,
  getDefaultLocale,
  getLocale
};

export default i18n;
