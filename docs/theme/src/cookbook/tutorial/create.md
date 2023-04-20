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

This tutorial will guide you through creating a VuePress Theme Hope project.

<!-- more -->

## Choose an Appropriate Location

To avoid accidentally triggering some strange problems that you cannot solve by yourself, please try to avoid using file paths that contain CJK characters, emoji or spaces (e.g. `C:\Users\毛泽东\Desktop\VuePress Project\Hope theme ❤️\`).

It is recommended to use plain English paths (e.g. `D:\projects\vuepress-theme-hope\`).

## Initialize Project

Open a terminal in the folder in the chosen location.

::: tip Opening terminal on Windows

Please use file explorer to open that folder, then enter `cmd` in the address bar above and press Enter.

:::

Execute one of the following command in terminal:

```sh
# pnpm
pnpm create vuepress-theme-hope my-docs

# yarn
yarn create vuepress-theme-hope my-docs

# npm
npm init vuepress-theme-hope my-docs
```

::: tip Folder Argument

Here `my-docs` is an argument representing the folder name of the VuePress Theme Hope project. In this tutorial, we will generate the project to the `my-docs` folder in the current directory.

You can change this parameter to use a new folder if you want.

:::

::: tip Dev Server

If you choose to start the development server after the template is initialized, you can enter `localhost:8080/` in the browser address bar to access the development server after the dev server starts.

:::
