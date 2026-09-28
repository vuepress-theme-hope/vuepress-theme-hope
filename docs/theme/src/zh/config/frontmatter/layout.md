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

## 选项 {#options}

:::: fields
@`pageInfo` type=`PageInfo[] | false` default="主题选项中的值"

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

参考：[功能 → 页面信息](../../guide/feature/page-info.md)。

@`breadcrumb` type=boolean default="主题选项中的值"

是否开启路径导航。

参考：[布局 → 页面](../../guide/layout/page.md#路径导航)。

@`breadcrumbIcon` type=boolean default="主题选项中的值"

是否在路径导航中显示图标。

参考：[布局 → 页面](../../guide/layout/page.md#路径导航)。

@`breadcrumbExclude` type=boolean

当前页面是否被路径导航排除。

参考：[布局 → 页面](../../guide/layout/page.md#路径导航)。

@`navbar` type=boolean

填入 `false` 会禁用导航栏。

参考：[布局 → 导航栏](../../guide/layout/navbar.md#禁用导航栏)。

@`sidebar` type=`false | SidebarArrayOptions`

填入 `false` 会禁用侧边栏，设置为空数组 `[]` 会只渲染侧边栏的插槽内容。

参考：[布局 → 侧边栏](../../guide/layout/sidebar.md#禁用侧边栏)。

@`index` type=boolean default=`true`

是否在侧边栏或目录中索引当前页面。

@`order` type=number

指定当前页面在侧边栏或目录中的排序:

- 当填写正数的时候，页面将排在靠前的位置，数字越小出现的位置越前。
- 当填写负数的时候，页面将排在靠后的位置，数字越大出现的位置越前（比如 -1 在 -2 之后）。

@`dir` type=object

用于 [结构侧边栏](../../guide/layout/sidebar.md) 的分组信息。

@@`dir.text` type=string default="`README.md` 的标题"

分组标题。

@@`dir.icon` type=string default="`README.md` 的图标"

分组图标。

@@`dir.collapsible` type=boolean default=`true`

分组是否可折叠。

@@`dir.link` type=boolean

分组是否可点击。

::: note

设置为 `true` 意味着将分组链接设置为 `README.md` 链接。

:::

@@`dir.index` type=boolean default=`true`

是否索引当前目录。

@@`dir.order` type=number

分组在侧边栏的顺序:

- 填写正数，页面会出现在最前，较小的数字会出现在前面。
- 填写负数，页面会出现在最后，较大的数字会出现在前面。 (如 -1 在 -2 之后)

@`comment` type=boolean default="主题选项中的值"

当前页面是否开启评论功能。

@`lastUpdated` type=boolean default="主题选项中的值"

是否显示最后更新时间。

@`editLink` type=boolean default="主题选项中的值"

是否显示编辑链接。

@`contributors` type=boolean default="主题选项中的值"

是否显示贡献者。

@`changelog` type=boolean default="主题选项中的值"

是否显示变更日志。

@`prev` type=`AutoLinkConfig | string | false`

上一篇文章链接。

@@`prev.text` type=string required

链接文字。

@@`prev.icon` type=string required

链接图标。

@@`prev.link` type=string required

链接地址。

@`next` type=`AutoLinkConfig | string | false`

下一篇文章链接。

@@`next.text` type=string required

链接文字。

@@`next.icon` type=string required

链接图标。

@@`next.link` type=string required

链接地址。

@`footer` type=`boolean | string | HTMLString`

页脚内容:

- 设置为 `false` 以禁用页脚
- 设置为 `""` 以移除默认的页脚内容
- 设置为 `true` 以使用默认页脚

参考：[布局 → 页脚](../../guide/layout/footer.md)。

@`copyright` type=`string | false` default="主题选项中的值"

版权信息。

参考：[布局 → 页脚](../../guide/layout/footer.md)。

@`backToTop` type=boolean default=`true`

是否显示返回顶部按钮。

@`toc` type=`GetHeadersOptions | boolean` default="主题选项中的值"

是否显示标题列表。

@@`toc.selector` type=string default=`'#markdown-content >  h1, #markdown-content > h2, #markdown-content > h3, #markdown-content > h4, #markdown-content > h5, #markdown-content > h6, [vp-content] > h2'`

标题的选择器。

@@`toc.ignore` type=`string[]` default=`['.vp-badge', '.vp-icon']`

忽略标题中的特定元素，应是一个 CSS 选择器数组。

@@`toc.levels` type=`HeaderLevels` default=`'deep'`

标题的级别。`1` 到 `6` 对应 `<h1>` 到 `<h6>`:

- `false`: 不显示标题列表
- `number`: 仅显示该级别的标题
- `[number, number]`: 标题级别元组，第一个数字应小于第二个数字，例如 `[2, 4]`，表示显示所有 `<h2>` 到 `<h4>` 的标题。
- `'deep'`: 和 `[2, 6]` 相同，表示显示所有 `<h2>` 到 `<h6>` 的标题。

@`containerClass` type=string

额外的页面容器 Class。

@`layout` type=string default=`'Layout'`

页面的自定义布局名称。

::::
