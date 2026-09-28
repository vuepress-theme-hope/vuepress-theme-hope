---
title: VPBanner
---

Banner component, can be use to display banner.

<!-- more -->

## Demo

<!-- #region demo -->

::: preview Basic Banner

<VPBanner
  title="Mr.Hope"
  content="Where there is light, there is hope"
  logo="https://mister-hope.com/logo.svg"
  :actions='[
    {
      text: "Visit now",
      link:"https://mister-hope.com",
    },
    {
      text: "Repo",
      link: "https://github/Mister-Hope/Mister-Hope.github.io",
      type: "default",
    },
  ]'
/>

:::

<!-- #endregion demo -->

## Options

::: fields
@`title` type=string required

Banner title.

@`content` type=string

Banner content.

@`logo` type=string

Banner logo.

@`actions` type=`BannerAction[]`

Banner actions.

@@`actions[*].text` type=string required

Text of the action.

@@`actions[*].link` type=string required

Link of the action.

@@`actions[*].type` type=`"primary" | "default"` default=`"primary"`

Type of the action.

@`background` type=string

Banner background.

@`color` type=string

Banner font color.

:::

::: tip

To make background and font color adapt to dark mode automatically, you can pass css variable, such as: `var(--my-bg)`.

:::
