---
title: SEO
icon: config
category:
  - 高级
tag:
  - 高级
  - SEO
---

`vuepress-theme-hope` 通过内置 [`vuepress-plugin-seo2`][seo2] 为提供 SEO 增强功能。

为了使插件能够更好的工作，你可能需要查看一下 [页面配置](../../config/page.md#信息类) 并合理的配置它们。

::: info

`vuepress-theme-hope` 将 `themeConfig.plugins` 中的 `seo` 选项作为插件选项提供给 `vuepress-plugin-seo2`。

:::

插件会通过向网站 `<head>` 注入标签，让你的网站完全支持 [开放内容协议 OGP](https://ogp.me/) 和 [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)，以全面增强站点的搜索引擎优化性。

如果不需要这个插件，请设置 `themeConfig.plugins.seo` 为 `false`。

<!-- more -->

## 开箱即用

插件开箱即用，在不做任何配置的情况下，会尽可能通过页面内容，提取对应的信息补全 OGP 与 JSON-LD 所需的必要标签。

默认情况下，插件会读取站点配置、主题配置与页面的 frontmatter 来尽可能自动生成。诸如站点名称，页面标题，页面类型，写作日期，最后更新日期，文章标签均会自动生成。

### 默认的 OGP 生成逻辑

|         属性名称         |                         值                          |
| :----------------------: | :-------------------------------------------------: |
|         `og:url`         |           `themeConfig.hostname` + `path`           |
|      `og:site_name`      |                 `siteConfig.title`                  |
|        `og:title`        |                    `page.title`                     |
|     `og:description`     |           `page.frontmatter.description`            |
|        `og:type`         |                     `'article'`                     |
|        `og:image`        |  `themeConfig.hostname` + `page.frontmatter.image`  |
|    `og:updated_time`     |               `page.git.updatedTime`                |
|       `og:locale`        |                     `page.lang`                     |
|  `og:locale:alternate`   |        `themeConfig.locales` 包含的其他语言         |
|      `twitter:card`      |               `'summary_large_image'`               |
|   `twitter:image:alt`    |                 `siteConfig.title`                  |
|     `article:author`     | `page.frontmatter.author` \|\| `themeConfig.author` |
|      `article:tag`       | `page.frontmatter.tags` \|\| `page.frontmatter.tag` |
| `article:published_time` | `page.frontmatter.date` \|\| `page.createTimeStamp` |
| `article:modified_time`  |               `page.git.updatedTime`                |

### 默认的 JSON-LD 生成逻辑

|     属性名      |                         值                          |
| :-------------: | :-------------------------------------------------: |
|   `@context`    |               `"https://schema.org"`                |
|     `@type`     |                   `"NewsArticle"`                   |
|   `headline`    |                    `page.title`                     |
|     `image`     |  `themeConfig.hostname` + `page.frontmatter.image`  |
| `datePublished` | `page.frontmatter.date` \|\| `page.createTimeStamp` |
| `dateModified`  |               `page.git.updatedTime`                |
|    `author`     | `page.frontmatter.author` \|\| `themeConfig.author` |

## 自由定制

你可以在页面的 frontmatter 中配置 `head` 选项，自主添加特定标签到页面 `<head>` 以增强 SEO。

如:

```md
---
head:
  - - meta
    - name: keywords
      content: SEO plugin
---
```

会自动注入 `<meta name="keywords" content="SEO plugin" />`。

## 自定义生成过程

插件支持让你完全控制生成逻辑。

### ogp

你可以在 `themeConfig.plugins.seo` 中通过 `ogp` 传入一个函数来按照你的需要修改默认 OGP 对象并返回。

```ts
function ogp<ExtendObject = Record<string, unknown>>(
  /** 插件自动推断的 OGP 对象 */
  ogp: SeoContent,
  /** SEO 有关信息，包含 App, 当前 Page 和页面的永久链接 */
  info: PageSeoInfo<ExtendObject>
): SeoContent;
```

详细的参数结构详见 [配置][seo2-config]。

比如你在使用某个第三方主题，并按照主题要求为每篇文章在 front matter 中设置了 `banner`，那你可以传入这样的 `ogp`:

```ts
({
  ogp: (ogp, { page }) => ({
    ...ogp,
    "og:image": page.frontmatter.banner || ogp["og:image"],
  }),
});
```

### JSON-LD

同 OGP，你可以在 `themeConfig.plugins.seo` 中通过 `jsonLd` 传入一个函数来按照你的需要修改默认 JSON-LD 对象并返回。

```ts
function jsonLd<ExtendObject = Record<string, unknown>>(
  /** 插件自动推断的 JSON-LD 对象 */
  jsonLD: ArticleJSONLD | null,
  /** SEO 有关信息，包含 App, 当前 Page 和页面的永久链接 */
  info: PageSeoInfo<ExtendObject>
): ArticleJSONLD | null;
```

::: warning

请注意插件不会对非文章页生成 JSON-LD，所以函数的首个参数可能为 `null`。

:::

### customHead

有些时候你可能需要符合其他协议或按照其他搜索引擎提供的格式提供对应的 SEO 标签，此时你可以在 `themeConfig.plugins.seo` 中使用 `customHead` 选项，其类型为:

```ts
function customHead<ExtendObject = Record<string, unknown>>(
  head: HeadConfig[],
  info: PageSeoInfo<ExtendObject>
): void;
```

你应该直接修改传入的 `head` 参数。

## SEO 介绍

搜索引擎优化 (**S**earch **E**ngine **O**ptimization)，是一种透过了解搜索引擎的运作规则来调整网站，以及提高目的网站在有关搜索引擎内排名的方式。由于不少研究发现，搜索引擎的用户往往只会留意搜索结果最前面的几个条目，所以不少网站都希望透过各种形式来影响搜索引擎的排序，让自己的网站可以有优秀的搜索排名。 所谓“针对搜索引擎作最优化的处理”，是指为了要让网站更容易被搜索引擎接受。搜索引擎会将网站彼此间的内容做一些相关性的资料比对，然后再由浏览器将这些内容以最快速且接近最完整的方式，呈现给搜索者。搜索引擎优化就是通过搜索引擎的规则进行优化，为用户打造更好的用户体验，最终的目的就是做好用户体验。

## RDFa 1.1

主题通过遵循 [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/)，为网站的大部分结构添加了富媒体结构支持。

::: tip

你可以使用 [Google 富媒体结构测试工具](https://search.google.com/test/rich-results) 测试本站点。

:::

## 相关文档

- [开放内容协议 OGP](https://ogp.me/) (**O**pen **G**raph **Pr**otocal)

- [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)

- [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/)

- [Schema.Org](https://schema.org/)

[seo2]: https://vuepress-theme-hope.github.io/v2/seo/zh/
[seo2-config]: https://vuepress-theme-hope.github.io/v2/seo/zh/config.html
