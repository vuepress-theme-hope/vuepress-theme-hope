---
title: Plugin Options
icon: config
---

## backToTop

- Type: `boolean`
- Default: `false`

Whether enabling backToTop button

## backToTopThreshold

- Type: `number`
- Default: `300`

backToTop button threshold distance (in pixels)

## breadcrumb

- Type: `boolean`
- Default: `false`

Whether register breadcrumb component

## badge

- Type: `boolean`
- Default: `false`

Whether register badge component

## pageinfo

- Type: `boolean`
- Default: `false`

Whether register pageinfo component

## pagination

- Type: `boolean`
- Default: `false`

Whether register pagination component

## wordPerminute

- Type: `number`
- Default: `300`

Reading words per minute.

## screenFull

- Type: `boolean`
- Default: `false`

Whether register scrennfull button component

## locales

```ts
interface ComponentLocaleData {
  /**
   * Back to top button label text
   */
  backToTop: string;

  /**
   * Open in new window text
   */
  openInNewWindow: string;
}
```

Component locales config.

## pageInfoLocales

```ts
interface PageInfoLocaleData {
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
```

Locales Config for page information.

## paginationLocales

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
```

Pagination locales config.
