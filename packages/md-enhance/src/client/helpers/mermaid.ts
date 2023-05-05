import { type MermaidConfig } from "mermaid";
import { type App, inject } from "vue";

declare const __VUEPRESS_DEV__: boolean;

export type MermaidOptions = Omit<MermaidConfig, "startOnLoad">;

let mermaidOptions: MermaidConfig = {};

const mermaidSymbol = Symbol(__VUEPRESS_DEV__ ? "mermaid" : "");

export const defineMermaidConfig = (options: MermaidOptions): void => {
  mermaidOptions = options;
};

export const useMermaidOptions = (): MermaidOptions => inject(mermaidSymbol)!;

export const injectMermaidConfig = (app: App): void => {
  app.provide(mermaidSymbol, mermaidOptions);
};
