---
title: Guide
icon: guide
---

This plugin will make your site fully support [Open Content Protocol OGP](https://ogp.me/) and [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/) to fully enhance the SEO of the site.

## Out of box

The plugin works out of the box. Without any config, it will extract information from the page content as much as possible to complete the necessary tags required by OGP and JSON-LD.

By default, the plugin will read the SiteConfig, ThemeConfig and page frontmatter to automatically generate tags as much as possible. Such as site name, page title, page type, writing date, last update date, and article tags are all automatically generated.

The following are the `<meta>` tags and their values that will be injected into `<head>` by default:

### Default OGP Generation

The following are the `<meta>` tags and their value injected into `<head>` by default to satisfy OGP:

|        Meta Name         |                        Value                        |
| :----------------------: | :-------------------------------------------------: |
|         `og:url`         |           `themeConfig.hostname` + `path`           |
|      `og:site_name`      |                 `siteConfig.title`                  |
|        `og:title`        |                    `page.title`                     |
|     `og:description`     |           `page.frontmatter.description`            |
|        `og:type`         |                     `'article'`                     |
|        `og:image`        |  `themeConfig.hostname` + `page.frontmatter.image`  |
|    `og:updated_time`     |                `page.git.updateTime`                |
|       `og:locale`        |                     `page.lang`                     |
|  `og:locale:alternate`   | Other languages including in `themeConfig.locales`  |
|      `twitter:card`      |               `'summary_large_image'`               |
|   `twitter:image:alt`    |                 `siteConfig.title`                  |
|     `article:author`     | `page.frontmatter.author` \|\| `themeConfig.author` |
|      `article:tag`       | `page.frontmatter.tags` \|\| `page.frontmatter.tag` |
| `article:published_time` | `page.frontmatter.date` \|\| `page.createTimeStamp` |
| `article:modified_time`  |               `page.git.updatedTime`                |

### Default JSON-LD Generation

|  Property Name  |                        Value                        |
| :-------------: | :-------------------------------------------------: |
|   `@context`    |               `"https://schema.org"`                |
|     `@type`     |                   `"NewsArticle"`                   |
|   `headline`    |                    `page.title`                     |
|     `image`     |  `themeConfig.hostname` + `page.frontmatter.image`  |
| `datePublished` | `page.frontmatter.date` \|\| `page.createTimeStamp` |
| `dateModified`  |               `page.git.updatedTime`                |
|    `author`     | `page.frontmatter.author` \|\| `themeConfig.author` |

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

You can use the plugin options `ogp` to pass in a function to modify the default OGP object to your needs and return it.

```ts
function ogp<ExtendObject = Record<string, unknown>>(
  /** OGP Object inferred by plugin */
  ogp: SeoContent,
  /** SEO Infomation, including App, Current page and permalink */
  info: PageSeoInfo<ExtendObject>
): SeoContent;
```

For detailed parameter structure, see [Config](./config.md).

For example, if you are using a third-party theme and set a `banner` in frontmatter for each article according to the theme requirements, then you can pass in the following `ogp`:

```ts
({
  ogp: (ogp, { page }) => ({
    ...ogp,
    "og:image": page.frontmatter.banner || ogp["og:image"],
  }),
});
```

### JSON-LD

Like OGP, you can use the plugin options `jsonLd` to pass in a function to modify the default JSON-LD object to your needs and return it.

```ts
function jsonLd<ExtendObject = Record<string, unknown>>(
  /** JSON-LD Object inferred by plugin */
  jsonLD: ArticleJSONLD | null,
  /** SEO Infomation, including App, Current page and permalink */
  info: PageSeoInfo<ExtendObject>
): ArticleJSONLD | null;
```

::: warning

Please note that the plugin does not generate JSON-LD for non-article pages, so the first parameter of the function may be null.

:::

### customHead

Sometimes you may need to fit other protocols or provide the corresponding SEO tags in the format provided by other search engines. In this case, you can use the `customHead` option, whose type is:

```ts
function customHead<ExtendObject = Record<string, unknown>>(
  head: HeadConfig[],
  info: PageSeoInfo<ExtendObject>
): void;
```

You should modify the `head` array in this function directly

## SEO Introduction

**S**earch **e**ngine **optimization** (SEO) is the process of improving the quality and quantity of site traffic to a site or a web page from search engines. SEO targets unpaid traffic (known as "natural" or "organic" results) rather than direct traffic or paid traffic. Unpaid traffic may originate from different kinds of searches, including image search, video search, academic search, news search, and industry-specific vertical search engines.

As an internet marketing strategy, SEO considers how search engines work, the computer-programmed algorithms that dictate search engine behavior, what people search for, the actual search terms or keywords typed into search engines, and which search engines are preferred by their targeted audience. SEO is performed because a site will receive more visitors from a search engine when sites rank higher on the search engine results page (SERP). These visitors can then potentially be converted into customers.

## Related documents

- [Open Content Protocol OGP](https://ogp.me/) (**O**pen **G**raph **Pr**otocal)

  This plugin perfectly supports this protocol and will automatically generate `<meta>` tags that conform to the protocol.

- [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)

  This plugin will generate "NewsArticle" scheme for article pages.

- [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/)

  RDFa mainly marks HTML structure. This is what the plugin cannot support. [vuepress-theme-hope](https://vuepress-theme-hope.github.io/v2/) uses this feature to pass Google’s rich media structure test. You can consider using it.

- [Schema.Org](https://schema.org/)

  Schema definition site for structural markup

## Related tools

You can use [Google Rich Media Structure Test Tool](https://search.google.com/test/rich-results) to test this site.
