import type { BlogPluginOptions, BlogTypeOptions } from "@vuepress/plugin-blog";

/**
 * Timeline configuration options
 *
 * 时间线配置选项
 */
export interface TimelineOptions {
  /**
   * Timeline path
   *
   * 时间线路径
   *
   * @default "/timeline/"
   */
  path?: string;

  /**
   * Whether to use update time instead of create time in timeline
   *
   * 是否在时间线中使用更新时间而不是创建时间
   *
   * @default false
   */
  useUpdateTime?: boolean;
}

export interface BlogOptions
  extends Partial<
    Pick<
      BlogPluginOptions,
      | "excerptFilter"
      | "excerptLength"
      | "excerptSeparator"
      | "filter"
      | "slugify"
      | "hotReload"
    >
  > {
  /**
   * Path of article list
   *
   * 文章列表的路径
   *
   * @default "/article/"
   */
  article?: string;

  /**
   * Path of category map
   *
   * 分类地图页的地址
   *
   * @default "/category/"
   */
  category?: string;

  /**
   * Path to navigate when clicking category label
   *
   * `:name` will be automatically replaced by current category name
   *
   * 点击分类标签时跳转的路径。
   *
   * 其中 `:name` 会被自动替换为当前分类名称
   *
   * @default "/category/:name/"
   */
  categoryItem?: string;

  /**
   * Path of tag map
   *
   * 标签地图页的地址
   *
   * @default "/tag/"
   */
  tag?: string;

  /**
   * Path to navigate when clicking tag label
   *
   * `:name` will be automatically replaced by current tag name
   *
   * 点击标签跳转的路径。
   *
   * 其中 `:name` 会被自动替换为当前分类名称
   *
   * @default "/tag/:name/"
   */
  tagItem?: string;

  /**
   * Path of star article list
   *
   * 星标文章列表的路径
   *
   * @default "/star/""
   */
  star?: string;

  /**
   * Path of timeline or timeline configuration
   *
   * 时间线路径或时间线配置
   *
   * @default "/timeline/"
   */
  timeline?: string | TimelineOptions;

  /**
   * Excerpt generation
   *
   * 摘要生成
   *
   * @default true
   */
  excerpt?: boolean;

  /**
   * Additional Article Type
   *
   * @description This is an advanced option, please refer to the [blog plugin documentation](https://ecosystem.vuejs.press/plugins/blog/blog/) for details
   *
   * 额外的文章类型
   *
   * @description 这是一个高级选项，请参考 [blog 插件文档](https://ecosystem.vuejs.press/zh/plugins/blog/blog/) 了解详情
   *
   * @default []
   */
  type?: BlogTypeOptions[];
}
