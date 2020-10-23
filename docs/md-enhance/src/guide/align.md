---
icon: align
---

# Align

## Configuration

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // Enable Align
        align: true,
      },
    ],
  ],
};
```

## Syntax

By injecting some options to `vuepress-plugin-container`, you can use below syntax to diy your paragraph align.

```md
::: center
Paragraph to be align-center
:::

::: right
Paragraph to be align-right
:::
```

If you need nesting, you should increase the outer `:::` mark number.

```md
:::: right
Right-aligned text

Right-aligned text

::: center
Centered text
:::

Right-aligned text

::::
```

## Demo

:::: danger W.I.P

This theme is still in built, the API may have

::: center
Significant changes.
:::

If you meet a bug while using, you can

::: right
[open an issue here](https://github.com/Mister-Hope/vuepress-theme-hope/issues).
:::
::::

```md
:::: danger W.I.P

This theme is still in built, the API may have

::: center
Significant changes.
:::

If you encounter a bug while using, you can

::: right
[open an issue here](https://github.com/Mister-Hope/vuepress-theme-hope/issues).
:::
::::
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
