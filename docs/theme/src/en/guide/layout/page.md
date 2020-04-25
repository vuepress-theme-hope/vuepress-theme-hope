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

The `footer` field can be configured in the `frontmatter` of the page.

The `footer` field accepts a string and also accepts a htmlString that will be rendered directly in the footer.

::: tip Other support
You can set `footer` to `true` to display the default footer. The default footer text is configured in the `themeConfig.footer` field.

At the same time, `footer` also accepts an object, using the `text` and `link` fields to quickly set a footer link.
:::

::: details Example

```md
> Apply Default footer text
---
footer: true
---

> DIY footer text
---
footer: This website is served by Github Pages
---

> Quickly define a footer link
---
footer:
  text: Mr.Hope
  link: https://github.com/Mister-Hope
---

> Diy footer
---
footer: <a href="https://github.com/Mister-Hope">Mr.Hope</a>
---
```

When you set `footer.displayDefault` to true in the theme, you can also disable it locally

```md
---
footer: false
---
```

:::
