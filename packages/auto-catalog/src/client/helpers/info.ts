import { isString } from "@vuepress/shared";
import type { App, Component } from "vue";
import { inject } from "vue";

declare const __VUEPRESS_DEV__: boolean;

export interface AutoCatalogInfo {
  /**
   * Catalog title
   *
   * 目录标题
   */
  title: string;
  /**
   * Catalog order
   *
   * 目录顺序
   */
  order?: number;
  /**
   * Catalog content
   *
   * 目录内容
   */
  content?: Component;
}

export type AutoCatalogInfoGetter = (
  meta: Record<string, unknown>,
) => AutoCatalogInfo | null;

let autoCatalogGetter: AutoCatalogInfoGetter = (meta) =>
  isString(meta["title"]) ? { title: meta["title"] } : null;

const autoCatalogSymbol = Symbol(__VUEPRESS_DEV__ ? "auto-catalog" : "");

export const defineAutoCatalogGetter = (
  options: AutoCatalogInfoGetter,
): void => {
  autoCatalogGetter = options;
};

export const useAutoCatalogGetter = (): AutoCatalogInfoGetter =>
  inject(autoCatalogSymbol)!;

export const injectAutoCatalogGetter = (app: App): void => {
  app.provide(autoCatalogSymbol, autoCatalogGetter);
};
