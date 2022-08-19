import type { ConvertLocaleConfig } from "vuepress-shared";
import type { MarkdownHintLocaleData } from "./hint";

export type MarkdownEnhanceLocaleData = MarkdownHintLocaleData;

export type MarkdownEnhanceLocaleConfig =
  ConvertLocaleConfig<MarkdownEnhanceLocaleData>;
