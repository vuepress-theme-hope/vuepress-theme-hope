---
title: Plugin Options
icon: config
---

## components

- Type: `AvailableComponent[]`
- Default: `[]`

Whether register articleInfo component

```ts
type AvailableComponent = "ArticleInfo" | "Badge";
```

## backToTop

- Type: `boolean`
- Default: `false`

Whether enabling backToTop button

## backToTopThreshold

- Type: `number`
- Default: `300`

BackToTop button threshold distance (in pixels)

## articleInfoLocales

- Type: `ArticleInfoLocaleConfig`

  ```ts
  interface ArticleInfoLocaleData {
    /**
     * Author label text
     */
    author: string;

    /**
     * Writing date label text
     */
    date: string;

    /**
     * Label text marked as original
     */
    origin: string;

    /**
     * Page views label text
     */
    views: string;

    /**
     * Tag label text
     */
    tag: string;

    /**
     * Category label text
     */
    category: string;

    /**
     * Expect reading time label text
     */
    readingTime: string;

    /**
     * Words label Text
     */
    words: string;
  }

  interface ArticleInfoLocaleConfig {
    [localePath: string]: ArticleInfoLocaleData;
  }
  ```

- Required: No

Locales config for article information.

## backToTopLocales

- Type: `BackToTopLocaleConfig`

  ```ts
  interface BackToTopLocaleData {
    /**
     * Back to top button label text
     */
    backToTop: string;
  }

  interface BackToTopLocaleConfig {
    [localePath: string]: BackToTopLocaleData;
  }
  ```

- Required: No

Locales config for BackToTop button.
