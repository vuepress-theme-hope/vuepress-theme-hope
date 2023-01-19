---
title: Конфиг макета Frontmatter
icon: object-group
order: 2
category:
  - Конфиг
tag:
  - Frontmatter
  - Макет
---

Вы можете настроить макет страницы, установив следующие параметры frontmatter.

## pageInfo

- Тип: `PageInfo[] | false`
- Значение по умолчанию: значение в параметрах темы

| Элемент         | Соответствующий контент | Значение страницы frontmatter         |
| --------------- | ----------------------- | ------------------------------------- |
| `"Author"`      | Автор                   | `author`                              |
| `"Date"`        | Дата написания          | `date`                                |
| `"Category"`    | Категория               | `category`                            |
| `"Tag"`         | Теги                    | `tag`                                 |
| `"ReadingTime"` | Ожидайте время чтения   | Н/Д (сгенерировано автоматически)     |
| `"Word"`        | Количество слов         | Н/Д (сгенерировано автоматически)     |
| `"PageView"`    | Номер визита            | `pageview` (доступно только с Waline) |

Установите, отображать ли сведения о странице на текущей странице.

## pageview

- Тип: `boolean`
- Значение по умолчанию: значение в параметрах темы

Отображаются ли просмотры страниц.

::: tip

Функция просмотров страниц требует, чтобы у вас была действующая конфигурация службы комментариев Waline.

:::

## breadcrumb

- Тип: `boolean`
- Значение по умолчанию: значение в параметрах темы

Включена ли навигация по пути на текущей странице.

## breadcrumbIcon

- Тип: `boolean`
- Значение по умолчанию: значение в параметрах темы

Включена ли иконка навигации по пути на текущей странице.

## navbar

- Тип: `boolean`

Конфигурация навигационной панели страницы, заполнение `false` отключит навигационную панель.

## sidebar

- Тип: `"heading" | false`

Параметры конфигурации боковой панели страницы. Поддерживает `"heading"` или `false`.

## headerDepth

- Тип: `number`
- По умолчанию: `2`

Глубина рендеринга заголовка боковой панели страницы.

## order

- Type: `number`

Page order in sidebar.

- By filling in a positive number, the page will appear in the front, while the smaller number comes to the front.
- By filling in a negative number, the page will appear in the end, while the greater number comes to the front. (e.g. -1 is after -2)

## dir

Sidebar group information used for [structure sidebar](../../guide/layout/sidebar.md#auto-sidebar).

### dir.text

- Type: `string`
- Default: title of `README.md`

Group title.

### dir.icon

- Type: `string`
- Default: icon of `README.md`

Group icon.

### dir.collapsible

- Type: `boolean`
- Default: `true`

Whether group is collapsible

### dir.link

- Type: `boolean`
- Default: `false`

Whether Dir is clickable.

::: note

Setting to `true` means setting group link to link of `README.md`.

:::

### dir.index

- Type: `boolean`
- Default: `true`

Whether index current dir

### dir.order

- Type: `number`

Group order in sidebar.

- By filling in a positive number, the page will appear in the front, while the smaller number comes to the front.
- By filling in a negative number, the page will appear in the end, while the greater number comes to the front. (e.g. -1 is after -2)

## comment

- Тип: `boolean`
- Значение по умолчанию: значение в параметрах темы

Включить ли комментарии на текущей странице.

## lastUpdated

- Тип: `boolean`
- Значение по умолчанию: значение в параметрах темы

Отображать ли время последнего обновления.

## editLink

- Тип: `boolean`
- Значение по умолчанию: значение в параметрах темы

Показывать ли ссылку редактирования.

## contributors

- Тип: `boolean`
- Значение по умолчанию: значение в параметрах темы

Показывать ли контрибьюторов.

## prev

- Тип: `AutoLinkOptions | string | false`

  ```ts
  interface AutoLinkOptions {
    text: string;
    icon: string;
    link: string;
  }
  ```

Ссылка на предыдущую статью.

## next

- Тип: `AutoLinkOptions |string | false`

  ```ts
  interface AutoLinkOptions {
    text: string;
    icon: string;
    link: string;
  }
  ```

Ссылка на следующую статью.

## footer

- Тип: `boolean | string | HTMLString`
- Значение по умолчанию: значение настроено глобально

Содержимое футера.

- Установите его в пустую строку, если вы хотите пустой контент
- Установите значение `false`, чтобы отключить нижний колонтитул.
- Установите значение `true`, чтобы отобразить нижний колонтитул по умолчанию.

Подробнее смотрите [Страница → Поддержка футера](../../guide/layout/footer.md).

## copyright

- Тип: `string | false`
- Значение по умолчанию: значение в параметрах темы

Информация об авторских правах

Подробнее смотрите [Страница → Поддержка футера](../../guide/layout/footer.md).

## backToTop

- Тип: `boolean`
- Значение по умолчанию: true

Отображать ли кнопку «Вернуться к началу».

## toc {#toc-heading}

- Тип: `boolean`
- Значение по умолчанию: значение в параметрах темы

Отображать ли toc в режиме рабочего стола.

## containerClass

- Тип: `string`
- Обязательный: Нет

Дополнительный контейнерный класс.

## layout

- Тип: `string`
- По умолчанию: `"Layout"`

Имя пользовательского макета страницы.
