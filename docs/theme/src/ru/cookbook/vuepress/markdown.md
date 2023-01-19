---
title: Встроенные функции разметки
icon: fab fa-markdown
category:
  - Учебник с примерами
  - VuePress
tag:
  - Разметка
  - VuePress
---

Вот несколько улучшений, которые VuePress вносит в синтаксис Markdown.

## Расширения синтаксиса

Содержимое Markdown в VuePress будет анализироваться [markdown-it](https://github.com/markdown-it/markdown-it), который поддерживает [расширения синтаксиса](https://github.com/markdown-it/markdown-it#syntax-extensions) через плагины markdown-it.

В этом разделе будут представлены встроенные расширения синтаксиса Markdown для VuePress.

Вы также можете настроить эти встроенные расширения, загрузить дополнительные плагины markdown-it и реализовать свои собственные расширения с помощью опции [markdown](https://v2.vuepress.vuejs.org/reference/config.md#markdown) и [extendsMarkdown](https://v2.vuepress.vuejs.org/reference/plugin-api.html#extendsmarkdown).

### Встроенный

Встроено в markdown-it:

- [Таблицы](https://help.github.com/articles/organizing-information-with-tables/) (GFM)
- [Зачеркнутый](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) (GFM)

### Якоря заголовка

Вы могли заметить, что при наведении курсора мыши на заголовки каждого раздела отображается якорь `#`. Нажав якорь `#`, вы можете перейти непосредственно к разделу.

::: tip
Это расширение привязки заголовков поддерживается [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor).

Ссылка на конфигурацию: [markdown.anchor](https://v2.vuepress.vuejs.org/reference/config.html#markdown-anchor)
:::

### Ссылки

При использовании Markdown [синтаксис ссылки](https://spec.commonmark.org/0.29/#link-reference-definitions), VuePress реализует для вас некоторые преобразования.

В качестве примера возьмем наши исходные файлы документации:

```
└─ src
   ├─ cookbook
   │  └─ vuepress
   │     ├─ markdown.md <- Here we are
   │     └─ README.md
   ├─ guide
   │  └─ README.md
   ├─ contribution.md
   └─ README.md
```

Необработанная разметка:

```md
<!-- relative path -->

[Главная](../../README.md)  
[Руководство по вкладу](../../contribution.md)  
[Конфиг VuePress](./config.md)

<!-- absolute path -->

[Руководство](/guide/README.md)  
[Конфиг > I18n](/config/i18n.md)

<!-- URL -->

[GitHub](https://github.com)
```

Конвертировано в:

```vue
<template>
  <RouterLink to="/v2/">Главная</RouterLink>
  <RouterLink to="/v2/contribution.html">Руководство по вкладу</RouterLink>
  <RouterLink to="/v2/cookbook/vuepress/config.html"
    >Конфиг VuePress</RouterLink
  >
  <RouterLink to="/v2/guide/">Руководство</RouterLink>
  <RouterLink to="/v2/config/i18n.html">Конфиг &gt; I18n</RouterLink>
  <a href="https://github.com" target="_blank" rel="noopener noreferrer"
    >GitHub</a
  >
</template>
```

Оформляется как:

- [Главная](../../README.md)
- [Руководство по вкладу](../../contribution.md)
- [Конфиг VuePress](./config.md)
- [Руководство](/guide/README.md)
- [Конфиг > I18n](/config/i18n.md)
- [GitHub](https://github.com)

Объяснение:

- Внутренние ссылки будут преобразованы в `<RouterLink>` для навигации по SPA.
- Внутренние ссылки на файлы `.md` будут преобразованы в [путь маршрута страницы](./page.md#routing), поддерживаются как абсолютные, так и относительные пути.
- Внешние ссылки получат атрибуты `target="_blank" rel="noopener noreferrer"`.

Предложение:

Попробуйте использовать относительные пути вместо абсолютных для внутренних ссылок.

- Относительные пути являются действительными ссылками на целевые файлы, и по ним можно правильно перемещаться при просмотре исходных файлов в вашем редакторе или репозитории.
- Относительные пути согласованы в разных локалях, поэтому вам не нужно менять путь локали при переводе контента.
- При использовании абсолютных путей, если [base](https://v2.vuepress.vuejs.org/reference/config.html#base) вашего сайта не `"/"`, вам нужно будет добавить `base` вручную или используйте [base хелпер](https://v2.vuepress.vuejs.org/guide/assets.html#base-helper).

::: tip
Это расширение ссылок поддерживается нашим встроенным плагином.

Ссылка на конфигурацию: [markdown.links](https://v2.vuepress.vuejs.org/reference/config.html#markdown-links)
:::

### Эмодзи

Вы можете добавить смайлики в свой контент Markdown, набрав `:EMOJICODE:`.

Полный список доступных смайликов и кодов смотрите на [emoji-cheat-sheet](https://github.com/ikatyang/emoji-cheat-sheet).

Ввод:

```md
VuePress 2 is out :tada: !
```

Вывод:

VuePress 2 is out :tada: !

::: tip
Это расширение emoji поддерживается [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji).

Ссылка на конфигурацию: [markdown.emoji](https://v2.vuepress.vuejs.org/reference/config.html#markdown-emoji)
:::

### Оглавление

Чтобы поместить оглавление (TOC) вашей текущей страницы в содержимое Markdown, вы можете использовать синтаксис `[[toc]]`.

Ввод:

```md
[[toc]]
```

Вывод:

[[toc]]

Заголовки в оглавлении будут ссылаться на соответствующие [привязки заголовков](#якоря-заголовка), поэтому оглавление не будет работать, если вы отключите привязки заголовков.

::: tip
Это расширение toc поддерживается нашим встроенным плагином, который разветвлен и модифицирован из [markdown-it-toc-done-right](https://github.com/nagaozen/markdown-it-toc-done-right).

Ссылка на конфигурацию: [markdown.toc](https://v2.vuepress.vuejs.org/reference/config.html#markdown-toc)
:::

### Блоки кода

Следующие расширения блоков кода реализованы во время синтаксического анализа Markdown на стороне узла. Это означает, что блоки кода не будут обрабатываться на стороне клиента.

#### Подсветка линии

Вы можете выделить определенные строки ваших блоков кода, добавив метку диапазонов строк в ваши огороженные блоки кода:

Ввод:

````md
```ts {1,6-8}
import type { UserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";

export const config: UserConfig = {
  title: "Hello, VuePress",

  theme: defaultTheme({
    logo: "https://vuejs.org/images/logo.png",
  }),
};
```

```

```
````

Вывод:

```ts {1,6-8}
import type { UserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";

export const config: UserConfig = {
  title: "Hello, VuePress",

  theme: defaultTheme({
    logo: "https://vuejs.org/images/logo.png",
  }),
};
```

Примеры маркировки диапазонов строк:

- Диапазоны строк: `{5-8}`
- Несколько одиночных строк: `{4,7,9}`
- Комбинированный: `{4,7-13,16,23-27,40}`

::: tip
Это расширение для выделения строк поддерживается нашим встроенным плагином, который является разветвленным и модифицированным из [markdown-it-highlight-lines](https://github.com/egoist/markdown-it-highlight-lines).

Ссылка на конфигурацию: [markdown.code.highlightLines](https://v2.vuepress.vuejs.org/reference/config.html#markdown-code-highlightlines)
:::

#### Номера строк

Вы, должно быть, заметили, что количество строк отображается слева от блоков кода. Это включено по умолчанию, и вы можете отключить его в конфигурации.

Вы можете добавить выделение `:line-numbers` / `:no-line-numbers` в ваши изолированные блоки кода, чтобы переопределить значение, установленное в конфиге.

Ввод:

````md
```ts
// line-numbers is enabled by default
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts:no-line-numbers
// line-numbers is disabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```
````

Вывод:

```ts
// line-numbers is enabled by default
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts:no-line-numbers
// line-numbers is disabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

::: tip
Это расширение номеров строк поддерживается нашим встроенным плагином.

Ссылка на конфигурацию: [markdown.code.lineNumbers](https://v2.vuepress.vuejs.org/reference/config.html#markdown-code-linenumbers)
:::

#### Обертка с помощью v-pre

Поскольку [синтаксис шаблона разрешен в Markdown](#синтаксис-шаблона), он также будет работать в блоках кода.

Чтобы Vue не компилировал ваши блоки кода, VuePress по умолчанию добавит директиву [v-pre](https://v3.vuejs.org/api/directives.html#v-pre) к вашим блокам кода, что может быть отключено в конфиге.

Вы можете добавить метку `:v-pre` / `:no-v-pre` в ваши изолированные блоки кода, чтобы переопределить значение, установленное в конфиге.

::: warning
Символы синтаксиса шаблона, например синтаксис "Mustache" (двойные фигурные скобки), могут анализироваться средством подсветки синтаксиса. Таким образом, как показано в следующем примере, `:no-v-pre` может не работать на некоторых языках.

Чтобы синтаксис Vue все равно работал на этих языках, попробуйте отключить подсветку синтаксиса по умолчанию и реализовать собственную подсветку синтаксиса на стороне клиента.
:::

Ввод:

````md
```md
<!-- This will be kept as is by default -->

1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- This will be compiled by Vue -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```js:no-v-pre
// This won’t be compiled correctly because of js syntax highlighting
const onePlusTwoPlusThree = {{ 1 + 2 + 3 }}
```
````

Вывод:

```md
<!-- This will be kept as is -->

1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- This will be compiled by Vue -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

<!--
using :no-v-pre on JS code blocks has potential issue with shiki, so we are
not actually using :no-v-pre here, just as an example of incorrect usage
-->

```js
// This won’t be compiled correctly because of js syntax highlighting
const onePlusTwoPlusThree = {{ 1 + 2 + 3 }}
```

::: tip
Это расширение v-pre поддерживается нашим встроенным плагином.

Ссылка на конфигурацию: [markdown.code.vPre](https://v2.vuepress.vuejs.org/reference/config.html#markdown-vpre)
:::

### Импорт блоков кода

Вы можете импортировать блоки кода из файлов со следующим синтаксисом:

```md
<!-- minimal syntax -->

@[code](../foo.js)
```

Чтобы частично импортировать файл:

```md
<!-- partial import, from line 1 to line 10 -->

@[code{1-10}](../foo.js)
```

Язык кода выводится из расширения файла, при этом рекомендуется указывать его явно:

```md
<!-- specify the code language -->

@[code js](../foo.js)
```

Фактически, вторая часть внутри `[]` будет рассматриваться как метка ограждения кода, поэтому она поддерживает весь синтаксис, упомянутый выше в разделе [Блоков кода](#блоки-кода):

```md
<!-- line highlighting -->

@[code js{2,4-5}](../foo.js)
```

Вот сложный пример:

- импортировать строку 3 в строку 10 файла `"../foo.js"`
- укажите язык как `"js"`
- выделить строку 3 импортированного кода, т.е. строку 5 файла `"../foo.js"`
- отключить номера строк

```md
@[code{3-10} js{3}:no-line-numbers](../foo.js)
```

Обратите внимание, что псевдонимы пути недоступны в синтаксисе кода импорта. Вы можете использовать следующую конфигурацию для самостоятельной обработки псевдонима пути:

```js
import { getDirname, path } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default {
  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@src/, path.resolve(__dirname, "path/to/src")),
    },
  },
};
```

```md
<!-- it will be resolved to 'path/to/src/foo.js' -->

@[code](@src/foo.js)
```

::: tip
Это расширение кода импорта поддерживается нашим встроенным плагином.

Ссылка на конфигурацию: [markdown.importCode](https://v2.vuepress.vuejs.org/reference/config.html#markdown-importcode)
:::

## Использование Vue в Markdown

В этом разделе будут представлены некоторые основные принципы использования Vue в Markdown.

Ознакомьтесь с [Учебник с примерами > Markdown и Vue SFC](https://v2.vuepress.vuejs.org/advanced/cookbook/markdown-and-vue-sfc.html) для получения более подробной информации.

### Синтаксис шаблона

Как мы знаем:

- HTML разрешен в Markdown.
- Синтаксис шаблона Vue совместим с HTML.

Это означает, что [синтаксис шаблона Vue](https://v3.vuejs.org/guide/template-syntax.html) разрешен в Markdown.

Ввод:

```md
One plus one equals: {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>
```

Вывод:

One plus one equals: {{ 1 + 1 }}

<!-- markdownlint-disable -->

<span v-for="i in 3"> span: {{ i }} </span>

<!-- markdownlint-restore -->

### Компоненты

Вы можете использовать компоненты Vue непосредственно в Markdown.

Ввод:

```md
This is default theme built-in `<Badge />` component <Badge text="demo" />
```

Вывод:

This is default theme built-in `<Badge />` component <Badge text="demo" />

::: tip

Ознакомьтесь со [Встроенными компонентами](https://v2.vuepress.vuejs.org/reference/components.html) для получения полного списка встроенных компонентов.

:::

## Предостережения

### Устаревшие теги HTML

Устаревшие теги HTML, такие как [\<center>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/center) и [\<font>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/font) по умолчанию не разрешены в VuePress Markdown.

Эти теги не будут распознаваться компилятором шаблонов Vue как собственные HTML-теги. Вместо этого Vue попытается разрешить эти теги как компоненты Vue, и, очевидно, эти компоненты обычно не существуют.

Вы должны стараться избегать использования устаревших тегов HTML. Однако, чтобы использовать эти теги в любом случае, попробуйте один из следующих обходных путей:

- Добавление директивы [v-pre](https://v3.vuejs.org/api/directives.html#v-pre) для пропуска компиляции элемента и его дочерних элементов. Обратите внимание, что синтаксис шаблона также будет недопустимым.
- Использование [compilerOptions.isCustomElement](https://v3.vuejs.org/api/application-config.html#compileroptions), чтобы компилятор шаблонов Vue не пытался разрешать их как компоненты.
  - Для `@bundler-webpack`, установите [vue.compilerOptions](https://v2.vuepress.vuejs.org/reference/bundler/webpack.html#vue)
  - Для `@bundler-vite`, установите [vuePluginOptions.template.compilerOptions](https://v2.vuepress.vuejs.org/reference/bundler/vite.html#vuepluginoptions)
