---
title: Markdown
icon: markdown
order: 3
category:
  - Начало работы
tag:
  - Начало работы
  - Markdown
---

VuePress в основном генерирует страницы из файлов Markdown. Таким образом, вы можете легко использовать его для создания документации или блогов.

Вы должны создавать и записывать файлы Markdown, чтобы VuePress мог преобразовывать их на разные страницы в соответствии со структурой файла.

<!-- more -->

## Введение в Markdown

Если вы новичок и не знаете, как писать в Markdown, прочитайте [Введение в Markdown](../../cookbook/markdown/README.md) и [Демонстрация Markdown](../../cookbook/markdown/demo.md).

## Конфигурация Markdown

VuePress вводит настройку для каждой страницы маркдауна с помощью Frontmatter.

::: info

Frontmatter — важная концепция в VuePress. Если вы этого не знаете, вам нужно прочитать [Введение в Frontmatter](../../cookbook/vuepress/page.md#frontmatter).

:::

## Расширение Markdown

Содержимое Markdown в VuePress будет анализироваться [markdown-it](https://github.com/markdown-it/markdown-it), который поддерживает [расширения синтаксиса](https://github.com/markdown-it/markdown-it#syntax-extensions) через плагины markdown-it.

### Улучшение VuePress

Чтобы обогатить содержимое документа, VuePress расширяет стандартный синтаксис Markdown.

Чтобы узнать об этом расширенном синтаксисе, смотрите [Встроенные функции Markdown](../../cookbook/vuepress/markdown.md).

### Улучшение темы

Используя [`vuepress-plugin-md-enhance`][md-enhance], тема расширяет синтаксис Markdown и предоставляет более богатые функции записи.

:::: tip Включить все

Вы можете установить `plugins.mdEnhance.enableAll: true` в настройках темы, чтобы включить все функции плагина [md-enhance][md-enhance], чтобы попробовать их.

::: code-tabs#language

@tab TS

```ts
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        enableAll: true,
      },
    },
  }),
};
```

@tab JS

```js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        enableAll: true,
      },
    },
  }),
};
```

:::

::::

#### Пользовательский контейнер

::: v-pre

Безопасно используйте {{ variable }} в Markdown.

:::

::: info Custom Title

Пользовательский информационный контейнер с `code`, [ссылка](#custom-container).

```js
const a = 1;
```

:::

::: tip Custom Title

A custom tip container

:::

::: warning Custom Title

A custom warning container

:::

::: danger Custom Title

A custom danger container

:::

::: details Custom Title

A custom details container

:::

:::: details Code

```md
::: v-pre

Safely use {{ variable }} in Markdown.

:::

::: info Custom Title

A custom information container

:::

::: tip Custom Title

A custom tip container

:::

::: warning Custom Title

A custom warning container

:::

::: danger Custom Title

A custom danger container

:::

::: details Custom Title

A custom details container

:::
```

::::

- [Посмотреть детали](../markdown/container.md)

#### Вкладки

::: tabs#fruit

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::

- [Посмотреть детали](../markdown/tabs.md)

#### Вкладки кода

::: code-tabs

@tab yarn

```bash
yarn add -D vuepress-theme-hope
```

@tab:active npm

```bash
npm i -D vuepress-theme-hope
```

:::

- [Посмотреть детали](../markdown/code-tabs.md)

#### Верхний индекс и нижний индекс

19^th^ H~2~O

- [Посмотреть детали](../markdown/sup-sub.md)

#### Выравнивание

::: center

I am center

:::

::: right

I am right align

:::

- [Посмотреть детали](../markdown/align.md)

### Атрибуты

A **word**{#word} having id.

- [Посмотреть детали](../markdown/attrs.md)

#### Сноска

This text has footnote[^first].

[^first]: This is footnote content

- [Посмотреть детали](../markdown/footnote.md)

#### Выделение

You can mark ==important words== .

- [Посмотреть детали](../markdown/mark.md)

#### Список задач

- [x] Plan A
- [ ] Plan B

- [Посмотреть детали](../markdown/tasklist.md)

#### Улучшение изображения

Support setting color scheme and size

- [Посмотреть детали](../markdown/image.md)

#### Диаграмма

::: chart A Scatter Chart

```json
{
  "type": "scatter",
  "data": {
    "datasets": [
      {
        "label": "Scatter Dataset",
        "data": [
          { "x": -10, "y": 0 },
          { "x": 0, "y": 10 },
          { "x": 10, "y": 5 },
          { "x": 0.5, "y": 5.5 }
        ],
        "backgroundColor": "rgb(255, 99, 132)"
      }
    ]
  },
  "options": {
    "scales": {
      "x": {
        "type": "linear",
        "position": "bottom"
      }
    }
  }
}
```

:::

- [Посмотреть детали](../markdown/chart.md)

#### Echarts

::: echarts A line chart

```json
{
  "xAxis": {
    "type": "category",
    "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "data": [150, 230, 224, 218, 135, 147, 260],
      "type": "line"
    }
  ]
}
```

:::

- [Посмотреть детали](../markdown/echarts.md)

#### Блок-схема

```flow
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
```

- [Посмотреть детали](../markdown/flowchart.md)

#### Mermaid

```mermaid
flowchart TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
    one --> two
    three --> two
    two --> c2
```

- [Посмотреть детали](../markdown/mermaid.md)

#### Tex

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

- [Посмотреть детали](../markdown/tex.md)

#### Включение файлов

@include(../markdown/demo.snippet.md{5-9})

- [Посмотреть детали](../markdown/include.md)

#### Демонстрация кода

::: normal-demo A normal demo

```html
<h1>VuePress Theme Hope</h1>
<p>Is <span id="very">very</span> powerful!</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very powerful!");
});
```

```css
span {
  color: red;
}
```

:::

- [Посмотреть детали](../markdown/demo.md)

#### Стилизация

<!-- markdownlint-disable MD033 -->

Setting this to a invalid stytax <span style="color:red">doesn't</span> have any effect.

- [Посмотреть детали](../markdown/stylize.md)

<!-- markdownlint-enable MD033 -->

#### Презентация

@slidestart

## Slide 1

A paragraph with some text and a [link](https://mrhope.site)

---

## Slide 2

- Item 1
- Item 2

---

## Slide 3.1

```js
const a = 1;
```

--

## Slide 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend

- [Посмотреть детали](../markdown/presentation.md)

[md-enhance]: https://vuepress-theme-hope.github.io/v2/md-enhance/
