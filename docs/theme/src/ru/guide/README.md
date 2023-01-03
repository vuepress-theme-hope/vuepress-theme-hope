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
- [Playground](markdown/playground.md)
- [Vue Playground](markdown/vue-playground.md)
- [Компоненты из коробки](markdown/components.md)
- [Кастомизация темы](interface/code-theme.md)

### Макет

Новое в странице:

- [Путь навигации](layout/breadcrumb.md)

- Добавлен [якорь TOC](layout/page.md#список-заголовков) справа ниже ширины рабочего стола

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

- [Кнопка полного экрана](interface/others.md#полноэкранная-кнопка)

- [Кнопка «Вернуться к началу»](interface/others.md#кнопка-«вернуться-к-началу»)

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

- [Генерация потока](advanced/feed.md)

- [SEO-улучшение](advanced/seo.md)

- [Генерация карты сайта](advanced/sitemap.md)

## Встроенные плагины🧩

Тема включает в себя следующие плагины, вы можете использовать их в других темах или напрямую.

- <ProjectLink name="auto-catalog" path="/ru/">vuepress-plugin-auto-catalog</ProjectLink>: Catalog automatically generation for VuePress2

- <ProjectLink name="blog2" path="/ru/">vuepress-plugin-blog2</ProjectLink>: Плагин блога для VuePress2

- <ProjectLink name="comment2" path="/ru/">vuepress-plugin-comment2</ProjectLink>: Комментарии и просмотры страниц

- <ProjectLink name="components" path="/ru/">vuepress-plugin-components</ProjectLink>: Предоставляет некоторые готовые плагины

- <ProjectLink name="copy-code2" path="/ru/">vuepress-plugin-copy-code2</ProjectLink>: Предоставляет кнопку копирования для блоков кода

- <ProjectLink name="copyright2" path="/ru/">vuepress-plugin-copyright2</ProjectLink>: Добавляет информацию об авторских правах при копировании или отключении копирования и выбора

- <ProjectLink name="feed2" path="/ru/">vuepress-plugin-feed2</ProjectLink>: Поддержка потоков

- <ProjectLink name="md-enhance" path="/ru/">vuepress-plugin-md-enhance</ProjectLink>: Предоставляет больше синтаксиса Markdown

- <ProjectLink name="photo-swipe" path="/ru/">vuepress-plugin-photo-swipe</ProjectLink>: Делает так, чтобы изображение на сайте поддерживало увеличение масштаба

- <ProjectLink name="pwa2" path="/ru/">vuepress-plugin-pwa2</ProjectLink>: Расширенная поддержка PWA

- <ProjectLink name="reading-time2" path="/ru/">vuepress-plugin-reading-time2</ProjectLink>: Ожидаемое время чтения и количество слов

- <ProjectLink name="sass-palette" path="/ru/">vuepress-plugin-sass-palette</ProjectLink>: Плагин в стиле Sass для всех плагинов и тем

- <ProjectLink name="seo2" path="/ru/">vuepress-plugin-seo2</ProjectLink>: Плагин для улучшения СЕО

- <ProjectLink name="sitemap2" path="/ru/">vuepress-plugin-sitemap2</ProjectLink>: Плагин карты сайта

::: tip

Вот некоторые другие плагины, которые по умолчанию не включены в тему, вы можете включить их в соответствии со своими потребностями

- <ProjectLink name="lightgallery" path="/ru/">vuepress-plugin-lightgallery</ProjectLink>: Плагин предварительного просмотра фотографий на основе lightgallery

- <ProjectLink name="redirect" path="/ru/">vuepress-plugin-redirect</ProjectLink>: Редирект страниц

- <ProjectLink name="remove-pwa" path="/ru/">vuepress-plugin-remove-pwa</ProjectLink>: Plugins to remove pwa

- <ProjectLink name="search-pro" path="/ru/">vuepress-plugin-search-pro</ProjectLink>: Client search plugin

:::
