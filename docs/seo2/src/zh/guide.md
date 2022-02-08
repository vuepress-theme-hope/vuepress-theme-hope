---
title: 指南
icon: guide
---

本插件会通过注入 `<meta>` 标签，以增强网站搜索引擎优化性。

## 开箱即用

插件开箱即用，在不做任何配置的情况下，会尽可能通过页面内容，提取对应的信息生成 `<meta>` 标签。

默认情况下，插件会读取站点配置、主题配置与页面的 frontmatter 来尽可能自动为生成 `<meta>` 标签。诸如站点名称，页面标题，页面类型，写作日期，最后更新日期，文章标签均会自动生成。

以下是会被默认注入到 `<head>` 中的 `<meta>` 标签及其值:

|         属性名称         |                                        值                                        |
| :----------------------: | :------------------------------------------------------------------------------: |
|         `og:url`         |                         `themeConfig.hostname` + `path`                          |
|      `og:site_name`      |                                  `$site.title`                                   |
|        `og:title`        |                                   `page.title`                                   |
|     `og:description`     |                          `page.frontmatter.description`                          |
|        `og:type`         |                                   `'article'`                                    |
|        `og:image`        |                `themeConfig.hostname` + `page.frontmatter.image`                 |
|    `og:updated_time`     |                              `page.updateTimeStamp`                              |
|       `og:locale`        |                              `page._computed.$lang`                              |
|  `og:locale:alternate`   |                      `$themeConfig.locales` 包含的其他语言                       |
|      `twitter:card`      |                             `'summary_large_image'`                              |
|   `twitter:image:alt`    |                                  `$site.title`                                   |
|     `article:author`     |               `page.frontmatter.author` \|\| `themeConfig.author`                |
|      `article:tag`       |               `page.frontmatter.tags` \|\| `page.frontmatter.tag`                |
| `article:published_time` | `page.frontmatter.time` \|\| `page.frontmatter.date` \|\| `page.createTimeStamp` |
| `article:modified_time`  |                              `page.updateTimeStamp`                              |

## 自由定制

你可以在页面的 frontmatter 中配置 `meta` 选项，自主定制特定页面用于 SEO 的 `<meta>` 标签内容。

如:

```md
---
meta:
  - name: keywords
    content: SEO plugin
---
```

会自动注入 `<meta name="keywords" content="SEO plugin" />`。

## 自定义生成过程

本插件也支持你完全控制 `<meta>` 标签的生成逻辑。

### seo

你可以使用插件选项的 `seo` 传入一个函数来注入新的 `<meta>` 标签或覆盖掉 [开箱即用](#开箱即用) 部分的默认生成内容。你需要按照 `<property>: <content>` 的格式来返回一个对象。

比如你返回了 `{ 'og:url': 'google.com', 'og:image': 'google.com/logo.jpg' }`，则插件会注入以下内容到 `<head>` 中:

```html
<meta property="og:url" content="google.com" />
<meta property="og:image" content="google.com/logo.jpg" />
```

### customMeta

当你需要注入的 `<meta>` 没有使用 `property` 和 `content`，或者你想要移除已有的 meta，你可以向插件选项 `customMeta` 传入一个自定义生成函数，完全定制 `<meta>` 标签。

`customMeta` 的结构为 `(meta: Meta[], info: PageSeoInfo) => void`

`PageSeoInfo` 的结构如下:

```ts
interface PageSeoInfo {
  /** 当前页面对象 */
  page: Page;
  /** Vuepress 配置  */
  site: SiteConfig;
  /** 主题配置 */
  themeConfig: ThemeConfig | Record<string, never>;
  /** 站点支持的语言 */
  locale: string[];
  /** 当前页面路径 */
  path: string;
}
```

`Meta` 的类型为 `Record<"content" | "name" | "charset" | "http-equiv", string>`，对象的键会渲染为 `<meta>` 标签的属性，值会渲染为对应属性的值。

比如:

```js
(meta: Meta, info: PageSeoInfo) => {
  const index = meta.findIndex((item) => item.property === "og:type");

  if (index !== -1) meta.splice(index, 1);

  meta.push({ a: "1", b: "2" });
};
```

会向当前页面的 `<head>` 注入 `<meta a="1" b="2" />`，并移除任何已存在的 `<meta property="og:type" />`。

## SEO 介绍

搜索引擎优化 (**S**earch **E**ngine **O**ptimization)，是一种透过了解搜索引擎的运作规则来调整网站，以及提高目的网站在有关搜索引擎内排名的方式。由于不少研究发现，搜索引擎的用户往往只会留意搜索结果最前面的几个条目，所以不少网站都希望透过各种形式来影响搜索引擎的排序，让自己的网站可以有优秀的搜索排名。 所谓“针对搜索引擎作最优化的处理”，是指为了要让网站更容易被搜索引擎接受。搜索引擎会将网站彼此间的内容做一些相关性的资料比对，然后再由浏览器将这些内容以最快速且接近最完整的方式，呈现给搜索者。搜索引擎优化就是通过搜索引擎的规则进行优化，为用户打造更好的用户体验，最终的目的就是做好用户体验。

## 相关文档

- [开放内容协议 OGP](https://ogp.me/) (**O**pen **G**raph **Pr**otocal)

  本插件完美支持该协议，会自动生成符合该协议的 `<meta>` 标签。

- [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)

  由于 VuePress 未提供插件或主题向 SSR 渲染内容的 `<head>` 标签注入 `<script>` 的能力，所以 JSON-LD 无法实现。

- [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/)

  RDFa 主要标记 HTML 结构。这是插件无法支持的内容，[vuepress-theme-hope](https://vuepress-theme-hope.github.io/zh/) 使用了这一功能通过了谷歌的富媒体结构测试。你可以考虑搭配使用。

- [Schema.Org](https://schema.org/)

  结构标记的 Schema 定义站点

## 相关工具

你可以使用 [Google 富媒体结构测试工具](https://search.google.com/test/rich-results) 测试本站点。
