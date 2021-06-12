import type { ResolvedLocaleConfig } from "@mr-hope/vuepress-shared";
import type { WalineLocale } from "@waline/client";

export type WalineI18nConfig = Partial<WalineLocale>;

export type WalineLocaleConfig = ResolvedLocaleConfig<WalineI18nConfig>;
