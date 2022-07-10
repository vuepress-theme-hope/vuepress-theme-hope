---
title: Компоненты
icon: plugin
category:
  - Markdown
tag:
  - Компоненты
  - Markdown
---

Используя `vuepress-plugin-components`, вы можете импортировать и использовать некоторые компоненты в ваших файлах Markdown.

Доступные компоненты:

- Badge
- CodePen
- FontIcon
- PDF
- StackBlitz

По умолчанию `<Badge />` и `<CodePen />` включены.

Чтобы включить компоненты, вы должны установить `plugin.components` с массивом имен компонентов.

<!-- more -->

## Значок

Компонент значка.

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

Доступные свойства смотрите на странице [Значок][badge].

## CodePen

Компонент, который позволяет встраивать демо-версию CodePen.

Демонстрация с пользователем и слаг-хешем:

<CodePen user="kowlor" slug-hash="ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" :theme="$isDarkMode? 'dark': 'light'" />

```md
<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"
/>
```

Демо со ссылкой:

<CodePen link="https://codepen.io/kowlor/pen/ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" :theme="$isDarkMode? 'dark': 'light'" />

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"
/>
```

Нажмите, чтобы запустить демонстрацию:

<CodePen link="https://codepen.io/keginaring/pen/XWZazwW" title="Solar System animation - Pure CSS" status="clicktorun" :theme="$isDarkMode? 'dark': 'light'" />

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Envelope w/ Hearts"
  status="clicktorun"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"
/>
```

Доступные свойства смотрите на странице [CodePen][codepen].

## FontIcon

Компонент, который позволяет отображать значки шрифтов.

- Home icon: <FontIcon icon="home" />
- A big and red markdown icon: <FontIcon icon="markdown" color="red" size="32" />

```md
- Home icon: <FontIcon icon="home" />
- A big and red markdown icon: <FontIcon icon="markdown" color="red" size="32" />
```

Доступные свойства смотрите на странице [FontIcon][fonticon].

## PDF

Компонент просмотра PDF.

Средство просмотра PDF по умолчанию:

<PDF url="/sample.pdf" />

```md
<PDF url="/sample.pdf" />
```

Просмотрщик PDF без панели инструментов:

<PDF url="/sample.pdf" :toolbar="false" />

```md
<PDF url="/sample.pdf" :toolbar="false" />
```

Просмотрщик PDF с начальной страницей 2:

<PDF url="/sample.pdf" :page="2" />

```md
<PDF url="/sample.pdf" :page="2" />
```

Доступные свойства смотрите на странице [PDF][pdf].

## StackBlitz

Встраивайте демонстрацию StackBlitz в файлы разметки.

<StackBlitz id="vuepress-theme-hope" />

```md
<StackBlitz id="vuepress-theme-hope" />
```

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hidedevtools />

```md
<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hidedevtools />
```

Доступные свойства смотрите на странице [StackBlitz][stackblitz].

## YouTube

Встраивайте видео с YouTube в файлы разметки.

<YouTube id="0JJPfz5dg20" />

```md
<YouTube id="0JJPfz5dg20" />
```

<YouTube id="0JJPfz5dg20" disable-fullscreen />

```md
<YouTube id="0JJPfz5dg20" disable-fullscreen />
```

<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />

```md
<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />
```

Доступные свойства смотрите на странице [YouTube][youtube].

[badge]: https://vuepress-theme-hope.github.io/v2/components/guide/badge.html
[codepen]: https://vuepress-theme-hope.github.io/v2/components/guide/codepen.html
[fonticon]: https://vuepress-theme-hope.github.io/v2/components/guide/fonticon.html
[pdf]: https://vuepress-theme-hope.github.io/v2/components/guide/pdf.html
[stackblitz]: https://vuepress-theme-hope.github.io/v2/components/guide/stackblitz.html
[youtube]: https://vuepress-theme-hope.github.io/v2/components/guide/youtube.html
