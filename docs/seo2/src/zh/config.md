---
title: 选项
icon: config
---

## 插件选项

### author

- 类型: `string`
- 必填: 否

默认作者

### twitterID

- 类型: `string`
- 必填: 否

填入你的 twitter 用户名

### restrictions

- 类型: `string`
- 必填: 否

内容的年龄分级，格式为 `[int]+`，如 `'13+'`

### seo

- 类型: `(info: PageSeoInfo) => Record<string, string>`

你可以使用此选项来注入新的或覆盖掉默认生成的 SEO，你需要按照 `<property>: <content>` 的格式来返回一个对象。

### customMeta

- 类型: `(meta: Meta[], info: PageSeoInfo) => void`

你可以使用此选项来直接注入任意格式的 `<meta>` 标签到 `<head>`。

## 相关接口

- `PageSeoInfo` 的接口类型如下:

  ```ts
  interface PageSeoInfo {
    /** 页面对象 */
    page: Page;
    /** 站点对象 */
    site: SiteConfig;
    /** 主题配置 */
    themeConfig: ThemeConfig;
    /** 支持的多语言 */
    locales: string[];
    /** 当前页面地址 */
    path: string;
  }
  ```

- `Meta` 的接口类型为 `Record<"content" | "name" | "charset" | "http-equiv", string>`

  `Meta` 对象的键会渲染为 meta 标签的属性，值会渲染为对应属性的值。

  详情请见 [Frontmatter → Meta](https://v1.vuepress.vuejs.org/zh/guide/frontmatter.html#meta)
