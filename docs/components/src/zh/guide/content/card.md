---
title: VPCard
---

卡片组件，可用于展示项目。

<!-- more -->

## 案例 {#demo}

<!-- #region demo -->

::: preview 基础卡片

<VPCard
  title="Mr.Hope"
  desc="Where there is light, there is hope"
  logo="https://mister-hope.com/logo.svg"
  link="https://mister-hope.com"
  background="rgba(253, 230, 138, 0.15)"
/>

:::

<!-- #endregion demo -->

## 选项 {#options}

::: fields
@`title` type=string required

卡片标题。

@`desc` type=string

卡片描述。

@`logo` type=string

卡片图标。

@`link` type=string

卡片链接。

@`background` type=string

卡片背景。

@`color` type=string

卡片字体颜色。

:::

::: tip

为了让背景和字体颜色能自动适配夜间模式，你可以传入 css variable，如: `var(--my-bg)`。

:::

## 容器 {#container}

如果你想要在一个响应式容器中放置多个卡片，你可以将它们包裹在一个 `div` 中，并添加 `vp-card-container` 类:

::: preview 响应式卡片容器

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
