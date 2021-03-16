---
title: Step by Step Tutorial
category: Get Started
---

This tutorial is a step by step tutorial.

## Environment

You need to install the latest Node.js long-term support version and Yarn.

Download address:

- Node.js long-term support version: [download link](https://nodejs.org/en/)

  > Please click the green button on the left.

  During the installation process, keep all the default settings, just click "next step" till it comes to "finish".

  ::: warning

  If you are really a newcomer, DO NOT change the default installation directory.

  :::

- Yarn:

  After installing Node.js, open the terminal and execute:

  ```sh
  npm i -g yarn

  yarn config set registry https://registry.npm.taobao.org
  ```

## Creating template

Create a folder in a suitable location and open the terminal under the folder.

> For Windows, please use the file manager to open the corresponding folder, and then enter `cmd` in the address bar above and press Enter.

Execute in the terminal:

```sh
yarn create vuepress-theme-hope docs
```

After a while, you can enter `localhost:8080/` in the browser address bar to access the development server.

::: tip

To start the development server, please enter `yarn run docs:serve` in the terminal and press Enter.

If you need to terminate the development server, please click on the terminal and press `Ctrl + C` twice.

:::

## Add or modify pages

Except for the `.vuepress` folder under the docs folder, all the files are rendered as web pages, and the generated links correspond to the folder structure and file name one-to-one. Only `readme.md` is a special case, it will be displayed as the default webpage (default homepage) under the folder. This should be easy to understand.

For example, if you want to create a `/a/b/`, you can create `docs/a/b.md` or `docs/a/b/readme.md`, but remember not to create both of them at the same time!

The content of Markdown will be rendered as the content of the web page. For the Markdown tutorial, please see [Markdown Tutorial](markdown/readme.md). You can learn the content of Markdown in about fifteen minutes, and remember to come back after reading it!

After learning Markdown, you can try to edit the Markdown file yourself to modify the content of the template.

## Configure VuePress

After learning Markdown, if you haven’t learned JavaScript, it may be difficult to learn it. So please switch the configuration file to YAML.

Please delete `.vuepress/config.js` and create `.vuepress/config.yml`, copy the following content and paste it into the file.

```yml
# Site name
title: Theme Demo
# Site description
description: A demo for vuepress-theme-hope
# Output directory
dest: ./dist
# Use this theme
theme: hope
# Theme configuration
themeConfig:
  # Navigation bar icon
  logo: /logo.svg
  # Please set as your deployment site
  hostname: https://mister-hope.github.io
  # Please change to your name
  author: Mr. Hope
```

You should learn some YAML knowledge, we recommend you to check [YAML Tutorial](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started/)

::: tip YAML limitations

Using YAML as a configuration file has certain limitations, such cannot use encryption.

If you want to use all the functions, please do not perform the above replacement operation, and read [JS Quick Start Tutorial](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects).

:::

Next, you can read this document [VuePress Basics](vuepress/readme.md) to get a general understanding of what VuePress is and how to use it.

If you feel that you have mastered it, the next step is to read [VuePress official documentation](https://v1.vuepress.vuejs.org/zh/guide/) and this theme document, and configure this theme according to your needs.

::: warning

Please be sure to read the official document first before reading theme docs.

The theme docs does not give too many repetitive introductions to the existing content of the official document, so if you do not read the official document, you may not be able to master certain configurations, such as muti-language used in the template.

:::

## Building website

After you have initially configured the project, you can use the `yarn run docs:build` command to output the website build to the dist folder.

You can deploy the contents of the folder to the server of your website. The easiest way is to upload to Github and serve with Github Pages.

For related tutorials on Github, you can refer to [Github Documentation](https://docs.github.com/).
