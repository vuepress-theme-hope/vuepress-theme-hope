import type { ExactLocaleConfig } from "@vuepress/helper/node";

import type { MarkdownHintLocaleData } from "./hint.js";

export type MarkdownEnhanceLocaleData = MarkdownHintLocaleData;

export type MarkdownEnhanceLocaleConfig =
  ExactLocaleConfig<MarkdownEnhanceLocaleData>;
