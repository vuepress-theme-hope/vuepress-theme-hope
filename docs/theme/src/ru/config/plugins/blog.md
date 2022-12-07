---
title: Конфиг плагина блога
icon: blog
order: 2
category:
  - Конфиг
tag:
  - Блог
  - Конфигурация плагина
  - Конфиг темы
---

## Введение

Тема предоставляет функцию блога, и она **не** включена по умолчанию.

Вы можете включить функцию блога, установив для `plugins.blog` значение `true` в настройках темы.

Инструкции смотрите в [Введение в блог](../../guide/blog/intro.md).

## Опции

### autoExcerpt

- Тип: `number | boolean`
- По умолчанию: `false`

Генерировать ли выдержку для каждой страницы. Number value means excerpt length (default is `200`).

::: warning Limitation

Auto excerpt is not available in devServer by default, [see reasons and how to enable it](../theme/basic.md#hotreload).

:::

### filter

- Тип: `(page: Page) => boolean`
- По умолчанию: `(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`

Фильтр страниц, определяющий, следует ли включать страницу.

По умолчанию все страницы, созданные из файлов Markdown, но не домашняя страница, будут включены в качестве статей.

### article

- Тип: `string`
- По умолчанию: `/article/`

Путь маршрута списка статей.

### category

- Тип: `string`
- По умолчанию: `/category/`

Путь маршрута карты категории.

### categoryItem

- Тип: `string`
- По умолчанию: `/category/:name/`

Путь маршрута списка категорий. `:name` будет заменено именем категории.

### tag

- Тип: `string`
- По умолчанию: `/tag/`

Отметьте путь маршрута карты.

### tagItem

- Тип: `string`
- По умолчанию: `/tag/:name/`

Путь маршрута списка тегов. `:name` будет заменено именем тега.

### encrypted

- Тип: `string`
- По умолчанию: `/encrypted/`

Путь к списку зашифрованных статей.

### slide

- Тип: `string`
- По умолчанию: `/slide/`

Путь маршрута списка слайдов.

### star

- Тип: `string`
- По умолчанию: `/star/`

Путь маршрута к списку звездных статей.

### timeline

- Тип: `string`
- По умолчанию: `/timeline/`

Путь маршрута списка временной шкалы.

### hotReload

- Type: `boolean`
- Default: Whether using `--debug` flag

Whether to enable hot reload in the development server.
