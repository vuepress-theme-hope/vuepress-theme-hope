import { type App, inject } from "vue";

import { type GiscusOptions } from "../../shared/index.js";

const giscusSymbol = Symbol("giscus");

let giscusOptions: GiscusOptions | undefined = undefined;

export const defineGiscusConfig = (options: GiscusOptions): void => {
  giscusOptions = options;
};

export const setupGiscusConfig = (app: App): void => {
  app.provide(giscusSymbol, giscusOptions);
};

export const useGiscusOptions = (): GiscusOptions | undefined =>
  inject(giscusSymbol);
