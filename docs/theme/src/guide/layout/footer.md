---
title: Footer
icon: fas fa-window-maximize fa-rotate-180
order: 4
category:
  - Layout
tag:
  - Footer
  - Layout
---

`vuepress-theme-hope` provides footer feature for all pages <Badge text="Support page config" />.

<!-- more -->

## Global Config

You can set the default footer content and copyright information globally using `footer` and `copyright` in theme options.

The footer is not displayed by default. To display the footer, you need to set `displayFooter: true` in theme options.

::: info Different Locales

You can set footers for each language individually under `locales` field in theme options.

:::

## Page Config

You can configure `footer` and `copyright` options in the frontmatter of the page to set footer content of a specific page.

### footer

- When setting `displayFooter: true` in theme options, you can set `footer: false` in frontmatter to disable footer in a specific page.

- When the global display of footer is not enabled, setting `footer: true` means displaying the default footer.

- If you fill in a string, it will be inserted into the footer as content with `v-html` command, so you can fill in HTMLString.

### copyright

The `copyright` field is used as copyright information of a specific page (useful when you cite an article and the article uses a specific license). It also supports HTMLString.

The default copyright text will be generated from author and license in theme options.

When setting `displayFooter: true` in theme options, you can also set `copyright: false` to hide the copyright information in a specific page.

## Examples

- Display default footer text:

  ```md
  ---
  footer: true
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
  copyright: License under CC4.0, author Mr.Hope
  ---
  ```

- When you set `displayFooter: true` in theme options, you can also disable it locally:

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
