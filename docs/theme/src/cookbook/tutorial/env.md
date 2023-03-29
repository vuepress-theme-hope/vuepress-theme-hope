---
title: Setting Environment
icon: leaf
order: 1
category:
  - Cookbook
  - Tutorial
  - Get Started
tag:
  - Setting Environment
---

This tutorial will guide you on how to set up a VuePress runtime environment.

<!-- more -->

## Node.js

[Node.js®](https://nodejs.org/en/) is a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/).

You need to download and install the latest long-term maintenance release on your computer.

### Download Node.js LTS

[Download link](https://nodejs.org/en/).

::: note

In the opened page, click the green button (LTS) on the left to complete the download.

:::

### Install Node.js LTS

During the installation process, keep all the default settings and go all the way to the next step.

::: warning

If you are a real novice, please do not change the default installation directory.

Node.js itself will only take up a few dozen megabytes of space!

:::

## Editor

You need an editor to edit your project, and we recommend using VSCode to write and run your VuePress projects.

### Download VSCode

[Download link](https://code.visualstudio.com/)

::: tip

Please click the blue button on the left to complete the download.

:::

### Install VSCode

1. Double-click the installation package to open

1. Agree to the User Agreement.

1. In the installation options, be sure to **select all** the following options:

   Tick **Add to directory context menu**, **Add to file context menu**, **Register code as a supported file editor**, **Add to path**.

1. After the initial startup of VS Code, if Git is not installed in advance, it may prompt that the Git software is not found, just ignore it.

## Pnpm

After you install Node.js, please install [pnpm](https://pnpm.io).

::: tip

We recommend you to choose pnpm as package manager, because VuePress and VuePress Theme Hope both use pnpm to manage dependencies.

Some features of pnpm ensure that you have the correct dependencies, also it can speed up your installation.

:::

### Install Pnpm

Install pnpm by entering the following command in the terminal:

```sh
corepack enable
corepack prepare pnpm@latest --activate
```
