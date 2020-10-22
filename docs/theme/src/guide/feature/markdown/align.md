---
icon: align
category: markdown
tags:
  - feature
  - markdown
---

# Custom alignment

By injecting configuration into vuepress-plugin-container, you can use

```md
::: center
Paragraph to center
:::

::: right
Right paragraph
:::
```

To customize your paragraph alignment.

## Config

```js {4}
module.exports = {
  themeConfig: {
    mdEnhance: {
      align: true,
    },
  },
};
```

## Demo

This topic is still in production, the API may have

::: center
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[Mention an issue](https://github.com/Mister-Hope/vuepress-theme-hope/issues).
:::

```md
This topic is still in production, the API may have

::: center
Significant changes.
:::

If you encounter a bug during use, you can

::: right
[Mention an issue](https://github.com/Mister-Hope/vuepress-theme-hope/issues).
:::
```

## Other custom containers

::: info
Information container
:::

::: tip
Tip container
:::

::: warning
Warning container
:::

::: danger
Dangerous container
:::

::: details
Details container
:::

::: info custom title
A custom information container
:::

::: tip custom title
A custom tip container
:::

::: warning custom title
A custom warning container
:::

::: danger custom Title
A custom danger container
:::

::: details custom title
A custom details container
:::

```md
::: info
Information container
:::

::: tip
Tip container
:::

::: warning
Warning container
:::

::: danger
Dangerous container
:::

::: details
Details container
:::

::: info custom title
A custom information container
:::

::: tip custom title
A custom tip container
:::

::: warning custom title
A custom warning container
:::

::: danger custom Title
A custom danger container
:::

::: details custom title
A custom details container
:::
```
