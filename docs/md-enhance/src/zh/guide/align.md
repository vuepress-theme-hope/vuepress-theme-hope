---
title: 自定义对齐
icon: align
---

通过对 `vuepress-plugin-container` 进行额外的配置注入，你可以使用

```md
::: center
要居中的段落
:::

::: right
要居右的段落
:::
```

来对你的段落对齐进行自定义。

<!-- more -->

## 配置

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // 启用自定义对齐
        align: true,
      },
    ],
  ],
};
```

## 演示

:::: danger W.I.P
vuepress-theme-hope v2 仍在制作中，API 可能会有

::: center
重大的变动。
:::

如果你在使用过程中遇到了 bug，可以

::: right
[提一个 issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues)。
:::

::::

```md
:::: danger W.I.P
vuepress-theme-hope v2 仍在制作中，API 可能会有

::: center
重大的变动。
:::

如果你在使用过程中遇到了 bug，可以

::: right
[提一个 issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues)。
:::

::::
```
