import type { BlogOptions, BlogTypeOptions } from "vuepress-plugin-blog2";

export interface BlogPluginOptions
  extends Partial<
    Pick<
      BlogOptions,
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
   * Path of timeline
   *
   * 时间线路径
   *
   * @default "/timeline/"
   */
  timeline?: string;

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
   * @description This is an advanced option, please refer to the [blog2 plugin documentation](https://plugin-blog.vuejs.press/guide.html#customizing-categories-and-types) for details
   *
   * 额外的文章类型
   *
   * @description 这是一个高级选项，请参考 [blog2 插件文档](https://plugin-blog.vuejs.press/zh/guide.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%88%AB%E5%92%8C%E7%B1%BB%E5%9E%8B) 了解详情
   *
   * @default []
   */
  type?: BlogTypeOptions[];
}
