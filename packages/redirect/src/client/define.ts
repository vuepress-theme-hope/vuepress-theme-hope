import {
  type LocaleConfig,
  type RedirectLocaleConfig,
} from "../shared/index.js";

declare const REDIRECT_LOCALE_CONFIG: LocaleConfig;
declare const REDIRECT_LOCALES: RedirectLocaleConfig;

export const redirectLocaleConfig = REDIRECT_LOCALE_CONFIG;
export const redirectLocales = REDIRECT_LOCALES;
