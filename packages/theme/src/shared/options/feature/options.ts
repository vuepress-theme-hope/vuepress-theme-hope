import type {
  HopeThemeBlogConfig,
  HopeThemeBlogLocaleData,
  HopeThemeBlogOptions,
  HopeThemePaginationLocaleData,
} from "./blog";
import type {
  HopeThemeEncryptConfig,
  HopeThemeEncryptLocaleData,
  HopeThemeEncryptOptions,
} from "./encrypt";

export interface HopeThemeFeatureLocaleData {
  /**
   * Blog related i18n config
   */
  blogLocales: HopeThemeBlogLocaleData;

  /**
   * Pagination related i18n config
   */
  paginationLocales: HopeThemePaginationLocaleData;

  /**
   * Encrypt related i18n config
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

export interface HopeThemeFeatureRootOptions {
  /**
   * Add This 的公开 ID
   *
   * Public ID for add this
   */
  addThis?: string;

  /**
   * Encrypt config
   *
   * 加密配置
   */
  encrypt?: HopeThemeEncryptOptions;
}

export interface HopeThemeFeatureRootConfig
  extends HopeThemeFeatureLocaleConfig {
  /**
   * Encrypt config
   *
   * 加密配置
   */
  encrypt: HopeThemeEncryptConfig;
}
