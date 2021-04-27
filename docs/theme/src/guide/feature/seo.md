---
title: SEO
icon: config
category: feature
tags:
  - feature
  - seo
---

`vuepress-theme-hope` provide SEO enhancement by includeing [`@mr-hope/vuepress-plugin-seo`](https://vuepress-theme-hope.github.io/seo/).

To make the plugin work better, you may need to look at [Page Information Configuration](../../config/page.md#page-information-configuration) and configure them reasonably.

If you don’t need this plugin, please set `themeConfig.seo` to `false`.

::: info SEO Intro

**S**earch **e**ngine **optimization** (SEO) is the process of improving the quality and quantity of site traffic to a site or a web page from search engines. SEO targets unpaid traffic (known as "natural" or "organic" results) rather than direct traffic or paid traffic. Unpaid traffic may originate from different kinds of searches, including image search, video search, academic search, news search, and industry-specific vertical search engines.

As an internet marketing strategy, SEO considers how search engines work, the computer-programmed algorithms that dictate search engine behavior, what people search for, the actual search terms or keywords typed into search engines, and which search engines are preferred by their targeted audience. SEO is performed because a site will receive more visitors from a search engine when sites rank higher on the search engine results page (SERP). These visitors can then potentially be converted into customers.

:::

## Out of box

The plugin is used out of the box. Without any configuration, it will extract the corresponding information from the page content to generate the `<meta>` tag as much as possible.

By default, the plugin will read the site configuration, theme configuration and page frontmatter to automatically generate `<meta>` tags as much as possible. Such as site name, page title, page type, writing date, last update date, and article tags are all automatically generated.

The following are the `<meta>` tags and their values that will be injected into `<head>` by default:

|         property         |                                     content                                      |
| :----------------------: | :------------------------------------------------------------------------------: |
|         `og:url`         |                         `themeConfig.hostname` + `path`                          |
|      `og:site_name`      |                                  `$site.title`                                   |
|        `og:title`        |                                   `page.title`                                   |
|     `og:description`     |                          `page.frontmatter.description`                          |
|        `og:type`         |                                   `'article'`                                    |
|        `og:image`        |                `themeConfig.hostname` + `page.frontmatter.image`                 |
|    `og:updated_time`     |                             `page.updatedTimeStamp`                              |
|       `og:locale`        |                              `page._computed.$lang`                              |
|  `og:locale:alternate`   |               Other languages including in `$themeConfig.locales`                |
|      `twitter:card`      |                             `'summary_large_image'`                              |
|   `twitter:image:alt`    |                                  `$site.title`                                   |
|     `article:author`     |               `page.frontmatter.author` \|\| `themeConfig.author`                |
|      `article:tag`       |               `page.frontmatter.tags` \|\| `page.frontmatter.tag`                |
| `article:published_time` | `page.frontmatter.time` \|\| `page.frontmatter.date` \|\| `page.createTimeStamp` |
| `article:modified_time`  |                             `page.updatedTimeStamp`                              |

## Free customization

You can configure the `meta` option in the frontmatter of the page to customize the content of the `<meta>` tag of a specific page for SEO.

For example:

```md
---
meta:
  - name: keywords
    content: SEO plugin
---
```

Will automatically inject `<meta name="keywords" content="SEO plugin" />`.

## Customize generation process

You can pass a function to `themeConfig.seo.seo` to inject a new `<meta>` tag or override the default generated content in the [Out of box](#out-of-box) section. You need to return an object in the format of `<property>: <content>`.

For example, if you return `{'og:url':'google.com','og:image':'google.com/logo.jpg' }`, the plugin will inject the following content into `<head>`:

```html
<meta property="og:url" content="google.com" />
<meta property="og:image" content="google.com/logo.jpg" />
```

When the `<meta>` you need to inject does not use `property` and `content`, or you want to remove the existing meta, you can pass in a custom generation function to `themeConfig.seo.customMeta` to fully customize the `<meta>` tag .

The structure of `customMeta` is `(meta: Meta[], info: PageSeoInfo) => void`

Interface of `PageSeoInfo`:

```ts
interface PageSeoInfo {
  /** Current Page Object */
  page: Page;
  /** Vuepress Config  */
  site: SiteConfig;
  /** Current ThemeConfig */
  themeConfig: ThemeConfig | Record<string, never>;
  /** langs which are supported */
  locale: string[];
  /** Current page path */
  path: string;
}
```

The type of `Meta` is `Record<"content" | "name" | "charset" | "http-equiv", string>`, the key of the object will be rendered as the attribute of the `<meta>` tag, and the value will be rendered as The value of the corresponding attribute.

For example:

```js
(meta: Meta, info: PageSeoInfo) => {
  const index = meta.findIndex((item) => item.property === "og:type");

  if (index !== -1) meta.splice(index, 1);

  meta.push({ a: "1", b: "2" });
};
```

Will inject `<meta a="1" b="2" />` into the `<head>` of the current page, and remove any existing `<meta property="og:type" />`.

## RDFa 1.1

The theme adds rich media structure support to most of the site structure by following [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/).

::: tip

You can use [Google Rich Media Structure Test Tool](https://search.google.com/test/rich-results?url=https%3A%2F%2Fvuepress-theme-hope.github.io%2Fguide%2Ffeature%2Fseo%2F&user_agent=1) to test this site.

:::
