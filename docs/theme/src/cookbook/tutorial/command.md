---
title: Project Command
icon: command
category:
  - Cookbook
  - Tutorial
  - Get Started
tag:
  - Project Command
---

This tutorial introduces VuePress project commands.

<!-- more -->

## Common Commands

- `vuepress dev [dir]` will start a development server to allow you to develop your VuePress site locally.
- `vuepress build [dir]` will build your VuePress site into static files for your subsequent deployment.

::: info Using Template

If you are using the VuePress Theme Hope template, you can find the following three commands in `package.json`:

```json
{
  "scripts": {
    "docs:build": "vuepress build docs",
    "docs:clean-dev": "vuepress dev docs --clean-cache",
    "docs:dev": "vuepress dev docs"
  }
}
```

This means you can use:

- `yarn docs:dev` starts the development server
- `yarn docs:build` builds the project and outputs
- `yarn docs:clean-dev` to clear cache and start development server

:::

::: info Terminate DevServer

To terminate the development server, please click on the terminal and press `Ctrl + C` twice.

:::
