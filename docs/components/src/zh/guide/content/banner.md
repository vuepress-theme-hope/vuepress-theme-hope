---
title: VPBanner
---

Banner 组件，用于展示 banner。

<!-- more -->

## 案例

<!-- #region demo -->

::: md-demo 基础横幅

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

## 属性

### title

- 类型: `string`
- 必填: 是

横幅标题

### content

- 类型: `string`
- Default: `''`

横幅内容

### logo

- 类型: `string`
- 必填: 否

横幅图标

### actions

- 类型: `BannerAction[]`

  ```ts
  interface BannerAction {
    text: string;
    link: string;
    /**
     * @default "primary"
     */
    type?: "primary" | "default";
  }
  ```

- 必填: 否

横幅操作

### background

- 类型: `string`
- 必填: 否

横幅背景

### color

- 类型: `string`
- 必填: 否

横幅字体颜色

::: tip

为了让背景和字体颜色能自动适配夜间模式，你可以传入 css variable，如: `var(--my-bg)`。

:::
