---
title: Введение в плагины
icon: circle-info
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

- <ProjectLink name="auto-catalog">vuepress-plugin-auto-catalog</ProjectLink>: Catalog automatically generation for VuePress2

- <ProjectLink name="blog2">vuepress-plugin-blog2</ProjectLink>: Плагин блога для VuePress2

- <ProjectLink name="comment2">vuepress-plugin-comment2</ProjectLink>: Обеспечивает функцию комментариев и просмотра страниц

- <ProjectLink name="components">vuepress-plugin-components</ProjectLink>: Предоставляет некоторые плагины из коробки

- <ProjectLink name="copy-code2">vuepress-plugin-copy-code2</ProjectLink>: Обеспечивает функцию блокировки кода копирования одним щелчком мыши.

- <ProjectLink name="copyright2">vuepress-plugin-copyright2</ProjectLink>: Добавление информации об авторских правах при копировании или отключении копирования и выбора.

- <ProjectLink name="feed2">vuepress-plugin-feed2</ProjectLink>: Поддержка каналов

- <ProjectLink name="md-enhance">vuepress-plugin-md-enhance</ProjectLink>: Предоставляет больше синтаксиса Markdown

- <ProjectLink name="photo-swipe">vuepress-plugin-photo-swipe</ProjectLink>: Плагин предварительного просмотра изображений, основанный на фотопролистывании

- <ProjectLink name="pwa2">vuepress-plugin-pwa2</ProjectLink>: Расширенная поддержка PWA

- <ProjectLink name="reading-time2">vuepress-plugin-reading-time2</ProjectLink>: Время чтения и количество слов

- <ProjectLink name="sass-palette">vuepress-plugin-sass-palette</ProjectLink>: Плагин в стиле Sass для всех плагинов и тем

- <ProjectLink name="seo2">vuepress-plugin-seo2</ProjectLink>: Плагин для улучшения SEO

- <ProjectLink name="sitemap2">vuepress-plugin-sitemap2</ProjectLink>: Плагин карты сайта

::: tip

Вот некоторые другие плагины, которые по умолчанию не включены в тему, вы можете включить их в соответствии со своими потребностями.

- <ProjectLink name="lightgallery">vuepress-plugin-lightgallery</ProjectLink>: Плагин предварительного просмотра изображений на основе lightgallery

- <ProjectLink name="redirect">vuepress-plugin-redirect</ProjectLink>: Перенаправления страницы

- <ProjectLink name="remove-pwa">vuepress-plugin-remove-pwa</ProjectLink>: Plugins to remove pwa

- <ProjectLink name="search-pro">vuepress-plugin-search-pro</ProjectLink>: Client search plugin

:::

### Официальный плагин

- [@vuepress/plugin-active-header-links][active-header-links]: Автоматически обновлять хэш маршрута

- [@vuepress/plugin-container][container]: Пользовательский контейнер

- [@vuepress/external-link-icon][external-link-icon]: Добавить значок внешней ссылки для внешних ссылок в Markdown

- [@vuepress/plugin-git][git]: Информационный плагин на основе Git

- [@vuepress/plugin-nprogress][nprogress]: Индикатор

- [@vuepress/plugin-prismjs][prismjs]: Плагин подсветки кода с использованием Prism.js

- [@vuepress/plugin-theme-data][theme-data]: Плагин Composition API для данных темы

[active-header-links]: https://v2.vuepress.vuejs.org/reference/plugin/active-header-links.html
[container]: https://v2.vuepress.vuejs.org/reference/plugin/container.html
[external-link-icon]: https://v2.vuepress.vuejs.org/reference/plugin/external-link-icon.html
[git]: https://v2.vuepress.vuejs.org/reference/plugin/git.html
[nprogress]: https://v2.vuepress.vuejs.org/reference/plugin/nprogress.html
[prismjs]: https://v2.vuepress.vuejs.org/reference/plugin/prismjs.html
[theme-data]: https://v2.vuepress.vuejs.org/reference/plugin/theme-data.html
[vuepress]: https://v2.vuepress.vuejs.org/
