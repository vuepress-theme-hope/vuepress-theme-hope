---
title: SEO
icon: dumbbell
order: 1
category:
  - 高级
tag:
  - 高级
  - SEO
---

`vuepress-theme-hope` 通过内置的[`@vuepress/plugin-seo`][seo] 提供 SEO 增强功能。

::: info
通过主题选项中的 `plugins.seo` 配置该插件。若需禁用此功能，请将 `plugins.seo` 设置为 `false`。
:::

<!-- more -->

## 默认行为

插件开箱即用。它会提取页面内容、站点配置、主题配置及页面的 Frontmatter，自动生成符合 [Open Graph Protocol (OGP)](https://ogp.me/) 和 [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/) 规范的标签。

### 默认 OGP 生成规则

|        Meta 名称         |                                         取值                                         |
| :----------------------: | :----------------------------------------------------------------------------------: |
|         `og:url`         |                           `themeConfig.hostname` + `path`                            |
|      `og:site_name`      |                                  `siteConfig.title`                                  |
|        `og:title`        |                                     `page.title`                                     |
|     `og:description`     |  `page.frontmatter.description` \|\| 自动生成（当 `autoDescription` 为 `true` 时）   |
|        `og:type`         |                                     `"article"`                                      |
|        `og:image`        | `themeConfig.hostname` + `page.frontmatter.image` \|\| 页面首图 \|\| `fallbackImage` |
|    `og:updated_time`     |                                `page.git.updatedTime`                                |
|       `og:locale`        |                                     `page.lang`                                      |
|  `og:locale:alternate`   |                          `siteData.locales` 包含的其他语言                           |
|      `twitter:card`      |                      `"summary_large_image"`（存在图片时可用）                       |
|   `twitter:image:alt`    |                            `page.title`（存在图片时可用）                            |
|     `article:author`     |                 `page.frontmatter.author` \|\| `themeConfig.author`                  |
|      `article:tag`       |                 `page.frontmatter.tags` \|\| `page.frontmatter.tag`                  |
| `article:published_time` |                 `page.frontmatter.date` \|\| `page.git.createdTime`                  |
| `article:modified_time`  |                                `page.git.updatedTime`                                |

### 默认 JSON-LD 生成规则

|    属性名称     |                                         取值                                         |
| :-------------: | :----------------------------------------------------------------------------------: |
|   `@context`    |                                `"https://schema.org"`                                |
|     `@type`     |                                   `"NewsArticle"`                                    |
|   `headline`    |                                     `page.title`                                     |
|     `image`     | 页面图片 \|\| `themeConfig.hostname` + `page.frontmatter.image` \|\| `fallbackImage` |
| `datePublished` |                 `page.frontmatter.date` \|\| `page.git.createdTime`                  |
| `dateModified`  |                                `page.git.updatedTime`                                |
|    `author`     |                 `page.frontmatter.author` \|\| `themeConfig.author`                  |

## 直接设置标签

通过配置页面 Frontmatter 的 `head` 选项，可以将特定标签直接注入至页面的 `<head>` 中。

```md
---
head:
  - - meta
    - name: keywords
      content: SEO plugin
---
```

上述配置将输出：`<meta name="keywords" content="SEO plugin" />`。

## 自定义生成逻辑

### 页面类型解析

默认情况下，由 Markdown 生成的非主页页面均被视为文章。你可以通过 `plugins.seo.isArticle` 选项提供自定义的文章识别逻辑。

```ts
(page: Page) => boolean;
```

::: note
针对书籍、音乐等非文章类型的页面，可通过下方介绍的 `ogp`、`jsonLd` 和 `customHead` 选项接管生成逻辑。
:::

### OGP 自定义

通过 `plugins.seo.ogp` 可以在输出前修改默认生成的 OGP 对象。

```ts
function ogp(
  /** 插件推断的 OGP 对象 */
  ogp: SeoContent,
  /** 页面对象 */
  page: Page,
  /** VuePress App 实例 */
  app: App,
): SeoContent;
```

使用 Frontmatter 中的自定义 `banner` 字段覆盖 `og:image` 属性的示例：

```ts
seoPlugin({
  ogp: (ogp, page) => ({
    ...ogp,
    "og:image": page.frontmatter.banner || ogp["og:image"],
  }),
});
```

### JSON-LD 自定义

通过 `plugins.seo.jsonLd` 可以在输出前修改默认生成的 JSON-LD 对象。

```ts
function jsonLd(
  /** 插件推断的 JSON-LD 对象 */
  jsonLD: ArticleSchema | BlogPostingSchema | WebPageSchema,
  /** 页面对象 */
  page: Page,
  /** VuePress App 实例 */
  app: App,
): ArticleSchema | BlogPostingSchema | WebPageSchema;
```

### 规范链接 (Canonical Link)

如果你的内容部署在多个域名或路径下，需通过 `plugins.seo.canonical` 指定首选 URL。可以传入字符串作为基准 URL 自动拼接，或传入函数 `(page: Page) => string | null` 进行编程式控制。

::: tip
如果你的站点同时可被 `http://example.com/docs/` 和 `https://www.example.com/docs/`（首选）访问，将 `plugins.seo.canonical` 设置为 `https://www.example.com/docs/` 会指示搜索引擎仅索引该首选 URL。
:::

### 自定义 `<head>` 标签

通过 `plugins.seo.customHead` 可以直接修改 `<head>` 标签数组。这适用于需满足特定搜索引擎特殊标签格式要求的场景。

```ts
function customHead(
  /** Head 标签配置 */
  head: HeadConfig[],
  /** 页面对象 */
  page: Page,
  /** VuePress App 实例 */
  app: App,
): void;
```

## RDFa 1.1 支持

主题遵循 [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/) 规范，为站点提供了富媒体结构支持。

::: tip
使用 [Google 富媒体搜索结果测试工具](https://search.google.com/test/rich-results) 验证站点的结构化数据。
:::

## 参考链接

- [Open Graph Protocol (OGP)](https://ogp.me/)
- [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)
- [RDFa 1.1 规范](https://www.w3.org/TR/rdfa-primer/)
- [Schema.org](https://schema.org/)
- [Google 富媒体搜索结果测试](https://search.google.com/test/rich-results)
- [SEO 插件文档][seo]
- [SEO 插件配置项][seo-config]

[seo]: https://ecosystem.vuejs.press/zh/plugins/seo/seo/
[seo-config]: https://ecosystem.vuejs.press/zh/plugins/seo/seo/config.html
