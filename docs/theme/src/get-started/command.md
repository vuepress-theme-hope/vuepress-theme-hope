---
title: Project Command
icon: flag
order: 3
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

- `vuepress dev <dir>` will start a development server to allow you to develop your VuePress site locally.
- `vuepress build <dir>` will build your VuePress site into static files for your subsequent deployment.

:::: info Using Template

If you are using the VuePress Theme Hope template, you can find the following three commands in `package.json`:

```json
{
  "scripts": {
    "docs:build": "vuepress build src",
    "docs:clean-dev": "vuepress dev src --clean-cache --clean-temp",
    "docs:dev": "vuepress dev src"
  }
}
```

This means you can use:

::: tabs#shell

@tab pnpm

- `pnpm docs:dev` starts the development server
- `pnpm docs:build` builds the project and outputs
- `pnpm docs:clean-dev` to clear cache and start development server

@tab yarn

- `yarn docs:dev` starts the development server
- `yarn docs:build` builds the project and outputs
- `yarn docs:clean-dev` to clear cache and start development server

@tab npm

- `npm run docs:dev` starts the development server
- `npm run docs:build` builds the project and outputs
- `npm run docs:clean-dev` to clear cache and start development server

:::

::::

::: info Terminate DevServer

To terminate the development server, please click on the terminal and press `Ctrl + C` twice.

:::

## Update Version

If you need to upgrade your theme and VuePress version, execute the following command:

::: code-tabs#shell

@tab pnpm

```bash
pnpm dlx vp-update
```

@tab yarn

```bash
yarn dlx vp-update
```

@tab npm

```bash
npx vp-update
```

:::
