---
title: Portfolio Frontmatter Config
icon: home
order: 5
category:
  - Config
tag:
  - Frontmatter
  - Portfolio
---

## Options

::: fields
@`portfolio` type=boolean required

Whether to use the portfolio layout.

@`home` type=boolean

Whether the portfolio is the home page. Recommended to be `true`.

@`name` type=string default=`themeConfig.author.name`

Name of the portfolio, which defaults to the author name in theme options.

@`avatar` type=string

Avatar image of the portfolio. Relative paths are not supported.

@`avatarDark` type=string default=`avatar`

Dark mode avatar image of the portfolio. Relative paths are not supported.

@`titles` type=`string[]`

Titles of the portfolio.

@`avatarStyle` type=`Record<string, string> | string`

CSS style for the avatar.

@`avatarAlt` type=string default=`name`

Alt text of the avatar.

@`bgImage` type=string

Background image of the portfolio. Relative paths are not supported.

@`bgImageDark` type=string default=`bgImage`

Dark mode background image of the portfolio. Relative paths are not supported.

@`bgImageStyle` type=`Record<string, string> | string`

CSS style for the background image.

@`welcome` type=string default=`'👋 Hi there, I am'`

Welcome message of the portfolio.

@`medias` type=`PortfolioMedia[]`

Social media links of the portfolio.

@@`medias[*].icon` type=string required

Icon of the media.

@@`medias[*].name` type=string required

Name of the media.

@@`medias[*].link` type=string required

Link of the media.

@`content` type=`'portfolio' | 'doc' | 'none'` default=`'portfolio'`

Content type of the portfolio:

- `'portfolio'`: display the Markdown content as portfolio style
- `'doc'`: display the Markdown content as document style
- `'none'`: hide the Markdown content

:::
