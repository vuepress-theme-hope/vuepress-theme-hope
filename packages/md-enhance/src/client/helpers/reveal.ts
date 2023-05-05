import { type App, inject } from "vue";

import { type RevealOptions as OriginalRevealOptions } from "../typings/index.js";

declare const __VUEPRESS_DEV__: boolean;

export type RevealOptions = Omit<OriginalRevealOptions, "embedded" | "plugins">;

let revealOptions: Partial<RevealOptions> = {};

const revealSymbol = Symbol(__VUEPRESS_DEV__ ? "reveal" : "");

export const defineRevealConfig = (options: Partial<RevealOptions>): void => {
  revealOptions = options;
};

export const useRevealConfig = (): Partial<RevealOptions> =>
  inject(revealSymbol)!;

export const injectRevealConfig = (app: App): void => {
  app.provide(revealSymbol, revealOptions);
};
