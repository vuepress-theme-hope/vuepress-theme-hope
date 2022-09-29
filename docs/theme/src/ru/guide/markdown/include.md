---
title: Включение файлов
icon: markdown
category:
  - Markdown
tag:
  - Демонстрация кода
  - Включение файлов
---

Пусть файл Markdown на вашем сайте VuePress поддерживает, включая другие файлы.

<!-- more -->

## Конфиг

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        include: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        include: true,
      },
    },
  }),
};
```

:::

## Синтаксис

Используйте `@include(filename)`, чтобы включить файл.

Чтобы частично импортировать файл, вы можете указать диапазон включаемых строк:

- `@include(filename{start-end})`
- `@include(filename{start-})`
- `@include(filename{-end})`

## Демо

`@include(./demo.snippet.md)`:

@include(./demo.snippet.md)

`@include(./demo.snippet.md{5-9})`:

@include(./demo.snippet.md{5-9})

## Продвинутый

Вы также можете настроить объект для настройки пути к включаемому файлу и поведения включения.

```ts
interface IncludeOptions {
  /**
   * handle include filePath
   *
   * @default (path) => path
   */
  getPath?: (path: string) => string;

  /**
   * Whether deep include files in included markdown files
   *
   * @default false
   */
  deep?: boolean;
}
```

Например: вы можете использовать `@src` в качестве псевдонима для вашего исходного каталога.

::: code-tabs#language

@tab TS

```ts {10-17}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // Add `@src` alias support
        include: {
          getPath: (file) => {
            if (file.startsWith("@src"))
              return file.replace("@src", path.resolve(__dirname, ".."));

            return file;
          },
        },
      },
    },
  }),
});
```

@tab JS

```js {9-16}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // Add `@src` alias support
        include: {
          getPath: (file) => {
            if (file.startsWith("@src"))
              return file.replace("@src", path.resolve(__dirname, ".."));

            return file;
          },
        },
      },
    },
  }),
};
```

:::

Кроме того, чтобы разместить ваши файлы Markdown непосредственно рядом с вашими реальными файлами, но не хотите, чтобы они отображались как страницы, вы можете установить параметры `pagePatterns` в конфигурации VuePress. Дополнительные сведения смотрите в [pagePatterns](https://v2.vuepress.vuejs.org/reference/config.html#pagepatterns).

::: code-tabs#language

@tab TS

```ts {6}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  pagePatterns: ["**/*.md", "!*.snippet.md", "!.vuepress", "!node_modules"],

  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        include: true,
      },
    },
  }),
});
```

@tab JS

```js {5}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  pagePatterns: ["**/*.md", "!*.snippet.md", "!.vuepress", "!node_modules"],

  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        include: true,
      },
    },
  }),
};
```

:::
