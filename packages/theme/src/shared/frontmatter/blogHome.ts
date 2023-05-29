import { type ThemeHopePageFrontmatter } from "./home.js";

export interface ThemeBlogHomeProjectOptions {
  /**
   * Project name
   *
   * 项目名称
   */
  name: string;

  /**
   * Project description
   *
   * 项目描述
   */
  desc?: string;

  /**
   * Project link
   *
   * 项目链接
   */
  link: string;

  /**
   * Project icon
   *
   * @description image link or icon fontClass are supported, as well as `"link"`、`"project"`、`"book"`、`"article"`、`"friend"`
   *
   * 项目图标
   *
   * @description 支持图片链接或者图标字体类，同时也支持 `"link"`、`"project"`、`"book"`、`"article"`、`"friend"`
   */
  icon?: string;
}

export interface ThemeBlogHomePageFrontmatter extends ThemeHopePageFrontmatter {
  layout: "BlogHome";
  /**
   * @default true
   */
  hero?: boolean;

  projects: ThemeBlogHomeProjectOptions[];
}
