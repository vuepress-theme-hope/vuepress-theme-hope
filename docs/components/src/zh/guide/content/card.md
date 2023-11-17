---
title: VPCard
---

卡片组件，可用于展示项目。

<!-- more -->

## 案例

<!-- #region demo -->

::: md-demo 基础卡片

<VPCard
  title="Mr.Hope"
  desc="Where there is light, there is hope"
  logo="https://mister-hope.com/logo.svg"
  link="https://mister-hope.com"
  background="rgba(253, 230, 138, 0.15)"
/>

:::

<!-- #endregion demo -->

## 属性

### title

- 类型: `string`
- 必填: 是

卡片标题

### desc

- 类型: `string`
- Default: `''`

卡片描述

### logo

- 类型: `string`
- 必填: 否

卡片图标

### link

- 类型: `string`
- 必填: 否

卡片链接

### background

- 类型: `string`
- 必填: 否

卡片背景

### color

- 类型: `string`
- 必填: 否

卡片字体颜色

::: tip

为了让背景和字体颜色能自动适配夜间模式，你可以传入 css variable，如: `var(--my-bg)`。

:::

## 容器

如果你想要在一个响应式容器中放置多个卡片，你可以将它们包裹在一个 `div` 中，并添加 `vp-card-container` 类:

::: md-demo 响应式卡片容器

<div class="vp-card-container">
  <VPCard
    v-for="i in 12"
    title="Mr.Hope"
    desc="Where there is light, there is hope"
    logo="https://mister-hope.com/logo.svg"
    link="https://mister-hope.com"
    background="rgba(253, 230, 138, 0.15)"
  />
  <VPCard
    title="Mr.Hope"
    desc="Where there is light, there is hope"
    logo="https://mister-hope.com/logo.svg"
    link="https://mister-hope.com"
    background="rgba(253, 230, 138, 0.15)"
  />
  <VPCard
    title="Mr.Hope"
    desc="Where there is light, there is hope"
    logo="https://mister-hope.com/logo.svg"
    link="https://mister-hope.com"
    background="rgba(253, 230, 138, 0.15)"
  />
</div>

:::
