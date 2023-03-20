import { type App, inject } from "vue";

import { type WalineOptions } from "../../shared/index.js";

const walineSymbol = Symbol("waline");

let walineOptions: WalineOptions | undefined = undefined;

export const defineWalineConfig = (options: WalineOptions): void => {
  walineOptions = options;
};

export const setupWalineConfig = (app: App): void => {
  app.provide(walineSymbol, walineOptions);
};

export const useWalineOptions = (): WalineOptions | undefined =>
  inject(walineSymbol);
