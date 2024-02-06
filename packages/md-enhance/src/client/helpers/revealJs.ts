import type Reveal from "reveal.js";
import type { App } from "vue";
import { inject } from "vue";

declare const __VUEPRESS_DEV__: boolean;

export type RevealJsOptions = Omit<Reveal.Options, "embedded">;

let revealOptions: Partial<RevealJsOptions> = {};

const revealJsSymbol = Symbol(__VUEPRESS_DEV__ ? "revealjs" : "");

export const defineRevealJsConfig = (
  options: Partial<RevealJsOptions>,
): void => {
  revealOptions = options;
};

export const useRevealJsConfig = (): Partial<RevealJsOptions> =>
  inject(revealJsSymbol)!;

export const injectRevealJsConfig = (app: App): void => {
  app.provide(revealJsSymbol, revealOptions);
};
