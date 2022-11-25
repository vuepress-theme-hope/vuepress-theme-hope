---
title: Введение в плагины
icon: info
order: 1
category:
  - Конфиг
tag:
  - Введение
  - Конфигурация плагина
  - Конфиг темы
---

`vuepress-theme-hope` объединяет множество плагинов VuePress.

- Некоторые плагины включаются автоматически, вы можете отключить их в настройках темы, если они вам не нужны.
- Некоторые плагины включаются только тогда, когда вы указываете необходимые параметры.

::: note

Как член [VuePress Org](https://github.com/orgs/vuepress/people), Mr. Hope разработал множество плагинов VuePress.

Все плагины, называемые `vuepress-theme-hope`, являются официальными плагинами или плагинами, разработанными г-ном Хоупом, которые размещены в репозитории `vuepress-theme-hope`.

- Документацию по официальному плагину см. на [официальном сайте VuePress2][vuepress]
- Все плагины, разработанные Mr.Hope, имеют собственную документацию и могут использоваться с другими темами.

:::

<!-- more -->

## Опции плагина

Тема предоставляет опцию `plugins` для передачи параметров плагинам.

::: info Имя параметров плагина

Все имена ключей в опции `plugins` представляют собой версию имени плагина в верблюжьем регистре, с удаленным необязательным суффиксом цифры `2`.

Например:

- `vuepress-plugin-copy-code2` управляется именем ключа `copyCode`.
- `vuepress-plugin-md-enhance2` управляется именем ключа `mdEnhance`.

:::

## Список плагинов

### Плагины предоставлены Mr.Hope

- [vuepress-plugin-blog2][blog2]: Плагин блога для VuePress2

- [vuepress-plugin-comment2][comment2]: Обеспечивает функцию комментариев и просмотра страниц

- [vuepress-plugin-components][components]: Предоставляет некоторые плагины из коробки

- [vuepress-plugin-copy-code2][copy-code2]: Обеспечивает функцию блокировки кода копирования одним щелчком мыши.

- [vuepress-plugin-copyright2][copyright2]: Добавление информации об авторских правах при копировании или отключении копирования и выбора.

- [vuepress-plugin-feed2][feed2]: Поддержка каналов

- [vuepress-plugin-md-enhance][md-enhance]: Предоставляет больше синтаксиса Markdown

- [vuepress-plugin-photo-swipe][photo-swipe]: Плагин предварительного просмотра изображений, основанный на фотопролистывании

- [vuepress-plugin-pwa2][pwa2]: Расширенная поддержка PWA

- [vuepress-plugin-reading-time2][reading-time2]: Время чтения и количество слов

- [vuepress-plugin-sass-palette][sass-palette]: Плагин в стиле Sass для всех плагинов и тем

- [vuepress-plugin-seo2][seo2]: Плагин для улучшения SEO

- [vuepress-plugin-sitemap2][sitemap2]: Плагин карты сайта

::: tip

Вот некоторые другие плагины, которые по умолчанию не включены в тему, вы можете включить их в соответствии со своими потребностями.

- [vuepress-plugin-lightgallery][lightgallery]: Плагин предварительного просмотра изображений на основе lightgallery

- [vuepress-plugin-redirect][redirect]: Перенаправления страницы

- [vuepress-plugin-remove-pwa][remove-pwa]: Plugins to remove pwa

- [vuepress-plugin-search-pro][search-pro]: Client search plugin

:::

### Официальный плагин

- [@vuepress/plugin-active-header-links][active-header-links]: Автоматически обновлять хэш маршрута

- [@vuepress/plugin-container][container]: Пользовательский контейнер

- [@vuepress/external-link-icon][external-link-icon]: Добавить значок внешней ссылки для внешних ссылок в Markdown

- [@vuepress/plugin-git][git]: Информационный плагин на основе Git

- [@vuepress/plugin-nprogress][nprogress]: Индикатор

- [@vuepress/plugin-prismjs][prismjs]: Плагин подсветки кода с использованием Prism.js

- [@vuepress/plugin-theme-data][theme-data]: Плагин Composition API для данных темы

[blog2]: https://vuepress-theme-hope.github.io/v2/blog/
[comment2]: https://vuepress-theme-hope.github.io/v2/comment/
[components]: https://vuepress-theme-hope.github.io/v2/components/
[copy-code2]: https://vuepress-theme-hope.github.io/v2/copy-code/
[copyright2]: https://vuepress-theme-hope.github.io/v2/copyright/
[feed2]: https://vuepress-theme-hope.github.io/v2/feed/
[lightgallery]: https://vuepress-theme-hope.github.io/v2/lightgallery/
[md-enhance]: https://vuepress-theme-hope.github.io/v2/md-enhance/
[photo-swipe]: https://vuepress-theme-hope.github.io/v2/photo-swipe/
[pwa2]: https://vuepress-theme-hope.github.io/v2/pwa/
[reading-time2]: https://vuepress-theme-hope.github.io/v2/reading-time/
[redirect]: https://vuepress-theme-hope.github.io/v2/redirect/
[remove-pwa]: https://vuepress-theme-hope.github.io/v2/remove-pwa/
[sass-palette]: https://vuepress-theme-hope.github.io/v2/sass-palette/
[search-pro]: https://vuepress-theme-hope.github.io/v2/search-pro/
[seo2]: https://vuepress-theme-hope.github.io/v2/seo/
[sitemap2]: https://vuepress-theme-hope.github.io/v2/sitemap/
[active-header-links]: https://v2.vuepress.vuejs.org/reference/plugin/active-header-links.html
[container]: https://v2.vuepress.vuejs.org/reference/plugin/container.html
[external-link-icon]: https://v2.vuepress.vuejs.org/reference/plugin/external-link-icon.html
[git]: https://v2.vuepress.vuejs.org/reference/plugin/git.html
[nprogress]: https://v2.vuepress.vuejs.org/reference/plugin/nprogress.html
[prismjs]: https://v2.vuepress.vuejs.org/reference/plugin/prismjs.html
[theme-data]: https://v2.vuepress.vuejs.org/reference/plugin/theme-data.html
[vuepress]: https://v2.vuepress.vuejs.org/
