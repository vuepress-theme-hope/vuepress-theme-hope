---
title: VPBanner
---

Banner 组件，用于展示 banner。

<!-- more -->

## 案例

<!-- #region demo -->

::: preview 基础横幅

<VPBanner
  title="Mr.Hope"
  content="Where there is light, there is hope"
  logo="https://mister-hope.com/logo.svg"
  :actions='[
    {
      text: "访问",
      link:"https://mister-hope.com",
    },
    {
      text: "仓库",
      link: "https://github/Mister-Hope/Mister-Hope.github.io",
      type: "default",
    },
  ]'
/>

:::

<!-- #endregion demo -->

## 选项 {#options}

::: fields
@`title` type=string required

横幅标题。

@`content` type=string

横幅内容。

@`logo` type=string

横幅图标。

@`actions` type=`BannerAction[]`

横幅操作。

@@`actions[*].text` type=string required

操作的文字。

@@`actions[*].link` type=string required

操作的链接。

@@`actions[*].type` type=`"primary" | "default"` default=`"primary"`

操作的类型。

@`background` type=string

横幅背景。

@`color` type=string

横幅字体颜色。

:::

::: tip

为了让背景和字体颜色能自动适配夜间模式，你可以传入 css variable，如: `var(--my-bg)`。

:::
