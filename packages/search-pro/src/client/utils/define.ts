import type {
  SearchProClientCustomFiledConfig,
  SearchProLocaleConfig,
} from "../../shared/index.js";

declare const SEARCH_PRO_CUSTOM_FIELDS: SearchProClientCustomFiledConfig;
declare const SEARCH_PRO_LOCALES: SearchProLocaleConfig;

export const searchProLocales = SEARCH_PRO_LOCALES;
export const searchProClientCustomFiledConfig = SEARCH_PRO_CUSTOM_FIELDS;
