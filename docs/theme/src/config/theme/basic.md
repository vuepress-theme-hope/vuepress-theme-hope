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
  type AuthorName = string;

  interface AuthorInfo {
    /**
     * Author name
     */
    name: string;

    /**
     * Author website
     */
    url?: string;

    /**
     * Author email
     */
    email?: string;
  }

  type Author = AuthorName | AuthorName[] | AuthorInfo | AuthorInfo[];
  ```

- Required: No

Global default author.

## navbar

- Type: `NavbarConfig`

  ```ts
  interface TextItemOptions {
    /**
     * Text of item
     */
    text: string;

    /**
     * Icon of item
     */
    icon?: string;

    /**
     * Aria label of item
     */
    ariaLabel?: string;
  }

  interface AutoLinkOptions extends TextItemOptions {
    /**
     * link of item
     */
    link: string;

    /**
     * Rel of `<a>` tag
     */
    rel?: string;

    /**
     * Target of `<a>` tag
     */
    target?: string;

    /**
     * Regexp mode to be active
     */
    activeMatch?: string;
  }

  interface NavGroup<T> extends TextItemOptions {
    /**
     * Link prefix of current group
     */
    prefix?: string;

    /**
     * Link of current group
     */
    link?: string;

    /**
     * Children of current group
     */
    children: T[];
  }

  type NavbarItem = AutoLinkOptions;
  type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>;
  type NavbarConfig = (NavbarItem | NavbarGroup | string)[];
  ```

- Details: [Layout → Navbar](../../guide/layout/navbar.md)

Navbar config

## sidebar

- Type: `SidebarConfig`

  ```ts
  interface TextItemOptions {
    /**
     * Text of item
     */
    text: string;

    /**
     * Icon of item
     */
    icon?: string;

    /**
     * Aria label of item
     */
    ariaLabel?: string;
  }

  interface AutoLinkOptions extends TextItemOptions {
    /**
     * link of item
     */
    link: string;

    /**
     * Rel of `<a>` tag
     */
    rel?: string;

    /**
     * Target of `<a>` tag
     */
    target?: string;

    /**
     * Regexp mode to be active
     */
    activeMatch?: string;
  }

  type SidebarPageItem = AutoLinkOptions;

  interface SidebarGroupItem extends TextItemOptions {
    /**
     * Link prefix of current group
     */
    prefix?: string;

    /**
     * Link of current group
     */
    link?: string;

    /**
     * Whether current group is collapsible
     *
     * @default false
     */
    collapsible?: boolean;

    /**
     * Children of current group
     */
    children: (
      | SidebarPageItem
      | SidebarGroupItem
      | SidebarStructureItem
      | string
    )[];
  }

  interface SidebarStructureItem extends TextItemOptions {
    /**
     * Link prefix of current group
     */
    prefix?: string;

    /**
     * Link of current group
     */
    link?: string;

    /**
     * Whether current group is collapsible
     *
     * @default false
     */
    collapsible?: boolean;

    children: "structure";
  }

  type SidebarItem =
    | SidebarPageItem
    | SidebarGroupItem
    | SidebarStructureItem
    | string;

  type SidebarArrayConfig = SidebarItem[];

  type SidebarObjectConfig = Record<
    string,
    SidebarArrayConfig | "structure" | false
  >;

  type SidebarConfig = SidebarArrayConfig | SidebarObjectConfig;
  ```

- Details: [Layout → Sidebar](../../guide/layout/sidebar.md)

Sidebar config

## locales

- Type: `Record<string, ThemeLocaleOptions>`
- Details:
  - [Theme I18n Config](./i18n.md)

I18n config of the theme, where you can set options for each language separately.

### hotReload

- Type: `boolean`
- Default: Whether using `--debug` flag

Whether to enable hot reload in the development server.
