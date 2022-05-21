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

- `pnpm docs:dev` starts the development server
- `pnpm docs:build` builds the project and outputs
- `pnpm docs:clean-dev` to clear cache and start development server

:::

::: info Terminate DevServer

To terminate the development server, please click on the terminal and press `Ctrl + C` twice.

:::

## Update Version

If you need to upgrade your theme and VuePress version, execute the following command:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add vuepress@next vuepress-theme-hope@next && pnpm i && pnpm up
```

@tab yarn

```bash
yarn add vuepress@next vuepress-theme-hope@next && yarn install && yarn upgrade
```

@tab npm

```bash
npm i vuepress@next vuepress-theme-hope@next && npm install && npm update
```

:::
