import {
  type SearchProCustomFieldFormatter,
  type SearchProHotKeyOptions,
  type SearchProLocaleConfig,
} from "../shared/index.js";

type SearchProClientCustomFiledConfig = Record<
  string,
  SearchProCustomFieldFormatter
>;

declare const SEARCH_PRO_ENABLE_AUTO_SUGGESTIONS: boolean;
declare const SEARCH_PRO_CUSTOM_FIELDS: SearchProClientCustomFiledConfig;
declare const SEARCH_PRO_OPTIONS: {
  searchDelay: number;
  suggestDelay: number;
  queryHistoryCount: number;
  resultHistoryCount: number;
  hotKeys: SearchProHotKeyOptions[];
  worker: string;
};
declare const SEARCH_PRO_LOCALES: SearchProLocaleConfig;

export const searchProOptions = SEARCH_PRO_OPTIONS;

export const enableAutoSuggestions = SEARCH_PRO_ENABLE_AUTO_SUGGESTIONS;
export const searchProClientCustomFiledConfig = SEARCH_PRO_CUSTOM_FIELDS;
export const searchProHotKeys = searchProOptions.hotKeys;
export const searchProLocales = SEARCH_PRO_LOCALES;
export const clientWorker = new URL("./worker/index.js", import.meta.url);
