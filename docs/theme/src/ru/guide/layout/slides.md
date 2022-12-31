---
title: Слайд
icon: slides
order: 8
category:
  - Макет
tag:
  - Макет
  - Слайды
---

`vuepress-theme-hope` позволяет добавлять страницы со слайдами.

Вам нужно установить `layout: Slide` в frontmatter, чтобы активировать страницу со слайдами.

<!-- more -->

## Демо

[Вот демонстрация, содержащая все функции слайда](https://vuepress-theme-hope.github.io/v2/md-enhance/guide/presentation/demo.html).

![Скриншот страницы слайда](./assets/slides-light.png#light)
![Скриншот страницы слайда](./assets/slides-dark.png#dark)

## Внимание

::: warning Включить презентацию

Вы должны включить функцию презентации в `vuepress-plugin-md-enhance`, установив `plugins.mdEnhance.presentation` в настройках темы, иначе макет не будет отображаться правильно.

:::

::: warning Отсутствие мульти слайдов

Вы должны включить только один синтаксис слайда на этой странице, чтобы избежать проблем с визуализацией.

```md
@slidestart [your theme]

// your slides

@slideend
```

:::
