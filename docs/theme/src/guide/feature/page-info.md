---
icon: infofill
category: feature
tags:
  - page-info
  - function
---

# Page information

The `<PageInfo />` component support local config[^applypartically], and is enabled globally by default. You can disable it by setting `pageInfo: false` in `Front Matter` of a specific page.

[^applypartically]: **Apply Partically Support**

    **Support local configuration**<MyBadge text="Support page config" /> means that the theme allows the configuration of the page to override the global configuration.

    ::: details Example
    Take path navigation as an example:

    This feature is enabled globally by default, that is, `themeConfig.breadcrumb` is `true` by default, and you can set `breadcrumb: false` in the Front Matter of a specific page to disable it locally.

    Of course, you can also set the `themeConfig.breadcrumb` option to `false` to disable it globally, and set `breadcrumb: true` in the Front Matter of a specific page to enable it locally.
    :::

To keep it globally disabled, please set `pageInfo` to `false` in the plugin options. In this way you can set `pageInfo` in `Front Matter` of a specific page to enable it locally.

## Parameters <MyBadge text="Support page config" />

`pageInfo` accepts an array of strings by default, filling in a group of items. The order of filling is the order in which the items are displayed.

The optional values ​​and corresponding contents of the entry are as follows:

| Entry        | Corresponding content  | page frontmatter value             |
| ------------ | ---------------------- | ---------------------------------- |
| `'author'`   | author                 | author                             |
| `'time'`     | Writing Date           | time                               |
| `'category'` | Category               | category                           |
| `'tag'`      | tags                   | tags                               |
| `'readtime'` | Estimated reading time | N / A (automatically generated)    |
| `'word'`     | Word count             | N / A (automatically generated)    |
| `'visitor'`  | Visits                 | visitor (only Valine is available) |

By default it will display "Author, Visit Number, Writing Date, Category, Tags, Expect Reading Time".

- **author** <MyBadge text="Support page config" />

Example:

```md
---
author: Mr.Hope
---
```

You can configure `author` in the plugin options to set the default author. And you can also configure `author` in frontmatter with a new value in the page to override the default author, or set it to `false` to cancel the author display.

- **time**

It is recommended to fill it with a standard date format. A standard format is in the form of `xxxx-xx-xx`, such as "April 1, 2020" should be written as `2020-04-01`.

E.g.:

```md
---
time: 2020-01-01
---
```

- **Category and Tags**

See [blog section](blog.md) for details

- **Reading time**

The default statistic method is 300 words per minute. You can override it by setting `wordPerminute` in the plugin configuration. This option does not support individual configuration on the page.

- **Visitor Number** <MyBadge text="Support page config" />

When [Comment Function](../feature/comment.md) is configured, this function is enabled by default.

E.g.:

```md
---
visitor: false
---
```
