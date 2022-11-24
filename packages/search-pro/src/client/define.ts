import type {
  SearchProCustomFieldFormatter,
  SearchProHotKeyOptions,
  SearchProLocaleConfig,
} from "../shared/index.js";

type SearchProClientCustomFiledConfig = Record<
  string,
  SearchProCustomFieldFormatter
>;

declare const SEARCH_PRO_CUSTOM_FIELDS: SearchProClientCustomFiledConfig;
declare const SEARCH_PRO_DELAY: number;
declare const SEARCH_PRO_HISTORY_COUNT: number;
declare const SEARCH_PRO_HOTKEYS: SearchProHotKeyOptions[];
declare const SEARCH_PRO_LOCALES: SearchProLocaleConfig;

export const searchProClientCustomFiledConfig = SEARCH_PRO_CUSTOM_FIELDS;
export const searchProDelay = SEARCH_PRO_DELAY;
export const searchProHistoryCount = SEARCH_PRO_HISTORY_COUNT;
export const searchProHotKeys = SEARCH_PRO_HOTKEYS;
export const searchProLocales = SEARCH_PRO_LOCALES;
