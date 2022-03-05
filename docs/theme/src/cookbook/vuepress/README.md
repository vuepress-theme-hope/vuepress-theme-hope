---
title: About VuePress
icon: vue
category:
  - Cookbook
  - VuePress
tag:
  - Intro
  - VuePress
prev: ../markdown/demo.html
---

## As Easy as 1, 2, 3

```bash
# Create a vuepress-theme-hope project under docs
npm init vuepress-theme-hope docs
```

VuePress is a markdown-centered static site generator. You can write your content (documentations, blogs, etc.) in [Markdown](https://en.wikipedia.org/wiki/Markdown), then VuePress will help you to generate a static site to host them.

The purpose of creating VuePress was to support the documentation of Vue.js and its sub-projects, but now it has been helping a large amount of users to build their documentation, blogs, and other static sites.

## How It Works

A VuePress site is in fact a single-page application (SPA) powered by [Vue](https://v3.vuejs.org/) and [Vue Router](https://next.router.vuejs.org).

Routes are generated according to the relative path of your Markdown files. Each Markdown file is compiled into HTML with [markdown-it](https://github.com/markdown-it/markdown-it) and then processed as the template of a Vue component. This allows you to directly use Vue inside your Markdown files and is great when you need to embed dynamic content.

During development, we start a normal dev-server, and serve the VuePress site as a normal SPA. If you’ve used Vue before, you will notice the familiar development experience when you are writing and developing with VuePress.

During build, we create a server-rendered version of the VuePress site and render the corresponding HTML by virtually visiting each route. This approach is inspired by [Nuxt](https://nuxtjs.org/)’s `nuxt generate` command and other projects like [Gatsby](https://www.gatsbyjs.org/).

## VuePress Intro

- [Page](page.md)

- [Markdown](markdown.md)

- [File Structure](file.md)

- [Config File](config.md)

- [Plugins](plugin.md)

- [theme](theme.md)

## VuePress Official Docs

- [VuePress](https://v2.vuepress.vuejs.org/)
