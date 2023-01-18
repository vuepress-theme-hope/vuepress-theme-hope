---
title: Список статей
icon: clipboard-list
order: 3
category:
  - Блог
tag:
  - Статья
  - Блог
  - Шифрование
  - Слайд
  - Избранное
---

Тема предоставляет вам список всех статей по пути `/article/` по умолчанию.

## Статья

Все статьи будут добавлены в список статей по умолчанию и отображены по пути `/article/`.

![Список статей](./assets/article-list-light.png#light)
![Список статей](./assets/article-list-dark.png#dark)

Если вы не хотите, чтобы список содержал какие-то конкретные статьи, просто установите для параметра `article` значение `false` в начале статьи или вы можете настроить его с помощью `plugins.blog.filter` в параметрах темы.

Чтобы прикрепить конкретную статью к списку статей, просто установите для параметра `sticky` значение `true` в frontmatter статьи.

::: tip Порядок

Для липких статей вы можете установить `sticky` с числом, чтобы установить их порядок. Статьи с большими номерами будут перечислены первыми.

:::

## Выдержка

### Adding Excerpt

If you want to add an excerpt for an article, you can mark contents with `<!-- more -->` comment. Any content before this comment will be considered as an excerpt.

Meanwhile, if the excerpt you want to set is not what you want to show at the beginning of the article, you can also set the HTML string through the `excerpt` option in Frontmatter.

### Automatically Generate Excerpt

By default, the theme extract article excerpts for you automatically,.

If you want the theme only display excerpt which you specify, set `plugins.blog.excerptLength: 0` in theme options.

::: warning Excerpt Limitation

We recommend you to use `<!-- more -->` to mark excerpt as first choice. If you do need a special excerpt, set it in frontmatter yourself.

In addition, excerpt is directly inserted into the DOM through `innerHTML`, this means that no Vue features are available.

:::

## Звездные статьи

Вы можете пометить статью, установив для параметра `star` значение `true` в frontmatter. После просмотра пользователи могут просмотреть эти статьи на странице `/star/`.

В то же время любые звездные статьи будут отображаться в столбце статей на боковой панели главной страницы блога.

::: info

Наше соображение по поводу предоставления звездочек: пользователи темы могут захотеть показать посетителям некоторые высококачественные статьи, но не хотят, чтобы прилепленные статьи переполняли главную страницу, в результате чего посетители не могли видеть недавно обновленные статьи.

:::

::: tip Порядок

Как и в случае с прикрепленными статьями, вы также можете установить `star` на номер, чтобы установить их порядок. Статьи с большими номерами будут перечислены первыми.

:::

## Other types of articles <Badge text="Advanced" type="info" />

The theme provides separate lists for additional article type.

To add additional article type, you should set `plugins.blog.type` in theme options with an array of objects describing type you want.

Each type should have a unique key (without special characters), and a `filter` function to determine whether a page should be the type. The `filter` function should accept page object and return a boolean value.

To sort pages in the type list, you can also set a `sorter` function. The `sorter` function should accept two page objects and return a number.

By default, the type list path will be `/key/` (with `key` replaced by your actual key). You can also set a custom path by setting `path` in options.

`frontmatter` option controls the frontmatter of the layout page, with is a function accepting `localePath` and returning a frontmatter object. This option is useful when setting the title of the layout page.

::: note

`layout` is the layout name, by default it will be `BlogType`, a layout `vuepress-theme-hope` registered. ONLY IF you build a custom layout for the type list, shall you set this option to your layout value.

:::

Also you need to set `blogLocales[key]` in theme locales with the actual type name, so that the theme can display the type name correctly.

To get start with, we would like to show you some examples.

::: details Examples

1. Adding a type of slide pages.

   All slide pages should have `layout: Slide` in frontmatter. And the sequence doesn't matter.

1. Adding a original type.

You shall set the following options:

```ts
import { defineUserConfig } from "vuepress";
// you may need to install vuepress-shared to use its `compareDate`
import { compareDate } from "vuepress-shared/node";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // other config
  // ...

  theme: hopeTheme({
    blogLocales: {
      slide: "Slides",
      original: "Original",
    },

    plugins: {
      blog: {
        type: [
          {
            key: "slide",
            filter: (page) => page.frontmatter.layout === "Slide",
            frontmatter: () => ({ title: "Slides" }),
          },
          {
            key: "original",
            filter: (page) => page.frontmatter.original,
            sorter: (pageA, pageB) =>
              compareDate(pageA.frontmatter.date - pageB.frontmatter.date),
            frontmatter: () => ({ title: "Original" }),
          },
        ],
      },
    },
  }),
});
```

:::
