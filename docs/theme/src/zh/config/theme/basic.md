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

- 类型: `NavbarConfig`

  ```ts
  interface TextItemOptions {
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

  interface AutoLinkOptions extends TextItemOptions {
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

  interface NavGroup<T> extends TextItemOptions {
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

  type NavbarItem = AutoLinkOptions;
  type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>;
  type NavbarConfig = (NavbarItem | NavbarGroup | string)[];
  ```

- 详情: [布局 → 导航栏](../../guide/layout/navbar.md)

导航栏配置

## sidebar

- 类型: `SidebarConfig`

  ```ts
  interface TextItemOptions {
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

  interface AutoLinkOptions extends TextItemOptions {
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

  type SidebarPageItem = AutoLinkOptions;

  interface SidebarGroupItem extends TextItemOptions {
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
      | SidebarPageItem
      | SidebarGroupItem
      | SidebarStructureItem
      | string
    )[];
  }

  interface SidebarStructureItem extends TextItemOptions {
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

- 详情: [布局 → 侧边栏](../../guide/layout/sidebar.md)

侧边栏配置

## locales

- 类型: `Record<string, ThemeLocaleOptions>`
- 详情:
  - [主题多语言配置](./i18n.md)

主题的多语言配置，你可以在这里分别为每个语言设置单独的选项。

### hotReload

- 类型: `boolean`
- 默认值: 是否在使用 `--debug` 标识

是否需要在开发服务器启用完整功能与热更新。

::: tip

通常情况下，你会希望尽快启动开发服务器，并且你对项目的修改可以在开发服务器上以较快的方式生效，并且尽量避免整个 VuePress 应用的重启。

为了实现这一期待，主题需要在开发服务器跳过一些高耗时的操作，并且需要在开发服务器上禁用一些会被页面修改触发的高耗时功能，以提升项目启动和热更新速度。同时，由于一些修改会涉及 VuePress 的底层原始数据，进而导致这些修改导致网页需要刷新重载整个页面应用，为了避免你在修改 Markdown 时频繁触发重载导致页面每次重新加载 (也就是触发整个页面刷新导致白屏再重新显示)，主题会在开发服务器上禁用这些功能。

所以默认情况下，开发服务器的表现拥有以下限制:

- 基于 Git 的功能不会被启用，包括贡献者、自动写作日期与最后更新时间 (涉及调用 Git 程序与文件 IO 导致高耗时)
- 结构化侧边栏仅会在应用启动时生成，不会后续更新 (因排序和索引涉及 frontmatter，任一 Markdown 内容变更都会触发重新计算，页面数庞大会导致高耗时)
- 博客的文章、标签、分类以及各类别文章列表不会随开发服务器更新 (任一 Markdown 内容变更都会触发重新计算，页面数庞大会导致高耗时)
- 博客文章信息中的阅读时间 (因包含字数信息任一 Markdown 内容变更都会触发，涉及 VuePress 底层依赖文件)

启用它意味着你接受每一个修改都会都会触发一些高耗时计算并重启 Vite 服务器，而前述情况通常会在性能较弱的运行环境里导致网页重新刷新并白屏数秒。

:::
