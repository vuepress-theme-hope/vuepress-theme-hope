import type { Page } from "@vuepress/core";

export type PageMap = Record</** Locale Path */ string, /** Pages */ Page[]>;

export type ArticleMap = Record<
  /** Locale Path */ string,
  /** Page Keys */ string[]
>;

export interface CategoryConfig {
  path: string;
  keys: string[];
}

export type CategoryLocaleMap = Record<
  /** Category name */ string,
  /** Category config */ CategoryConfig
>;

export interface CategoryLocaleConfig {
  /** Main page of category */
  path: string;
  /** category map for current locale */
  map: CategoryLocaleMap;
}

export type CategoryMap = Record<
  /** Locale Path */ string,
  /** Locale category config */ CategoryLocaleConfig
>;

export interface TypeConfig {
  path: string;
  keys: string[];
}

export type TypeMap = Record<
  /** Locale Path */ string,
  /** Locale Type config */ TypeConfig
>;
