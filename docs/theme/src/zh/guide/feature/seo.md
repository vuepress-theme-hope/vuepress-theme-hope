---
title: SEO
icon: config
category: feature
tags:
  - feature
  - seo
---

`vuepress-theme-hope` 通过内置 [`@mr-hope/vuepress-plugin-seo`](https://vuepress-theme-hope.github.io/seo/zh/) 为提供 SEO 增强功能。

为了使插件能够更好的工作，可能需要查看一下 [页面信息配置](../../config/page.md#页面信息配置) 并合理的配置它们。

如果不需要这个插件，请设置 `themeConfig.seo` 为 `false`。

::: info SEO 介绍

搜索引擎优化 (**S**earch **E**ngine **O**ptimization)，是一种透过了解搜索引擎的运作规则来调整网站，以及提高目的网站在有关搜索引擎内排名的方式。由于不少研究发现，搜索引擎的用户往往只会留意搜索结果最前面的几个条目，所以不少网站都希望透过各种形式来影响搜索引擎的排序，让自己的网站可以有优秀的搜索排名。 所谓“针对搜索引擎作最优化的处理”，是指为了要让网站更容易被搜索引擎接受。搜索引擎会将网站彼此间的内容做一些相关性的资料比对，然后再由浏览器将这些内容以最快速且接近最完整的方式，呈现给搜索者。搜索引擎优化就是通过搜索引擎的规则进行优化，为用户打造更好的用户体验，最终的目的就是做好用户体验。

:::

## 开箱即用

插件会向网页的 `<head>` 注入一些 `<meta>` 标签，使的网页对搜索引擎和社交媒体更加友好。

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

你可以向 `themeConfig.seo.seo` 传入一个函数来注入新的 `<meta>` 标签或覆盖默认生成内容。你需要按照 `<property>: <content>` 的格式来返回一个对象。

比如你返回了 `{ 'og:url': 'google.com', 'og:image': 'google.com/logo.jpg' }`，则插件会注入以下内容到 `<head>` 中:

```html
<meta property="og:url" content="google.com" />
<meta property="og:image" content="google.com/logo.jpg" />
```

当你需要注入的 `<meta>` 没有使用 `property` 和 `content`，或者你想要移除已有的 meta，你可以向 `themeConfig.seo.customMeta` 传入一个自定义生成函数，完全定制 `<meta>` 标签。

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

## RDFa 1.1

主题通过遵循 [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/)，为网站的大部分结构添加了富媒体结构支持。

::: tip

你可以使用 [Google 富媒体结构测试工具](https://search.google.com/test/rich-results?url=https%3A%2F%2Fvuepress-theme-hope.github.io%2Fzh%2Fguide%2Ffeature%2Fseo%2F&user_agent=1) 测试本站点。

:::
