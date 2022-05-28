---
title: 布局 Frontmatter 配置
icon: config
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

文章信息展示项目。

## pageview

- 类型: `boolean`
- 默认值: 主题选项中的值

是否显示浏览量。

::: tip

显示浏览量功能需要你拥有有效的 Waline 评论服务配置。

:::

## breadcrumb

- 类型: `boolean`
- 默认值: 主题选项中的值

是否开启路径导航。

## breadcrumbIcon

- 类型: `boolean`
- 默认值: 主题选项中的值

是否开启路径导航图标。

## navbar

- 类型: `boolean`

导航栏配置，填入 `false` 会禁用导航栏

## sidebar

- 类型: `"heading" | false`

侧边栏配置选项。支持 `"heading"` 或 `false`。

## headerDepth

- 类型: `number`
- 默认值: `2`

标题渲染深度。

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

## prev

- 类型: `string | false`

  ```ts
  interface AutoLink {
    text: string;
    icon: string;
    link: string;
  }
  ```

上一篇文章链接。

## next

- 类型: `string | false`

  ```ts
  interface AutoLink {
    text: string;
    icon: string;
    link: string;
  }
  ```

下一篇文章链接。

## footer

- 类型: `boolean | string | HTMLString`

设置页脚内容。

- 设置为 `false` 以禁用页脚
- 设置为 `""` 以移除默认的页脚内容，
- 设置为 `true` 以使用默认页脚。

更多详情请看 [页面 → 页脚支持](../../guide/layout/footer.md)

## copyright

- 类型: `string | false`
- 默认值: 主题选项中的值

设置版权信息，更多详情请看 [页面 → 页脚支持](../../guide/layout/footer.md)

## backToTop

- 类型: `boolean`
- 默认值: `true`

设置是否显示返回顶部按钮

## toc

- 类型: `boolean`
- 默认值: 主题选项中的值

设置在桌面模式下是否在右侧显示标题列表。

## containerClass

- 类型: `string`
- 必填: 否

额外的页面容器 Class。

## layout

- 类型: `string`
- 默认: `"Layout"`

页面的自定义布局名称。
