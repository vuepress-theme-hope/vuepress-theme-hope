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

This tutorial guides you on how to generate page in a VuePress project.

<!-- more -->

## Generating Pages

VuePress is Markdown-Centered. Each Markdown file inside your project is a standalone page.

By default, the route path of a page is determined by the relative path of your Markdown file.

Since you are generating the project from create helper, you will have the following file structure:

```
└─ src
   ├─ demo
   │  ├─ ...
   │  └─ page.md
   │  └─ markdown.md
   │  └─ README.md
   ├─ ...
   └─ README.md
```

The route path of your Markdown files are:

| Relative Path     | Route Path        |
| ----------------- | ----------------- |
| `/README.md`      | `/`               |
| `/demo/README.md` | `/demo/`          |
| `/demo/page.md`   | `/demo/page.html` |

::: tip README\.md

`README.md` is a special case. In Markdown, by convention, it will be used as the home page of the folder where it is located. So when it is rendered as a web page, its corresponding path is the home page path `index.html` in the web page.

This should be easy to understand.

:::

## Markdown

Each Markdown file will be processed by VuePress Theme Hope to render file content as webpage content.

You can try editing the Markdown file yourself to modify the content of the template. If you have started the development server, the modified results will be synced to the development server in real time.

::: tip Markdown Syntax

If you don't know Markdown yet, check out the [Markdown Tutorial](../cookbook/markdown/README.md).

In about fifteen minutes, you can learn how to write Markdown, remember to come back after reading it!

:::

::: info Markdown Extension

- VuePress itself extends some Markdown syntax. For details, see [VuePress → Markdown](../cookbook/vuepress/markdown.md).

- The theme additionally enables some syntax extensions via VuePress plugins, see [Guide → Markdown](../guide/intro/markdown.md).

:::

## Frontmatter

Frontmatter is an important concept in VuePress, it is used to carry config of Markdown files. Markdown files can contain a [YAML](https://yaml.org/) Frontmatter.

Frontmatter must be at the top of the Markdown file, surrounded by a pair of triple dashes. Here is a basic example:

```md
---
lang: en-US
title: the title of the page
description: the description of the page
---

<!-- Here is Markdown Content -->

...
```

You may noticed that fields in demo Frontmatter are very similar to [VuePress config file](../cookbook/vuepress/config.md#config-file). You can override the `lang`, `title`, `description` and other properties of the current page through Frontmatter. Therefore, you can think of Frontmatter as a page-level scope config, which usually has the highest priority, and the config only takes effect on the current page.
