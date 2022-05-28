---
title: Theme Basic Options
icon: config
order: 2
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

  ```ts
  type AuthorInfo = { name: string; url?: string };

  type Author = string | string[] | AuthorInfo | AuthorInfo[];
  ```

- Required: No

Global default author.

## navbar

- Type: `HopeThemeNavbarConfig`

  ```ts
  interface TextItem {
    text: string;
    icon?: string;
    ariaLabel?: string;
  }

  interface AutoLink extends TextItem {
    link: string;
    rel?: string;
    target?: string;
    activeMatch?: string;
  }

  interface HopeThemeNavGroup<T> extends TextItem {
    prefix?: string;
    link?: string;
    children: T[];
  }

  type HopeThemeNavbarItem = AutoLink;
  type HopeThemeNavbarGroup = HopeThemeNavGroup<
    HopeThemeNavbarGroup | HopeThemeNavbarItem | string
  >;
  type HopeThemeNavbarConfig = (
    | HopeThemeNavbarItem
    | HopeThemeNavbarGroup
    | string
  )[];
  ```

- Details: [Layout → Navbar](../../guide/layout/navbar.md)

Navbar config

## sidebar

- Type: `HopeThemeSidebarConfig`

  ```ts
  interface TextItem {
    text: string;
    icon?: string;
    ariaLabel?: string;
  }

  interface AutoLink extends TextItem {
    link: string;
    rel?: string;
    target?: string;
    activeMatch?: string;
  }

  type HopeThemeSidebarPageItem = AutoLink;

  interface HopeThemeSidebarGroupItem extends TextItem {
    prefix?: string;
    link?: string;
    collapsable?: boolean;
    children: (
      | HopeThemeSidebarPageItem
      | HopeThemeSidebarGroupItem
      | HopeThemeSidebarStructureItem
      | string
    )[];
  }

  interface HopeThemeSidebarStructureItem extends TextItem {
    prefix: string;
    link?: string;
    collapsable?: boolean;
    children: "structure";
  }

  type HopeThemeSidebarItem =
    | HopeThemeSidebarPageItem
    | HopeThemeSidebarGroupItem
    | HopeThemeSidebarStructureItem
    | string;

  type HopeThemeSidebarArrayConfig = HopeThemeSidebarItem[];

  type HopeThemeSidebarObjectConfig = Record<
    string,
    HopeThemeSidebarArrayConfig | "structure" | false
  >;

  type HopeThemeSidebarConfig =
    | HopeThemeSidebarArrayConfig
    | HopeThemeSidebarObjectConfig;
  ```

- Details: [Layout → Sidebar](../../guide/layout/sidebar.md)

Sidebar config

## locales

- Type: `Record<string, HopeThemeLocaleOptions>`

I18n config of the theme, where you can set options for each language separately.
