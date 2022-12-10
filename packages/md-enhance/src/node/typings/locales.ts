import type { RequiredLocaleConfig } from "vuepress-shared";
import type { MarkdownHintLocaleData } from "./hint.js";

export type MarkdownEnhanceLocaleData = MarkdownHintLocaleData;

export type MarkdownEnhanceLocaleConfig =
  RequiredLocaleConfig<MarkdownEnhanceLocaleData>;
