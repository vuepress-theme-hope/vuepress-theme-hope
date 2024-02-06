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

`vuepress-theme-hope` 通过内置 [`@vuepress/plugin-seo`][seo] 为提供 SEO 增强功能。

为了使插件能够更好的工作，你可能需要查看一下 [页面配置](../../config/frontmatter/info.md) 并合理的配置它们。

::: info

`vuepress-theme-hope` 将主题选项中的 `plugins.seo` 作为插件选项提供给 `@vuepress/plugin-seo`。

:::

插件会通过向网站 `<head>` 注入标签，让你的网站完全支持 [开放内容协议 OGP](https://ogp.me/) 和 [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)，以全面增强站点的搜索引擎优化性。

如果不需要这个插件，请设置在主题选项中设置 `plugins.seo: false`。

<!-- more -->

## 开箱即用

插件开箱即用，在不做任何配置的情况下，会尽可能通过页面内容，提取对应的信息补全 OGP 与 JSON-LD 所需的必要标签。

默认情况下，插件会读取站点配置、主题配置与页面的 frontmatter 来尽可能自动生成。诸如站点名称，页面标题，页面类型，写作日期，最后更新日期，文章标签均会自动生成。

### 默认的 OGP 生成逻辑

|         属性名称         |                                                   值                                                   |
| :----------------------: | :----------------------------------------------------------------------------------------------------: |
|         `og:url`         |                                    `themeConfig.hostname` + `path`                                     |
|      `og:site_name`      |                                           `siteConfig.title`                                           |
|        `og:title`        |                                              `page.title`                                              |
|     `og:description`     |      `page.frontmatter.description` \|\| 自动生成 (当插件选项中的 `autoDescription` 为 `true` 时)      |
|        `og:type`         |                                              `"article"`                                               |
|        `og:image`        | `themeConfig.hostname` + `page.frontmatter.image` \|\| 页面的第一张图片\|\| 插件选项的 `fallbackImage` |
|    `og:updated_time`     |                                         `page.git.updatedTime`                                         |
|       `og:locale`        |                                              `page.lang`                                               |
|  `og:locale:alternate`   |                                  `themeConfig.locales` 包含的其他语言                                  |
|      `twitter:card`      |                                `"summary_large_image"` (仅在找到图片时)                                |
|   `twitter:image:alt`    |                                     `page.title` (仅在找到图片时)                                      |
|     `article:author`     |                          `page.frontmatter.author` \|\| `themeConfig.author`                           |
|      `article:tag`       |                          `page.frontmatter.tags` \|\| `page.frontmatter.tag`                           |
| `article:published_time` |                          `page.frontmatter.date` \|\| `page.git.createdTime`                           |
| `article:modified_time`  |                                         `page.git.updatedTime`                                         |

### 默认的 JSON-LD 生成逻辑

|     属性名      |                                 值                                 |
| :-------------: | :----------------------------------------------------------------: |
|   `@context`    |                       `"https://schema.org"`                       |
|     `@type`     |                          `"NewsArticle"`                           |
|   `headline`    |                            `page.title`                            |
|     `image`     | 页面中的图片\|\| `themeConfig.hostname` + `page.frontmatter.image` |
| `datePublished` |        `page.frontmatter.date` \|\| `page.git.createdTime`         |
| `dateModified`  |                       `page.git.updatedTime`                       |
|    `author`     |        `page.frontmatter.author` \|\| `themeConfig.author`         |

## 直接添加 head 标签

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

### 页面类型

对于大多数页面，基本只有文章和网页两种类型，所以插件提供了 `isArticle` 选项让你提供辨别文章的逻辑。

选项接受一个 `(page: Page) => boolean` 格式的函数，默认情况下从 Markdown 文件生成的非主页页面都会被视为文章。

::: note

如果某个网页的确符合图书、音乐之类的“冷门”类型，你可以通过设置下方三个选项处理它们。

:::

### OGP

你可以在主题选项中通过 `plugins.seo.ogp` 传入一个函数来按照你的需要修改默认 OGP 对象并返回。

```ts
function ogp(
  /** 插件推断的 OGP 信息 */
  ogp: SeoContent,
  /** 页面对象 */
  page: Page,
  /** VuePress App */
  app: App,
): SeoContent;
```

详细的参数结构详见 [SEO 插件配置][seo-config]。

比如你在使用某个第三方主题，并按照主题要求为每篇文章在 front matter 中设置了 `banner`，那你可以传入这样的 `ogp`:

```ts
({
  ogp: (ogp, page) => ({
    ...ogp,
    "og:image": page.frontmatter.banner || ogp["og:image"],
  }),
});
```

### JSON-LD

同 OGP，你可以在主题选项中通过 `plugins.seo.jsonLd` 传入一个函数来按照你的需要修改默认 JSON-LD 对象并返回。

```ts
function jsonLd(
  /** 由插件推断出的 JSON-LD 对象 */
  jsonLD: ArticleSchema | BlogPostingSchema | WebPageSchema,
  /** 页面对象 */
  page: Page,
  /** VuePress App */
  app: App,
): ArticleSchema | BlogPostingSchema | WebPageSchema;
```

## 规范链接

如果你将内容部署到不同的站点，或不同 URL 下的相同内容，你可能需要在主题选项中通过 `plugins.seo.canonical` 选项为你的页面提供 “规范链接”。 你可以设置一个字符串，这样它会附加在页面路由链接之前，或者添加一个自定义函数 `(page: Page) => string | null` 返回规范链接。

::: tip 例子

如果你的站点部署在 `example.com` 的 docs 文件夹下，但同时在下列网址中可用:

- `http://example.com/docs/xxx`
- `https://example.com/docs/xxx`
- `http://www.example.com/docs/xxx`
- `https://www.example.com/docs/xxx` (首选)

要让搜索引擎结果始终是首选，你可能需要将 `canonical` 设置为 `https://www.example.com/docs/`，以便搜索引擎知道首选第四个 URL 作为索引结果。

:::

### 自定义 head 标签

有些时候你可能需要符合其他协议或按照其他搜索引擎提供的格式提供对应的 SEO 标签，此时你可以在主题选项中通过 `plugins.seo.customHead` 选项自定义 head 标签，其类型为:

```ts
function customHead(
  /** head 标签配置 */
  head: HeadConfig[],
  /** 页面对象 */
  page: Page,
  /** VuePress App */
  app: App,
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

  此插件完美支持该协议，会自动生成符合该协议的 `<meta>` 标签。

- [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)

  此插件会为文章类页面生成 NewsArticle 类标签。

- [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/)

  主题结构完美支持

- [Schema.Org](https://schema.org/)

  结构标记的 Schema 定义站点

## 相关工具

- [Google 富媒体结构测试工具](https://search.google.com/test/rich-results)

[seo]: https://ecosystem.vuejs.press/zh/plugins/seo/
[seo-config]: https://ecosystem.vuejs.press/zh/plugins/seo/config.html
