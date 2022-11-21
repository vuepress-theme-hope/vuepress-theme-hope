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

- Тип: `HopeThemeNavbarConfig`

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

- Детали: [Макет → Панель навигации](../../guide/layout/navbar.md)

Конфигурация панели навигации

## sidebar

- Тип: `HopeThemeSidebarConfig`

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
    collapsible?: boolean;
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
    collapsible?: boolean;
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

- Детали: [Макет → Боковая панель](../../guide/layout/sidebar.md)

Конфигурация боковой панели

## locales

- Тип: `Record<string, HopeThemeLocaleOptions>`

I18n конфиг темы, где можно задать параметры для каждого языка отдельно.
