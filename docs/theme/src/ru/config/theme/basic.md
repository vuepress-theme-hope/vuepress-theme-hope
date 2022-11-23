---
title: Основные опции темы
icon: config
order: 2
category:
  - Конфиг
tag:
  - Основы
  - ThemeConfig
---

::: danger

Эти параметры важны и требуют правильной настройки.

:::

<!-- more -->

## hostname <Badge text="Только root" type="warning" />

- Тип: `string`
- Обязательный: Да

Домен, на который будет развернут сайт.

::: tip

Он должен содержать полный протокол (например: `https://example.com`).

:::

## author

- Тип: `Author`

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

- Обязательный: Нет

Глобальный автор по умолчанию.

## navbar

- Тип: `NavbarConfig`

  ```ts
  interface TextItem {
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

  interface AutoLink extends TextItem {
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

  interface NavGroup<T> extends TextItem {
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

  type NavbarItem = AutoLink;
  type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>;
  type NavbarConfig = (NavbarItem | NavbarGroup | string)[];
  ```

- Детали: [Макет → Панель навигации](../../guide/layout/navbar.md)

Конфигурация панели навигации

## sidebar

- Тип: `SidebarConfig`

  ```ts
  interface TextItem {
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

  interface AutoLink extends TextItem {
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

  type SidebarPageItem = AutoLink;

  interface SidebarGroupItem extends TextItem {
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

  interface SidebarStructureItem extends TextItem {
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

- Детали: [Макет → Боковая панель](../../guide/layout/sidebar.md)

Конфигурация боковой панели

## locales

- Тип: `Record<string, ThemeLocaleOptions>`
- Детали:
  - [Конфигурация мультиязыка темы](./i18n.md)

I18n конфиг темы, где можно задать параметры для каждого языка отдельно.
