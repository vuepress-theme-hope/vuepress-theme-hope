---
title: SEO
icon: config
category:
  - Advanced
tag:
  - Advanced
  - SEO
---

`vuepress-theme-hope` provides SEO enhancements via built-in [`vuepress-plugin-seo2`][seo2].

In order to make the plugin work better, you may need to check the [page config](../../config/page.md#information) and configure them properly.

::: info

`vuepress-theme-hope` provides `seo` options in `themeConfig.plugins` as plugin options to `vuepress-plugin-seo2`.

:::

The plugin will make your site fully support [Open Content Protocol OGP](https://ogp.me/) and [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/) to fully enhance the SEO of the site.

If you don’t need this plugin, please set `themeConfig.plugins.seo` to `false`.

<!-- more -->

## Out of box

The plugin works out of the box. Without any config, it will extract information from the page content as much as possible to complete the necessary tags required by OGP and JSON-LD.

By default, the plugin will read the SiteConfig, ThemeConfig and page frontmatter to automatically generate tags as much as possible. Such as site name, page title, page type, writing date, last update date, and article tags are all automatically generated.

The following are the `<meta>` tags and their values that will be injected into `<head>` by default:

### Default OGP Generation

The following are the `<meta>` tags and their value injected into `<head>` by default to satisfy OGP:

|        Meta Name         |                                                      Value                                                       |
| :----------------------: | :--------------------------------------------------------------------------------------------------------------: |
|         `og:url`         |                                         `themeConfig.hostname` + `path`                                          |
|      `og:site_name`      |                                                `siteConfig.title`                                                |
|        `og:title`        |                                                   `page.title`                                                   |
|     `og:description`     |     `page.frontmatter.description` \|\| auto generated (when `autoDescription` is `true` in plugin options)      |
|        `og:type`         |                                                   `"article"`                                                    |
|        `og:image`        | `themeConfig.hostname` + `page.frontmatter.image` \|\|first image in page \|\| `fallbackImage` in plugin options |
|    `og:updated_time`     |                                              `page.git.updateTime`                                               |
|       `og:locale`        |                                                   `page.lang`                                                    |
|  `og:locale:alternate`   |                                Other languages including in `themeConfig.locales`                                |
|      `twitter:card`      |                            `"summary_large_image"` (only available when image found)                             |
|   `twitter:image:alt`    |                                  `page.title` (only available when image found)                                  |
|     `article:author`     |                               `page.frontmatter.author` \|\| `themeConfig.author`                                |
|      `article:tag`       |                               `page.frontmatter.tags` \|\| `page.frontmatter.tag`                                |
| `article:published_time` |                               `page.frontmatter.date` \|\| `page.createTimeStamp`                                |
| `article:modified_time`  |                                              `page.git.updatedTime`                                              |

### Default JSON-LD Generation

|  Property Name  |                                                   Value                                                   |
| :-------------: | :-------------------------------------------------------------------------------------------------------: |
|   `@context`    |                                          `"https://schema.org"`                                           |
|     `@type`     |                                              `"NewsArticle"`                                              |
|   `headline`    |                                               `page.title`                                                |
|     `image`     | image in page \|\| `themeConfig.hostname` + `page.frontmatter.image` \|\| `siteFavIcon` in plugin options |
| `datePublished` |                            `page.frontmatter.date` \|\| `page.createTimeStamp`                            |
| `dateModified`  |                                          `page.git.updatedTime`                                           |
|    `author`     |                            `page.frontmatter.author` \|\| `themeConfig.author`                            |

## Free customization

You can configure the `head` option in the page’s frontmatter to add specific tags to the page `<head>` to enhance SEO.
For example:

```md
---
head:
  - - meta
    - name: keywords
      content: SEO plugin
---
```

Will automatically inject `<meta name="keywords" content="SEO plugin" />`.

## Customize Generation

The plugin also gives you full control over the build logic.

### Page Type

For most pages, there are basically only two types: articles and website, so the plugin provides the `isArticle` option to allow you to provide logic for identifying articles.

The option accepts a function in the format `(page: Page) => boolean`, by default all non-home pages generated from Markdown files are treated as articles.

::: note

If a page does fit into the "unpopular" genre like books, music, etc., you can handle them by setting the three options below.

:::

### ogp

You can use options `ogp` in `themeConfig.plugins.seo to pass in a function to modify the default OGP object to your needs and return it.

```ts
function ogp<ExtendObject = Record<string, unknown>>(
   /** OGP Object inferred by plugin */
 ogp: SeoContent,
  /** Page Objext */
  page: ExtendPage<ExtendObject>,
  /** VuePress App */
  app: App
) => SeoContent;
```

For detailed parameter structure, see [Config][seo2-config].

For example, if you are using a third-party theme and set a `banner` in frontmatter for each article according to the theme requirements, then you can pass in the following `ogp`:

```ts
({
  ogp: (ogp, page) => ({
    ...ogp,
    "og:image": page.frontmatter.banner || ogp["og:image"],
  }),
});
```

### JSON-LD

Like OGP, you can use `jsonLd` options in `themeConfig.plugins.seo` to pass in a function to modify the default JSON-LD object to your needs and return it.

```ts
function jsonLd<ExtendObject = Record<string, unknown>>(
  /** JSON-LD Object inferred by plugin */
  jsonLD: ArticleJSONLD | null,
  /** Page Objext */
  page: ExtendPage<ExtendObject>,
  /** VuePress App */
  app: App
): ArticleJSONLD | null;
```

::: warning

Please note that the plugin does not generate JSON-LD for non-article pages, so the first parameter of the function may be null.

:::

### customHead

Sometimes you may need to fit other protocols or provide the corresponding SEO tags in the format provided by other search engines. In this case, you can use the `customHead` option in `themeConfig.plugins.seo`, whose type is:

```ts
function customHead<ExtendObject = Record<string, unknown>>(
  head: HeadConfig[],
  /** Page Objext */
  page: ExtendPage<ExtendObject>,
  /** VuePress App */
  app: App
): void;
```

You should modify the `head` array in this function directly

## RDFa 1.1

The theme adds rich media structure support to most of the site structure by following [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/).

::: tip

You can use [Google Rich Media Structure Test Tool](https://search.google.com/test/rich-results) to test this site.

:::

## SEO Introduction

**S**earch **e**ngine **optimization** (SEO) is the process of improving the quality and quantity of site traffic to a site or a web page from search engines. SEO targets unpaid traffic (known as "natural" or "organic" results) rather than direct traffic or paid traffic. Unpaid traffic may originate from different kinds of searches, including image search, video search, academic search, news search, and industry-specific vertical search engines.

As an internet marketing strategy, SEO considers how search engines work, the computer-programmed algorithms that dictate search engine behavior, what people search for, the actual search terms or keywords typed into search engines, and which search engines are preferred by their targeted audience. SEO is performed because a site will receive more visitors from a search engine when sites rank higher on the search engine results page (SERP). These visitors can then potentially be converted into customers.

## Related documents

- [Open Content Protocol OGP](https://ogp.me/) (**O**pen **G**raph **Pr**otocal)

  SEO plugin perfectly supports this protocol and will automatically generate `<meta>` tags that conform to the protocol.

- [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)

  SEO will generate "NewsArticle" scheme for article pages.

- [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/)

  `vuepress-theme-hope` support this

- [Schema.Org](https://schema.org/)

  Schema definition site for structural markup

## Related tools

- [Google Rich Media Structure Test Tool](https://search.google.com/test/rich-results)

[seo2]: https://vuepress-theme-hope.github.io/v2/seo/
[seo2-config]: https://vuepress-theme-hope.github.io/v2/seo/config.html
