---
title: Config
icon: gears
---

## Plugin Options

### hostname

- Type: `string`
- Required: No

Deploy hostname.

### author

- Type: `Author`

  ```ts
  type AuthorName = string;

  interface AuthorInfo {
    /**
     * Author name
     */
    name: string;

    /**
     * Author website
     */
    url?: string;

    /**
     * Author email
     */
    email?: string;
  }

  type Author = AuthorName | AuthorName[] | AuthorInfo | AuthorInfo[];
  ```

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
  function jsonLd<
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    /**
     * JSON-LD Object inferred by plugin
     */
    jsonLD: ArticleSchema | BlogPostingSchema | WebPageSchema,
    /**
     * Page Object
     */
    page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
    /** VuePress App */
    app: App,
  ): ArticleSchema | BlogPostingSchema | WebPageSchema;
  ```

- Required: No

Custom JSON-LD Generator.

You can use this options to edit JSON-LD properties.

### customHead

- Type:

  ```ts
  function customHead<
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    /**
     * Head tag config
     *
     * head 标签配置
     */
    head: HeadConfig[],
    /**
     * Page Object
     *
     * 页面对象
     */
    page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
    /** VuePress App */
    app: App,
  ): void;
  ```

- Required: No

You can use this options to edit tags injected to `<head>`.
