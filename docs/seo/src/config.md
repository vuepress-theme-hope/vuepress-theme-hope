---
title: Config
icon: config
---

## Plugin Options

### author

- Type: `string`
- Required: No

Default author

### twitterID

- Type: `string`
- Required: No

Fill in your twitter username

### restrictions

- Type: `string`
- Required: No

The age rating of the content, the format is `[int]+`, such as `'13+'`

### seo

- Type: `(info: PageSeoInfo) => Record<string, string>`

You can use this option to inject new or overwrite the default generated SEO, you need to return an object in the format of `<property>: <content>`.

### customMeta

- Type: `(meta: Meta[], info: PageSeoInfo) => void`

You can use this option to directly inject any format of `<meta>` tags into `<head>`.

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

- The interface of `Meta` is `Record<"content" | "name" | "charset" | "http-equiv", string>`

  The key of the `Meta` object will be rendered as the attribute of the meta tag, and the value will be rendered as the value of the corresponding attribute.

  For details, please see [Frontmatter → Meta](https://v1.vuepress.vuejs.org/guide/frontmatter.html#meta)
