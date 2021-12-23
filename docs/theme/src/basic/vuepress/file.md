---
title: File Structure
icon: folder
category: basic
tags:
  - vuepress
---

## File Structure

```md
.
├── dist → Built Output
│
├── src
│ ├── .vuepress (Optional) → VuePress Config
│ │ ├── components (Optional) → Components in this dir will be registered as global components
│ │ │
│ │ ├── theme (Optional) → Personal built Theme
│ │ │ │
│ │ │ ├── ... → See detail at 'Theme' part
│ │ │ │
│ │ │ └── Layout.vue → Website layout
│ │ │
│ │ ├── public (Optional) → Static resource dir
│ │ │
│ │ ├── styles (Optional) → Stores style related files
│ │ │ ├── index.styl → Automatically applied global style files
│ │ │ └── palette.styl → override and set color constants
│ │ │
│ │ ├── templates (Optional, Config carefully) → Templates
│ │ │ ├── dev.html → HTML template file for development environment
│ │ │ └── ssr.html → Vue SSR based HTML template file in the built time
│ │ │
│ │ ├── config.js (Optional) → Entry file of configuration
│ │ │
│ │ └── enhanceApp.js (Optional) → App level enhancement
│ │
│ ├── readme.md → Mainpage
│ ├── vuepress
│ │ ├── file.md
│ │ └── readme.md
│ ├── markdown
│ │ ├── emoji.md
│ │ └── readme.md
│ │
│ └── en → English Folder
│ ├── readme.md
│ │
│ ├── vuepress
│ │ └── readme.md
│ │
│ └── markdown
│ ├── emoji.md
│ └── readme.md
│
├─── readme.md → Project default description
├─── readme.en-US.md → Project English description
│
├── LICENSE → LICENSE File
│
├── package-lock.json → The structure of the package actually installed by the project
└── package.json → Node.js declaration file for the entire project
```

## src folder

The **source code** is placed in the `src` directory, in which all **Markdown** files are rendered into **HTML**. That is the time when **readme.md** is rendered into **index.HTML**. VuePress’s configuration files are all placed in the `src/.vuepress` directory.

## dist folder

The built code will be **output** to the **dist** directory, just upload it to the server you need to deploy.

If you use an automated build tool, you **DONOT** need to perform the build locally after you turn on automatic deployment.。

## package.json

Node.js declaration file for the entire project, it is a file that must be included in the Node.js project. Contains information such as **project name**, **details**, **license**, and **packages** being used.

## readme.md

Project documentation on GitHub.

## Others

File that do not need to be understand at the beginning:

| Files                          | Content                                                        |
| ------------------------------ | -------------------------------------------------------------- |
| node_modules                   | Stored the package used by the project                         |
| LICENSE                        | Project license document                                       |
| yarn.lock or package-lock.json | The structure of the package actually installed by the project |

## .vuepress

The `.vuepress` folder should be placed directly in the source code directory. It contains the configuration options for VuePress.

### config.js

The configuration file for the project. For specific configuration instructions, please open the file to view the comments.

::: tip

For more details, please view [VuePress Config](https://v1.vuepress.vuejs.org/config/)

:::

### public folder

A folder where other files on the site being placed. The files in the folder will be copied directly to the built directory when you build. Its content are usually resources that do not need to be imported using relative paths, such as icons for sites.

### style folder

The style of the entire site is placed, where `index.styl` is the style file for the extra expansion of the entire site, and `palette.styl` is the color configuration of the entire site.

::: tip

Styl is a extend of CSS that extends and changes the way CSS is written, and variables can be used derectly. Beginners do not need to master.

:::

File that do not need to be understand at the beginning:

| Folder     | Content                                             |
| ---------- | --------------------------------------------------- |
| components | Placed the Vue component in the VuePress site       |
| theme      | Placed the theme of the VuePress site               |
| templates  | Placed the template and layout of the VuePress site |
