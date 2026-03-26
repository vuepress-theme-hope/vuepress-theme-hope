---
title: Project Content
icon: file
order: 4
category:
  - Cookbook
  - Tutorial
  - Get Started
tag:
  - Project Content
---

This document outlines page generation, Markdown processing, and Frontmatter configuration in a VuePress project.

<!-- more -->

## Generating Pages

VuePress generates standalone pages from Markdown files. The route path corresponds to the file's relative path.

When generating a project via the CLI helper, you will see the following directory structure:

```text
└─ src
   ├─ demo
   │  ├─ ...
   │  ├─ page.md
   │  ├─ markdown.md
   │  └─ README.md
   ├─ ...
   └─ README.md
```

Route path resolution:

| Relative Path     | Route Path        |
| ----------------- | ----------------- |
| `/README.md`      | `/`               |
| `/demo/README.md` | `/demo/`          |
| `/demo/page.md`   | `/demo/page.html` |

::: note
`README.md` resolves to `index.html` and serves as the directory's index page.
:::

## Markdown Processing

VuePress Theme Hope processes Markdown files into HTML. You can edit Markdown files to modify content, and changes will sync in real time while the development server is running.

::: tip
Refer to the [Markdown Tutorial](../cookbook/markdown/README.md) for basic syntax.
:::

::: info
Syntax extensions available in the environment:

- VuePress base extensions:[VuePress → Markdown](../cookbook/vuepress/markdown.md).
- Theme plugin extensions: [Guide → Markdown](../guide/intro/markdown.md).
  :::

## Frontmatter Configuration

Frontmatter assigns page-level configurations. It uses YAML format and must be placed at the top of the Markdown file, enclosed by triple dashes (`---`).

```md
---
lang: en-US
title: the title of the page
description: the description of the page
---

<!-- Here is Markdown Content -->

...
```

Frontmatter properties (e.g., `lang`, `title`, `description`) override global settings from the [VuePress config file](../cookbook/vuepress/config.md#config-file). These configurations apply exclusively to the current page and take the highest priority.
