import { type MinisearchLocaleConfig } from "../shared/index.js";

declare const MINISEARCH_DETAILED_VIEW: boolean;
declare const MINISEARCH_QUERY_HISTORY: boolean;
declare const MINISEARCH_LOCALES: MinisearchLocaleConfig;

export const enableQueryHistory = MINISEARCH_QUERY_HISTORY;

export const enableDetailedView = MINISEARCH_DETAILED_VIEW;
export const minisearchLocales = MINISEARCH_LOCALES;
