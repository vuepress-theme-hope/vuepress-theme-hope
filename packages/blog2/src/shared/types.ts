import type { Page } from "@vuepress/core";

export type ArticleMap = Record<string, string[]>;

export type CategoryLocaleMap = Record<string, string[]>;

export type CategoryMap = Record<string, CategoryLocaleMap>;

export type PageMap = Record<string, Page[]>;

export type TypeMap = Record<string, string[]>;
