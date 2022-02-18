---
title: Plugin Options
icon: config
---

## articleInfo

- Type: `boolean`
- Default: `false`

Whether register articleInfo component

## backToTop

- Type: `boolean`
- Default: `false`

Whether enabling backToTop button

## backToTopThreshold

- Type: `number`
- Default: `300`

backToTop button threshold distance (in pixels)

## badge

- Type: `boolean`
- Default: `false`

Whether register badge component

## breadcrumb

- Type: `boolean`
- Default: `false`

Whether register breadcrumb component

## pageAnchor

- Type: `boolean`
- Default: `false`

Whether register page anchor component

## pagination

- Type: `boolean`
- Default: `false`

Whether register pagination component

## screenFull

- Type: `boolean`
- Default: `false`

Whether register scrennfull button component

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

## paginationLocales

- Type: `PaginationLocaleConfig`

  ```ts
  interface PaginationLocaleData {
    /**
     * Previous page button label text
     */
    prev: string;

    /**
     * Next page button label text
     */
    next: string;

    /**
     * Navigation hint label text
     */
    navigate: string;

    /**
     * Navigation button label text
     */
    button: string;

    /**
     * Error text when invalid page number, `$page` will be replaced by total page number automatically
     */
    errorText: string;
  }

  interface PaginationLocaleConfig {
    [localePath: string]: PaginationLocaleData;
  }
  ```

- Required: No

Locales config for pagination.
