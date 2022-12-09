---
title: Введение в блог
icon: blog
order: 1
category:
  - Блог
tag:
  - Блог
  - Введение
---

Тема поддерживает функцию блога с `vuepress-plugin-blog2` по умолчанию, и по умолчанию она **отключена**.

Если вам нужна функциональность блога, вы можете установить `plugins.blog: true` в параметрах темы, чтобы включить функциональность блога.

<!-- more -->

## Введение

После включения функции блога тема позволяет настраивать категории, теги, будь то статья, появляется ли она на временной шкале, звездочки, липкие и другие функции через переднюю часть страницы.

::: tip Демо

[Вот демонстрация](https://mrhope.site/en/) для предварительного просмотра блогов, созданных с помощью `vuepress-theme-hope`.

:::

## Поддержка I18n

Тема добавляет поддержку i18n в систему блогов. Вы можете установить разные настройки блога для каждого языка, используя `locales` в настройках темы.

Если у вас несколько языков, список статей, временная шкала и т. д. для каждого языка останутся независимыми.

## Боковая панель

Тема предоставляет боковую панель с информацией о блоге. Боковая панель будет отображаться на странице, связанной с блогом (она будет отображаться справа на рабочем столе и убираться в боковую панель в мобильном представлении).

Вы можете управлять поведением отображения боковой панели на страницах, не связанных с блогом, с помощью `blog.sidebarDisplay` в параметрах темы. Необязательные значения: `"mobile" | "none" | "always"`. По умолчанию используется `"mobile"`, то есть когда вы посещаете страницы, не связанные с блогом, в мобильном представлении, вы также можете увидеть его на боковой панели.

## Пагинация

Для списка статей на всех страницах мы отобразим компонент пагинации внизу. Вы можете использовать этот компонент для быстрого перехода к первой странице, последней странице и двум страницам до и после. Вы также можете ввести номер для перехода на указанную страницу.

Количество статей на странице по умолчанию равно `10`, вы можете установить `blog.articlePerPage` в параметрах темы, чтобы переопределить это значение.

## Limitation

::: warning Hot update disabled by default

For performance reasons, hot updates are not enabled for blog-related data by default in devServer, i.e. if you add new articles or modify the categories, time, tags, sticky, star, etc. of existing articles, the related data of the entire site will not update until you restart devServer.

In addition, since the blog information will be written to the underlying data of VuePress, modifying this file will cause application restart, so reading time (including word count information) which are sensitive to Markdown content will not take effect in devServer.

If you want these to take effect or be updated in real time, you need to set `hotReload: true` and accept the fact that each modification will trigger a page refresh and some time having white screen due to heavy recomputing work.

:::
