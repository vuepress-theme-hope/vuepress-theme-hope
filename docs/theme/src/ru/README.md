---
home: true
icon: home
title: Главная
heroImage: /logo.svg
heroText: VuePress Theme Hope
tagline: Тема vuepress с множеством функций✨
actions:
  - text: Руководство 🧭
    link: /ru/cookbook/tutorial/
    type: primary

  - text: вступление 💡
    link: /ru/guide/get-started/intro.html

  - text: Конфиг 🛠
    link: /ru/config/

  - text: Онлайн-демонстрация 🪀
    link: https://stackblitz.com/fork/vuepress-theme-hope

features:
  - title: Улучшение разметки
    icon: fab fa-markdown
    details: Добавление выравнивания, надстрочного/подстрочного скрипта, сноски, списка задач, текста, блок-схемы, диаграммы, выделения и поддержка презентации в Markdown
    link: /ru/guide/markdown/

  - title: Слайд-страница
    icon: person-chalkboard
    details: Добавление страниц слайдов для отображения того, что вам нравится
    link: /ru/guide/layout/slides

  - title: Улучшение макета
    icon: object-group
    details: Добавление хлебных крошек, нижнего колонтитула, улучшенной панели навигации, улучшенной навигации по страницам и т. д.
    link: /ru/guide/layout/

  - title: Просмотры страниц и комментарии
    icon: comment-dots
    details: Запустите статистику просмотров страниц и поддержку комментариев с помощью Waline
    link: /ru/guide/feature/comment.html

  - title: Информация о статье
    icon: circle-info
    details: Добавление автора, даты написания, время чтения, количество слов и другой информации в свою статью
    link: /ru/guide/feature/page-info.html

  - title: Поддержка блога
    icon: blog
    details: Список ваших статей с их датами, тегами и категориями с некоторыми потрясающими макетами
    link: /guide/blog/

  - title: Пользовательский цвет темы
    icon: palette
    details: Поддержка пользовательских цветов темы и позволяет пользователям переключаться между предустановленными цветами темы
    link: /ru/guide/interface/theme-color.html

  - title: Темный режим
    icon: circle-half-stroke
    details: Свободно переключайтесь между светлым и темным режимами
    link: /ru/guide/interface/darkmode.html

  - title: Полная поддержка A11y
    icon: universal-access
    details: Полная поддержка специальных возможностей на вашем сайте
    link: /ru/guide/interface/accessibility.html

  - title: Шифрование статьи
    icon: lock
    details: Шифруйте свои статьи на основе ссылок на страницы, чтобы их мог видеть только тот, кому вы хотите
    link: /ru/guide/feature/encrypt.html

  - title: Search
    icon: search
    details: Support docsearch and client search
    link: /ru/guide/feature/search.html

  - title: Кнопка копирования
    icon: copy
    details: Копируйте коды одним кликом в блоках кодов
    link: /ru/guide/feature/copy-code.html

  - title: Предпросмотр изображения
    icon: image
    details: Поддержка просмотра, масштабирования, обмена изображениями на странице, например, в галерее
    link: /ru/guide/feature/photo-swipe.html

  - title: СЕО-улучшения
    icon: dumbbell
    details: Оптимизация страниц для поисковых систем
    link: /ru/guide/advanced/seo.html

  - title: Карта сайта
    icon: sitemap
    details: Создание карты сайта для своего сайта
    link: /ru/guide/advanced/sitemap.html

  - title: Поддержка каналов
    icon: rss
    details: Создание потока, чтобы пользователи могли подписаться на него
    link: /ru/guide/advanced/feed.html

  - title: Поддержка PWA
    icon: mobile-screen
    details: Сделайте свой сайт больше похожим на APP
    link: /ru/guide/advanced/pwa.html

  - title: Больше новых функций
    icon: ellipsis
    details: Включая поддержку иконок, полноэкранную кнопку и т. д.
    link: /ru/guide/feature/

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## 🛠Установка

Создайте проект vuepress-theme-hope в каталоге `[dir]` по текущему пути:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope [dir]
```

@tab yarn

```bash
yarn create vuepress-theme-hope [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope [dir]
```

:::

To add vuepress-theme-hope as docs builder to an existing project, run the following command in the project root directory:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope add [dir]
```

@tab yarn

```bash
yarn create vuepress-theme-hope add [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope add [dir]
```

:::

## 🚀Использование

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // your theme config here
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    // your theme config here
  }),
};
```

:::

## Пошаговое руководство

- [Учебное пособие](cookbook/tutorial/README.md)

## Группа в Телеграмм

- [vuepressthemehope](https://t.me/vuepressthemehope)

<!-- markdownlint-disable -->

<NetlifyBadge alt="Деплой от Netlify" />

<script setup lang="ts">
import NetlifyBadge from "@NetlifyBadge";
</script>
