---
title: Page Migration Guide
icon: page
category:
  - Migration
tag:
  - Migration
  - Frontmatter
  - Page
---

## Frontmatter

### Obsolete

- `time` is marked as deprecated, use `date` instead

- `categories` marked as deprecated, use `category` instead

- `tags` marked as deprecated, use `tag` instead

### Change

- `author` type changed from `string | undefined` to `AuthorInfo[] | AuthorInfo | string[] | string | undefined`

  ```ts
  interface AuthorInfo {
    name: string;
    url?: string;
  }
  ```

  This change allows you to add multiple authors and set up sites for them.

- `date` now only supports standard DateString marked with `-`

- `category` type change from `string | undefined` to `string[] | string | undefined`

  The theme now supports multiple categories.

- `pageInfo` type changed from `PageInfo[] | false` to `ArticleInfo[] | false`.

  Available values ​​changed from `"author"`, `"time"`, `"category"`, `"tag"`, `"reading-time"`, `"word"`, `"visitor"` to `"Author"`, `"Date"`, `"Original"`, `"Category"`, `"Tag"`, `"ReadingTime"`, `"Word"`, `"Visitor"`

- `sidebarDepth` renamed to `headingDepth`

- `copyrightText` renamed to `copyright`

- `anchorDisplay` renamed to `toc`

- `updateTime` renamed to `lastUpdated`

- `prev` and `next` types changed from `string | false` to `AutoLink | string | false`

  ```ts
  interface AutoLink {
    text: string;
    icon: string;
    link: string;
  }
  ```

### remove

- remove `password`

  For security reasons, V2 removes this method of encrypting the original text of the cipher.

- remove original `copyright`

  Related plugin is not yet compatible with V2.

- remove `mediaLink`

  Footer no longer displays media links.

## Layout

### Project HomePage

Project HomePage frontmatter options are changed.

- `title` renamed to `heroText`
- `darkHeroImage` renamed to `heroImageDark`
- `action` renamed to `actions`
