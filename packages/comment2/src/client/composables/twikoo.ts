import { type App, inject } from "vue";

import { type TwikooOptions } from "../../shared/index.js";

const twikooSymbol = Symbol("twikoo");

let twikooOptions: TwikooOptions | undefined = undefined;

export const defineTwikooConfig = (options: TwikooOptions): void => {
  twikooOptions = options;
};

export const setupTwikooConfig = (app: App): void => {
  app.provide(twikooSymbol, twikooOptions);
};

export const useTwikooOptions = (): TwikooOptions | undefined =>
  inject(twikooSymbol);
