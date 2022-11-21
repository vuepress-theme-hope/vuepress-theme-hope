---
title: 主题基本选项
icon: config
order: 1
category:
  - 配置
tag:
  - 主题配置
  - 基础
---

::: danger

这些选项很重要，需要你正确配置。

:::

## hostname <Badge text="仅限 Root" type="warning" />

- 类型: `string`
- 必填: 是

当前网站部署到的域名。

::: tip

它应该包含完整协议 (如: `https://example.com`)。

:::

## author

- 类型: `Author`

  ```ts
  type AuthorName = string;

  interface AuthorInfo {
    /**
     * 作者姓名
     */
    name: string;

    /**
     * 作者网站
     */
    url?: string;

    /**
     * 作者 Email
     */
    email?: string;
  }

  type Author = AuthorName | AuthorName[] | AuthorInfo | AuthorInfo[];
  ```

- 必填: 否

文章显示的默认作者

## navbar

- 类型: `HopeThemeNavbarConfig`

  ```ts
  interface TextItem {
    /**
     * 项目文字
     */
    text: string;

    /**
     * 项目图标
     */
    icon?: string;

    /**
     * 项目无障碍标签
     */
    ariaLabel?: string;
  }

  interface AutoLink extends TextItem {
    /**
     * 当前页面链接
     */
    link: string;

    /**
     * `<a>` 标签的 `rel` 属性
     */
    rel?: string;

    /**
     * `<a>` 标签的 `target` 属性
     */
    target?: string;

    /**
     * 匹配激活的正则表达式
     */
    activeMatch?: string;
  }

  interface HopeThemeNavGroup<T> extends TextItem {
    /**
     * 当前分组的页面前缀
     */
    prefix?: string;

    /**
     * 当前分组的链接
     */
    link?: string;

    /**
     * 当前分组的子项
     */
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

- 详情: [布局 → 导航栏](../../guide/layout/navbar.md)

导航栏配置

## sidebar

- 类型: `HopeThemeSidebarConfig`

  ```ts
  interface TextItem {
    /**
     * 项目文字
     */
    text: string;

    /**
     * 项目图标
     */
    icon?: string;

    /**
     * 项目无障碍标签
     */
    ariaLabel?: string;
  }

  interface AutoLink extends TextItem {
    /**
     * 当前页面链接
     */
    link: string;

    /**
     * `<a>` 标签的 `rel` 属性
     */
    rel?: string;

    /**
     * `<a>` 标签的 `target` 属性
     */
    target?: string;

    /**
     * 匹配激活的正则表达式
     */
    activeMatch?: string;
  }

  type HopeThemeSidebarPageItem = AutoLink;

  interface HopeThemeSidebarGroupItem extends TextItem {
    /**
     * 当前分组的页面前缀
     */
    prefix?: string;

    /**
     * 当前分组的链接
     */
    link?: string;

    /**
     * 当前分组的链接是否可折叠
     *
     * @default false
     */
    collapsible?: boolean;

    /**
     * 当前分组的子项
     */
    children: (
      | HopeThemeSidebarPageItem
      | HopeThemeSidebarGroupItem
      | HopeThemeSidebarStructureItem
      | string
    )[];
  }

  interface HopeThemeSidebarStructureItem extends TextItem {
    /**
     * 当前分组的页面前缀
     */
    prefix?: string;

    /**
     * 当前分组的链接
     */
    link?: string;

    /**
     * 当前分组的链接是否可折叠
     *
     * @default false
     */
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

- 详情: [布局 → 侧边栏](../../guide/layout/sidebar.md)

侧边栏配置

## locales

- 类型: `Record<string, HopeThemeLocaleOptions>`
- 详情:
  - [主题多语言配置](./i18n.md)

主题的多语言配置，你可以在这里分别为每个语言设置单独的选项。
