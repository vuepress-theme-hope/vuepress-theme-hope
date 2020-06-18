---
title: "@mr-hope/seo"
category: config
tags:
  - plugin
  - config
---

Inject `<meta>` into your webpage to enhance the SEO of your webpage.

<!-- more -->

## Plugin options

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

The interface types of `PageSeoInfo` are as follows:

```ts
interface PageSeoInfo {
  $page: Page;
  $site: SiteConfig;
  themeConfig: ThemeConfig;
  /** supported languages */
  locales: string[];
  path: string;
}
```

You can use this option to inject new or overwrite the default generated SEO, you need to return an object in the format of `<property>: <content>`.

For example, if you return `{ 'og:url': 'google.com', 'og:image': 'google.com/logo.jpg' }`, the plugin will inject the following into `<head>` :

```html
<meta property="og:url" content="google.com" />
<meta property="og:image" content="google.com/logo.jpg" />
```

#### Defaults

The following are the `<meta>` tags and their values ​​that will be injected into `<head>` by default:

|      Property Name       |                       Value                        |
| :----------------------: | :------------------------------------------------: |
|         `og:url`         |            themeConfig.hostname + path             |
|      `og:site_name`      |                    \$site.title                    |
|        `og:title`        |                    \$page.title                    |
|     `og:description`     |           \$page.frontmatter.description           |
|        `og:type`         |                    `'article'`                     |
|        `og:image`        |  themeConfig.hostname + \$page.frontmatter.image   |
|    `og:updated_time`     |               \$page.lastUpdatedTime               |
|       `og:locale`        |               $page._computed.$lang                |
|  `og:locale:alternate`   | other languages included in \$themeConfig.locales  |
|      `twitter:card`      |              `'summary_large_image'`               |
|   `twitter:image:alt`    |                    \$site.title                    |
|     `article:author`     | \$page.frontmatter.author \|\| themeConfig.author  |
|      `article:tag`       | $page.frontmatter.tags \|\| $page.frontmatter.tag  |
| `article:published_time` | $page.frontmatter.time \|\| $page.frontmatter.date |
| `article:modified_time`  |               \$page.lastUpdatedTime               |

### customMeta

- Type: `(meta: Meta, info: PageSeoInfo) => void`

You can use this option to inject content directly into Meta. For the format of `Meta`, please see [Front Matter → Meta](https://v1.vuepress.vuejs.org/zh/guide/frontmatter.html#meta)

For example:

```js
(meta: Meta, info: PageSeoInfo) => {
  meta.push({ a: "1", b: "2" });
};
```

Will inject into the current page's `<head>` with:

```html
<meta a="1" b="2" />
```
