import type { LocaleConfig } from "@vuepress/shared";
import type { WalineLocale } from "@waline/client";

export type WalineLocaleData = Partial<WalineLocale>;

export type WalineLocaleConfig = LocaleConfig<WalineLocaleData>;
