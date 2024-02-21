import type { App, ComputedRef, InjectionKey } from "vue";
import { computed, inject } from "vue";
import { useRouteLocale } from "vuepress/client";

import type { SearchOptions } from "../typings/index.js";

declare const __VUEPRESS_DEV__: boolean;

let slimsearchOptions: SearchOptions = {};

const slimsearchSymbol: InjectionKey<SearchOptions> = Symbol(
  __VUEPRESS_DEV__ ? "slimsearch" : "",
);

export const defineSearchConfig = <
  ID = any,
  Index extends Record<string, any> = Record<never, never>,
>(
  options: SearchOptions<ID, Index>,
): void => {
  slimsearchOptions = <SearchOptions>options;
};

export const useSearchOptions = (): ComputedRef<
  Omit<SearchOptions, "locales">
> => {
  const routeLocale = useRouteLocale();
  const { locales = {}, ...options } = inject(slimsearchSymbol)!;

  return computed(() => ({
    ...options,
    ...(locales[routeLocale.value] || {}),
  }));
};

export const injectSearchConfig = (app: App): void => {
  app.provide(slimsearchSymbol, slimsearchOptions);
};
