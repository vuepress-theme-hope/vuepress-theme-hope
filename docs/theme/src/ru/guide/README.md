---
title: Руководство
icon: creative
index: false
category:
  - Вступление
tag:
  - Вступление
---

::: tip

Если вы столкнулись с ошибкой во время использования, вы можете открыть проблему [здесь](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues)

:::

## Возможности темы✨

Тема во многом наследует конфиг `@vuepress/theme-default`, при этом добавляет в него множество функций и оптимизацию макета.

<!-- more -->

### Улучшение разметки

Добавлено больше синтаксиса в Markdown, что обогащает документацию и написание блогов:

- [Пользовательский контейнер](markdown/container.md)
- [Вкладки](markdown/tabs.md)
- [Вкладки кода](markdown/code-tabs.md)
- [Сноска](markdown/footnote.md)
- [Список задач](markdown/tasklist.md)
- [Улучшение изображения](markdown/image.md)
- [Пользовательское выравнивание](markdown/align.md)
- [Пользовательские атрибуты](markdown/attrs.md)
- [Подстрочный и Надстрочный индекс](markdown/sup-sub.md)
- [Выделение](markdown/mark.md)
- [Диаграмма](markdown/chart.md)
- [ECharts](markdown/echarts.md)
- [Блок-схема](markdown/flowchart.md)
- [Поддержка Tex](markdown/tex.md)
- [Диаграмма Mermaid](markdown/mermaid.md)
- [Включить файл](markdown/include.md)
- [Демонстрация кода](markdown/demo.md)
- [Презентация](markdown/presentation.md)
- [Стилизация](markdown/stylize.md)
- [Компоненты из коробки](markdown/components.md)
- [Кастомизация темы](interface/code-theme.md)

### Макет

Новое в странице:

- [Путь навигации](layout/breadcrumb.md)

- Добавлен [якорь TOC](layout/page.md#heading-list) справа ниже ширины рабочего стола

- [Пользовательский футер](layout/footer.md)

Оптимизация макета:

- Полностью переработана мобильная верстка
- Улучшения навигации по страницам и метастиля страниц
- [Оптимизация домашней страницы по умолчанию](layout/home.md):

  - Функции могут иметь иконки, ссылки и новый внешний вид
  - Оптимизация широкоэкранного макета

### Интерфейс

- [Поддержка иконок](interface/icon.md)

- [Панель навигации](layout/navbar.md)

- [Боковая панель](layout/sidebar.md)

- [Цвета темы](interface/tof main filesheme-color.md): позволяет динамически переключаться во время просмотра

- [Темный режим](interface/darkmode.md): позволяет переключаться вручную или применять автоматически в соответствии с настройками устройства

- [Кнопка полного экрана](interface/others.md#fullscreen-button)

- [Кнопка «Вернуться к началу»](interface/others.md#back-to-top-button)

### Улучшение страницы

- [Копирование кода в один клик](feature/copy-code.md)

- [Функция предварительного просмотра изображения](feature/photo-swipe.md): поддерживает масштабирование, перетаскивание, скользящий просмотр, совместное использование и загрузку

- [Сервис комментариев](feature/comment.md)

- [Информация о странице](feature/page-info.md)

  - Количество чтений
  - Автор и дата написания
  - Автоматически сгенерированное количество слов и предполагаемое время чтения
  - Теги и категории

- [Авторское право](feature/copyright.md)

- [Шифрование](feature/encrypt.md)

- [Поддержка поиска](feature/search.md)

### Блог

- [Список статей с прикрепленной поддержкой и автогенерацией резюме](blog/intro.md)

- [Список категорий и тегов](blog/category-and-tags.md)

- [Временная шкала](blog/timeline.md)

- [Избранная статья](blog/article.md)

- [Новый макет главной страницы](blog/home.md)

### Расширенные возможности

- [Поддержка PWA](advanced/pwa.md)

- [Генерация фида](advanced/feed.md)

- [SEO-улучшение](advanced/seo.md)

- [Генерация карты сайта](advanced/sitemap.md)

## Встроенные плагины🧩

Тема включает в себя следующие плагины, вы можете использовать их в других темах или напрямую.

- [vuepress-plugin-blog2][blog2]: Плагин блога для VuePress2

- [vuepress-plugin-comment2][comment2]: Комментарии и просмотры страниц

- [vuepress-plugin-components][components]: Предоставляет некоторые готовые плагины

- [vuepress-plugin-copy-code2][copy-code2]: Предоставляет кнопку копирования для блоков кода

- [vuepress-plugin-copyright2][copyright2]: Добавляет информацию об авторских правах при копировании или отключении копирования и выбора

- [vuepress-plugin-feed2][feed2]: Поддержка фидов

- [vuepress-plugin-md-enhance][md-enhance]: Предоставляет больше синтаксиса Markdown

- [vuepress-plugin-photo-swipe][photo-swipe]: Делает так, чтобы изображение на сайте поддерживало увеличение масштаба

- [vuepress-plugin-pwa2][pwa2]: Расширенная поддержка PWA

- [vuepress-plugin-reading-time2][reading-time2]: Ожидаемое время чтения и количество слов

- [vuepress-plugin-redirect][redirect]: Редирект страниц

- [vuepress-plugin-sass-palette][sass-palette]: Плагин в стиле Sass для всех плагинов и тем

- [vuepress-plugin-seo2][seo2]: Плагин для улучшения СЕО

- [vuepress-plugin-sitemap2][sitemap2]: Плагин карты сайта

::: tip

Вот некоторые другие плагины, которые по умолчанию не включены в тему, вы можете включить их в соответствии со своими потребностями

- [vuepress-plugin-lightgallery][lightgallery]: Плагин предварительного просмотра фотографий на основе lightgallery

:::

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
[sass-palette]: https://vuepress-theme-hope.github.io/v2/sass-palette/
[seo2]: https://vuepress-theme-hope.github.io/v2/seo/
[sitemap2]: https://vuepress-theme-hope.github.io/v2/sitemap/
