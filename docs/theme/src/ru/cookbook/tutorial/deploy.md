---
title: Деплой проекта
icon: launch
category:
  - Учебник с примерами
  - Руководство
  - Начало работы
tag:
  - Деплой проекта
---

В этом руководстве вы узнаете, как развернуть проект VuePress.

<!-- more -->

## Сборка проекта

После того, как вы завершили начальную стадию разработки проекта локально, вы можете создать веб-сайт с помощью команды `pnpm docs:build`.

Если вы используете шаблон темы, содержимое веб-сайта будет выводиться в файл `.vuepress/dist` в папке проекта VuePress. Эти файлы являются конечным результатом VuePress.

Вы можете развернуть содержимое этой папки на сервере вашего сайта. Самый простой способ сделать это — загрузить на GitHub и запустить GitHub Pages.

## Деплой на GitHub Pages

Если вы используете шаблон темы и решили создать рабочий процесс GitHub во время установки, единственное, что вам нужно сделать, это установить правильный [базовый параметр](https://v2.vuepress.vuejs.org/reference/config.html#base).

- Если вы собираетесь публиковать на `https://<USERNAME>.github.io/`, вы должны загрузить весь проект на репозиторий `https://github.com/<USERNAME>/<USERNAME>.github.io` . В этом случае вам не нужно вносить какие-либо изменения, так как базовый по умолчанию равен `"/"`.

- Если ваша ссылка на репозиторий имеет обычный формат, например `https://github.com/<USERNAME>/<REPO>`, веб-сайт будет опубликован на `https://<USERNAME>.github.io /<REPO>/`, поэтому вам нужно установить базу на `"/<REPO>/"`.

::: details GitHub Workflow

Если вы не выбрали создание рабочего процесса при создании шаблона, теперь вы можете создать его вручную:

1. Создайте папку `.github` в корневой папке проекта
1. Создайте папку `workflows` в папке `.github`
1. Создайте `deploy-docs.yml` в папке `workflows`
1. Вставьте следующее содержимое в `deploy-docs.yml` и сохраните его.

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

## Другие методы развертывания

Чтобы узнать о других методах развертывания, смотрите [VuePress → Развертывание](https://v2.vuepress.vuejs.org/guide/deployment.html).
