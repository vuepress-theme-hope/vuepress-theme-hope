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

- mark `time` as deprecated, use `date` instead

- mark `categories` as deprecated, use `category` instead

- mark `tags` as deprecated, use `tag` instead

### Changes

- change `author` type from `string | undefined` to `AuthorInfo[] | AuthorInfo | string[] | string | undefined`

  ```ts
  interface AuthorInfo {
    name: string;
    url?: string;
  }
  ```

  This change allows you to add multiple authors and set up sites for them.

- `date` only supports standard DateString mark with `-`

- change `category` type from `string | undefined` to `string[] | string | undefined`

  The theme supports multiple categories.

- change `pageInfo` type from `PageInfo[] | false` to `ArticleInfo[] | false`.

  Available values ​​change from `"author"`, `"time"`, `"category"`, `"tag"`, `"reading-time"`, `"word"`, `"visitor"` to `"Author"`, `"Date"`, `"Original"`, `"Category"`, `"Tag"`, `"ReadingTime"`, `"Word"`, `"Visitor"`

- rename `sidebarDepth` to `headerDepth`

- rename `copyrightText` to `copyright`

- rename `anchorDisplay` to `toc`

- rename `updateTime` to `lastUpdated`

- change `prev` and `next` types from `string | false` to `AutoLink | string | false`

  ```ts
  interface AutoLink {
    text: string;
    icon: string;
    link: string;
  }
  ```

### Deletion

- remove `password`

  For security reasons, V2 removes this method of encrypting the original text of the cipher.

- remove `copyright`

  Related plugin is not yet compatible with V2.

- remove `mediaLink`

  Footer no longer displays media links.

## Layout

### Project HomePage

Project HomePage frontmatter options are change.

- rename `title` to `heroText`
- rename `darkHeroImage` to `heroImageDark`
- rename `action` to `actions`
