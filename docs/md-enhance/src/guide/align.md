---
title: Custom alignment
icon: align
---

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

<!-- more -->

## Config

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

## Demo

:::: danger
vuepress-theme-hope v2 is still in W.I.P, the API may have

::: center
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[Mention an issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues).
:::
::::

```md
:::: danger
vuepress-theme-hope v2 is still in W.I.P, the API may have

::: center
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[Mention an issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues).
:::
::::
```
