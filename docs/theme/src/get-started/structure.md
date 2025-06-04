---
title: Project Structure
icon: folder-tree
order: 6
category:
  - Cookbook
  - Tutorial
  - Get Started
tag:
  - Project Structure
---

This tutorial introduces VuePress project structure.

<!-- more -->

## VuePress Project Structure

VuePress only controls the files in the VuePress project folder, that is, the parameters in the previous chapter. Other files in the project are not used by VuePress.

::: note

If you used `docs` as instructed in the previous tutorial, then `docs` is your VuePress project folder.

:::

A basic project structure is as follows:

```
.
├── .github (optional) → GitHub config file storage path
│     └── workflow → GitHub workflow configuration
│          └── docs-deploy.yml → Workflow for automatic deployment of documentation
│
├── src → docs folder
│    │
│    ├── .vuepress (optional) → VuePress config folder
│    │    │
│    │    ├── dist (default) → build output directory
│    │    │
│    │    ├── public (optional) → static resource directory
│    │    │
│    │    ├── styles (optional) → style-related files
│    │    │
│    │    ├── config.{js,ts} (optional) → the entry file of the configuration
│    │    │
│    │    └── client.{js,ts} (optional) → client application file
│    │
│    ├── ... → Other project documentation
│    │
│    └── README.md → Project Homepage
│
└── package.json → Node.js configuration file
```
