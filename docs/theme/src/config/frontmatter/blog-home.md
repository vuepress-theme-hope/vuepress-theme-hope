---
title: Blog Home Frontmatter Config
icon: blog
order: 6
category:
  - Config
tag:
  - Frontmatter
  - Blog Home
---

## Options

::: fields
@`home` type=`true`

Must be `true` to use blog home layout.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage).

@`layout` type=`"Blog"`

Must be `Blog` to use blog home layout.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage).

@`hero` type=boolean default=`true`

Whether to display the icon and description on the home page.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage).

@`title` type=string

Page title, will be used in breadcrumb, seo, etc.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage).

@`heroText` type=string default="Site title"

Hero Title, can be set to an empty string to hide the default title.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage).

@`tagline` type=string

Short description in hero.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage).

@`heroImage` type=string

Image link used as home hero (logo).

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage) and [FAQ → Links in Config](../../faq/common-question.md#links-in-config).

@`heroImageDark` type=string default=`heroImage`

Dark mode Home hero (logo) image link.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage) and [FAQ → Links in Config](../../faq/common-question.md#links-in-config).

@`heroImageStyle` type=`Record<string, string> | string`

CSS style for home hero (logo) image.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage).

@`heroAlt` type=string

Home icon alt text.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage).

@`bgImage` type=`string | false` default="A built-in picture"

Link of background image, relative path is not supported. If it is not set, a default landscape image will be applied automatically.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage) and [FAQ → Links in Config](../../faq/common-question.md#links-in-config).

@`bgImageDark` type=string default=`bgImage`

Link of dark mode background image, relative path is not supported.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage) and [FAQ → Links in Config](../../faq/common-question.md#links-in-config).

@`bgImageStyle` type=`Record<string, string> | string`

The CSS style of the background image.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage).

@`heroFullScreen` type=boolean

Whether Hero is full screen displayed.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage).

@`projects` type=`ThemeBlogHomeProjectOptions[]`

Project list displayed in blog homepage.

See also: [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage).

@@`projects[*].name` type=string required

Project name.

@@`projects[*].desc` type=string

Project description.

@@`projects[*].link` type=string required

Project link.

@@`projects[*].icon` type=string

Project icon. Image link or icon fontClass are supported, as well as `"link"`, `"project"`, `"book"`, `"article"` and `"friend"`.

:::
