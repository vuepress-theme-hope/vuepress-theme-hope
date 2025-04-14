---
title: Footer
icon: fas fa-window-maximize fa-rotate-180
order: 5
category:
  - Layout
tag:
  - Footer
  - Layout
---

`vuepress-theme-hope` provides footer feature for all pages.

<!-- more -->

## Introduction

Footer contains customizable footer content and copyright information.

You can set the default footer content and copyright information globally using `footer`, `copyright` and `license` in theme options.

::: info Different Locales

You can customize these options for each language individually under `locales` field in theme options.

:::

You can also set `footer`, `copyright` and `license` options in page frontmatter to customize a specific page.

## Footer Config

The footer content will be inserted with `v-html` command, so both HTML and plain text are supported. You can set global content using `footer` in theme options.

The footer is hidden by default. If you want to display it globally by default, please set `displayFooter: true` in theme options.

- When footer is hidden by default, setting `footer: true` in frontmatter will display the default footer.
- When footer is displayed by default, set `footer: false` in frontmatter will disable the default footer.
- If `footer` in frontmatter is a string, it will be inserted into the footer as content with `v-html` command, so both HTML and plain text are supported.

## Copyright Information

You can set the copyright and license information globally or for a specific page using `copyright` and `license`.

- `copyright` field indicates the content of the copyright information, which will be inserted with `v-html` command, so both HTML and plain text are supported. You can set `false` to hide the copyright information of this page.
- `license` field indicates the name of the license. We recommend that you strictly follow the provisions of the license for specification. After specifying, `copyright` will have the default copyright information based on the license name (of course, you can still customize `copyright`).

## Examples

- Display default footer text:

  ```md
  ---
  footer: true
  ---
  ```

- When you set `displayFooter: true` in theme options, you can also disable it locally:

  ```md
  ---
  footer: false
  ---
  ```

- Customize footer text without displaying copyright information:

  ```md
  ---
  footer: This site is served by GitHub Pages
  copyright: false
  ---
  ```

- Customize footer content and copyright information:

  ```md
  ---
  footer: <a href="https://github.com/Mister-Hope"> Mr.Hope </a>
  license: CC 4.0
  ---
  ```

- To remove the default footer content while displaying a customized copyright information:

  ```md
  ---
  footer: ""
  copyright: Customized copyright text
  ---
  ```
