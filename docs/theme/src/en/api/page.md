---
icon: api
category: api
tags:
  - api
  - frontmatter
---

# Page Configuration

The following configuration options have been added to the page's Front Matter:

## icon

- Type: `string`
- Required: No

Set the FontClass of the current page icon (recommended)

### author

- Type: `string | boolean`
- Required: No

Show the author of the current page. If you don't fill it, you will fall back to the default author.

::: tip
When the global default author is enabled, you can set `false` to cancel the author display
:::

### time

- Type: `string`
- Required: No
- Format: `YYYY-MM-DD` or `YYYY/MM/DD hh:mm:ss`

Set the writing time of the current page

::: warning
Although this theme and other plugins of Mister-Hope will correctly parse the time you enter, such as `YYYY/MM/DD hh:mm` `YYYY-MM-DD hh:mm` `YYYY/MM/DD`, etc. The plugin may not be able to read them correctly. Using values in non-standard formats may cause other plugins reporting errors,
:::

## category

- Type: `string`
- Required: No

Set the category of the current page

## tags

- Type: `string | string []`
- Required: No

Set the label of the current page

## sticky

- Type: `boolean`
- Default: `false`

Sets whether the current article is pinned in the list.

### article

- Type: `boolean`
- Default: `true`

Whether to add the article to the article list.

### timeline

- Type: `boolean`
- Default: `true`

Whether to add the article to the timeline list.

## password

- Type: `string`
- Required: No

Set a password for the current article.

## Page display configuration

## pageInfo

- Type: `PageInfo[] | false`
- Default value: Globally configured value (global default is `['Author', 'Visitor', 'Time', 'Category', 'Tag', 'ReadTime']`)
The optional values and corresponding contents of `PageInfo` are as follows:

| Item         | Corresponding Content | Page Front Matter Value            |
| ------------ | --------------------- | ---------------------------------- |
| `'Author'`   | Author                | author                             |
| `'Time'`     | Writing Date          | time                               |
| `'Category'` | Category              | category                           |
| `'Tag'`      | Tags                  | tags                               |
| `'ReadTime'` | Expect reading time   | N / A (automatically generated)    |
| `'Word'`     | Word count            | N / A (automatically generated)    |
| `'Visitor'`  | Visit Number          | visitor (only available with Valine) |

Set whether to show page details on the current page

### visitor

- Type: `boolean`
- Default value: Globally configured value (defaults to `true` after setting global`comment` to `valine ')

Whether the current page shows page views

::: tip
The display pageview feature requires you to configure Valine type comment configuration correctly.
:::

## breadcrumb

- Type: `boolean`
- Default value: Globally configured value (global default is `true`)

Whether path navigation is enabled on the current page

## breadcrumbIcon

- Type: `boolean`
- Default value: Globally configured value (global default is `true`)

Whether path navigation icon is enabled on the current page

## navbar

- Type: `boolean`

The navigation bar configuration of the page, filling in `false` will disable the navigation bar

## sidebar

- Type: `false | 'auto'`

Page sidebar configuration options. Supports `false` or`auto`.

## sidebarDepth

- Type: `number`
- Default: `2`

The page's sidebar rendering depth

## comment

- Type: `boolean`
- Default value: Configured globally (defaults to `true` after configuring global`comment`)

Whether to enable comments on the current page

## editLink

- Type: `boolean`
- Default value: the value configured globally

Whether to show edit link

## prev

- Type: `string | false`

Previous article link

## next

- Type: `string | false`

Next article link

## footer

- Type: `boolean | string | HTMLString`
- Default value: Globally configured value (depending on whether **Footer default value** and **Footer display footer** are set globally)

Set the footer of the current page. For more details, please see [Page → Footer Support](../guide/layout/page.md#footer-support)

## copyright

- Type: `string | false`
- Default value: the value configured globally

Set the copyright information of the current page. For more details, please see [Page → Footer Support](../guide/layout/page.md#footer)

## footer

- Type: `string`

Set the footer content of the current page. For more details, please see [Page → Footer Support](../guide/layout/page.md#footer)

## mediaLink

- Type: `MediaType[] | false`
- Default: `themeConfig.blog.links`

Set the social link for the current page footer.

::: tip Available social media:

The optional values of `MediaType` are as follows:

-`'Baidu'`: Baidu
-`'Dingding'`: Dingding
-`'Dribbble'`: Dribble
-`'Evernote'`: Evernote
-`'Facebook'`: Facebook
-`'Flipboard'`: Flipboard
-`'Github'`: ~~ Gayhub ~~ Github
-`'Gmail'`: Google mailbox (of course you can also fill in your own other mailbox)
-`'Instagram'`: Instagram
-`'Line'`: Line
-`'Linkedin'`: LinkedIn
-`'Pinterest'`: Pinterest
-`'Pocket'`: Pocket
-`'QQ'`: QQ
-`'Qzone'`: Qzone
-`'Rss'`: RSS address
-`'Steam'`: Steam
-`'Taobao'`: Taobao
-`'Twitter'`: Twitter
-`'Wechat'`: WeChat
-`'Weibo'`: Weibo
-`'Whatsapp'`: Whatsapp
-`'Youtube'`: YouTube
-`'Zhihu'`: Zhihu

:::

## search

- Type: `boolean`
- Default value: the value configured in the global (global default is `true`)

Whether the current page displays search box.

## backtotop

- Type: `boolean`
- Default value: Globally configured value (global default is `true`)

Sets whether the current page displays the back to top button

## layout

- Type: `string`

Page custom layout name
