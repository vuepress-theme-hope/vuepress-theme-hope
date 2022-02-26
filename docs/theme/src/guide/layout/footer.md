---
title: Footer
icon: footer
category:
  - Layout
tag:
  - Footer
  - Layout
---

`vuepress-theme-hope` provides footer feature for all pages <Badge text="Support page config" />.

<!-- more -->

## Global Config

In the themeConfig, `footer` field is used to config footer globally. You can set `footer` and `copyright` in `themeConfig` to set the default footer content and copyright information globally.

The footer is not displayed on the page by default. To display the footer on every page, you need to set `themeConfig.displayFooter` to `true`.

::: info I18n Locales

You can set footers for each language individually in `themeConfig.locales`.

:::

## Page Config

You can configure the `footer`, `copyright` fields in the frontmatter of the page to set footer content of a specific page.

### footer

- When `themeConfig.displayFooter` is `true`, you can set `footer` to `false` in frontmatter to disable the footer of a specific page.

- When the global display of footer is not enabled, setting `footer` to `true` will display the default footer text.

- If you fill in a string, it will be inserted into the footer as the content of the footer with `v-html` command, so you can fill in HTMLString.

### copyright

The `copyright` field is used to set the copyright information of a specific page. It also supports HTMLString (useful when you cite an article and the article uses a specific license).

When `themeConfig.displayFooter` is `true`, you can also fill in `false` to hide the copyright information of a specific page.

## Example

- Enable the default footer text:

  ```md
  ---
  footer: true
  ---
  ```

- Customize footer text without displaying copyright information:

  ```md
  ---
  footer: This website is served by GitHub Pages
  copyright: false
  medialink: false
  ---
  ```

- Custom footer content and copyright information:

  ```md
  ---
  footer: <a href="https://github.com/Mister-Hope"> Mr.Hope </a>
  copyright: MIT LICENSE
  ---
  ```

- When you set `displayFooter` to true in the theme, you can also disable it locally:

  ```md
  ---
  footer: false
  ---
  ```

- To remove the default footer content while keeping copyright information displayed, please use an empty string.

  ```md
  ---
  footer: ""
  ---
  ```
