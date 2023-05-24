import { type App, inject } from "vue";

import { type MiniSearchOptions } from "../typings/index.js";

declare const __VUEPRESS_DEV__: boolean;

let minisearchOptions: MiniSearchOptions = {};

const minisearchSymbol = Symbol(__VUEPRESS_DEV__ ? "minisearch" : "");

export const defineSearchConfig = (options: MiniSearchOptions): void => {
  minisearchOptions = options;
};

export const useSearchOptions = (): MiniSearchOptions =>
  inject(minisearchSymbol)!;

export const injectMiniSearchConfig = (app: App): void => {
  app.provide(minisearchSymbol, minisearchOptions);
};
