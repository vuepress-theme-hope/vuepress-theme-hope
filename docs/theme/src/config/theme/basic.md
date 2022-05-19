---
title: Theme Basic Options
icon: config
index: 2
category:
  - Config
tag:
  - Basic
  - ThemeConfig
---

::: danger

These options are important and require you to configure them correctly.

:::

<!-- more -->

## hostname <Badge text="Root only" type="warning" />

- Type: `string`
- Required: Yes

Domain which the site will be deployed to.

::: tip

It should contain full protocol (eg: `https://example.com`).

:::

## author

- Type: `Author`
- Required: No

```ts
type AuthorInfo = { name: string; url?: string };

type Author = string | string[] | AuthorInfo | AuthorInfo[];
```

Global default author.

## navbar

Navbar config

For details, see [Layout → Navbar](../../guide/layout/navbar.md)

## sidebar

Sidebar config

For details, see [Layout → Sidebar](../../guide/layout/sidebar.md)

## locales

- Type: `Record<string, HopeThemeLocaleOptions>`

I18n config of the theme, where you can set options for each language separately.
