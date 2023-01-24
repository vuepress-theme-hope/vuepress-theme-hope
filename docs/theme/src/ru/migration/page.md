---
title: Руководство по миграции страницы
icon: file
category:
  - Миграция
tag:
  - Миграция
  - Frontmatter
  - Страница
---

## Frontmatter

### Устаревшее

- помечено `time` как устаревшее, вместо этого использовать `date`

- помечено `categories` как устаревшее, вместо этого использовать `category`

- помечено `tags` как устаревшее, вместо этого использовать `tag`

### Изменения

- изменен тип `author` с `string | undefined` на `AuthorInfo[] | AuthorInfo | string[] | string | undefined`

  ```ts
  interface AuthorInfo {
    /**
     * Author name
     */
    name: string;

    /**
     * Author website
     */
    url?: string;

    /**
     * Author email
     */
    email?: string;
  }
  ```

  Это изменение позволяет вам добавлять нескольких авторов и настраивать для них сайты.

- `date` поддерживает только стандартную метку DateString с `-`

- изменен тип `category` с `string | undefined` на `string[] | string | undefined`

  Тема поддерживает несколько категорий.

- изменен тип `pageInfo` с `PageInfo[] | false` на `ArticleInfo[] | false`.

  Доступные значения изменяются с `"author"`, `"time"`, `"category"`, `"tag"`, `"reading-time"`, `"word"`, `"visitor"` на `"Author"`, `"Date"`, `"Original"`, `"Category"`, `"Tag"`, `"ReadingTime"`, `"Word"`, `"Visitor"`

- переименовано `sidebarDepth` в `headerDepth`

- переименовано `copyrightText` в `copyright`

- переименовано `anchorDisplay` в `toc`

- переименовано `updateTime` в `lastUpdated`

- изменены типы `prev` и `next` с `string | false` на `AutoLinkOptions | string | false`

  ```ts
  interface AutoLinkOptions {
    text: string;
    icon: string;
    link: string;
  }
  ```

### Удаления

- удалено `password`

  Из соображений безопасности V2 убирает этот метод шифрования исходного текста шифра.

- удалено `copyright`

  Связанный плагин еще не совместим с V2.

- удалено `mediaLink`

  Футер больше не отображает медиа-ссылки.

## Markdown

- Изменен синтаксис демо-кода

  До:

  ```md
  ::: demo Title

  <!-- demo content -->

  :::

  ::: demo [vue] Title

  <!-- demo content -->

  :::

  ::: demo [react] Title

  <!-- demo content -->

  :::
  ```

  После:

  ```md
  ::: normal-demo Title

  <!-- demo content -->

  :::

  ::: vue-demo Title

  <!-- demo content -->

  :::

  ::: react-demo Title

  <!-- demo content -->

  :::
  ```

- Группа кодов изменена на вкладку кода

  До:

  ````md
  :::: code-group

  ::: code-group-item pnpm

  ```bash
  pnpm create vuepress-theme-hope [dir]
  ```

  :::

  ::: code-group-item npm:active

  ```bash
  npm init vuepress-theme-hope [dir]
  ```

  :::

  ::::
  ````

  После:

  ````md
  ::: code-tabs

  @tab pnpm

  ```bash
  pnpm create vuepress-theme-hope [dir]
  ```

  @tab:active npm

  ```bash
  npm init vuepress-theme-hope [dir]
  ```

  :::
  ````

## Макет

### Домашняя страница проекта

Изменены параметры frontmatter главной страницы проекта.

- переименовано `title` в `heroText`
- переименовано `darkHeroImage` в `heroImageDark`
- переименовано `action` в `actions`
