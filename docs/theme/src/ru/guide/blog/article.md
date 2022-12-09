---
title: Список статей
icon: article
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

## Шифрование и слайды

Тема предоставляет отдельные списки для двух специальных страниц: зашифрованной страницы статьи и страницы слайда. Вы можете просмотреть их на страницах `/encrypt/` и `/slide/`.

В то же время, чтобы помочь посетителям различать эти две категории страниц, их категории будут четко обозначены значками в списке статей.

![Советы по категориям](./assets/icon-type.png)
