---
title: About VuePress
icon: fab fa-vuejs
dir:
  collapsible: false
  order: 2
category:
  - Cookbook
  - VuePress
tag:
  - Intro
  - VuePress
prev: ../markdown/demo.html
---

VuePress is a markdown-centered static site generator. You can write your content (documentations, blogs, etc.) in [Markdown](https://en.wikipedia.org/wiki/Markdown), then VuePress will help you to generate a static site to host them.

<!-- more -->

## How It Works

A VuePress site is in fact a single-page application (SPA) powered by [Vue](https://v3.vuejs.org/) and [Vue Router](https://next.router.vuejs.org).

Routes are generated according to the relative path of your Markdown files. Each Markdown file is compiled into HTML with [markdown-it](https://github.com/markdown-it/markdown-it) and then processed as the template of a Vue component. This allows you to directly use Vue inside your Markdown files and is great when you need to embed dynamic content.

- During development, we start a normal dev-server, and serve the VuePress site as a normal SPA. If you've used Vue before, you will notice the familiar development experience when you are writing and developing with VuePress.

- During build, we create a server-rendered version of the VuePress site and render the corresponding HTML by virtually visiting each route.

## VuePress Intro

- [Page](page.md)

- [Markdown](markdown.md)

- [File Structure](file.md)

- [Config File](config.md)

- [Plugins](plugin.md)

- [theme](theme.md)

## VuePress Official Docs

- [VuePress](https://vuejs.press/)
