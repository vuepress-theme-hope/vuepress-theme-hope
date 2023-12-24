---
title: SEO
icon: dumbbell
order: 1
category:
  - Advanced
tag:
  - Advanced
  - SEO
---

`vuepress-theme-hope` provides SEO enhancements via built-in <ProjectLink name="seo2">`vuepress-plugin-seo2`</ProjectLink>.

To make the plugin work better, you may need to check the [page config](../../config/frontmatter/info.md) and configure them properly.

::: info

`vuepress-theme-hope` passes `plugins.seo` in theme options as plugin options to `vuepress-plugin-seo2`.

:::

The plugin will make your site fully support [Open Content Protocol OGP](https://ogp.me/) and [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/) to enhance the SEO of the site.

If you don't need this plugin, please set `plugins.seo` to `false` in theme options.

<!-- more -->

## Out of Box

The plugin works out of the box. Without any config, it will extract information from the page content as much as possible to complete the necessary tags required by OGP and JSON-LD.

By default, the plugin will read the site config and page frontmatter to automatically generate tags as much as possible. Such as site name, page title, page type, writing date, last update date, and article tags are all automatically generated.

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
|    `og:updated_time`     |                                              `page.git.updatedTime`                                              |
|       `og:locale`        |                                                   `page.lang`                                                    |
|  `og:locale:alternate`   |                                 Other languages including in `siteData.locales`                                  |
|      `twitter:card`      |                            `"summary_large_image"` (only available when image found)                             |
|   `twitter:image:alt`    |                                  `page.title` (only available when image found)                                  |
|     `article:author`     |                               `page.frontmatter.author` \|\| `themeConfig.author`                                |
|      `article:tag`       |                               `page.frontmatter.tags` \|\| `page.frontmatter.tag`                                |
| `article:published_time` |                               `page.frontmatter.date` \|\| `page.git.createdTime`                                |
| `article:modified_time`  |                                              `page.git.updatedTime`                                              |

### Default JSON-LD Generation

|  Property Name  |                                                   Value                                                   |
| :-------------: | :-------------------------------------------------------------------------------------------------------: |
|   `@context`    |                                          `"https://schema.org"`                                           |
|     `@type`     |                                              `"NewsArticle"`                                              |
|   `headline`    |                                               `page.title`                                                |
|     `image`     | image in page \|\| `themeConfig.hostname` + `page.frontmatter.image` \|\| `siteFavIcon` in plugin options |
| `datePublished` |                            `page.frontmatter.date` \|\| `page.git.createdTime`                            |
| `dateModified`  |                                          `page.git.updatedTime`                                           |
|    `author`     |                            `page.frontmatter.author` \|\| `themeConfig.author`                            |

## Setting Tags Directly

You can configure the `head` option in the page's frontmatter to add specific tags to the page `<head>` to enhance SEO.
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

### OGP

You can use options `plugins.seo.ogp` in theme options. To pass in a function to modify the default OGP object to your needs and return it.

```ts
function ogp<
  ExtraPageData extends Record<string, unknown> = Record<never, never>,
  ExtraPageFrontmatter extends Record<string, unknown> = Record<
    string,
    unknown
  >,
  ExtraPageFields extends Record<string, unknown> = Record<never, never>,
>(
  /** OGP Object inferred by plugin */
  ogp: SeoContent,
  /** Page Object */
  page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  /** VuePress App */
  app: App,
): SeoContent;
```

For detailed parameter structure, see <ProjectLink name="seo2" path="/config.html">config</ProjectLink>.

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

Like OGP, you can use `plugins.seo.jsonLd` options in theme options to pass in a function to modify the default JSON-LD object to your needs and return it.

```ts
function jsonLd<
  ExtraPageData extends Record<string, unknown> = Record<never, never>,
  ExtraPageFrontmatter extends Record<string, unknown> = Record<
    string,
    unknown
  >,
  ExtraPageFields extends Record<string, unknown> = Record<never, never>,
>(
  /** JSON-LD Object inferred by plugin */
  jsonLD: ArticleSchema | BlogPostingSchema | WebPageSchema,
  /** Page Object */
  page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  /** VuePress App */
  app: App,
): ArticleSchema | BlogPostingSchema | WebPageSchema;
```

## Canonical Link

If you are deploying your content to different sites, or same content under different URLs, you may need to set `plugins.seo.canonical` in theme options to provide a "Canonical Link" for your page. You can either set a string which will be prepended before page route link, or adding a custom function `(page: Page) => string | null` to return a canonical link if necessary.

::: tip Example

If your sites are deployed under docs folder in `example.com`, but available in:

- `http://example.com/docs/xxx`
- `https://example.com/docs/xxx`
- `http://www.example.com/docs/xxx`
- `https://www.example.com/docs/xxx` (primary)

To let search engine results always be the primary choice, you may need to set `plugins.seo.canonical` to `https://www.example.com/docs/`, so that search engine will know that the fourth URL is preferred to be indexed.

:::

### Customize head Tags

Sometimes you may need to fit other protocols or provide the corresponding SEO tags in the format provided by other search engines. In this case, you can use the `plugins.seo.customHead` in theme options, whose type is:

```ts
function customHead<
  ExtraPageData extends Record<string, unknown> = Record<never, never>,
  ExtraPageFrontmatter extends Record<string, unknown> = Record<
    string,
    unknown
  >,
  ExtraPageFields extends Record<string, unknown> = Record<never, never>,
>(
  /** Head tag config */
  head: HeadConfig[],
  /** Page Object */
  page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  /** VuePress App */
  app: App,
): void;
```

You should modify the `head` array in this function directly.

## RDFa 1.1

The theme adds rich media structure support to most of the site structure by following [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/).

::: tip

You can use [Google Rich Media Structure Test Tool](https://search.google.com/test/rich-results) to test this site.

:::

## SEO Introduction

**S**earch **e**ngine **optimization** (SEO) is the process of improving the quality and quantity of site traffic to a site or a web page from search engines. SEO targets unpaid traffic (known as "natural" or "organic" results) rather than direct traffic or paid traffic. Unpaid traffic may originate from different kinds of searches, including image search, video search, academic search, news search, and industry-specific vertical search engines.

As an internet marketing strategy, SEO considers how search engines work, the computer-programmed algorithms that dictate search engine behavior, what people search for, the actual search terms or keywords typed into search engines, and which search engines are preferred by their targeted audience. SEO is performed because a site will receive more visitors from a search engine when sites rank higher on the search engine results page (SERP). These visitors can then potentially be converted into customers.

## Related Documents

- [Open Content Protocol OGP](https://ogp.me/) (**O**pen **G**raph **Pr**otocal)

  SEO plugin perfectly supports this protocol and will automatically generate `<meta>` tags that conform to the protocol.

- [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)

  SEO will generate "NewsArticle" scheme for article pages.

- [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/)

  `vuepress-theme-hope` support this

- [Schema.Org](https://schema.org/)

  Schema definition site for structural markup

## Related Tools

- [Google Rich Media Structure Test Tool](https://search.google.com/test/rich-results)
