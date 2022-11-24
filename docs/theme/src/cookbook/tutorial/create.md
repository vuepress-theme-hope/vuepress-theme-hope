---
title: Create Project
icon: creative
category:
  - Cookbook
  - Tutorial
  - Get Started
tag:
  - Template
---

This tutorial will guide you through creating a VuePress Theme Hope project.

## Choose the appropriate project location

To avoid accidentally triggering some strange problems that you cannot solve by yourself, please try to avoid using file paths that contain CJK characters, emoji or spaces (eg: `C:\Users\毛泽东\Desktop\VuePress Project\Hope theme ❤️\`).

It is recommended to use plain English paths (eg: `D:\projects\vuepress-theme-hope\`).

::: tip

If you are a novice, we do not recommend you to use VuePress Theme Hope in an existing project to avoid problems that you cannot solve. Please select an empty folder to initialize VuePress Theme Hope.

:::

## Initialize Project

Open a terminal in the folder in project location.

::: tip Opening terminal on Windows

Please use file explorer to open that folder, then enter `cmd` in the address bar above and press Enter.

:::

Execute the following command in terminal:

```sh
pnpm create vuepress-theme-hope@next my-docs

# Or

npm create vuepress-theme-hope@next my-docs
```

::: tip Folder Argument

Here `my-docs` is a argument representing the folder name of the VuePress Theme Hope project. In this tutorial, we will generate the project to the `my-docs` folder in the current directory.

You can change this parameter to use a new folder if you want.

:::

::: tip Dev Server

If you choose to start the development server after the template is initialized, you can enter `localhost:8080/` in the browser address bar to access the development server after the dev server starts.

:::
