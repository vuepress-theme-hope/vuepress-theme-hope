---
title: Page information
icon: circle-info
category:
  - Feature
tag:
  - Feature
  - Page Info
---

`vuepress-theme-hope` can display article information for you.

<!-- more -->

## Enable

Page information display is enabled globally by default, while supports page config. You can disable it by setting `pageInfo: false` in frontmatter of a specific page.

To keep it globally disabled, please set `pageInfo` to `false` in the plugin options. Then you can set `pageInfo` in frontmatter of a specific page to enable it locally.

## Parameters <Badge text="Support page config" />

`pageInfo` accepts an array of strings by default, filling in a group of items. The order of filling is the order in which the items are displayed.

The optional values and corresponding contents of the entry are as follows:

| Entry           | Corresponding content  | page frontmatter value                | Theme Options              |
| --------------- | ---------------------- | ------------------------------------- | -------------------------- |
| `"Author"`      | author                 | `author`                              | `author`                   |
| `"Date"`        | Writing Date           | `time`                                | N/A                        |
| `"Original"`    | Whether is original    | `isOriginal`                          | N/A                        |
| `"Category"`    | Category               | `category`                            | N/A                        |
| `"Tag"`         | Tag                    | `tag`                                 | N/A                        |
| `"ReadingTime"` | Estimated reading time | N/A (automatically generated)         | N/A                        |
| `"Word"`        | Word count             | N/A (automatically generated)         | N/A                        |
| `"PageView"`    | Pageviews              | `pageview` (only available in Waline) | `plugins.comment.pageview` |

By default, it will display "Author, Visit Number, Writing Date, Category, Tags, Expect Reading Time".

### author <Badge text="Support page config" />

You can set `author` in theme options to set the default author info globally, or set `author` in page frontmatter for a page.

An author info can be a string representing author names, or an object with the following fields:

- `name`: author name, required
- `url`: author website, optional
- `email`: author email, optional

If there should be multiple authors, you can also set an array of them.

When a default author info is set in theme options, you can set `author: false` in page to avoid fallback to the default author.

Example:

- A single author name:

  ```md
  ---
  author: Mr.Hope
  ---
  ```

- Multiple author names:

  ```md
  ---
  author:
    - Mr.Hope
    - Mrs.Hope
  ---
  ```

- Author info object:

  ```md
  ---
  author:
    name: Mr.Hope
    url: https://mister-hope.com
    email: mister-hope@outlook.com
  ---
  ```

- Multiple author info objects:

  ```md
  ---
  author:
    - name: Mr.Hope
      url: https://mister-hope.com
      email: mister-hope@outlook.com
    - name: Meteorlxy
  ---
  ```

### Writing Date

We recommend filling it with a standard date format. A standard format is in the form of `yyyy-mm-dd`, such as "April 1, 2020" should be written as `2020-04-01`.

Example:

```md
---
date: 2020-01-01
---
```

::: note

When running in a Git-based project, the writing date will fall back to first commit date of current file.

:::

### Category and Tags

See [blog section](../blog/category-and-tags.md) for details

### Reading Time

The default statistic method is 300 words per minute. You can override it by setting `plugins.readingTime.wordPerMinute` in theme options. This option does not support individual configuration on the page.

### View Count <Badge text="Support page config" />

When using Waline as [Comment Service](comment.md), this function is enabled by default.

Example:

```md
---
pageview: false
---
```
