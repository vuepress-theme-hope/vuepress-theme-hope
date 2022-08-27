---
home: true
icon: home
title: Главная
heroImage: /logo.svg
heroText: vuepress-theme-hope
tagline: Тема vuepress с множеством функций✨
actions:
  - text: Начать 💡
    link: /guide/
    type: primary

  - text: Конфиг 🛠
    link: /config/

  - text: Онлайн-демонстрация 🪀
    link: https://stackblitz.com/fork/vuepress-theme-hope

features:
  - title: Улучшение разметки
    icon: markdown
    details: Добавление выравнивания, надстрочного/подстрочного скрипта, сноски, списка задач, текста, блок-схемы, диаграммы, выделения и поддержка презентации в Markdown
    link: /guide/markdown/

  - title: Слайд-страница
    icon: slides
    details: Добавление страниц слайдов для отображения того, что вам нравится
    link: /guide/layout/slides

  - title: Улучшение макета
    icon: layout
    details: Добавление хлебных крошек, нижнего колонтитула, улучшенной панели навигации, улучшенной навигации по страницам и т. д.
    link: /guide/layout/

  - title: Просмотры страниц и комментарии
    icon: comment
    details: Запустите статистику просмотров страниц и поддержку комментариев с помощью Waline
    link: /guide/feature/comment.html

  - title: Информация о статье
    icon: info
    details: Добавление автора, даты написания, время чтения, количество слов и другой информации в свою статью
    link: /guide/feature/page-info.html

  - title: Поддержка блога
    icon: blog
    details: Список ваших статей с их датами, тегами и категориями с некоторыми потрясающими макетами
    link: /guide/blog/

  - title: Пользовательский цвет темы
    icon: palette
    details: Поддержка пользовательских цветов темы и позволяет пользователям переключаться между предустановленными цветами темы
    link: /guide/interface/theme-color.html

  - title: Темный режим
    icon: contrast
    details: Свободно переключайтесь между светлым и темным режимами
    link: /guide/interface/darkmode.html

  - title: Полная поддержка A11y
    icon: support
    details: Полная поддержка специальных возможностей на вашем сайте
    link: /guide/interface/accessibility.html

  - title: Шифрование статьи
    icon: lock
    details: Шифруйте свои статьи на основе ссылок на страницы, чтобы их мог видеть только тот, кому вы хотите
    link: /guide/feature/encrypt.html

  - title: Кнопка копирования
    icon: copy
    details: Копируйте коды одним кликом в блоках кодов
    link: /guide/feature/copy-code.html

  - title: Предпросмотр изображения
    icon: pic
    details: Поддержка просмотра, масштабирования, обмена изображениями на странице, например, в галерее
    link: /guide/feature/photo-swipe.html

  - title: СЕО-улучшения
    icon: config
    details: Оптимизация страниц для поисковых систем
    link: /guide/advanced/seo.html

  - title: Карта сайта
    icon: sitemap
    details: Создание карты сайта для своего сайта
    link: /guide/advanced/sitemap.html

  - title: Поддержка каналов
    icon: rss
    details: Создание фида, чтобы пользователи могли подписаться на него
    link: /guide/advanced/feed.html

  - title: Поддержка PWA
    icon: mobile
    details: Сделайте свой сайт больше похожим на APP
    link: /guide/advanced/pwa.html

  - title: Больше новых функций
    icon: more
    details: Включая поддержку иконок, полноэкранную кнопку и т. д.
    link: /guide/feature/

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## 🛠Установка

Создайте проект vuepress-theme-hope в каталоге `[dir]` внутри текущего проекта:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope@next [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope@next [dir]
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

<a v-if="isNetlify " href="https://www.netlify.com" target="_blank">

![Деплой от Netlify](https://www.netlify.com/img/global/badges/netlify-light.svg#light)
![Деплой от Netlify](https://www.netlify.com/img/global/badges/netlify-dark.svg#dark)

</a>

<script setup lang="ts">
const isNetlify = IS_NETLIFY;
</script>
