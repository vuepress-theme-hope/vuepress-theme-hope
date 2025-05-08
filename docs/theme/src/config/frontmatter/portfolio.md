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

## portfolio

Must be `true` to use portfolio layout.

## home

Recommend be `true` if the portfolio is home page.

## name

- Type: `string`
- Default: `themeConfig.author.name`

Name of the portfolio, by default its the author name from .

## avatar

- Type: `string`
- Required: No

Avatar image of the portfolio, relative path is not supported.

## avatarDark

- Type: `string`
- Default: `avatar`

Dark mode avatar image of the portfolio, relative path is not supported.

## titles

- Type: `string[]`
- Required: No

Titles of the portfolio.

## avatarStyle

- Type: `Record<string, string> | string`
- Required: No

CSS style for avatar

## avatarAlt

- Type: `string`
- Default: `name`

Avatar alt text

## bgImage

- Type: `string`
- Required: No

Background image of the portfolio, relative path is not supported.

## bgImageDark

- Type: `string`
- Default: `bgImage`

Dark mode background image of the portfolio, relative path is not supported.

## bgImageStyle

- Type: `Record<string, string> | string`
- Required: No

CSS style for background image

## welcome

- Type: `string`
- Default: `'👋 Hi there, I am'`

Welcome message of the portfolio.

## medias

- Type: `PortfolioMedia[]`

  ```ts twoslash
  interface PortfolioMedia {
    icon: string;
    name: string;
    link: string;
  }
  ```

- Required: No

Social media links of the portfolio.

## content

- Type: `"portfolio" | "doc" | "none"`
- Default: `"portfolio"`

Content type of the portfolio.

- `portfolio` means display Markdown content as portfolio style
- `doc` means display Markdown content as document style
- `none` means hide Markdown content
