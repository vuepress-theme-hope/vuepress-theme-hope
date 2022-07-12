---
title: VuePress Page
icon: page
category:
  - Cookbook
  - VuePress
tag:
  - Page
  - VuePress
---

VuePress is markdown-centered. Each Markdown file inside your project is a standalone page.

## Routing

By default, the route path of a page is determined by the relative path of your Markdown file.

Assuming this is the directory structure of your Markdown files:

```
└─ docs
   ├─ guide
   │  ├─ getting-started.md
   │  └─ README.md
   ├─ contributing.md
   └─ README.md
```

Take the `docs` directory as your [sourceDir](https://v2.vuepress.vuejs.org/reference/cli.md), e.g. you are running `vuepress dev docs` command. Then the route paths of your Markdown files would be:

| Relative Path      | Route Path           |
| ------------------ | -------------------- |
| `/README.md`       | `/`                  |
| `/contributing.md` | `/contributing.html` |
| `/guide/README.md` | `/guide/`            |
| `/guide/page.md`   | `/guide/page.html`   |

## Frontmatter

A Markdown file could contain a [YAML](https://yaml.org/) frontmatter. The frontmatter must be at the top of the Markdown file and must be wrapped with a couple of triple-dashed lines. Here is a basic example:

```md
---
lang: en-US
title: Title of this page
description: Description of this page
---
```

You must have noticed that those fields are similar with the Site Config in Config File. You can override `lang`, `title`, `description`, etc., of current page via frontmatter. So you can take frontmatter as page scope config.

Also, VuePress has built-in support for some frontmatter fields, and your theme may have its own special frontmatter, too.

::: tip

Check out the [Frontmatter Reference](https://v2.vuepress.vuejs.org/reference/frontmatter.md) for a full list of VuePress built-in frontmatter.

Check out the [Default Theme > Frontmatter Reference](https://v2.vuepress.vuejs.org/reference/default-theme/frontmatter.md) for the frontmatter of default theme.

:::

## Content

The main content of your page is written in Markdown. VuePress will firstly transform your Markdown to HTML code, then treat the HTML code as `<template>` of Vue SFC.

With the power of [markdown-it](https://github.com/markdown-it/markdown-it) and Vue template syntax, the basic Markdown can be extended a lot. Next, check out the [Markdown](./markdown.md) guide for all the extensions of Markdown in VuePress.
