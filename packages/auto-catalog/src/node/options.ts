import { PageFrontmatter } from "@vuepress/core";

export interface AutoCatalogOptions {
  /**
   * Exclude paths from being generated
   *
   * 排除需要生成的路径
   *
   * @default []
   */
  exclude?: (RegExp | string)[];

  /**
   * Frontmatter of the generated page
   *
   * @param path path to be generated
   * @returns title of the generated page
   *
   * 页面 Frontmatter 获取器
   *
   * @param path 当前生成的路径名称
   * @returns 页面 Frontmatter
   */
  frontmatter?: (path: string) => PageFrontmatter;
}
