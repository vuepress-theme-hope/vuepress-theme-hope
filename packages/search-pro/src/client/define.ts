import {
  type SearchProCustomFieldFormatter,
  type SearchProHotKeyOptions,
  type SearchProLocaleConfig,
} from "../shared/index.js";

type SearchProClientCustomFiledConfig = Record<
  string,
  SearchProCustomFieldFormatter
>;

declare const SEARCH_PRO_CUSTOM_FIELDS: SearchProClientCustomFiledConfig;
declare const SEARCH_PRO_OPTIONS: {
  delay: number;
  historyCount: number;
  hotKeys: SearchProHotKeyOptions[];
  worker: string;
};
declare const SEARCH_PRO_LOCALES: SearchProLocaleConfig;

export const searchProOptions = SEARCH_PRO_OPTIONS;

export const searchProClientCustomFiledConfig = SEARCH_PRO_CUSTOM_FIELDS;
export const searchProHotKeys = searchProOptions.hotKeys;
export const searchProLocales = SEARCH_PRO_LOCALES;
