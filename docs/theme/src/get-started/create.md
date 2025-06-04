---
title: Create Project
icon: folder-plus
order: 2
category:
  - Cookbook
  - Tutorial
  - Get Started
tag:
  - Template
---

This tutorial guides you through creating a VuePress Theme Hope project.

<!-- more -->

## 1. Choose an Appropriate Location

To avoid accidentally triggering problems that you cannot solve, please avoid using file paths that contain CJK characters, emoji or spaces (e.g. `C:\Users\鲁迅\Desktop\VuePress Project\Hope theme ❤️\`).

We recommend using plain English paths (e.g. `D:\projects\vuepress-theme-hope\`).

## 2. Create Project Template

Open a terminal in the chosen folder.

::: tip Opening Terminal on Windows

Please use File Explorer to open that folder, then enter `cmd` in the address bar above and press Enter.

:::

Execute one of the following commands in the terminal:

::: code-tabs#shell

@tab pnpm (Recommended)#pnpm

```bash
pnpm create vuepress-theme-hope my-docs
```

@tab yarn

```bash
yarn create vuepress-theme-hope my-docs
```

@tab npm

```bash
npm init vuepress-theme-hope@latest my-docs
```

:::

::: tip Folder Argument

Here `my-docs` is an argument representing the folder name of the VuePress Theme Hope project. In this tutorial, we will generate the project to the `my-docs` folder in the current directory.

You can change this parameter to use a new folder if you want.

:::

::: tip Development Server

If you choose to start the development server after the template is initialized, you can enter `localhost:8080/` in the browser address bar to access the development server after it starts.

:::
