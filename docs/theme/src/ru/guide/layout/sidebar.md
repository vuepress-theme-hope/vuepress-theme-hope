---
title: Боковая панель
icon: fas fa-window-maximize fa-rotate-270
order: 2
category:
  - Макет
tag:
  - Макет
  - Боковая панель
---

Боковая панель может содержать список связанных документов, заголовков документов и информацию о блоггерах в режиме блога.

<!-- more -->

## Ссылки на боковой панели

You should use `sidebar` in theme options to control sidebar.

### Строковый формат

Как и в случае с навигационной панелью, вы можете заполнить массив из нескольких ссылок на файлы в качестве базовой конфигурации боковой панели:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    sidebar: ["README.md", "guide/README.md", "config/README.md"],
  }),
};
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    sidebar: ["README.md", "guide/README.md", "config/README.md"],
  }),
};
```

:::

Каждый элемент массива будет отображаться как элемент боковой панели.

::: tip

Вы можете опустить расширение `.md`, а пути, оканчивающиеся на `/`, подразумеваются как `/README.md`.

:::

### Формат объекта

Как и в случае с навигационной панелью, если вас не устраивает значок страницы или вы считаете, что заголовок страницы слишком длинный, вы можете вместо этого настроить объект. Доступные элементы конфигурации:

- `text:`: элемент теста
- `link`: элемент ссылка
- `icon`: элемент иконка (опционально)
- `activeMatch`: элемент активного совпадения(опционально), поддержка строк регулярных выражений

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    sidebar: [
      {
        text: "Guide",
        link: "/guide/README.md",
        icon: "lightbulb",
        // only active in `/guide/`
        activeMatch: "^/guide/$",
      },
      { text: "Config", link: "/config/README.md", icon: "config" },
      {
        text: "FAQ",
        link: "/faq.md",
        icon: "circle-question",
        // active in path starting with `/faq`
        // so it will active in path like `/faq/xxx.html`
        activeMatch: "^/zh/faq/",
      },
    ],
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    sidebar: [
      {
        text: "Guide",
        link: "/guide/README.md",
        icon: "lightbulb",
        // only active in `/guide/`
        activeMatch: "^/guide/$",
      },
      { text: "Config", link: "/config/README.md", icon: "config" },
      {
        text: "FAQ",
        link: "/faq.md",
        icon: "circle-question",
        // active in path starting with `/faq`
        // so it will active in path like `/faq/xxx.html`
        activeMatch: "^/zh/faq/",
      },
    ],
  }),
};
```

:::

::: tip Расширенное использование activeMatch

`activeMatch` дает вам возможность контролировать, активен ли путь, например, у вас может быть следующее раскрывающееся меню:

- `/path/`
- `/path/a/`
- `/path/b/`

Но у вас может быть несколько папок с файлами в папке `/path/`. Чтобы избежать активации нескольких выпадающих элементов в маршруте, начинающемся с `/path/a/` или `/path/b/`, вы можете установить опцию `activeMatch` для первого элемента с `^/path/(?:(?!a/|b/).*)?$`.

:::

### Группировка и вложение

Если вам нужна боковая панель, отображающая вложенную структуру, вы можете сгруппировать похожие ссылки.

Вы должны использовать [формат объекта](#формат-объекта) и предоставить дополнительную опцию `children` для установки списка ссылок. Как и в навигационной панели, вы можете использовать `prefix` на боковой панели, чтобы добавить префикс пути по умолчанию к каждой ссылке в группе, а боковая панель дополнительно поддерживает установку `collapsible: true`, чтобы сделать группу меню сворачиваемой.

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    sidebar: [
      {
        // required, title of group
        text: "Group 1",
        // optional, icon of group
        icon: "tip",
        // optional, link of group title
        path: "/foo/",
        // optional, will be appended to each item link
        prefix: "/foo/",
        // optional, defaults to false
        collapsible: false,
        // required, items of group
        children: [
          "README.md" /* /foo/index.html */,
          /* ... */
          "geo.md" /* /foo/geo.html */,
        ],
      },
      {
        text: "Group 2",
        children: [
          /* ... */
          "bar.md" /* /ray/bar.html */,
          "baz.md" /* /ray/baz.html */,
        ],
      },
    ],
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    sidebar: [
      {
        // required, title of group
        text: "Group 1",
        // optional, icon of group
        icon: "tip",
        // optional, link of group title
        path: "/foo/",
        // optional, will be appended to each item link
        prefix: "/foo/",
        // optional, defaults to false
        collapsible: false,
        // required, items of group
        children: [
          "README.md" /* /foo/index.html */,
          /* ... */
          "geo.md" /* /foo/geo.html */,
        ],
      },
      {
        text: "Group 2",
        children: [
          /* ... */
          "bar.md" /* /ray/bar.html */,
          "baz.md" /* /ray/baz.html */,
        ],
      },
    ],
  }),
};
```

:::

Вы также можете вложить группировку боковой панели:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    sidebar: [
      {
        text: "Group",
        prefix: "/",
        children: [
          "baz" /* /baz.html */,
          {
            text: "Sub Group 1",
            children: ["quz" /* /quz.html */, "xyzzy" /* /xyzzy.html */],
          },
          {
            text: "Sub Group 2",
            prefix: "corge/",
            children: [
              "fred" /* /corge/fred.html */,
              "grault" /* /corge/grault.html */,
            ],
          },
          "foo" /* /foo.html */,
        ],
      },
    ],
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    sidebar: [
      {
        text: "Group",
        prefix: "/",
        children: [
          "baz" /* /baz.html */,
          {
            text: "Sub Group 1",
            children: ["quz" /* /quz.html */, "xyzzy" /* /xyzzy.html */],
          },
          {
            text: "Sub Group 2",
            prefix: "corge/",
            children: [
              "fred" /* /corge/fred.html */,
              "grault" /* /corge/grault.html */,
            ],
          },
          "foo" /* /foo.html */,
        ],
      },
    ],
  }),
};
```

:::

Вы можете использовать его с `prefix`, чтобы легко восстановить структуру документа.

Например, предположим, что у вас есть следующая структура каталогов:

```
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│   ├─ README.md
│   ├─ one.md
│   └─ two.md
└─ bar/
    ├─ README.md
    ├─ three.md
    └─ four.md
```

Затем вы можете использовать следующую конфигурацию:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    sidebar: [
      "/" /* / */,
      {
        text: "Foo",
        prefix: "/foo/",
        children: [
          "" /* /foo/ */,
          "one" /* /foo/one.html */,
          "two" /* /foo/two.html */,
        ],
      },
      {
        text: "Bar",
        prefix: "/bar/",
        children: [
          "" /* /bar/ */,
          "three" /* /bar/three.html */,
          "four" /* /bar/four.html */,
        ],
      },
      "/contact" /* /contact.html */,
      "/about" /* /about.html */,
    ],
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    sidebar: [
      "/" /* / */,
      {
        text: "Foo",
        prefix: "/foo/",
        children: [
          "" /* /foo/ */,
          "one" /* /foo/one.html */,
          "two" /* /foo/two.html */,
        ],
      },
      {
        text: "Bar",
        prefix: "/bar/",
        children: [
          "" /* /bar/ */,
          "three" /* /bar/three.html */,
          "four" /* /bar/four.html */,
        ],
      },
      "/contact" /* /contact.html */,
      "/about" /* /about.html */,
    ],
  }),
};
```

:::

### Несколько боковых панелей

Чтобы отображать разные боковые панели для разных групп страниц, установите объект для боковой панели в формате `path: config`.

Например, если у вас есть следующая структура:

```
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│   ├─ README.md
│   ├─ one.md
│   └─ two.md
└─ bar/
    ├─ README.md
    ├─ three.md
    └─ four.md
```

Вы можете определить свою боковую панель для каждого раздела, используя следующую конфигурацию:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    sidebar: {
      "/foo/": [
        "" /* /foo/ */,
        "one" /* /foo/one.html */,
        "two" /* /foo/two.html */,
      ],

      "/bar/": [
        "" /* /bar/ */,
        "three" /* /bar/three.html */,
        "four" /* /bar/four.html */,
      ],

      // fallback
      "/": [
        "" /* / */,
        "contact" /* /contact.html */,
        "about" /* /about.html */,
      ],
    },
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    sidebar: {
      "/foo/": [
        "" /* /foo/ */,
        "one" /* /foo/one.html */,
        "two" /* /foo/two.html */,
      ],

      "/bar/": [
        "" /* /bar/ */,
        "three" /* /bar/three.html */,
        "four" /* /bar/four.html */,
      ],

      // fallback
      "/": [
        "" /* / */,
        "contact" /* /contact.html */,
        "about" /* /about.html */,
      ],
    },
  }),
};
```

:::

::: warning

Особое внимание следует уделить порядку объявления ключа объекта. Вообще говоря, вы должны сначала указать более точный путь, потому что VuePress будет проходить ключевые имена конфигурации боковой панели, чтобы найти подходящую конфигурацию. После успешного сопоставления имени ключа с текущим путем будет отображаться соответствующая конфигурация боковой панели.

В этом случае резервная боковая панель должна быть определена последней по этой причине.

:::

## Автоматическая боковая панель

### Генерировать из заголовков

Чтобы автоматически сгенерировать боковую панель, содержащую только ссылки заголовка для текущей страницы, вы можете использовать передний план на этой странице:

```md
---
sidebar: heading
---
```

Вы также можете включить его на всех страницах с помощью конфигурации:

::: code-tabs#language

@tab TS

```ts {7}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    sidebar: "heading",
  }),
});
```

@tab JS

```js {6}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    sidebar: "heading",
  }),
};
```

:::

### Создать из файловой структуры <Badge text="New" type="tip" />

Вы можете заменить исходный "sidebarConfig array" ключевым словом `"structure"` в любой из приведенных выше конфигураций боковой панели. Это позволит теме автоматически читать локальные файлы, а затем создавать для вас боковую панель из файловой структуры, чтобы уменьшить нагрузку на конфигурацию.

Например, для следующего примера, упомянутого ранее в [мульти сайдбары](#несколько-боковых-панелей):

```
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│   ├─ README.md
│   ├─ one.md
│   └─ two.md
└─ bar/
    ├─ README.md
    ├─ three.md
    └─ four.md
```

Вы можете изменить исходную конфигурацию на:

::: code-tabs#language

@tab TS

```ts {8,10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    sidebar: {
      "/foo/": "structure",

      "/bar/": "structure",

      // fallback
      "/": [
        "" /* / */,
        "contact" /* /contact.html */,
        "about" /* /about.html */,
      ],
    },
  }),
});
```

@tab JS

```js {7,9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    sidebar: {
      "/foo/": "structure",

      "/bar/": "structure",

      // fallback
      "/": [
        "" /* / */,
        "contact" /* /contact.html */,
        "about" /* /about.html */,
      ],
    },
  }),
};
```

:::

В приведенной выше модификации, поскольку исходный массив боковой панели состоит из всех файлов по соответствующему пути, вы можете легко заменить его ключевым словом `"structure"`.

Если вы используете структуру для создания папки с другими папками, вложенными в нее, соответствующая папка будет отображаться как группа. Таким образом, вы можете быть даже более агрессивным, например, установив `sidebar: "structure"`, чтобы все ваши боковые панели автоматически генерировались из файловой структуры.

::: warning Limitations

Since structure sidebar is depending on file structure and markdown frontmatter, any changes in markdown may update the structure sidebar. (E.g: setting `index: false` in frontmatter as described below)

However, recalculating the sidebar could be expensive for large sites, so the theme will only recalculate with [`hotReload` enabled](../../config/theme/basic.md#hotreload).

:::

#### Расширенный контроль

Во время автоматического создания из структуры вы можете контролировать, включаются ли файлы в одной и той же папке с помощью параметра `index` на странице Frontmatter, а также управлять их сортировкой с помощью `order`.

Если вы не хотите, чтобы страница отображалась на боковой панели, вам нужно установить `index: false` во Frontmatter.

По умолчанию боковая панель будет отсортирована в соответствии с текущим языком в соответствии с текстом заголовка имени файла. Вы можете контролировать, как они сортируются по `order`. Когда вы устанавливаете положительное число, они появляются впереди группы, чем меньше, тем дальше вперед, когда вы устанавливаете отрицательное число, они появляются позади группы, и чем больше, тем дальше:

- page -> order: 1
- page -> order: 2
- page -> order: 3
- ...
- pages with positive `order` will be sorted by `order` here
- ...
- page without `order` option -> title: Axxx
- ...
- pages without `order` option will be sorted by title here
- ...
- page without `order` option -> title: Zxxx
- ...
- pages with negative `order` will be sorted by `order` here
- ...
- page -> order: -3
- page -> order: -2
- page -> order: -1

::: tip

`README.md` является исключением, если вы не отключите его с боковой панели с помощью `index: false` или не сделаете его групповой ссылкой, он всегда будет первым элементом после сортировки.

:::

Для вложенных папок информация о группировке контролируется файлом `README.md` в этой папке. Вы можете контролировать поведение группировки папок с помощью параметра `dir` в Frontmatter. Соответствующие необязательные элементы следующие:

```ts
interface SidebarDirInfo {
  /**
   * Directory title
   *
   * @default README.md title
   */
  text?: string;

  /**
   * Directory icon
   *
   * @default README.md icon
   */
  icon?: string;

  /**
   * Whether the directory is collapsible
   *
   * @default true
   */

  collapsible?: boolean;

  /**
   * Whether the directory is clickable
   *
   * @description will set the link of the directory grouping to the link corresponding to README.md
   *
   * @default false
   */

  link?: boolean;
  /**
   * Whether index current dir
   *
   * @default true
   */
  index?: boolean;

  /**
   * Dir order in sidebar
   *
   * @default 0
   */
  order?: number | false;
}
```

Если для соответствующей папки не существует файла README.md, из имени папки будет создан только заголовок группы.

#### Кастомизация сортировщика

В дополнение к приведенной выше реализации мы также добавили более мощную опцию `sidebarSorter` в параметры темы. Вы можете передать одно или несколько имен встроенных сортировщиков или передать функцию сортировщика, необходимую для сортировки элементов боковой панели на одном уровне.

Доступные ключевые слова:

- `readme`: сначала `README.md` или `readme.md`
- `order`: положительный порядок сначала с его значением по возрастанию, отрицательный порядок последним с его значением по убыванию
- `date`: сортировать по дате по возрастанию
- `date-desc`: сортировать по дате по убыванию
- `title`: в алфавитном порядке по названию
- `filename`: сортировка в алфавитном порядке по имени файла

В соответствии с приведенным выше расширенным элементом управления, его значение по умолчанию равно `["readme", "order", "title", "filename"]`

### Отключение боковой панели

Вы можете отключить боковую панель на определенной странице с помощью `YAML front matter`:

```md
---
sidebar: false
---
```

::: note

Боковая панель по умолчанию отключена на главной странице.

:::

## Глубина ссылок заголовков

Боковая панель автоматически отображает ссылки на заголовки на текущей активной странице, вложенные под ссылку на саму страницу. Вы можете настроить это поведение, используя `headerDepth` в настройках темы. Глубина по умолчанию (максимальное значение) равна `2`, при этом извлекаются заголовки `h2` и `h3`. Установка его на `0` отключает ссылки заголовков.

Страница также может переопределить это значение через frontmatter:

```md
---
headerDepth: 2
---
```

::: note

Допустимое максимальное значение зависит от того, какие уровни заголовков вы извлекли с помощью [markdown.extractHeaders.level](https://v2.vuepress.vuejs.org/reference/config.html#markdown-extractheaders).

Поскольку значение по умолчанию [markdown.extractHeaders.level](https://v2.vuepress.vuejs.org/reference/config.html#markdown-extractheaders) равно `[2, 3]`, поэтому максимальное значение по умолчанию для `headerDepth` равно `2`.

:::

### Активные ссылки в заголовке

По умолчанию вложенные ссылки заголовков и хэш в URL-адресе обновляются по мере того, как пользователь прокручивает страницу для просмотра различных разделов. Это поведение можно отключить с помощью следующей конфигурации темы:

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      // Default: true
      activeHeaderLinks: false,
    },
  }),
});
```

@tab JS

```js {8}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      // Default: true
      activeHeaderLinks: false,
    },
  }),
};
```

:::

## Поддержка иконок

Поддержка иконок включена на боковой панели по умолчанию, и иконка страницы будет отображаться перед ссылкой на боковой панели (при чтении поля `icon` во вступительной части). Его можно отключить, установив для `sidebarIcon` значение `false` в настройках темы.

## Поддержка I18n

Навигационная панель темы поддерживает [I18n](https://v2.vuepress.vuejs.org/guide/i18n.html), поэтому вы можете настроить боковую панель отдельно для каждого языка:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    locales: {
      "/": {
        sidebar: [
          /* English config under root */
        ],
      },
      "/zh/": {
        sidebar: [
          /* Chinese config under zh folder */
        ],
      },
    },
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    locales: {
      "/": {
        sidebar: [
          /* English config under root */
        ],
      },
      "/zh/": {
        sidebar: [
          /* Chinese config under zh folder */
        ],
      },
    },
  }),
};
```

:::

## Типы и Помощники

`vuepress-theme-hope` экспортирует тип боковой панели как `SideConfig` и предоставляет вспомогательную функцию `sidebar`. Они могут обеспечить проверку и автозаполнение конфигурации боковой панели в TS и JS.

::: tip

Чтобы справиться с ситуацией, когда вы разделяете [конфигурацию с несколькими боковыми панелями](#несколько-боковых-панелей) на несколько частей, мы также предоставляем тип `SidebarArrayConfig` и `SidebarObjectConfig` и вспомогательную функцию `arraySidebar` и `objectSidebar`.

:::

::: code-tabs#language

@tab TS Helper

```ts {6}
// .vuepress/sidebar.ts
import { sidebar } from "vuepress-theme-hope";

export default sidebar(/* Your sidebar configuration */);
```

@tab TS Types

```ts {4}
// .vuepress/navbar.ts
import type { SidebarConfig } from "vuepress-theme-hope";

const sidebarConfig: SidebarConfig = [
  /* Your sidebar configuration */
];

export default sidebarConfig;
```

@tab JS

```js
// .vuepress/sidebar.js
import { sidebar } from "vuepress-theme-hope";

export default sidebar(/* Your sidebar configuration */);
```

:::

## Демо

:::: details Конфигурация этой документации

::: code-tabs#language

@tab TS

```ts
import { sidebar } from "vuepress-theme-hope";

@include(../../../.vuepress/sidebar/ru.ts{3-})
```

@tab JS

```js
import { sidebar } from "vuepress-theme-hope";

@include(../../../.vuepress/sidebar/ru.ts{3-})
```

:::

::::
