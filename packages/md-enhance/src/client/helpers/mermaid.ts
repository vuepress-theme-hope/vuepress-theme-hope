import type { App } from "vue";
import { inject } from "vue";

import type { MermaidOptions } from "../typings/index.js";

declare const __VUEPRESS_DEV__: boolean;

let mermaidOptions: MermaidOptions = {};

const mermaidSymbol = Symbol(__VUEPRESS_DEV__ ? "mermaid" : "");

export const defineMermaidConfig = (options: MermaidOptions): void => {
  mermaidOptions = options;
};

export const useMermaidOptions = (): MermaidOptions => inject(mermaidSymbol)!;

export const injectMermaidConfig = (app: App): void => {
  app.provide(mermaidSymbol, mermaidOptions);
};
