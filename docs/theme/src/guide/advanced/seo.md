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

`vuepress-theme-hope` provides SEO enhancements via the built-in [`@vuepress/plugin-seo`][seo].

::: info
Configure the plugin via the `plugins.seo` option in the theme options. To disable this feature, set `plugins.seo` to `false`.
:::

<!-- more -->

## Default Behavior

The plugin operates out of the box. It extracts page content, site configuration, theme configuration, and page Frontmatter to automatically generate[Open Graph Protocol (OGP)](https://ogp.me/) and [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/) tags.

### Default OGP Generation

|        Meta Name         |                                              Value                                              |
| :----------------------: | :---------------------------------------------------------------------------------------------: |
|         `og:url`         |                                 `themeConfig.hostname` + `path`                                 |
|      `og:site_name`      |                                       `siteConfig.title`                                        |
|        `og:title`        |                                          `page.title`                                           |
|     `og:description`     |      `page.frontmatter.description` \|\| auto-generated (when `autoDescription` is `true`)      |
|        `og:type`         |                                           `"article"`                                           |
|        `og:image`        | `themeConfig.hostname` + `page.frontmatter.image` \|\| first image in page \|\| `fallbackImage` |
|    `og:updated_time`     |                                     `page.git.updatedTime`                                      |
|       `og:locale`        |                                           `page.lang`                                           |
|  `og:locale:alternate`   |                         Other languages included in `siteData.locales`                          |
|      `twitter:card`      |                            `"summary_large_image"` (if image exists)                            |
|   `twitter:image:alt`    |                                 `page.title` (if image exists)                                  |
|     `article:author`     |                       `page.frontmatter.author` \|\| `themeConfig.author`                       |
|      `article:tag`       |                       `page.frontmatter.tags` \|\| `page.frontmatter.tag`                       |
| `article:published_time` |                       `page.frontmatter.date` \|\| `page.git.createdTime`                       |
| `article:modified_time`  |                                     `page.git.updatedTime`                                      |

### Default JSON-LD Generation

|  Property Name  |                                           Value                                            |
| :-------------: | :----------------------------------------------------------------------------------------: |
|   `@context`    |                                   `"https://schema.org"`                                   |
|     `@type`     |                                      `"NewsArticle"`                                       |
|   `headline`    |                                        `page.title`                                        |
|     `image`     | images in page \|\| `themeConfig.hostname` + `page.frontmatter.image` \|\| `fallbackImage` |
| `datePublished` |                    `page.frontmatter.date` \|\| `page.git.createdTime`                     |
| `dateModified`  |                                   `page.git.updatedTime`                                   |
|    `author`     |                    `page.frontmatter.author` \|\| `themeConfig.author`                     |

## Setting Tags Directly

Configure the `head` option in the page Frontmatter to inject specific tags into the page `<head>`.

```md
---
head:
  - - meta
    - name: keywords
      content: SEO plugin
---
```

This configuration outputs: `<meta name="keywords" content="SEO plugin" />`.

## Customizing Generation

### Page Type Resolution

By default, all non-home pages generated from Markdown files are treated as articles. Use the `plugins.seo.isArticle` option to provide custom logic for identifying articles.

```ts
(page: Page) => boolean;
```

::: note
For non-article content types (e.g., books, music), handle the custom data generation via the `ogp`, `jsonLd`, and `customHead` options below.
:::

### OGP Customization

Use `plugins.seo.ogp` to mutate the default OGP object before output.

```ts
function ogp(
  /** OGP Object inferred by plugin */
  ogp: SeoContent,
  /** Page Object */
  page: Page,
  /** VuePress App */
  app: App,
): SeoContent;
```

Example usage for overriding the `og:image` property with a custom `banner` field from Frontmatter:

```ts
seoPlugin({
  ogp: (ogp, page) => ({
    ...ogp,
    "og:image": page.frontmatter.banner || ogp["og:image"],
  }),
});
```

### JSON-LD Customization

Use `plugins.seo.jsonLd` to mutate the default JSON-LD object.

```ts
function jsonLd(
  /** JSON-LD Object inferred by plugin */
  jsonLD: ArticleSchema | BlogPostingSchema | WebPageSchema,
  /** Page Object */
  page: Page,
  /** VuePress App */
  app: App,
): ArticleSchema | BlogPostingSchema | WebPageSchema;
```

### Canonical Link

To specify the primary URL for content deployed across multiple domains or paths, set `plugins.seo.canonical`. Pass a string to prepend a base URL, or a function `(page: Page) => string | null` for programmatic control.

::: tip
If your site is accessible via `http://example.com/docs/` and `https://www.example.com/docs/` (primary), setting `plugins.seo.canonical` to `https://www.example.com/docs/` instructs search engines to index the primary URL exclusively.
:::

### Custom `<head>` Tags

Use `plugins.seo.customHead` to manually modify the `<head>` tags array. This is useful for fulfilling search engine specific requirements.

```ts
function customHead(
  /** Head tag config */
  head: HeadConfig[],
  /** Page Object */
  page: Page,
  /** VuePress App */
  app: App,
): void;
```

## RDFa 1.1 Support

The theme implements rich media structure support following the[RDFa 1.1](https://www.w3.org/TR/rdfa-primer/) specification.

::: tip
Verify the structured data of your site using the [Google Rich Results Test](https://search.google.com/test/rich-results).
:::

## Reference Links

- [Open Graph Protocol (OGP)](https://ogp.me/)
- [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)
- [RDFa 1.1 Primer](https://www.w3.org/TR/rdfa-primer/)
- [Schema.org](https://schema.org/) -[Google Rich Results Test](https://search.google.com/test/rich-results)
- [SEO Plugin Documentation][seo]
- [SEO Plugin Configuration][seo-config]

[seo]: https://ecosystem.vuejs.press/plugins/seo/seo/
[seo-config]: https://ecosystem.vuejs.press/plugins/seo/seo/config.html
