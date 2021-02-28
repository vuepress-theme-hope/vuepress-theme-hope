---
title: Page information
icon: info
---

The `<PageInfo />` component is enabled globally by default. You can disable it by setting `pageInfo: false` in frontmatter of a specific page.

To keep it globally disabled, please set `pageInfo` to `false` in the plugin options. In this way you can set `pageInfo` in frontmatter of a specific page to enable it locally.

## Parameters

`pageInfo` accepts an array of strings by default, filling in a group of items. The order of filling is the order in which the items are displayed.

The optional values ​​and corresponding contents of the entry are as follows:

| Entry            | Corresponding content  | page frontmatter value               |
| ---------------- | ---------------------- | ------------------------------------ |
| `'author'`       | author                 | `author`                             |
| `'time'`         | Writing Date           | `time`                               |
| `'category'`     | Category               | `category`                           |
| `'tag'`          | tags                   | `tags`                               |
| `'reading-time'` | Estimated reading time | N / A (automatically generated)      |
| `'word'`         | Word count             | N / A (automatically generated)      |
| `'visitor'`      | Pageviews              | `visitor` (only Valine is available) |

By default it will display "Author, Visit Number, Writing Date, Category, Tags, Expect Reading Time".

::: tip Other notes

- **author**

You can configure `author` in the plugin options to set the default author. And you can also configure `author` in frontmatter with a new value in the page to override the default author, or set it to `false` to cancel the author display.

- **time**

It is recommended to fill it with a standard date format. A standard format is in the form of `xxxx-xx-xx`, such as "April 1, 2020" should be written as `2020-04-01`.

- **reading time**

The default statistic method is 300 words per minute. You can override it by setting `wordPerminute` in the plugin configuration. This option does not support individual configuration on the page.

:::

## Original logo

You can set `original` to `true` in the frontmatter of a specific page to add original tags to your articles.
