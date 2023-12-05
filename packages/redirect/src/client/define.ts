import { entries } from "vuepress-shared/client";

import type {
  LocaleRedirectConfig,
  RedirectLocaleConfig,
} from "../shared/index.js";

declare const REDIRECT_LOCALE_CONFIG: LocaleRedirectConfig;
declare const REDIRECT_LOCALES: RedirectLocaleConfig;
declare const REDIRECT_LOCALE_SWITCH: boolean;

export const redirectLocaleConfig = REDIRECT_LOCALE_CONFIG;
export const redirectLocaleEntries = entries(redirectLocaleConfig.localeConfig);
export const redirectLocales = REDIRECT_LOCALES;
export const enableLocaleSwitch = REDIRECT_LOCALE_SWITCH;
