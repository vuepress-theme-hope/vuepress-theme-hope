---
icon: page
category: layout
---

# Page

## Icon support

You can configure the icon field in the frontmatter of the page, and fill in the FontClass of the corresponding icon to bind the icon to the page.

This icon is used in **Path Navigation** and **Sidebar**.

::: details Example

```md
---
icon: Home
---
```

:::

## Page Info Display <MyBadge text="Apply Partically Support" />

- **Author** <MyBadge text="Apply Partically Support" />

  The author name can be set by setting the author field in the frontmatter of the page.

  ::: details Wxample

  ```md
  ---
  author: Mr.Hope
  ---
  ```

  :::

  The author's name can also be configured globally in `themeConfig.author`. After the global configuration, the default author will be displayed for each article. You can set the author to `false` in the frontmatter of the page to cancel the author display.

- **Pageviews** <MyBadge text="Apply Partically Support" />

  This feature is enabled by default when [Comment Function](../feature/comment.md) is configured. The global configuration item is `valine.visitor` and the page configuration item is to `visitor`.

  ::: details Example

  ```md
  ---
  visitor: false
  ---
  ```

  :::

- **Time**

  You can set `time` field in `frontmatter` to set writing time.

  ::: details Example

  ```md
  ---
  time: 2020-1-1
  ---
  ```

## Comment

See the [Comment](../feature/comment.md) section for details.

## Footer Support <MyBadge text="Apply Partically Support" />

If you want to display the footer on every page, you need to set `themeConfig.footer.display` to `true`. At the same time, you can also use `themeConfig.footer.copyright` and `themeConfig.content` to set the default copyright information and footer content.

At the same time, you can configure the `footer` field in the `frontmatter` page.

The `footer` field accepts a string or htmlString. They will be rendered directly at the footer's position. You can also set `footer` to `true` to display the default footer text.

::: details Example

Enable the default footer text:

```md
---
footer: true
---
```

Customize footer text without displaying copyright information and media links:

```md
---
footer: This website is served by Github Pages
copyright: false
medialink: false
---
`` `

Custom footer content and copyright information and media links:

```md
---
copyright: MIT LICENSE
footer: <a href="https://github.com/Mister-Hope"> Mr.Hope </a>
medialink:
  Zhihu: https://zhihu.com
---
```

When you set `footer.display` to true in the theme, you can also disable it locally:

```md
---
footer: false
---
```

:::
