import { type App, inject } from "vue";

import { type SearchOptions } from "../typings/index.js";

declare const __VUEPRESS_DEV__: boolean;

let minisearchOptions: SearchOptions = {};

const minisearchSymbol = Symbol(__VUEPRESS_DEV__ ? "minisearch" : "");

export const defineSearchConfig = (options: SearchOptions): void => {
  minisearchOptions = options;
};

export const useSearchOptions = (): SearchOptions => inject(minisearchSymbol)!;

export const injectMiniSearchConfig = (app: App): void => {
  app.provide(minisearchSymbol, minisearchOptions);
};
