---
icon: page
---

# Page

## Page Info Display

### Author

The author name can be set by setting the author field in the frontmatter of the page.

```md
---
author: Mr.Hope
---
```

The author's name can also be configured globally in `themeConfig.author`. After the global configuration, the default author will be displayed for each article. You can set the author to `false` in the frontmatter of the page to cancel the author display.

### Pageviews <MyBadge text="Apply Partically Support" />

This feature is enabled by default when [Comment Function](comment.md) is configured. The global configuration item is `valine.visitor` and the page configuration item is to `visitor`.

## Comment

See the [Comment](comment.md) section for details.

## Icon Support

You can bind the icon to the page by configuring the `icon` field in the `frontmatter` of the page and filling in the FontClass of the corresponding icon.

This icon will be used in the **Breadcrumb** and **Sidebar**.

```md
---
icon: Home
---
```

## Footer Support

The `footer` field can be configured in the `frontmatter` of the page.

The `footer` field accepts a string and also accepts a htmlString that will be rendered directly in the footer.

::: tip Other support
You can set `footer` to `true` to display the default footer. The default footer text is configured in the `themeConfig.footer` field.

At the same time, `footer` also accepts an object, using the `text` and `link` fields to quickly set a footer link.
:::

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
