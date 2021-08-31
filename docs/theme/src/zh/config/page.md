---
title: 页面配置
icon: config
category: config
tags:
  - config
  - frontmatter
---

页面的 frontmatter 新增如下配置选项:

## 页面信息配置

### icon

- 类型: `string`
- 必填: 否

设置当前页面图标的 FontClass (建议填写)

### title

- 类型: `string`
- 必填: 否

设置当前页面内容标题，默认为 Markdown 文件中的第一个 h1 标签内容。

### description

- 类型: `string`
- 必填: 否

设置当前页面内容描述。

### author

- 类型: `string | boolean`
- 必填: 否

显示当前页面的作者，如果不填，则会回退到默认作者。

::: tip

当全局默认作者启用时，可以设置 `false` 取消作者显示

:::

### original

- 类型: `boolean`
- 默认: `false`

当前文章是否为原创。

### time

- 类型: `timeString | string`
- 必填: 否
- 格式: `YYYY-MM-DD` 或 `YYYY/MM/DD hh:mm:ss`

设置当前页面的写作时间。

::: warning

尽管本主题及 Mister-Hope 的其他插件会正确解析你输入的时间，如 `YYYY/MM/DD hh:mm` `YYYY-MM-DD hh:mm` `YYYY/MM/DD` 等，但是其他插件可能不能正确的读取他们。使用非标准格式的值可能会导致其他插件报错，

:::

### category

- 类型: `string`
- 必填: 否

设置当前页面的分类

### tags

- 类型: `string | string[]`
- 必填: 否

设置当前页面的标签

### sticky

- 类型: `boolean | number`
- 默认值: `false`

设置当前文章是否在列表中置顶。当填入数字时，数字越大，排名越靠前。

### star

- 类型: `boolean | number`
- 默认值: `false`

设置当前文章是否收藏在博客主题的文章列表中。当填入数字时，数字越大，排名越靠前。

### article

- 类型: `boolean`
- 默认: `true`

是否将该文章添加至文章列表中。

### timeline

- 类型: `boolean`
- 默认: `true`

是否将该文章添加至时间线中。

### password

- 类型: `string`
- 必填: 否

设置当前文章的密码。

::: warning

请注意，由于密码会进行二次混淆加密，请确保密码是字符串格式。`'1234'` 和 `1234` 混淆后产生的结果是不同的。

:::

### image

- 类型: `string`
- 必填: 否

设置当前页面的预览图(分享图)，请填入绝对路径。

### copyright.minLength

- 类型: `number`
- 默认值: `100`

触发版权信息或禁止复制动作的最少字符数。

### copyright.noCopy

- 类型: `boolean`
- 默认值: `false`

是否禁止复制

### copyright.noSelect

- 类型: `boolean`
- 默认值: `false`

是否禁止选中文字

## 页面显示配置

### pageInfo

- 类型: `PageInfo[] | false`
- 默认值: 全局中配置的值 (全局默认为 `['author', 'visitor', 'time', 'category', 'tag', 'reading-time']`)

`PageInfo` 可选的值和对应内容如下:

| 条目             | 对应内容     | 页面 frontmatter 值     |
| ---------------- | ------------ | ----------------------- |
| `'author'`       | 作者         | author                  |
| `'time'`         | 写作日期     | time                    |
| `'category'`     | 分类         | category                |
| `'tag'`          | 标签         | tags                    |
| `'reading-time'` | 预计阅读时间 | N/A(自动生成)           |
| `'word'`         | 字数         | N/A(自动生成)           |
| `'visitor'`      | 访问量       | visitor(仅 Valine 可用) |

设置当前页面的文章信息内容

### visitor

- 类型: `boolean`
- 默认值: 全局中配置的值 (配置全局的 `comment` 为 `'valine'` 后默认为 `true`)

当前页面是否显示浏览量

::: tip

显示浏览量功能需要你正确配置了 Valine 类型的评论配置。

:::

### breadcrumb

- 类型: `boolean`
- 默认值: 全局中配置的值 (全局默认为 `true`)

当前页面是否开启路径导航

### breadcrumbIcon

- 类型: `boolean`
- 默认值: 全局中配置的值 (全局默认为 `true`)

当前页面是否开启路径导航图标

### navbar

- 类型: `boolean`

页面的导航栏配置，填入 `false` 会禁用导航栏

### sidebar

- 类型: `false | 'auto'`

页面的侧边栏配置选项。支持 `false` 或 `auto`。

### sidebarDepth

- 类型: `number`
- 默认值: `2`

该页面的侧边栏渲染深度

### comment

- 类型: `boolean`
- 默认值: 全局中配置的值 (配置全局的 `comment` 后默认为 `true`)

当前页面是否开启评论功能

### editLink

- 类型: `boolean`
- 默认值: 全局中配置的值

是否显示编辑链接

### prev

- 类型: `string | false`

上一篇文章链接

### next

- 类型: `string | false`

下一篇文章链接

### footer

- 类型: `boolean | string | HTMLString`

设置当前页面的页脚内容，如果你想要禁用页脚，请设置为 `false`，如果你想要移除默认的页脚内容，请设置为 `''`，如果你想使用默认页脚，请设置为 `true`。

更多详情请看 [页面 → 页脚支持](../guide/layout/page.md#页脚支持)

### copyrightText

- 类型: `string | false`
- 默认值: 全局中配置的值

设置当前页面的版权信息，更多详情请看 [页面 → 页脚支持](../guide/layout/page.md#页脚支持)

### mediaLink

- 类型: `Record<MediaType, string> | false`
- 默认值: 主题中 `themeConfig.blog.links` 的值

设置当前页面的页脚社交链接。

::: tip 可用的社交媒体:

`MediaType` 的可选值如下:

- `'Baidu'`: 百度
- `'Bitbucket'`: Bitbucket
- `'Dingding'`: 钉钉
- `'Discord'`: Discord
- `'Dribbble'`: Dribble
- `'Email'`: Email
- `'Evernote'`: 印象笔记
- `'Facebook'`: 脸书
- `'Flipboard'`: 红板报
- `'Gitee'`: Gitee
- `'Github'`: GitHub
- `'Gitlab'`: Gitlab
- `'Gmail'`: 谷歌邮箱(当然你也可以填入你自己的其他邮箱)
- `'Instagram'`: Instagram
- `'Line'`: Line
- `'Linkedin'`: 领英
- `'Pinterest'`: 拼趣
- `'Pocket'`: Pocket
- `'QQ'`: QQ
- `'Qzone'`: QQ 空间
- `'Reddit'`: Reddit
- `'Rss'`: RSS 地址
- `'Steam'`: Steam
- `'Twitter'`: Twitter
- `'Wechat'`: 微信
- `'Weibo'`: 微博
- `'Whatsapp'`: Whatsapp
- `'Youtube'`: YouTube
- `'Zhihu'`: 知乎

:::

### search

- 类型: `boolean`
- 默认值: 全局中配置的值 (全局默认为 `true`)

当前页面是否显示搜索框。

### backToTop

- 类型: `boolean`
- 默认值: 全局中配置的值 (全局默认为 `true`)

设置当前页面是否显示返回顶部按钮

### anchorDisplay

- 类型: `boolean`
- 默认值: 全局中配置的值 (全局默认为 `true`)

设置当前页面在桌面模式下是否在右侧显示标题列表

## layout

- 类型: `string`

页面的自定义布局名称
