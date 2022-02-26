---
title: Config
icon: config
---

## Plugin Options

### hostname

- Type: `string`
- Required: No

Deploy hostname.

### author

- Type: `string`
- Required: No

Default author.

### restrictions

- Type: `string`
- Required: No

The age rating of the content, the format is `[int]+`, such as `'13+'`.

### twitterID

- Type: `string`
- Required: No

Fill in your twitter username.

### isArticle

- Type: `(page: Page) => boolean`
- Required: No

Use this option to judge whether the page is an article.

### ogp

- Type: `<ExtendObject = Record<string, unknown>>(ogp: SeoContent, info: PageSeoInfo<ExtendObject>) => SeoContent`
- Required: No

Custom OPG Generator.

You can use this options to edit OGP tags.

### jsonLd

- Type: `<ExtendObject = Record<string, unknown>>(jsonLD: ArticleJSONLD | null, info: PageSeoInfo<ExtendObject>) => ArticleJSONLD | null`
- Required: No

Custom JSON-LD Generator.

You can use this options to edit JSON-LD properties.

### customHead

- Type: `<ExtendObject = Record<string, unknown>>(head: HeadConfig[], info: PageSeoInfo<ExtendObject>) => void`
- Required: No

You can use this options to edit tags injected to `<head>`.

## Related interface

- Interface of `PageSeoInfo`:

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
