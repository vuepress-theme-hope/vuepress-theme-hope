import type { ResolvedLocaleConfig } from "@mr-hope/vuepress-shared";

export interface MarkdownEnhanceI18nConfig {
  info: string;
  tip: string;
  warning: string;
  danger: string;
  details: string;
}

export type MarkdownContainerName = keyof MarkdownEnhanceI18nConfig;

export type MarkdownEnhanceLocaleConfig =
  ResolvedLocaleConfig<MarkdownEnhanceI18nConfig>;
