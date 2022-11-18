import type {
  SearchProClientCustomFiledConfig,
  SearchProHotKeyOptions,
  SearchProLocaleConfig,
} from "../../shared/index.js";

declare const SEARCH_PRO_CUSTOM_FIELDS: SearchProClientCustomFiledConfig;
declare const SEARCH_PRO_HOTKEYS: SearchProHotKeyOptions[];
declare const SEARCH_PRO_LOCALES: SearchProLocaleConfig;

export const searchProClientCustomFiledConfig = SEARCH_PRO_CUSTOM_FIELDS;
export const searchProHotKeys = SEARCH_PRO_HOTKEYS;
export const searchProLocales = SEARCH_PRO_LOCALES;
