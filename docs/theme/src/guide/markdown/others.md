---
title: Others
icon: more
order: 19
category:
  - Markdown
tag:
  - Markdown
---

## Link check

The theme will check your markdown links in dev mode by default.

You can customize this feature through `plugins.mdEnhance.linkCheck` in theme options, and you can choose from `'always'`, `'never'`, `'dev'` and `'build'`.

## v-pre

Since VuePress2 has removed V1’s v-pre container in core, the plugin provides an option to support it. That is, you can use any Mustache syntax in the container below.

```md
::: v-pre

{{ abc }}

:::
```

## Image Mark

GFM supports marking pictures by ID suffix so that pictures are only displayed in a specific mode. We support both GitHub’s markup and the easy markup `#light` and `#dark`.

You can enable it using `plugins.mdEnhance.imageMark` in theme options.

```md
![GitHub Light](/assets/icon/github-light.png#gh-dark-mode-only)
![GitHub Dark](/assets/icon/github-dark.png#gh-light-mode-only)

![GitHub Light](/assets/icon/github-light.png#dark)
![GitHub Dark](/assets/icon/github-dark.png#light)
```

::: details case

The above demo will render the following result

![GitHub Light](/assets/icon/github-light.png#gh-dark-mode-only)
![GitHub Dark](/assets/icon/github-dark.png#gh-light-mode-only)

![GitHub Light](/assets/icon/github-light.png#dark)
![GitHub Dark](/assets/icon/github-dark.png#light)

:::

## GFM

If your docs both serve on documentation site and directly on GitHub, we provide `plugins.mdEnhance.gfm` in theme options to align your Markdown behavior with GitHub.

::: note

Custom container is enabled by default in `@vuepress/theme-default` and `vuepress-theme-hope`, but not available in GitHub Markdown preview.

:::

## Stylize

Display enhancements for tokens in the form of `<tag>text</tag>`:

```ts
{
  MUST: { tag: ['strong', 'sup'], attr: [['class', 'badge info']] },
  NOT: { tag: ['strong'], text: 'NOT🚫' },
}
```

- add attributes to `tag` (such as class). `^MUST^` to <Badge text="MUST" type="tip">
- replace `text` (such as Emoji suffix), `**NOT**` to **NOT🚫**

Its main purpose is to make some KEYWORD more vivid after render.
set `noStylize:[k1,k2]` in MD's frontmatter can
disable `k1` and `k2` enhancements in this MD.

Note: all configuration items are case-sensitive.
