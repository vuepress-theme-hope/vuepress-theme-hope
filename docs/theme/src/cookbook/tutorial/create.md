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
pnpm create vuepress-theme-hope@next docs

# Or

npm create vuepress-theme-hope@next docs
```

::: tip Position Argument

Here `docs` is a argument representing the folder name of VuePress project. In this tutorial, we will generate the VuePress project to the `docs` subfolder under the project folder.

You can change this parameter to use a new folder if you want, or use `.` to use the current folder directly.

If you are a novice, please keep the default `docs` parameter unchanged to better read the following chapters.

:::

::: tip Dev Server

If you choose to start the development server after the template is initialized, you can enter `localhost:8080/` in the browser address bar to access the development server after the dev server starts.

:::
