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

### autoDescription

- Type: `boolean`
- Default: `true`

Whether generate description automatically

### canonical

- Type: `string | ((page: Page) => string | null)`
- Required: No

Canonical link

### fallBackImage

- Type: `string`
- Required: No

Fallback Image link when no image are found

### restrictions

- Type: `string`
- Required: No

The age rating of the content, the format is `[int]+`, such as `"13+"`.

### twitterID

- Type: `string`
- Required: No

Fill in your twitter username.

### isArticle

- Type: `(page: Page) => boolean`
- Required: No

Use this option to judge whether the page is an article.

### ogp

- Type:

  ```ts
  function ogp<ExtendObject = Record<string, unknown>>(
    ogp: SeoContent,
    page: ExtendPage<ExtendObject>,
    app: App
  ) => SeoContent;
  ```

- Required: No

Custom OPG Generator.

You can use this options to edit OGP tags.

### jsonLd

- Type:

  ```ts
  function jsonLd: <ExtendObject = Record<string, unknown>>(
    jsonLD: ArticleJSONLD | null,
    page: ExtendPage<ExtendObject>,
    app: App
  ) => ArticleJSONLD | null;
  ```

- Required: No

Custom JSON-LD Generator.

You can use this options to edit JSON-LD properties.

### customHead

- Type:

  ```ts
  function customHead<ExtendObject = Record<string, unknown>>(
    head: HeadConfig[],
    page: ExtendPage<ExtendObject>,
    app: App
  ) => void
  ```

- Required: No

You can use this options to edit tags injected to `<head>`.
