---
title: Мета страницы
icon: clock
category:
  - Функция
tag:
  - Функция
  - Мета
---

Тема отображает время последнего обновления и авторов страницы с помощью плагина [`@vuepress/plugin-git`][git], а также поддерживает кнопку «редактировать эту страницу».

Тема также предоставляет кнопки навигации для перехода к предыдущей и следующей страницам в зависимости от конфигурации боковой панели.

<!-- more -->

## Информация на основе Git

`vuepress-theme-hope` использует встроенный плагин [`@vuepress/plugin-git`][git] для автоматического определения времени создания страницы, времени последнего обновления и участников.

Плагин будет автоматически генерировать время создания страницы и время последнего обновления из временной метки UNIX (мс) последней фиксации `git` файла подкачки, а также создавать участников на основе записи фиксации.

Тема будет отображать время последнего обновления в соответствующем формате даты, а также всех участников страницы внизу страницы.

::: tip

Тема будет использовать `Date.toLocaleString(pageLang)` для автоматической локализации текста времени последнего обновления в соответствии с текущим языком.

:::

::: warning Limitations

1. Since the contributors, last update time, and file creation time information are based on `git`, you can only enable it in a `git` based project.
1. Since related information are from git commits, they will only be displayed after the first commit for a given page, and will only be updated when some commits change that page.

1. Since the `git` plugin needs to call Git binary and involves file IO, this function will seriously affect the startup and hot update speed, so by default **theme will not be enabled in devServer**. Set `plugins.git: true` or `hotReload: true` in theme options if needed.

:::

## Изменить ссылку

Вы можете автоматически генерировать ссылки для редактирования для каждой страницы, установив следующие элементы в параметрах темы:

- `docsRepo`: ссылка на репозиторий документации, такая же, как `repo` по умолчанию.
- `docsDir`: каталог документации в репозитории, по умолчанию корневой каталог
- `docsBranch`: ветка документации, по умолчанию `"main"`

## Управление отображением

Чтобы скрыть эти элементы глобально, установите для соответствующих элементов ниже значение `false` в параметрах темы. Вы также можете включить/отключить определенные страницы, установив эти элементы в `YAML front matter`:

- `lastUpdated`: отображать ли время последнего обновления страницы
- `contributors`: показывать ли участников страницы
- `editLink`: отображать ли ссылку "edit page"

[git]: https://v2.vuepress.vuejs.org/reference/plugin/git.html
