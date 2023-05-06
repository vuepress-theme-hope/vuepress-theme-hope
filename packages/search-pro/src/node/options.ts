import { type LocaleConfig, type Page } from "@vuepress/core";

import {
  type SearchProCustomFieldFormatter,
  type SearchProHotKeyOptions,
  type SearchProLocaleData,
} from "../shared/index.js";

export interface SearchProCustomFieldOptions {
  /**
   * Custom field getter
   *
   * 自定义项目的获取器
   */
  getter: (page: Page) => string | string[] | null;

  /**
   * Display content
   *
   * @description `$content` will be replaced by the content returned by `getter`
   *
   * 展示的内容
   *
   * @description `$content` 会被 `getter` 返回的内容替换
   *
   * @default `$content`
   */
  formatter?: SearchProCustomFieldFormatter;
}

export interface SearchProOptions {
  /**
   * Whether index page content
   *
   * @description By default only headings and excerpt of the page will be indexed, and the content of the page will not be indexed. If you need to index the content of the page, you can set this option to `true`
   *
   * 是否索引正文内容
   *
   * @description 默认情况下，只会索引页面的标题和摘要，不会索引页面的正文内容。如果需要索引页面的正文内容，可以将该选项设置为 `true`
   *
   * @default false
   */
  indexContent?: boolean;

  /**
   * Max stored query history count
   *
   * @description You can set it to `0` to disable it
   *
   * 存储查询历史的最大数量
   *
   * @description 可以将其设置为 `0` 来禁用
   *
   * @default 5
   */
  queryHistoryCount?: number;

  /**
   * Max stored matched result history count
   *
   * @description You can set it to `0` to disable it
   *
   * 存储结果历史的最大数量
   *
   * @description 可以将其设置为 `0` 来禁用
   *
   * @default 5
   */
  resultHistoryCount?: number;

  /**
   * Delay to start searching after input
   *
   * 结束输入到开始搜索的延时
   *
   * @default 300
   */
  delay?: number;

  /**
   * Custom field for search
   */
  customFields?: SearchProCustomFieldOptions[];

  /**
   * Specify the [event.key](http://keycode.info/) of the hotkeys
   *
   * @description When hotkeys are pressed, the search box input will be focused. Set to an empty array to disable hotkeys
   *
   * 指定热键的 [event.key](http://keycode.info/)
   *
   * @description 当热键被按下时，搜索框的输入框会被聚焦，设置为空数组以禁用热键
   *
   * @default [
   *   { key: "k", ctrl: true },
   *   { key: "/", ctrl: true },
   *  ]
   */
  hotKeys?: SearchProHotKeyOptions[];

  /**
   * Output worker filename
   *
   * Worker 输出文件名
   *
   * @default "search-pro.worker.js"
   */
  worker?: string;

  /**
   * Whether enable hmr
   *
   * 是否启用 hmr
   *
   * @default false
   */
  hotReload?: boolean;

  /**
   * Locales config
   *
   * @see [default config](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/search-pro/src/node/locales.ts)
   *
   * 多语言选项
   *
   * @see [默认配置](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/search-pro/src/node/locales.ts)
   */
  locales?: LocaleConfig<SearchProLocaleData>;
}
