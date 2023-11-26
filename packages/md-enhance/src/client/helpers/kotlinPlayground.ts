import type { App } from "vue";
import { inject } from "vue";

import type { KotlinPlaygroundOptions } from "../typings/index.js";

const DEFAULT_KOTLIN_PLAYGROUND_OPTIONS: KotlinPlaygroundOptions = {};

declare const __VUEPRESS_DEV__: boolean;

let kotlinPlaygroundOptions: KotlinPlaygroundOptions =
  DEFAULT_KOTLIN_PLAYGROUND_OPTIONS;

const kotlinPlaygroundSymbol = Symbol(
  __VUEPRESS_DEV__ ? "kotlinPlayground" : "",
);

export const defineKotlinPlaygroundConfig = (
  options: KotlinPlaygroundOptions,
): void => {
  kotlinPlaygroundOptions = options;
};

export const useKotlinPlaygroundConfig = (): KotlinPlaygroundOptions =>
  inject(kotlinPlaygroundSymbol)!;

export const injectKotlinPlaygroundConfig = (app: App): void => {
  app.provide(kotlinPlaygroundSymbol, kotlinPlaygroundOptions);
};
