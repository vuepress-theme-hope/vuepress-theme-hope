import type { App } from "vue";
import { inject } from "vue";

import type { SearchOptions } from "../typings/index.js";

declare const __VUEPRESS_DEV__: boolean;

let slimsearchOptions: SearchOptions = {};

const slimsearchSymbol = Symbol(__VUEPRESS_DEV__ ? "slimsearch" : "");

export const defineSearchConfig = (options: SearchOptions): void => {
  slimsearchOptions = options;
};

export const useSearchOptions = (): SearchOptions => inject(slimsearchSymbol)!;

export const injectSearchConfig = (app: App): void => {
  app.provide(slimsearchSymbol, slimsearchOptions);
};
