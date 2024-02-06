---
title: VPBanner
---

Banner component, can be use to display banner.

<!-- more -->

## Demo

<!-- #region demo -->

::: md-demo Basic Banner

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

## Props

### title

- Type: `string`
- Required: Yes

Banner title

### content

- Type: `string`
- Default: `''`

Banner content

### logo

- Type: `string`
- Required: No

Banner logo

### actions

- Type: `BannerAction[]`

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

- Required: No

Banner actions

### background

- Type: `string`
- Required: No

Banner background

### color

- Type: `string`
- Required: No

Banner font color

::: tip

To make background and font color adapt to dark mode automatically, you can pass css variable, such as: `var(--my-bg)`.

:::
