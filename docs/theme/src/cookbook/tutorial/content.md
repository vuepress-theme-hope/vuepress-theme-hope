---
title: Project Content
icon: page
category:
  - Cookbook
  - Tutorial
  - Get Started
tag:
  - Project Content
---

This tutorial guides you on how to write content in a VuePress project.

<!-- more -->

## Generating Pages

VuePress is markdown-centered. Each Markdown file inside your project is a standalone page.

By default, the route path of a page is determined by the relative path of your Markdown file.

In the previous chapter, the `docs` directory was used as VuePress project folder. So if you have the following path structure:

Assuming this is the directory structure of your Markdown files:

```
└─ docs
   ├─ guide
   │  ├─ ...
   │  └─ page.md
   │  └─ markdown.md
   │  └─ README.md
   ├─ ...
   ├─ slide.md
   └─ README.md
```

The route path of your Markdown files are:

| Relative Path      | Route Path          |
| ------------------ | ------------------- |
| `/README.md`       | `/`                 |
| `/slide.md`        | `/slide.html`       |
| `/guide/README.md` | `/guide/`           |
| `/guide/slide.md`  | `/guide/slide.html` |
| `/guide/page.md`   | `/guide/page.html`  |

::: tip README.md

`README.md` is a special case. In Markdown, by convention, it will be used as the home page of the folder where it is located. So when it is rendered as a web page, its corresponding path is the home page path `index.html` in the web page.

This should be easy to understand.

:::

## Frontmatter

Frontmatter is a very important concept in VuePress, it is used to carry config of Markdown files. Markdown files can contain a [YAML](https://yaml.org/) Frontmatter.

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

You must have noticed that the fields in Frontmatter are very similar to VuePress config files. You can override the `lang`, `title`, `description` and other properties of the current page through Frontmatter. Therefore, you can think of Frontmatter as a page-level scope config, which usually has the highest priority, and the config only takes effect on the current page.

## Markdown

Each Markdown file will be processed by VuePress Theme Hope to render the content of the file as web content.

::: tip Markdown Syntax

If you don’t know Markdown yet, check out the [Markdown Tutorial](../markdown/README.md).

In about fifteen minutes, you can learn how to write Markdown, remember to come back after reading it!

:::

You can try editing the Markdown file yourself to modify the content of the template. If you have started the development server, the modified results will be synced to the development server in real time.

::: info Markdown Extension

- VuePress itself extends some Markdown syntax. For details, see [VuePress → Markdown](../vuepress/markdown.md).

- The theme additionally enables some syntax extensions via `vuepress-plugin-md-enhance`, see [Guide → Markdown](../../guide/get-started/markdown.md).

:::
