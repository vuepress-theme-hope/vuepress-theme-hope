---
title: Theme Basic Config
icon: config
category:
  - Config
tag:
  - Basic
  - ThemeConfig
---

## Basic Config

::: danger

These options are important and require you to configure them correctly.

:::

### hostname <Badge text="Root only" type="warning" />

- Type: `string`
- Required: Yes

Domain which to be deployed to.

### author

- Type: `Author`
- Required: No

```ts
type AuthorInfo = { name: string; url?: string };

type Author = string | string[] | AuthorInfo | AuthorInfo[];
```

Global default author.

### navbar

Navbar config

For details, see [Layout → Navbar](../../guide/layout/navbar.md)

### sidebar

Sidebar config

For details, see [Layout → Sidebar](../../guide/layout/sidebar.md)

### locales

- Type: `Record<string, HopeThemeLocaleOptions>`

I18n config of the theme, where you can set options for each language separately.
