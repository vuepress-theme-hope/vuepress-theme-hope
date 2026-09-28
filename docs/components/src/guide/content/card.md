---
title: VPCard
---

Card component, can be use to display items.

<!-- more -->

## Demo

<!-- #region demo -->

::: preview Basic Card

<VPCard
  title="Mr.Hope"
  desc="Where there is light, there is hope"
  logo="https://mister-hope.com/logo.svg"
  link="https://mister-hope.com"
  background="rgba(253, 230, 138, 0.15)"
/>

:::

<!-- #endregion demo -->

## Options

::: fields
@`title` type=string required

Card title.

@`desc` type=string

Card description.

@`logo` type=string

Card logo.

@`link` type=string

Card link.

@`background` type=string

Card background.

@`color` type=string

Card font color.

:::

::: tip

To make background and font color adapt to dark mode automatically, you can pass css variable, such as: `var(--my-bg)`.

:::

## Container

If you want multiple cards in a responsive container, you can wrap them in a `div` with class `vp-card-container`:

::: preview Responsive Card Container

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
