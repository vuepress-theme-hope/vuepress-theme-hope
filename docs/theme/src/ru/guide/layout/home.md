---
title: Главная страница
icon: home
order: 6
category:
  - Макет
tag:
  - Главная
  - Макет
---

`vuepress-theme-hope` улучшает домашнюю страницу по умолчанию.

Чтобы использовать его, установите `home: true` в frontmatter страницы. Любой дополнительный контент после `YAML front matter` будет проанализирован как обычный Markdown и отображен после раздела функций.

![Скриншот](./assets/home-light.png#light)
![Скриншот](./assets/home-dark.png#dark)

<!-- more -->

## Информация о сайте

Вы можете использовать `heroText`, чтобы установить основной заголовок, и `tagline`, чтобы установить подзаголовок.

Если у вас есть логотип, вы можете поместить его в `public` папку и установить через `heroImage`, если вы хотите отображать другой логотип в ночном режиме, вы можете использовать `heroImageDark`. Для лучшего A11y мы рекомендуем вам установить описание логотипа на `heroAlt`.

## Кнопка Домашняя страница

Вы можете отобразить некоторые важные ссылки в виде кнопок на главной странице.

Вы можете установить их через `actions`, которые представляют собой массив, где каждый элемент является объектом со следующими ключами:

- `text`: текст кнопки
- `link`: ссылка кнопки
- `type`: тип кнопки (поддерживаются только `"primary"` и `"default"` (по умолчанию))

## Особенности проекта

Вы можете установить и отобразить характеристики элемента через `features`, которые представляют собой массив, каждый элемент которого представляет собой объект, содержащий следующие ключи:

- `title`: название
- `details`: детали
- `icon` (опционально): может быть заполнен полным или абсолютным путем ссылки на изображение или FontClass
- `link` (опционально): адрес ссылки

::: info

Полные элементы конфигурации смотрите в разделе [Конфигурация Frontmatter домашней страницы](../../config/frontmatter/home.md).

:::

## Демо

```md
---
home: true
icon: home
title: Home
heroImage: /logo.svg
heroText: vuepress-theme-hope
tagline: A vuepress theme with tons of features✨
actions:
  - text: Get Started 💡
    link: /guide/
    Тип: primary

  - text: Config 🛠
    link: /config/

features:
  - title: Markdown Enhance
    icon: markdown
    details: Add align, sup/sub script, footnote, tasklist, tex, flowchart, diagram, mark and presentation support in Markdown
    link: /guide/markdown/

  - title: Pageviews and comments
    icon: comment
    details: Start pageview statistics and comment support with Waline
    link: /guide/feature/comment/

  - title: Article information display
    icon: info
    details: Add author, writing date, reading time, word count and other information to your article
    link: /guide/feature/page-info/

  - title: Blog support
    icon: blog
    details: Add date, tags and category to your articles, then article, tag, category and timeline list will be auto generated
    link: /guide/blog/intro/

  - title: Article Encryption
    icon: lock
    details: Encrypt you article based on path and folders, so that only the one you want could see them
    link: /guide/feature/encrypt/

  - title: Custom theme color
    icon: palette
    details: Supports custom theme colors and allows users to switch between preset theme colors
    link: /guide/interface/theme-color/

  - title: Dark Mode
    icon: contrast
    details: Switch between light and dark modes freely
    link: /guide/interface/darkmode/

  - title: SEO enhancement
    icon: config
    details: Optimize pages for search engines
    link: /guide/feature/seo/

  - title: Sitemap
    icon: sitemap
    details: Generate a Sitemap for your site
    link: /guide/feature/sitemap/

  - title: Feed support
    icon: rss
    details: Generate feed to allow users to subscribe it
    link: /guide/feature/feed/

  - title: PWA support
    icon: mobile
    details: Make your site more like an APP
    link: /guide/feature/pwa/

  - title: More new features
    icon: more
    details: Including icon support, path navigation, footer support, fullscreen button, blog homepage, etc.
    link: /guide/feature/

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---
```
