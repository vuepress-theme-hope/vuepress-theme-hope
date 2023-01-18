---
title: Панель навигации
icon: window-maximize
order: 1
category:
  - Макет
tag:
  - Макет
  - Панель навигации
---

Панель навигации может содержать название вашего сайта, [окно поиска](#окно-поиска), [ссылки панели навигации](#ссылки-на-панели-навигации), [I18n](https://v2.vuepress.vuejs.org/guide/i18n.html), [Ссылка на репозиторий](#репозиторий-git-и-ссылки-для-редактирования) и [Outlook Popup](#всплывающее-окно-outlook). Все они зависят от вашей конфигурации.

<!-- more -->

## Ссылки на панели навигации

Вы можете добавить ссылки на панель навигации с помощью параметров `navbar`, она принимает массив.

### Строковый формат

Самый простой способ настроить навигационную панель — заполнить пути файлов страниц, которые будут отображаться по очереди, чтобы текст, иконки и ссылки элемента автоматически генерировались из соответствующих файлов.

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: ["/guide/README.md", "/config/README.md", "/faq.md"],
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: ["/guide/README.md", "/config/README.md", "/faq.md"],
  }),
};
```

:::

::: tip

Вы можете опустить расширение `.md` а пути, оканчивающиеся на `/`, подразумеваются как `/README.md`.

:::

### Формат объекта

Если вас не устраивает значок страницы или вы считаете, что заголовок страницы слишком длинный, вы можете вместо этого настроить объект. Доступные элементы конфигурации:

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
    navbar: [
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
    navbar: [
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

### Выпадающий список

Чтобы отобразить больше ссылок, вы можете сгруппировать похожие ссылки в раскрывающийся список.

Вам нужно использовать формат объекта и предоставить дополнительную опцию `children` для вложения ссылок:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: [
      {
        text: "Basic",
        icon: "circle-info",
        children: ["/basic/markdown.md", "/basic/vuepress.md"],
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
    navbar: [
      {
        text: "Basic",
        icon: "circle-info",
        children: ["/basic/markdown.md", "/basic/vuepress.md"],
      },
    ],
  }),
};
```

:::

В большинстве случаев сгруппированные элементы на панели навигации относятся к одной категории и будут помещены в один и тот же подкаталог, а также имеют одинаковый префикс пути.

Чтобы упростить настройку, вы можете добавить поле `prefix`, чтобы добавить префикс к каждой подссылке в группе:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: [
      {
        text: "Basic",
        icon: "circle-info",
        prefix: "/basic/",
        children: ["markdown.md", "vuepress.md"],
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
    navbar: [
      {
        text: "Basic",
        icon: "circle-info",
        prefix: "/basic/",
        children: ["markdown.md", "vuepress.md"],
      },
    ],
  }),
};
```

:::

Вы также можете иметь подгруппы внутри выпадающего списка, вложив `children`:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: [
      {
        text: "Project",
        icon: "circle-info",
        children: [
          {
            text: "Built in Plugins",
            icon: "puzzle-piece",
            children: [
              /* Some items */
            ],
          },
          {
            text: "Third party Plugins",
            icon: "puzzle-piece",
            children: [
              /* Some items */
            ],
          },
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
    navbar: [
      {
        text: "Project",
        icon: "circle-info",
        children: [
          {
            text: "Built in Plugins",
            icon: "puzzle-piece",
            children: [
              /* Some items */
            ],
          },
          {
            text: "Third party Plugins",
            icon: "puzzle-piece",
            children: [
              /* Some items */
            ],
          },
        ],
      },
    ],
  }),
};
```

:::

## Отключить панель навигации

Чтобы отключить панель навигации глобально, установите `navbar: false` в параметрах темы:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: false,
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: false,
  }),
};
```

:::

Вы можете отключить панель навигации для определенной страницы с помощью `YAML front matter`:

```md
---
navbar: false
---
```

## Disable Navbar Icon

To disable the navbar icon, set `navbarIcon: false` in theme options:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbarIcon: false,
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbarIcon: false,
  }),
};
```

:::

## Логотип сайта

Вы можете использовать опции `logo`, чтобы установить логотип сайта, отображаемый на панели навигации.

Логотип отображается на панели навигации вместо предыдущего названия сайта на мобильном устройстве.

::: note

Укажите абсолютный путь и поместите логотип в папку `.vuepress/public`.

:::

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    logo: "/logo.png",
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    logo: "/logo.png",
  }),
};
```

:::

::: tip

Вы можете установить `logoDark` для отображения другого логотипа в темном режиме.

:::

## Поддержка I18n

Навигационная панель темы поддерживает [I18n](https://v2.vuepress.vuejs.org/guide/i18n.html), поэтому вы можете установить упомянутые выше параметры навигационной панели индивидуально для каждого языка:

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
        logo: "/logo.svg",
        navbar: [
          /* English config under root */
        ],
      },
      "/zh/": {
        logo: "/zh-logo.svg",
        navbar: [
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
        logo: "/logo.svg",
        navbar: [
          /* English config under root */
        ],
      },
      "/zh/": {
        logo: "/zh-logo.svg",
        navbar: [
          /* Chinese config under zh folder */
        ],
      },
    },
  }),
};
```

:::

## Окно поиска

Как и тема по умолчанию, `vuepress-theme-hope` имеет встроенную поддержку поисковых плагинов. Вы можете включить следующие плагины в соответствии с вашими потребностями. Соответствующее окно поиска автоматически появится на панели навигации.

Подробнее смотрите [Функция → Поиск](../feature/search.md).

## Репозиторий Git и ссылки для редактирования

Кнопка репозитория появится на панели навигации, если вы установите `repo` в настройках темы.

Вы можете управлять отображением кнопки репозитория с помощью `repoDisplay` в настройках темы.

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // Assumes GitHub. Can also be a full GitLab url.
    repo: "vuepress-theme-hope/vuepress-theme-hope",
    // Customising the header label
    // Defaults to "GitHub" / "GitLab" / "Gitee" / "Bitbucket" or "Source" depending on `repo`
    repoLabel: "GitHub",
    // Whether to display repo link, default is `true`
    repoDisplay: true,
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    // Assumes GitHub. Can also be a full GitLab url.
    repo: "vuepress-theme-hope/vuepress-theme-hope",
    // Customising the header label
    // Defaults to "GitHub" / "GitLab" / "Gitee" / "Bitbucket" or "Source" depending on `repo`
    repoLabel: "GitHub",
    // Whether to display repo link, default is `true`
    repoDisplay: true,
  }),
};
```

:::

## Всплывающее окно Outlook

Предусмотрены следующие три функции:

- [Переключатель цвета темы](../interface/theme-color.md)
- [Темный режим](../interface/darkmode.md)
- [Кнопка полноэкранного режима](../interface/others.md#полноэкранная-кнопка)

## Конфигурация макета

`vuepress-theme-hope` позволяет настроить макет панели навигации. Вы можете добавлять компоненты в `start`, `center` и `end` клавиши в параметрах `navbarLayout`.

Доступные компоненты:

- Бренд: Бренд сайта
- Ссылки: Ссылки на панель навигации
- Язык: Переключатель языка
- Поиск: Окно поиска
- Outlook: Всплывающее окно Outlook
- Репозиторий: Репозиторий проекта

По умолчанию мы используем следующие параметры:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbarLayout: {
      start: ["Brand"],
      center: ["Links"],
      end: ["Language", "Repo", "Outlook", "Search"],
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
    navbarLayout: {
      start: ["Brand"],
      center: ["Links"],
      end: ["Language", "Repo", "Outlook", "Search"],
    },
  }),
};
```

:::

## Типы и Помощники

`vuepress-theme-hope` экспортирует тип навигационной панели как `NavbarConfig` и предоставляет вспомогательную функцию `navbar`. Они могут обеспечивать проверку и автозаполнение конфигурации панели навигации в TS и JS.

::: tip

В основном они имеют дело со сценариями, когда вы разбиваете конфигурацию VuePress на несколько частей.

:::

::: code-tabs#language

@tab TS Helper

```ts
// .vuepress/navbar.ts
import { navbar } from "vuepress-theme-hope";

export default navbar([
  /* Your navbar configuration */
]);
```

@tab TS Type

```ts
// .vuepress/navbar.ts
import type { NavbarConfig } from "vuepress-theme-hope";

const navbarConfig: NavbarConfig = [
  /* Your navbar configuration */
];

export default navbarConfig;
```

@tab JS

```js
// .vuepress/navbar.js
import { navbar } from "vuepress-theme-hope";

export default navbar([
  /* Your navbar configuration */
]);
```

:::

## Демо

:::: details Конфигурация этой документации

::: code-tabs#language

@tab TS

```ts
import { navbar } from "vuepress-theme-hope";

@include(../../../.vuepress/navbar/ru.ts{3-})
```

@tab JS

```js
import { navbar } from "vuepress-theme-hope";

@include(../../../.vuepress/navbar/ru.ts{3-})
```

:::

::::
