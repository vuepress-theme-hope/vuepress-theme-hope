---
title: "@mr-hope/seo"
category: config
tags:
  - plugin
  - config
---

向你的网页注入 `<meta>`，来增强你网页的 SEO。

<!-- more -->

## 插件选项

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

`PageSeoInfo` 的接口类型如下:

```ts
interface PageSeoInfo {
  /** 页面对象 */
  $page: Page;
  /** 站点对象 */
  $site: SiteConfig;
  /** 主题配置 */
  themeConfig: ThemeConfig;
  /** 支持的多语言 */
  locales: string[];
  /** 当前页面地址 */
  path: string;
}
```

你可以使用此选项来注入新的或覆盖掉默认生成的 SEO，你需要按照 `<property>: <content>` 的格式来返回一个对象。

比如如果你返回了 `{ 'og:url': 'google.com', 'og:image': 'google.com/logo.jpg' }`，则插件会注入以下内容到 `<head>` 中:

```html
<meta property="og:url" content="google.com" />
<meta property="og:image" content="google.com/logo.jpg" />
```

#### 默认值

以下是会被默认注入到 `<head>` 中的 `<meta>` 标签及其值:

|         属性名称         |                         值                         |
| :----------------------: | :------------------------------------------------: |
|         `og:url`         |            themeConfig.hostname + path             |
|      `og:site_name`      |                    \$site.title                    |
|        `og:title`        |                    \$page.title                    |
|     `og:description`     |           \$page.frontmatter.description           |
|        `og:type`         |                    `'article'`                     |
|        `og:image`        |  themeConfig.hostname + \$page.frontmatter.image   |
|    `og:updated_time`     |               \$page.lastUpdatedTime               |
|       `og:locale`        |               $page._computed.$lang                |
|  `og:locale:alternate`   |        \$themeConfig.locales 包含的其他语言        |
|      `twitter:card`      |              `'summary_large_image'`               |
|   `twitter:image:alt`    |                    \$site.title                    |
|     `article:author`     | \$page.frontmatter.author \|\| themeConfig.author  |
|      `article:tag`       | $page.frontmatter.tags \|\| $page.frontmatter.tag  |
| `article:published_time` | $page.frontmatter.time \|\| $page.frontmatter.date |
| `article:modified_time`  |               \$page.lastUpdatedTime               |

### customMeta

- 类型: `(meta: Meta, info: PageSeoInfo) => void`

你可以使用此选项来直接向 Meta 中注入内容。`Meta` 格式请见 [Front Matter → Meta](https://v1.vuepress.vuejs.org/zh/guide/frontmatter.html#meta)

比如传入:

```js
(meta: Meta, info: PageSeoInfo) => {
  meta.push({ a: "1", b: "2" });
};
```

会向当前页面的 `<head>` 注入:

```html
<meta a="1" b="2" />
```
