---
title: Theme Basic Options
icon: circle-info
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

It should contain full protocol (e.g. `https://example.com`).

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

## favicon

- Type: `string`
- Required: No

Site favicon.

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

## locales <Badge text="Root only" type="warning" />

- Type: `Record<string, ThemeLocaleOptions>`
- Details:
  - [Theme I18n Config](./i18n.md)

I18n config of the theme, where you can set options for each language separately.

## extraLocales <Badge text="Root only" type="warning" />

- Type: `Record<string, string>`

Extra locales for the site, where key is the language name and value is the site path, `:route` will be replaced by current route path.

## hotReload <Badge text="Root only" type="warning" />

- Type: `boolean`
- Default: Whether using `--debug` flag

Whether to enable hot reload in the devServer.

::: tip

Normally, you will expect:

- devServer can be started as soon as possible
- changes in markdown can take effect fast on the devServer, and avoid restarting the entire VuePress application.

In order to achieve this expectation, the theme needs to skip some time-consuming operations on the devServer, and it needs to disable some time-consuming functions that are triggered by page modifications on the devServer to improve the speed of project startup and hot update. At the same time, because some modifications will change the underlying raw data of VuePress, these modifications will cause the web page refresh and reload the entire VuePress application. In order to avoid frequent page reloads (i.e.: Page refresh is triggered, and you are getting a blank screen for a few seconds) when modifying Markdown, the theme disables some features on the devServer.

By default, devServer has the following limitations:

- Git-based features will not be enabled, including contributors, automatic creating date and last update time (Calling Git binary and making file IO causes high time consumption)
- The structured sidebar will only be generated when the application starts, and will not be updated subsequently (Sidebar sorting and indexing depends on every page frontmatter, any change in Markdown content will trigger recalculation, so large number of pages will result high time consumption)
- Blog articles, tags, categories and lists of articles in each category will not be updated with the devServer (Any change in Markdown content will trigger recalculation, so large number of pages will result high time consumption)
- ReadingTime and Word Info in blog article information are not injected (Any change in Markdown content will change the page word count information, so a VuePress underlying raw data is updated causing page refresh)

Enabling it means you accept that every modification will trigger some expensive recalculations and the whole application will restart, which usually results refreshing the page and a few seconds of blank screen in environments with weak performance.

:::
