---
title: Step by Step Tutorial
icon: creative
category:
  - Cookbook
  - Tutorial
  - Get Started
---

This tutorial is a step by step tutorial.

## Environment

You need to install the latest Node.js long-term support version.

Download address:

- Node.js long-term support version: [download link](https://nodejs.org/en/)

  ::: note

  Please click the green button on the left to download it.

  :::

  During the installation process, keep all the default settings, click "next step" till it comes to "finish".

  ::: warning

  If you are really a newcomer, DO NOT change the default installation directory.

  :::

## Creating template

Create a folder in a suitable location and open the terminal under the folder.

::: note Actions for Windows

Please use the file explorer to open the corresponding folder, and then enter `cmd` in the address bar above and press Enter.

:::

Execute in the terminal:

```sh
npm create vuepress-theme-hope@next docs
```

After a while, you can enter `localhost:8080/` in the browser address bar to access the development server.

::: tip

To start the development server, please enter `npm run docs:dev` in the terminal and press Enter.

To terminate the development server, please click on the terminal and press `Ctrl + C` twice.

:::

## Add or modify pages

Except for the `.vuepress` folder under the docs folder, all the files are rendered as web pages, and the generated links correspond to the folder structure and filename one-to-one. Only `README.md` is a special case, it will be displayed as the default web page (default homepage) under the folder. This should be easy to understand.

For example, to create a `/a/b/`, you can create `docs/a/b/README.md`; to create a `/x/y.html`, you can create `docs/x/y.md`,

The content of Markdown will be rendered as the content of the web page. For the Markdown tutorial, please see [Markdown Tutorial](markdown/README.md). You can learn the content of Markdown in about fifteen minutes, and remember to come back after reading it!

After learning Markdown, you can try to edit the Markdown file yourself to modify the content of the template.

## Configure VuePress

Next, read this document [VuePress Basics](vuepress/README.md) to get a general understanding of what VuePress is and how to use it.

If you feel that you have mastered it, the next step is to read [VuePress official documentation](https://v2.vuepress.vuejs.org/guide/) and this theme document, so you can config this theme according to your needs.

::: warning

Please be sure to read the official document first before reading theme docs.

The theme docs do not provide repetitive introductions to the existing content of the official document, so if you do not read the official document, you may not be able to master certain config, such as i18n used in the template.

:::

## Building a site

After you have initially configured the project, you can use the `npm run docs:build` command to output the build result to the dist folder.

You can deploy the contents of the folder to the server of your site. The easiest way is to upload to GitHub and serve with GitHub Pages.

For related tutorials on GitHub, you can see [GitHub Documentation](https://docs.github.com/).
