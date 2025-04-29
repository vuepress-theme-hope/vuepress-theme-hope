---
title: 布局 Frontmatter 配置
icon: object-group
order: 2
category:
  - 配置
tag:
  - Frontmatter
  - 布局
---

你可以在页面的 frontmatter 配置以下选项控制页面布局。

## pageInfo

- 类型: `PageInfo[] | false`
- 默认值: 主题选项中的值
- 详情:
  - [功能 → 页面信息](../../guide/feature/page-info.md)

自定义当前页面的页面信息。

`PageInfo` 可选的值和对应内容如下:

| 条目            | 对应内容     | 页面 frontmatter 值         |
| --------------- | ------------ | --------------------------- |
| `"Author"`      | 作者         | `author`                    |
| `"Date"`        | 写作日期     | `date`                      |
| `"Original"`    | 是否原创     | `isOriginal`                |
| `"Category"`    | 分类         | `category`                  |
| `"Tag"`         | 标签         | `tag`                       |
| `"ReadingTime"` | 预计阅读时间 | N/A(自动生成)               |
| `"Word"`        | 字数         | N/A(自动生成)               |
| `"PageView"`    | 访问量       | `pageview` (仅 Waline 可用) |

## breadcrumb

- 类型: `boolean`
- 默认值: 主题选项中的值
- 详情:
  - [布局 → 页面](../../guide/layout/page.md#路径导航)

是否开启路径导航。

## breadcrumbIcon

- 类型: `boolean`
- 默认值: 主题选项中的值
- 详情:
  - [布局 → 页面](../../guide/layout/page.md#路径导航)

是否在路径导航中显示图标。

## breadcrumbExclude

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [布局 → 页面](../../guide/layout/page.md#路径导航)

当前页面是否被路径导航排除。

## navbar {#navbar-header}

- 类型: `boolean`
- 详情:
  - [布局 → 导航栏](../../guide/layout/navbar.md#禁用导航栏)

填入 `false` 会禁用导航栏

## sidebar {#sidebar-header}

- 类型: `boolean`
- 详情:
  - [布局 → 侧边栏](../../guide/layout/sidebar.md#禁用侧边栏)

填入 `false` 会禁用侧边栏，设置为空数组 `[]` 会只渲染侧边栏的插槽内容。

## index

- 类型: `boolean`
- 默认值: `true`

是否在侧边栏或目录中索引当前页面。

## order

- 类型: `number`

指定当前页面在侧边栏或目录中的排序

- 当填写正数的时候，页面将排在靠前的位置，数字越小出现的位置越前。
- 当填写负数的时候，页面将排在靠后的位置，数字越大出现的位置越前（比如 -1 在 -2 之后）。

## dir

用于 [结构侧边栏](../../guide/layout/sidebar.md) 的分组信息。

### dir.text

- 类型: `string`
- 默认值: `README.md` 的标题

分组标题。

### dir.icon

- 类型: `string`
- 默认值: `README.md` 的图标

分组图标。

### dir.collapsible

- 类型: `boolean`
- 默认值: `true`

分组是否可折叠。

### dir.link

- 类型: `boolean`
- 默认值: `false`

分组是否可点击

::: note

设置为 `true` 意味着将分组链接设置为 `README.md` 链接。

:::

### dir.index

- 类型: `boolean`
- 默认值: `true`

是否索引当前目录

### dir.order

- 类型: `number`

分组在侧边栏的顺序

- 填写正数，页面会出现在最前，较小的数字会出现在前面。
- 填写负数，页面会出现在最后，较大的数字会出现在前面。 (如 -1 在 -2 之后)

## comment

- 类型: `boolean`
- 默认值: 主题选项中的值

当前页面是否开启评论功能。

## lastUpdated

- 类型: `boolean`
- 默认值: 主题选项中的值

是否显示最后更新时间。

## editLink

- 类型: `boolean`
- 默认值: 主题选项中的值

是否显示编辑链接。

## contributors

- 类型: `boolean`
- 默认值: 主题选项中的值

是否显示贡献者。

## changelog

- 类型: `boolean`
- 默认值: 主题选项中的值

是否显示变更日志。

## prev

- 类型: `AutoLinkConfig | string | false`

  ```ts
  interface AutoLinkConfig {
    text: string;
    icon: string;
    link: string;
  }
  ```

上一篇文章链接。

## next

- 类型: `AutoLinkConfig | string | false`

  ```ts
  interface AutoLinkConfig {
    text: string;
    icon: string;
    link: string;
  }
  ```

下一篇文章链接。

## footer

- 类型: `boolean | string | HTMLString`

页脚内容。

- 设置为 `false` 以禁用页脚
- 设置为 `""` 以移除默认的页脚内容，
- 设置为 `true` 以使用默认页脚。

更多详情请看 [页面 → 页脚支持](../../guide/layout/footer.md)

## copyright

- 类型: `string | false`
- 默认值: 主题选项中的值

版权信息。

更多详情请看 [页面 → 页脚支持](../../guide/layout/footer.md)

## backToTop

- 类型: `boolean`
- 默认值: `true`

是否显示返回顶部按钮

## toc {#toc-heading}

- 类型: `GetHeadersOptions | boolean`

  ```ts
  export interface GetHeadersOptions {
    /**
     * 标题的选择器
     *
     * @default "#markdown-content >  h1, #markdown-content > h2, #markdown-content > h3, #markdown-content > h4, #markdown-content > h5, #markdown-content > h6, [vp-content] > h2"
     */
    selector?: string;
    /**
     * 忽略标题中的特定元素，应是一个 CSS 选择器数组
     *
     * @default [".vp-badge", ".vp-icon"]
     */
    ignore?: string[];
    /**
     * 标题的级别
     *
     * `1` 到 `6` 对应 `<h1>` 到 `<h6>`
     *
     * - `false`: 不显示标题列表
     * - `number`: 仅显示该级别的标题
     * - `[number, number]: 标题级别元组，第一个数字应小于第二个数字，例如 `[2, 4]`，表示显示所有 `<h2>` 到 `<h4>` 的标题。
     * - `deep`: 和 `[2, 6]` 相同，表示显示所有 `<h2>` 到 `<h6>` 的标题。
     *
     * @default "deep"
     */
    levels?: HeaderLevels;
  }
  ```

- 默认值: 主题选项中的值

是否显示标题列表。

## containerClass

- 类型: `string`
- 必填: 否

额外的页面容器 Class。

## layout

- 类型: `string`
- 默认值: `"Layout"`

页面的自定义布局名称。
