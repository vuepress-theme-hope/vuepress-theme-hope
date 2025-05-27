import type { AppearanceConfig } from "./options/appearance.js";
import type { FeatureConfig } from "./options/feature/index.js";
import type { InfoConfig } from "./options/info.js";
import type { ThemeLocaleConfig } from "./options/locales.js";

export interface ThemeData extends AppearanceConfig, FeatureConfig, InfoConfig {
  locales: Record<string, ThemeLocaleConfig>;
}
