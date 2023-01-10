import type {
  BlogLocaleConfig,
  BlogLocaleData,
  BlogLocaleOptions,
  PaginationLocaleData,
} from "./blog.js";
import type {
  EncryptConfig,
  EncryptLocaleData,
  EncryptOptions,
} from "./encrypt.js";

export interface FeatureLocaleData {
  /**
   * Blog related i18n config
   *
   * 博客相关多语言配置
   */
  blogLocales: BlogLocaleData;

  /**
   * Pagination related i18n config
   *
   * 分页相关多语言配置
   */
  paginationLocales: PaginationLocaleData;

  /**
   * Encrypt related i18n config
   *
   * 加密相关多语言配置
   */
  encryptLocales: EncryptLocaleData;
}

export interface FeatureLocaleOptions {
  /**
   * Blog feature options
   *
   * 博客功能配置
   */
  blog?: BlogLocaleOptions;
}

export interface FeatureLocaleConfig {
  blog?: BlogLocaleConfig;
}

/**
 * @kind root
 */
export interface FeatureOptions {
  /**
   * Encrypt config
   *
   * 加密配置
   */
  encrypt?: EncryptOptions;

  /**
   * Whether enable hotReload for features that requires app to restart
   *
   * @description These features includes blog support and structure sidebar feature
   *
   * 是否为需要重启整个 app 的功能启用热更新
   *
   * @description 这些功能包括博客支持和结构侧边栏功能
   *
   * @default app.env.isDebug
   */
  hotReload?: boolean;
}

// for config size consideration, blog options can be held in root and merged in client side
export interface FeatureConfig extends FeatureLocaleConfig {
  /**
   * Encrypt config
   *
   * 加密配置
   */
  encrypt: EncryptConfig;
}
