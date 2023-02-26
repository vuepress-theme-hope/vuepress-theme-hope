---
title: Customize
icon: gear
dir:
  order: 4
category:
  - Cookbook
  - Customize
tag:
  - Customize
article: false
---

This section shows you the relevant codes involved in common customization.

<!-- more -->

## Как настроить стили

Вы можете создать три файла в папке `.vuepress/styles` в вашем собственном документе для настройки стиля.

- `index.scss`: Вы можете разместить свои собственные стили с помощью синтаксиса CSS или SCSS, чтобы изменить внешний вид темы здесь.

  Эти стили будут введены после стилей темы и плагина.

- `config.scss`: Здесь вы можете установить некоторые переменные, связанные со стилем, включая отзывчивые точки останова, имена классов контейнеров, темы кода и т. д.

- `palette.scss`: Здесь вы можете установить некоторые переменные, связанные с цветом и макетом, такие как цвет темы, цвет фона, высота панели навигации и т. д.

Полный список конфигураций, поддерживаемых указанными выше файлами, смотрите в [Конфиг → Стиль](../../config/style.md).

## Details

- [Customizing layouts](./layout.md)

- [Customizing colors](./color.md)

- [Customizing fonts](./font.md)

- [Customizing effects](./effect.md)
