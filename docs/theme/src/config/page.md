---
title: Page Config
icon: config
category: config
tags:
  - config
  - frontmatter
---

The following configuration options have been added to the page’s Front Matter:

## Page Information Configuration

### icon

- Type: `string`
- Required: No

Set the FontClass of the current page icon (recommended)

### title

- Type: `string | boolean`
- Required: No

Current page’s title. Markdown’s first h1 by default.

### description

- Type: `string | boolean`
- Required: No

Current page’s description

### author

- Type: `string | boolean`
- Required: No

Show the author of the current page. If you don’t fill it, you will fall back to the default author.

::: tip

When the global default author is enabled, you can set `false` to cancel the author display

:::

### original

- Type: `boolean`
- Default: `false`

Whether the current article is original.

### time

- Type: `string`
- Required: No
- Format: `YYYY-MM-DD` or `YYYY/MM/DD hh:mm:ss`

Set the writing time of the current page

::: warning

Although this theme and other plugins of Mister-Hope will parse the time you enter, such as `YYYY/MM/DD hh:mm` `YYYY-MM-DD hh:mm` `YYYY/MM/DD`, etc. other plugin may not be able to read them. Using values in non-standard formats may cause other plugins reporting errors,

:::

### category

- Type: `string`
- Required: No

Set the category of the current page

### tags

- Type: `string | string []`
- Required: No

Set the label of the current page

### sticky

- Type: `boolean | number`
- Default: `false`

Sets whether the current article is pinned in the list. When fill in with number, greater ones come before smaller ones.

### star

- Type: `boolean | number`
- Default: `false`

Sets whether the current article is pinned in the article list in blog theme. When fill in with number, greater ones come before smaller ones.

### article

- Type: `boolean`
- Default: `true`

Whether to add the article to the article list.

### timeline

- Type: `boolean`
- Default: `true`

Whether to add the article to the timeline list.

### password

- Type: `string`
- Required: No

Password for the current article.

### image

- Type: `string`
- Required: No

Current page’s image，needs an absolute path.

### copyright.minLength

- Type: `number`
- Default value: `100`

The minimum number of characters that trigger copyright information or prohibit copying.

### copyright.noCopy

- Type: `boolean`
- Default value: `false`

Whether to prohibit copying

### copyright.noSelect

- Type: `boolean`
- Default value: `false`

Whether to prohibit selected text

## Page display configuration

### pageInfo

- Type: `PageInfo[] | false`
- Default value: Globally configured value (global default is `['author', 'visitor', 'time', 'category', 'tag', 'reading-time']`)

The optional values and corresponding contents of `PageInfo` are as follows:

| Item             | Corresponding Content | Page frontmatter Value                 |
| ---------------- | --------------------- | -------------------------------------- |
| `'author'`       | Author                | `author`                               |
| `'time'`         | Writing Date          | `time`                                 |
| `'category'`     | Category              | `category`                             |
| `'tag'`          | Tags                  | `tag`                                  |
| `'reading-time'` | Expect reading time   | N / A (automatically generated)        |
| `'word'`         | Word count            | N / A (automatically generated)        |
| `'visitor'`      | Visit Number          | `visitor` (only available with Valine) |

Set whether to show page details on the current page

### visitor

- Type: `boolean`
- Default value: Globally configured value (defaults to `true` after setting global`comment` to `valine ')

Whether the current page shows page views

::: tip

The display pageview feature requires you to configure Valine type comment configuration correctly.

:::

### breadcrumb

- Type: `boolean`
- Default value: Globally configured value (global default is `true`)

Whether path navigation is enabled on the current page

### breadcrumbIcon

- Type: `boolean`
- Default value: Globally configured value (global default is `true`)

Whether path navigation icon is enabled on the current page

### navbar

- Type: `boolean`

The navigation bar configuration of the page, filling in `false` will disable the navigation bar

### sidebar

- Type: `false | 'auto'`

Page sidebar configuration options. Supports `false` or`auto`.

### sidebarDepth

- Type: `number`
- Default: `2`

The page’s sidebar rendering depth

### comment

- Type: `boolean`
- Default value: Configured globally (defaults to `true` after configuring global`comment`)

Whether to enable comments on the current page

### editLink

- Type: `boolean`
- Default value: the value configured globally

Whether to show edit link

### prev

- Type: `string | false`

Previous article link

### next

- Type: `string | false`

Next article link

### footer

- Type: `boolean | string | HTMLString`
- Default value: the value configured globally

Set the footer content of the current page. If you want an empty content, set it to an empty string.
Set it to `false` to disable the footer, and set it to `true` to display the default footer on a specific page.

For more details, please see [Page → Footer Support](../guide/layout/page.md#footer-support)

### copyrightText

- Type: `string | false`
- Required: No

Copyright info of current page.

### medialink

- Type: `Record<MediaType, string> | false`
- Default: `themeConfig.blog.links`

Set the social link for the current page footer.

::: tip Available social media:

The optional values of `MediaType` are as follows:

- `'Baidu'`: Baidu
- `'Bitbucket'`: Bitbucket
- `'Dingding'`: Dingding
- `'Discord'`: Discord
- `'Dribbble'`: Dribble
- `'Email'`: Email
- `'Evernote'`: Evernote
- `'Facebook'`: Facebook
- `'Flipboard'`: Flipboard
- `'Gitee'`: Gitee
- `'Github'`: GitHub
- `'Gitlab'`: Gitlab
- `'Gmail'`: Google mailbox (you can also fill in your own other mailbox)
- `'Instagram'`: Instagram
- `'Line'`: Line
- `'Linkedin'`: LinkedIn
- `'Pinterest'`: Pinterest
- `'Pocket'`: Pocket
- `'QQ'`: QQ
- `'Qzone'`: Qzone
- `'Reddit'`: Reddit
- `'Rss'`: RSS address
- `'Steam'`: Steam
- `'Twitter'`: Twitter
- `'Wechat'`: WeChat
- `'Weibo'`: Weibo
- `'Whatsapp'`: Whatsapp
- `'Youtube'`: YouTube
- `'Zhihu'`: Zhihu

:::

### search

- Type: `boolean`
- Default value: the value configured in the global (global default is `true`)

Whether display search box on current page

### backToTop

- Type: `boolean`
- Default value: Globally configured value (global default is `true`)

Whether display the back to top button on current page

### anchorDisplay

- Type: `boolean`
- Default value: Globally configured value (global default is `true`)

Whether display anchor in desktop mode on current page

## layout

- Type: `string`

Page custom layout name
