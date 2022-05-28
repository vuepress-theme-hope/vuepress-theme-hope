---
title: Project Deployment
icon: launch
category:
  - Cookbook
  - Tutorial
  - Get Started
tag:
  - Project Deployment
---

This tutorial guides you on how to deploy a VuePress project.

<!-- more -->

## Build Project

Once you completed the starter stage development of the project locally, you can build the website using the `pnpm docs:build` command.

If you are using theme template, the website content will be output to the `.vuepress/dist` under VuePress project folder These files are the final output of VuePress.

You can deploy the contents of this folder to your website's server. The easiest way to do this is to upload to GitHub and start GitHub Pages.

## Deploy to GitHub Pages

If you're using theme template and you choose to create GitHub workflow during setup, the only thing you need to do is set the correct [base option](https://v2.vuepress.vuejs.org/reference/config.html#base).

- If you are going to publish to `https://<USERNAME>.github.io/`, you must upload the entire project to the `https://github.com/<USERNAME>/<USERNAME>.github.io` repository . You don't need to make any changes in this case, since base defaults to `"/"`.

- If your repository link is in a normal format like `https://github.com/<USERNAME>/<REPO>`, the website will be published to `https://<USERNAME>.github.io /<REPO>/` , so you need to set base to `"/<REPO>/"`.

::: details GitHub Workflow

If you didn't choose to create a workflow when you were creating template, you can now create it manually:

1. Create a `.github` folder in the project root folder
1. Create a `workflows` folder under the `.github` folder
1. Create `deploy-docs.yml` in the `workflows` folder
1. Paste the following content into `deploy-docs.yml` and save it.

```yml
name: Deploy Docs

on:
  push:
    branches:
      # make sure this is the branch you are using
      - main

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          # if your docs needs submodules, uncomment the following line
          # submodules: true

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 7
          run_install: true

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: pnpm

      - name: Build Docs
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: pnpm docs:build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # This is the branch where the docs are deployed to
          branch: gh-pages
          folder: docs/.vuepress/dist
```

:::

## Other deployment methods

For other deployment methods, please refer to [VuePress → Deployment](https://v2.vuepress.vuejs.org/guide/deployment.html).
