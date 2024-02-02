import type { ExactLocaleConfig } from "@vuepress/helper";

import type { MarkdownHintLocaleData } from "./hint.js";

export type MarkdownEnhanceLocaleData = MarkdownHintLocaleData;

export type MarkdownEnhanceLocaleConfig =
  ExactLocaleConfig<MarkdownEnhanceLocaleData>;
