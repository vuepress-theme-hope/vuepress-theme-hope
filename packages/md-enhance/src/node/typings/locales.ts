import type { RequiredLocaleConfig } from "vuepress-shared/node";

import type { MarkdownHintLocaleData } from "./hint.js";

export type MarkdownEnhanceLocaleData = MarkdownHintLocaleData;

export type MarkdownEnhanceLocaleConfig =
  RequiredLocaleConfig<MarkdownEnhanceLocaleData>;
