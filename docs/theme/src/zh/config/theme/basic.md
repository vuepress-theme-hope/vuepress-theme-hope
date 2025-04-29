---
title: 主题基本选项
icon: circle-info
order: 1
category:
  - 配置
tag:
  - 主题配置
  - 基础
---

::: caution

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

- 详情:
  - [功能 → 页面信息](../../guide/feature/page-info.md#作者)

文章显示的默认作者

## license

- 类型: `string`
- 必填: 否
- 详情:
  - [布局 → 页脚](../../guide/layout/footer.md#版权信息)

站点的默认协议

## favicon

- 类型: `string`
- 必填: 否

站点图标

## navbar {#navbar-header}

- 类型: `NavbarOptions`

  ```ts
  /**
   * Base nav item, displayed as text
   */
  export interface NavItemOptions {
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

  /**
   * Options for `<AutoLink>`
   */
  export interface AutoLinkOptions extends NavItemOptions {
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

    /**
     * 是否仅在完全匹配时激活
     */
    exact?: boolean;
  }

  /**
   * Base nav group, has nav items children
   */
  export interface NavGroup<T> extends NavItemOptions {
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

  // Navbar types

  // types for NavbarItem
  export type NavbarLinkOptions = AutoLinkOptions;
  // types for NavbarDropdown
  export type NavbarGroupOptions = NavGroup<
    NavbarLinkOptions | NavGroup<NavbarLinkOptions> | string
  >;
  // types for navbar options
  export type NavbarOptions = (
    | NavbarLinkOptions
    | NavbarGroupOptions
    | string
  )[];
  ```

- 详情: [布局 → 导航栏](../../guide/layout/navbar.md)

导航栏配置

## sidebar {#sidebar-header}

- 类型: `SidebarOptions`

  ```ts
  /**
   * Base nav item, displayed as text
   */
  export interface NavItemOptions {
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

  /**
   * Options for `<AutoLink>`
   */
  export interface AutoLinkOptions extends NavItemOptions {
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

    /**
     * 是否仅在完全匹配时激活
     */
    exact?: boolean;
  }

  export type SidebarLinkOptions = AutoLinkOptions;

  export interface SidebarGroupOptions extends NavItemOptions {
    /**
     * 当前分组的页面前缀
     */
    prefix?: string;

    /**
     * 当前分组的链接
     */
    link?: string;

    /**
     * 当前分组的链接是否默认展开
     *
     * @default false
     */
    expanded?: boolean;

    /**
     * 当前分组的链接是否可折叠
     *
     * @default false
     */
    collapsible?: boolean;

    /**
     * 当前分组的子项
     */
    children: SidebarItemOptions[];
  }

  export interface SidebarStructureOptions extends NavItemOptions {
    /**
     * 当前分组的页面前缀
     */
    prefix?: string;

    /**
     * 当前分组的链接
     */
    link?: string;

    /**
     * 当前分组的链接是否默认展开
     *
     * @default false
     */
    expanded?: boolean;

    /**
     * 当前分组的链接是否可折叠
     *
     * @default false
     */
    collapsible?: boolean;

    children: "structure";
  }

  export type SidebarItemOptions =
    | SidebarLinkOptions
    | SidebarGroupOptions
    | SidebarStructureOptions
    | string;

  export type SidebarArrayOptions = SidebarItemOptions[];

  export type SidebarObjectOptions = Record<
    string,
    SidebarArrayOptions | "structure" | false
  >;

  export type SidebarOptions =
    | SidebarArrayOptions
    | SidebarObjectOptions
    | "structure"
    | false;
  ```

- 详情: [布局 → 侧边栏](../../guide/layout/sidebar.md)

侧边栏配置

## locales <Badge text="仅限 Root" type="warning" />

- 类型: `Record<string, ThemeLocaleOptions>`
- 详情:
  - [主题多语言配置](./i18n.md)

主题的多语言配置，你可以在这里分别为每个语言设置单独的选项。

## extraLocales <Badge text="仅限 Root" type="warning" />

- 类型: `Record<string, string>`

站点的额外语言环境，其中键名是语言名称，值是站点路径，`:route` 将替换为当前路由路径。

## hotReload <Badge text="仅限 Root" type="warning" />

- 类型: `boolean`
- 默认值: 是否在使用 `--debug` 标识

是否需要在开发服务器启用完整功能与热更新。
是否在开发服务器中启用热重载。

::: tip

通常，你会希望:

- 开发服务器可以被尽快启动
- 对项目的修改可以在开发服务器上快速生效，并避免重新启动整个 VuePress 应用程序。

为了达到这个预期，主题需要在开发服务器启动时跳过一些耗时操作并在页面更新时绕过一些耗时功能，以提高项目启动和热更新的速度。同时，由于一些修改会改变 VuePress 的底层原始数据，这些修改会导致网页刷新并重新加载整个 VuePress 应用程序。为了避免在修改 Markdown 时频繁的页面重新加载 (即: 触发页面刷新并且获得几秒钟的白屏)，该主题禁用了开发服务器上的某些功能。

默认情况下，开发服务器拥有以下限制:

- 不启用基于 Git 的功能，包括贡献者、自动创建日期和最后更新时间 (调用 Git 程序以及文件 IO 会导致高耗时)
- 结构化侧边栏只会在应用启动时生成，后续不会更新 (侧边栏排序和索引取决于每个页面 frontmatter，Markdown 内容的任何变化都会触发重新计算，因此大量页面会导致高耗时)
- 博客文章、标签、分类和每个分类中的文章列表不会随着开发服务器更新 (Markdown 内容的任何变化都会触发重新计算，所以大量的页面会导致高耗时)
- 博客文章信息不含阅读时间和字数信息 (Markdown 内容的任何更改都会更改页面字数信息，并因更新了 VuePress 底层原始数据导致页面刷新)

启用它意味着你接受每次修改都会触发一些高耗时计算并且整个应用程序将重新启动，这通常会导致页面刷新，并在在性能较弱的环境中获得数秒白屏。

:::
