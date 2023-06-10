import type { App, Component } from "vue";
import { inject } from "vue";

declare const __VUEPRESS_DEV__: boolean;

export type AutoCatalogIconComponent = Component<{ icon: string }>;

let autoCatalogIconComponent: Component = () => null;

const autoCatalogSymbol = Symbol(__VUEPRESS_DEV__ ? "auto-catalog" : "");

export const defineAutoCatalogIconComponent = (
  options: AutoCatalogIconComponent
): void => {
  autoCatalogIconComponent = options;
};

export const useAutoCatalogIconComponent = (): AutoCatalogIconComponent =>
  inject(autoCatalogSymbol)!;

export const injectAutoCatalogIconComponent = (app: App): void => {
  app.provide(autoCatalogSymbol, autoCatalogIconComponent);
};
