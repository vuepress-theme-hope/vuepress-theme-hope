---
title: Plugin Options
icon: gears
---

## components

- Type: `AvailableComponent[]`

  ```ts
  type AvailableComponent =
    "Badge" | "CodePen" | "Share" | "StackBlitz" | "SiteInfo" | "VPBanner" | "VPCard";
  ```

- Default: `[]`

Components to be registered.

Available component names:

- `"Badge"`
- `"CodePen"`
- `"Share"`
- `"StackBlitz"`
- `"SiteInfo"`
- `"VPBanner"`
- `"VPCard"`

::: tip

The media components are moved to [`@vuepress/plugin-media`](https://ecosystem.vuejs.press/plugins/features/media.html).

:::

## componentsOptions

Global config for components.

### componentsOptions.share.services

- Type: `(string | ShareService)[]`
- Details:
  - [Guide → Share → Setting component](./guide/utilities/share.md#setting-component)

Share services

### componentsOptions.share.twitterUserName

- Type: `string`
- Required: No

Twitter username.

## locales

Component locales.

### locales.siteInfo

- Type: `SiteInfoLocaleConfig`

  ```ts
  interface SiteInfoLocaleData {
    /**
     * Source text
     *
     * 源代码文字
     */
    source: string;
  }

  interface SiteInfoLocaleConfig {
    [localePath: string]: SiteInfoLocaleData;
  }
  ```

- Required: No

Locales config for site info component.
