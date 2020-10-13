---
icon: align
---

# Align

## Configuration

```js {6}
module.exports = {
  plugin: [
    "md-enhance",
    {
      // Enable Align
      align: true,
    },
  ],
};
```

## Syntax

By injecting some options to `vuepress-plugin-container`, you can use

    ::: center
    Paragraph to be align-center
    :::

    ::: right
    Paragraph to be align-right
    :::

to diy your paragraph align.

If you need nesting, the outer `:::` needs to be increased in order.

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

If you encounter a bug while using, you can

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
Information container
:::

::: tip custom title
Tip container
:::

::: warning custom title
Warning container
:::

::: danger custom Title
Dangerous container
:::

::: details custom title
Details container
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
Information container
:::

::: tip custom title
Tip container
:::

::: warning custom title
Warning container
:::

::: danger custom Title
Dangerous container
:::

::: details custom title
Details container
:::
```
