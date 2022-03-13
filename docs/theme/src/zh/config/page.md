---
title: 页面配置
icon: config
category:
  - 配置
tag:
  - 主题配置
  - Frontmatter
---

页面的 frontmatter 新增如下配置选项:

## 信息类

### title

- 类型: `string`
- 必填: 否

当前页面内容标题，默认为 Markdown 文件中的第一个 h1 标签内容。

### description

- 类型: `string`
- 必填: 否

当前页面内容描述。

### icon

- 类型: `string`
- 必填: 否

当前页面图标的 FontClass (建议填写)。

### author

- 类型: `Author | boolean`
- 必填: 否

```ts
type AuthorInfo = { name: string; url?: string };

type Author = string | string[] | AuthorInfo | AuthorInfo[];
```

作者，如果不填，则会回退到默认作者。

::: tip

在主题配置中指定默认作者时，可以设置 `false` 以防止显示默认作者。

:::

### isOriginal

- 类型: `boolean`
- 默认: `false`

当前文章是否为原创。

### date

- 类型: `DateString`
- 必填: 否
- 格式: `YYYY-MM-DD` 或 `YYYY/MM/DD hh:mm:ss`

写作时间。

### category

- 类型: `string | string[]`
- 必填: 否

分类。

### tags

- 类型: `string | string[]`
- 必填: 否

标签。

### sticky

- 类型: `boolean | number`
- 默认值: `false`

是否在列表中置顶。当填入数字时，数字越大，排名越靠前。

### star

- 类型: `boolean | number`
- 默认值: `false`

是否收藏在博客主题的文章列表中。当填入数字时，数字越大，排名越靠前。

### article

- 类型: `boolean`
- 默认: `true`

是否将该文章添加至文章列表中。

### timeline

- 类型: `boolean`
- 默认: `true`

是否将该文章添加至时间线中。

### image

- 类型: `string`
- 必填: 否

设置预览图(分享图)，请填入绝对路径。

## 组件与布局

### pageInfo

- 类型: `PageInfo[] | false`
- 默认值: 主题配置中的值

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

### pageview

- 类型: `boolean`
- 默认值: 主题配置中的值

是否显示浏览量。

::: tip

显示浏览量功能需要你拥有有效的 Waline 评论服务配置。

:::

### breadcrumb

- 类型: `boolean`
- 默认值: 主题配置中的值

是否开启路径导航。

### breadcrumbIcon

- 类型: `boolean`
- 默认值: 主题配置中的值

是否开启路径导航图标。

### navbar

- 类型: `boolean`

导航栏配置，填入 `false` 会禁用导航栏

### sidebar

- 类型: `"heading" | false`

侧边栏配置选项。支持 `"heading"` 或 `false`。

### headingDepth

- 类型: `number`
- 默认值: `2`

标题渲染深度。

### comment

- 类型: `boolean`
- 默认值: 主题配置中的值

当前页面是否开启评论功能。

### lastUpdated

- 类型: `boolean`
- 默认值: 主题配置中的值

是否显示最后更新时间。

### editLink

- 类型: `boolean`
- 默认值: 主题配置中的值

是否显示编辑链接。

### contributors

- 类型: `boolean`
- 默认值: 主题配置中的值

是否显示贡献者。

### prev

- 类型: `string | false`

  ```ts
  interface AutoLink {
    text: string;
    icon: string;
    link: string;
  }
  ```

上一篇文章链接。

### next

- 类型: `string | false`

  ```ts
  interface AutoLink {
    text: string;
    icon: string;
    link: string;
  }
  ```

下一篇文章链接。

### footer

- 类型: `boolean | string | HTMLString`

设置页脚内容。

- 设置为 `false` 以禁用页脚
- 设置为 `""` 以移除默认的页脚内容，
- 设置为 `true` 以使用默认页脚。

更多详情请看 [页面 → 页脚支持](../guide/layout/footer.md)

### copyright

- 类型: `string | false`
- 默认值: 主题配置中的值

设置版权信息，更多详情请看 [页面 → 页脚支持](../guide/layout/footer.md)

### backToTop

- 类型: `boolean`
- 默认值: `true`

设置是否显示返回顶部按钮

### toc

- 类型: `boolean`
- 默认值: 主题配置中的值

设置在桌面模式下是否在右侧显示标题列表。

### containerClass

- 类型: `string`
- 必填: 否

额外的页面容器 Class。

### layout

- 类型: `string`
- 默认: `"Layout"`

页面的自定义布局名称。
