---
title: Others
icon: ellipsis
order: -2
category:
  - Markdown
tag:
  - Markdown
---

## Link check

The theme will use `@vuepress/plugin-links-check` to check your Markdown links by default.

You can customize this feature through `markdown.linksCheck` in theme options, check [links-check docs][links-check] for more details.

Anchor checking is enabled by default: a link is reported as broken when its anchor does not exist in the target page. Set `markdown.linksCheck.anchors` to `"same-page"` to only check the anchors pointing to the current page, or to `false` to skip anchor checking. Anchors are only checked for pages rendered by Markdown, since the anchors of other pages are unknown.

## GFM

If your docs both serve on documentation site and directly on GitHub, we provide `markdown.gfm` in theme options to align your Markdown behavior with GitHub.

::: important

For full GFM syntax, see [GFM](https://github.github.com/gfm/).

Only common GFM syntax are supported, and some of the behaviors might be different.

For example, to support Vue syntax, `<script>` tags are allowed
in VuePress.

:::

## v-pre

Since VuePress2 has removed V1's v-pre container in core, we provide `markdown.vPre` option to support it. You can use any Mustache syntax in `v-pre` container when enabling this:

:::: preview

::: v-pre

{{ abc }}

:::

::::

[links-check]: https://ecosystem.vuejs.press/plugins/markdown/links-check.html
