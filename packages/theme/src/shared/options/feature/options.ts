import type {
  HopeThemeBlogConfig,
  HopeThemeBlogLocaleData,
  HopeThemeBlogOptions,
} from "./blog";
import type {
  HopeThemeEncryptConfig,
  HopeThemeEncryptLocaleData,
  HopeThemeEncryptOptions,
} from "./encrypt";

export interface HopeThemeFeatureLocaleData {
  blogLocales: HopeThemeBlogLocaleData;

  /**
   * Encrypt
   */
  encryptLocales: HopeThemeEncryptLocaleData;
}

export interface HopeThemeFeatureLocaleOptions {
  /**
   * Blog feature
   */
  blog?: HopeThemeBlogOptions;
}

export interface HopeThemeFeatureLocaleConfig {
  blog: HopeThemeBlogConfig;
}

export interface HopeThemeFeatureOptions {
  /**
   * Encrypt config
   *
   * 加密配置
   */
  encrypt?: HopeThemeEncryptOptions;
}

export interface HopeThemeFeatureConfig extends HopeThemeFeatureLocaleConfig {
  /**
   * Encrypt config
   *
   * 加密配置
   */
  encrypt: HopeThemeEncryptConfig;
}
