---
title: Page Meta
icon: time
category:
  - Feature
tag:
  - Feature
  - Meta
---

The theme displays last update time and contributors of the page via the [`@vuepress/plugin-git`][git] plugin, and provides support for an "edit this page" button.

The theme also provides navigation buttons for previous and next pages depending on sidebar config.

<!-- more -->

## Git-based Information

`vuepress-theme-hope` uses the built-in [`@vuepress/plugin-git`][git] plugin to automatically generate page create time, last update time and contributors.

The plugin will automatically generate the page creation time and last update time from the UNIX timestamp (ms) of the last `git` commit of the page file, and generate contributors based on the commit record.

The theme will display last update time in the appropriate date format, along with all page contributors at the bottom of the page.

::: tip

The theme will use `Date.toLocaleString(pageLang)` to automatically localize the text of last update time according to the current language.

:::

::: warning Usage Notes

Since the last update time is `git` based, you can only enable it in a `git` based project. Also, since the timestamp used is from a git commit, it will only be displayed after the first commit on a given page, and will only be updated when subsequent commits change to that page.

:::

::: danger Not available in dev server

Since the `git` plugin has a serious performance impact, the theme will not enable it in dev server by default.

If you need those info, please set `plugins.git: true` in theme options, or add the `--debug` flag to run dev command.

:::

## Edit Link

You can automatically generate edit links for each page by setting the following items in theme options:

- `docsRepo`: docs repository link, same as `repo` by default
- `docsDir`: the directory of docs in the repository, defaults to root directory
- `docsBranch`: docs branch, defaults to `"main"`

## Display Control

To hide these items globally, set the corresponding items below to `false` in theme options. You can also enable/disable specific pages by setting these items in `YAML front matter`:

- `lastUpdated`: whether to display last update time of the page
- `contributors`: whether to show page contributors
- `editLink`: whether to display "edit page" link

[git]: https://v2.vuepress.vuejs.org/reference/plugin/git.html
