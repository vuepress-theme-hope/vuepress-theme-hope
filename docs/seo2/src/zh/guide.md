---
title: 指南
icon: lightbulb
---

本插件会通过向网站 `<head>` 注入标签，让你的网站完全支持 [开放内容协议 OGP](https://ogp.me/) 和 [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)，以全面增强站点的搜索引擎优化性。

<!-- more -->

## 开箱即用

插件开箱即用，在不做任何配置的情况下，会尽可能通过页面内容，提取对应的信息补全 OGP 与 JSON-LD 所需的必要标签。

默认情况下，插件会读取站点配置、主题配置与页面的 frontmatter 来尽可能自动生成。诸如站点名称，页面标题，页面类型，写作日期，最后更新日期，文章标签均会自动生成。

### 默认的 OGP 生成逻辑

|         属性名称         |                                                 值                                                 |
| :----------------------: | :------------------------------------------------------------------------------------------------: |
|         `og:url`         |                                    `options.hostname` + `path`                                     |
|      `og:site_name`      |                                         `siteConfig.title`                                         |
|        `og:title`        |                                            `page.title`                                            |
|     `og:description`     |    `page.frontmatter.description` \|\| 自动生成 (当插件选项中的 `autoDescription` 为 `true` 时)    |
|        `og:type`         |                                            `"article"`                                             |
|        `og:image`        | `options.hostname` + `page.frontmatter.image` \|\| 页面的第一张图片\|\| 插件选项的 `fallbackImage` |
|    `og:updated_time`     |                                       `page.git.updatedTime`                                       |
|       `og:locale`        |                                            `page.lang`                                             |
|  `og:locale:alternate`   |                                 `siteData.locales` 包含的其他语言                                  |
|      `twitter:card`      |                              `"summary_large_image"` (仅在找到图片时)                              |
|   `twitter:image:alt`    |                                   `page.title` (仅在找到图片时)                                    |
|     `article:author`     |                          `page.frontmatter.author` \|\| `options.author`                           |
|      `article:tag`       |                        `page.frontmatter.tags` \|\| `page.frontmatter.tag`                         |
| `article:published_time` |                        `page.frontmatter.date` \|\| `page.git.createdTime`                         |
| `article:modified_time`  |                                       `page.git.updatedTime`                                       |

### 默认的 JSON-LD 生成逻辑

|     属性名      |                               值                               |
| :-------------: | :------------------------------------------------------------: |
|   `@context`    |                     `"https://schema.org"`                     |
|     `@type`     |                        `"NewsArticle"`                         |
|   `headline`    |                          `page.title`                          |
|     `image`     | 页面中的图片\|\| `options.hostname` + `page.frontmatter.image` |
| `datePublished` |      `page.frontmatter.date` \|\| `page.git.createdTime`       |
| `dateModified`  |                     `page.git.updatedTime`                     |
|    `author`     |        `page.frontmatter.author` \|\| `options.author`         |

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

本插件也支持你完全控制生成逻辑。

### 页面类型

对于大多数页面，基本只有文章和网页两种类型，所以插件提供了 `isArticle` 选项让你提供辨别文章的逻辑。

选项接受一个 `(page: Page) => boolean` 格式的函数，默认情况下从 Markdown 文件生成的非主页页面都会被视为文章。

::: note

如果某个网页的确符合图书、音乐之类的“冷门”类型，你可以通过设置下方三个选项处理它们。

:::

### OGP

你可以使用插件选项的 `ogp` 传入一个函数来按照你的需要修改默认 OGP 对象并返回。

```ts
function ogp<
  ExtraPageData extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >,
  ExtraPageFrontmatter extends Record<
    string | number | symbol,
    unknown
  > = Record<string, unknown>,
  ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >,
>(
  /** 插件自动推断的 OGP 对象 */
  ogp: SeoContent,
  /** 页面对象 */
  page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  /** VuePress App */
  app: App,
): SeoContent;
```

详细的参数结构详见 [配置](./config.md)。

比如你在使用某个第三方主题，并按照主题要求为每篇文章在 Front Matter 中设置了 `banner`，那你可以传入这样的 `ogp`:

```ts
({
  ogp: (ogp, page) => ({
    ...ogp,
    "og:image": page.frontmatter.banner || ogp["og:image"],
  }),
});
```

### JSON-LD

同 OGP，你可以使用插件选项的 `jsonLd` 传入一个函数来按照你的需要修改默认 JSON-LD 对象并返回。

```ts
function jsonLd<
  ExtraPageData extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >,
  ExtraPageFrontmatter extends Record<
    string | number | symbol,
    unknown
  > = Record<string, unknown>,
  ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >,
>(
  /** 插件自动推断的 JSON-LD 对象 */
  jsonLD: ArticleJSONLD | null,
  /** 页面对象 */
  page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  /** VuePress App */
  app: App,
): ArticleJSONLD | null;
```

::: warning

请注意插件不会对非文章页生成 JSON-LD，所以函数的首个参数可能为 `null`。

:::

## 规范链接

如果你将内容部署到不同的站点，或不同 URL 下的相同内容，你可能需要设置 `canonical` 选项为你的页面提供 “规范链接”。 你可以设置一个字符串，这样它会附加在页面路由链接之前，或者添加一个自定义函数 `(page: Page) => string | 如有必要，null` 返回规范链接。

::: tip 例子

如果你的站点部署在 `example.com` 的 docs 文件夹下，但同时在下列网址中可用:

- `http://example.com/docs/xxx`
- `https://example.com/docs/xxx`
- `http://www.example.com/docs/xxx`
- `https://www.example.com/docs/xxx` (首选)

要让搜索引擎结果始终是首选，你可能需要将 `canonical` 设置为 `https://www.example.com/docs/`，以便搜索引擎知道首选第四个 URL 作为索引结果。

:::

### 自定义 head 标签

有些时候你可能需要符合其他协议或按照其他搜索引擎提供的格式提供对应的 SEO 标签，此时你可以使用 `customHead` 选项，其类型为:

```ts
function customHead<
  ExtraPageData extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >,
  ExtraPageFrontmatter extends Record<
    string | number | symbol,
    unknown
  > = Record<string, unknown>,
  ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >,
>(
  head: HeadConfig[],
  /** 页面对象 */
  page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  /** VuePress App */
  app: App,
): void;
```

你应该直接修改传入的 `head` 参数。

## SEO 介绍

搜索引擎优化 (**S**earch **E**ngine **O**ptimization)，是一种透过了解搜索引擎的运作规则来调整网站，以及提高目的网站在有关搜索引擎内排名的方式。由于不少研究发现，搜索引擎的用户往往只会留意搜索结果最前面的几个条目，所以不少网站都希望透过各种形式来影响搜索引擎的排序，让自己的网站可以有优秀的搜索排名。 所谓“针对搜索引擎作最优化的处理”，是指为了要让网站更容易被搜索引擎接受。搜索引擎会将网站彼此间的内容做一些相关性的资料比对，然后再由浏览器将这些内容以最快速且接近最完整的方式，呈现给搜索者。搜索引擎优化就是通过搜索引擎的规则进行优化，为用户打造更好的用户体验，最终的目的就是做好用户体验。

## 相关文档

- [开放内容协议 OGP](https://ogp.me/) (**O**pen **G**raph **Pr**otocal)

  本插件完美支持该协议，会自动生成符合该协议的 `<meta>` 标签。

- [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)

  本插件会为文章类页面生成 NewsArticle 类标签。

- [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/)

  RDFa 主要标记 HTML 结构。这是插件无法支持的内容，<ProjectLink type="theme" name="hope" path="/zh/">vuepress-theme-hope</ProjectLink> 使用了这一功能通过了谷歌的富媒体结构测试。你可以考虑搭配使用。

- [Schema.Org](https://schema.org/)

  结构标记的 Schema 定义站点

## 相关工具

你可以使用 [Google 富媒体结构测试工具](https://search.google.com/test/rich-results) 测试本站点。
