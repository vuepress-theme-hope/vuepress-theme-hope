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

## Опции Frontmatter

### home

- Тип: `boolean`

Включить стиль домашней страницы при значении `true`

### title

- Тип: `string`
- Обязательно: Нет

Название страницы будет использоваться в хлебных крошках, SEO и т. д.

### heroText

- Тип: `string | false`
- По умолчанию: `"Hello"`

Титул героя

### tagline

- Тип: `string | false`
- По умолчанию: `"Welcome to your VuePress site"`

Краткое описание в герое

### heroImage

- Тип: `string`
- Обязательно: Нет

Адрес изображения главного героя (логотипа), необходимо указать абсолютный путь (изображения необходимо поместить в папку `.vuepress/public`)

### heroImageDark

- Тип: `string`
- Обязательно: Нет

Адрес изображения главного героя (логотипа) темного режима, необходимо указать абсолютный путь (изображения необходимо поместить в папку `.vuepress/public`), по умолчанию будет таким же, как и `heroImage`.

### heroAlt

- Тип: `string`
- Обязательно: Нет

Альтернативный текст иконки Home

### actions

- Тип: `ActionConfig | ActionConfig[]`
- Обязательно: Нет

Структура `ActionConfig`:

- `text`: Кнопка текстом
- `link`: Кнопка ссылкой
- `type`: Тип кнопки (Поддержка только `"primary"` и `"default"` (по умолчанию))

### features

- Тип: `Feature[]`
- Обязательно: Нет

Структура `Feature`:

- `title`: `string` тайтл
- `details` (опционально): `string` детали
- `icon` (опционально): `string` иконка FontClass
- `link` (опционально): `string` адрес ссылки

Описание функции

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
