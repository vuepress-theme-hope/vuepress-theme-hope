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

This tutorial provides an overview of the essential commands for managing your VuePress project.

<!-- more -->

## Common Commands

- `vuepress dev <dir>`: Starts a development server for local preview with hot-reloading.
- `vuepress build <dir>`: Compiles your site into optimized static files for production deployment.

:::: info Using Template Scripts

If you are using the VuePress Theme Hope template, the following scripts are pre-defined in your `package.json`:

```json
{
  "scripts": {
    "docs:build": "vuepress build src",
    "docs:clean-dev": "vuepress dev src --clean-cache --clean-temp",
    "docs:dev": "vuepress dev src"
  }
}
```

You can use these shortcuts with your preferred package manager:

::: tabs#shell

@tab pnpm

1. `pnpm docs:dev`: Starts the development server.
2. `pnpm docs:build`: Builds the project and generates output.
3. `pnpm docs:clean-dev`: Clears the cache and starts the development server.

@tab yarn

1. `yarn docs:dev`: Starts the development server.
2. `yarn docs:build`: Builds the project and generates output.
3. `yarn docs:clean-dev`: Clears the cache and starts the development server.

@tab npm

1. `npm run docs:dev`: Starts the development server.
2. `npm run docs:build`: Builds the project and generates output.
3. `npm run docs:clean-dev`: Clears the cache and starts the development server.

:::

::::

::: tip Terminating Development Server
To stop the development server, focus on the terminal and press `Ctrl + C`.
:::

## Update Version

To upgrade your theme and VuePress version to the latest, execute the following command:

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
