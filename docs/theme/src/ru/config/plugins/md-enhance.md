---
title: MdEnhance Plugin Config
icon: markdown
order: 6
category:
  - Конфиг
tag:
  - Markdown
  - Разметка
  - Конфигурация плагина
  - Конфиг темы
---

## Введение

Плагин `vuepress-plugin-md-enhance` включен по умолчанию и предоставляет улучшения Markdown.

`vuepress-theme-hope` передает `plugins.mdEnhance` в параметрах темы в качестве параметров плагина для плагина `vuepress-plugin-md-enhance`.

::: tip

Если вам не нужна эта функция, установите значение `false`.

:::

::: info

`vuepress-theme-hope` установит для параметра `container` значение `true` по умолчанию.

Подробнее смотрите в [документации по md-enhance][md-enhance-config].

:::

## Опции плагина

### gfm

- Тип: `boolean`
- По умолчанию: `false`

Поддерживать ли полный синтаксис GFM.

::: note

Полный синтаксис GFM смотрите в [GFM](https://github.github.com/gfm/).

Честно говоря, мы не поддерживаем его на 100%, мы предоставляем только его синтаксис, включая списки задач, сноски и так далее.

Некоторое поведение может отличаться, например, чтобы разрешить синтаксис Vue, мы не запрещаем теги `<script>`. Но в большинстве ситуаций поведение должно быть таким же.

:::

### container

- Тип: `boolean`
- По умолчанию: `true`

Включить ли пользовательский контейнер, включая:

- info
- note
- tip
- warning
- danger
- details

### linkCheck

- Тип: `"always" | "dev" | "build" | "never" | boolean`
- По умолчанию: `"dev"`

Включить ли проверку ссылок.

::: note

- `true` equals to `'always'`
- `false` equals to `'never'`

:::

### vPre

- Тип: `boolean`
- По умолчанию: `false`

Включить ли обертку v-pre.

### tabs

- Тип: `boolean`
- По умолчанию: `false`

Включить ли вкладки.

### codetabs

- Тип: `boolean`
- По умолчанию: `false`

Включить ли кодовые таблицы.

### align

- Тип: `boolean`
- По умолчанию: `false`

Включить ли пользовательское выравнивание.

### sup

- Тип: `boolean`
- По умолчанию: `false`

Включить ли поддержку формата верхнего индекса.

### sub

- Тип: `boolean`
- По умолчанию: `false`

Включить ли поддержку формата нижнего индекса.

### footnote

- Тип: `boolean`
- По умолчанию: `false`

Включить ли поддержку формата сносок.

### mark

- Тип: `boolean`
- По умолчанию: `false`

Включить ли поддержку выделения.

### imageLazyload

- Тип: `boolean`
- По умолчанию: `false`

Следует ли лениво загружать все изображения на странице собственным способом.

### imageMark

- Тип: `ImageMarkOptions | boolean`
- По умолчанию: `false`

Включить ли поддержку метки изображения.

```ts
interface ImageMarkOptions {
  /** lightmode only IDs */
  light?: string[];
  /** darkmode only IDs */
  dark?: string[];
}
```

### imageSize

- Тип: `boolean`
- По умолчанию: `false`

Включить ли поддержку размера изображения.

### imageTitle

- Тип: `boolean`
- По умолчанию: `false`

Включить ли поддержку названия изображения.

### tasklist

- Тип: `TaskListOptions | boolean`
- По умолчанию: `false`

Включить ли поддержку формата списка задач. Вы можете передать объект в список задач конфигурации.

```ts
interface TaskListOptions {
  /**
   * Whether disable checkbox
   *
   * @default true
   */
  disabled?: boolean;

  /**
   * Whether use `<label>` to wrap text
   *
   * @default true
   */
  label?: boolean;
}
```

### katex

- Тип: `KatexOptions & { mhchem?: boolean } | boolean`
- По умолчанию: `false`

Включить ли поддержку синтаксиса $\TeX$ через $\KaTeX$. Вы можете передать объект в конфигурацию $\KaTeX$.

В частности, вы можете включить расширение mhchem с помощью `katex.mhchem: true`.

Доступные варианты смотрите в [Документации Katex](https://katex.org/docs/options.html).

### mathjax

- Type: `MathJaxOptions | boolean`
- Default: `false`

Включить ли поддержку синтаксиса $\TeX$ через Math Jax. Вы можете передать объект в конфигурацию Math Jax.

Доступные варианты смотрите в [исходном коде](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/md-enhance/src/shared/mathjax.ts).

### flowchart

- Тип: `boolean`
- По умолчанию: `false`

Включить ли поддержку блок-схем.

### mermaid

- Тип: `boolean`
- По умолчанию: `false`

Включить ли поддержку [Mermaid](https://mermaid-js.github.io/mermaid/#/).

### stylize

- Тип: `StylizeOptions | false`

  ```ts
  interface StylizeResult {
    /**
     * Tag name
     */
    tag: string;

    /**
     * Attributes settings
     */
    attrs: Record<string, string>;

    /**
     * Tag content
     */
    content: string;
  }

  interface StylizeItem {
    /**
     * Inline token matcher
     */
    matcher: string | RegExp;

    /**
     * Content Replacer
     */
    replacer: (options: {
      tag: string;
      content: string;
      attrs: Record<string, string>;
      env?: MarkdownEnv;
    }) => StylizeResult | void;
  }

  type StylizeOptions = StylizeItem[];
  ```

- По умолчанию: `false`

Стилизуйте встроенные токены, чтобы создать нужный фрагмент.

### playground

- Тип: `PlaygroundGlobalOptions`

  ```ts
  import type { CompilerOptions } from "typescript";

  interface PlaygroundCodeConfig {
    /**
     * Code block extension
     *
     * @description It's based on filename, not code fence language
     */
    ext: string;

    /**
     * Code block content
     */
    content: string;
  }

  interface PlaygroundData {
    /**
     * Title of Playground
     */
    title?: string;

    /**
     * Import map file name
     *
     * @default 'import-map.json'
     */
    importMap?: string;

    /**
     * Playground files info
     */
    files: Record<
      /** File name */
      string,
      /** File detail */
      PlaygroundCodeConfig
    >;

    /**
     * Playground settings
     *
     * @description It's parsed result of json content after setting directive
     */
    settings: Record<string, unknown>;

    /**
     * hash key based on playground content
     */
    key: string;
  }

  interface PlaygroundOptions {
    /**
     * Playground container name
     */
    name: string;

    /**
     * Playground component name
     *
     * @default 'Playground'
     */
    component?: string;

    /**
     * Props getter
     */
    propsGetter: (data: PlaygroundData) => Record<string, string>;
  }

  interface TSPresetPlaygroundOptions extends CompilerOptions {
    /**
     * external playground service url
     *
     * @default "https://www.typescriptlang.org/play"
     */
    service?: string;
  }

  export interface VuePresetPlaygroundOptions {
    /**
     * external playground service url
     *
     * @default "https://sfc.vuejs.org/"
     */
    service?: string;

    /**
     * Whether to use dev version
     *
     * @default false
     */
    dev?: boolean;

    /**
     * Whether to enable SSR
     *
     * @default false
     */
    ssr?: boolean;
  }

  interface PlaygroundGlobalOptions {
    /** Playground presets */
    presets: ("ts" | "vue" | PlaygroundOptions)[];
    /** Playground config */
    config?: {
      ts?: TSPresetPlaygroundOptions;
      vue?: VuePresetPlaygroundOptions;
    };
  }
  ```

- Обязательный: Нет

Варианты плейграунда.

### vuePlayground

- Тип: `VuePlaygroundOptions | boolean`

  ```ts
  interface VuePlaygroundOptions {
    /**
     * Whether to show code in playground
     *
     * @default false
     */
    showCode?: boolean;

    /**
     * specify the version of vue
     */
    vueVersion?: string;

    /**
     * specify default URL to import Vue runtime from in the sandbox
     *
     * @default "https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js"
     */
    defaultVueRuntimeURL?: string;

    /**
     * Specify default URL to import Vue Server Renderer from in the sandbox
     *
     * @default "https://unpkg.com/@vue/server-renderer@${version}/dist/server-renderer.esm-browser.js"
     */
    defaultVueServerRendererURL?: string;

    /**
     * Whether to enable repl's editor resizable
     *
     * @default true
     */
    autoResize?: boolean;

    /**
     * Whether to show JS, CSS, SSR panel
     *
     * @default false
     */
    showCompileOutput?: boolean;

    /**
     * Whether to show import map
     *
     * @default true
     */
    showImportMap?: boolean;

    /**
     * Whether to clear console
     *
     * @default false
     */
    clearConsole?: boolean;

    /**
     * Layout
     *
     * @default 'vertical'
     */
    layout?: "vertical" | "horizontal";

    /**
     * Options to configure the `vue/compiler-sfc`
     */
    sfcOptions?: SFCOptions;

    /**
     * Whether to enable SSR
     *
     * @default true
     */
    ssr?: boolean;
  }
  ```

- По умолчанию: `false`

Включить ли поддержку Vue Playground.

### demo

- Тип: `CodeDemoGlobalOptions | boolean`
- По умолчанию: `false`

Включить ли поддержку демонстрации кода.

#### demo.jsLib

- Тип: `string[]`
- Обязательный: Нет

CodePen, JsFiddle требует внешней библиотеки JS для знакомств.

#### demo.cssLib

- Тип: `string[]`
- Обязательный: Нет

CodePen, JsFiddle нужна внешняя библиотека CSS для знакомств.

::: warning

Вышеупомянутые две опции используются только сторонним демонстрационным сервисом кода, вам необходимо импортировать эти библиотеки в `head`.

:::

#### demo.jsfiddle

- Тип: `boolean`
- Значение по умолчанию: `true`

Отображать ли кнопку JSFiddle.

#### demo.codepen

- Тип: `boolean`
- Значение по умолчанию: `true`

Отображать ли кнопку CodePen.

#### demo.codepenLayout

- Тип: `"top" | "left" | "correct"`
- Значение по умолчанию: `"left"`

Макет редактора CodePen.

#### demo.codepenEditors

- Тип: `string`
- Значение по умолчанию: `"101"`

Статус редактора CodePen.

#### Другие

Ниже приведены ссылки на библиотеки, используемые сторонней демонстрационной службой кода. Если ваша среда не может посетить unpkg или скорость низкая, вам, вероятно, не нужно переопределять значения по умолчанию.

##### demo.babel

Значение по умолчанию: `"https://unpkg.com/@babel/standalone/babel.min.js"`

##### demo.vue

Значение по умолчанию: `"https://unpkg.com/vue/dist/vue.global.prod.js"`

##### demo.react

Значение по умолчанию: `"https://unpkg.com/react/umd/react.production.min.js"`

##### demo.reactDOM

Значение по умолчанию: `"https://unpkg.com/react-dom/umd/react-dom.production.min.js"`

### presentation

- Тип: `PresentationOptions | boolean`
- По умолчанию: `false`

Включить ли поддержку синтаксиса представления.

Вы можете установить его с помощью объекта, объект будет использоваться для настройки reveal.js.

#### presentation.plugins

- Тип: `RevealPlugin[]`

  ```ts
  type RevealPlugin = "highlight" | "math" | "search" | "notes" | "zoom";
  ```

- Обязательный: Нет

Плагины, которые вы хотите использовать в reveal.js.

Допустимые значения:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

#### presentation.revealConfig

- Тип: `Partial<RevealOptions>`
- Обязательный: Нет

Конфиг, который вы хотите передать в reveal.js.

### delay

- Тип: `number`
- По умолчанию: `500`

Задержка срабатывания, в мс.

::: tip

Если используемая вами тема имеет анимацию переключения, рекомендуется настроить этот параметр на `Switch animation duration + 200`.

:::

### locales

- Тип: `MarkdownEnhanceLocaleConfig`

  ```ts
  interface MarkdownEnhanceLocaleData {
    /**
     * Default Title text for info block
     */
    info: string;

    /**
     * Default Title text for note block
     */
    note: string;

    /**
     * Default Title text for tip block
     */
    tip: string;

    /**
     * Default Title text for warning block
     */
    warning: string;

    /**
     * Default Title text for danger block
     */
    danger: string;

    /**
     * Default Title text for details block
     */
    details: string;
  }

  interface MarkdownEnhanceLocaleConfig {
    [localePath: string]: MarkdownEnhanceLocaleData;
  }
  ```

- Обязательный: Нет

Конфигурация локалей для плагина Расширения Markdown.

[md-enhance-config]: https://vuepress-theme-hope.github.io/v2/md-enhance/config.html
