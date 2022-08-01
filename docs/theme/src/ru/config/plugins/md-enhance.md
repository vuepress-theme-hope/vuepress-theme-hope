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

### enableAll <Badge text="Только демо" type="danger" />

- Тип: `boolean`
- По умолчанию: `false`

Включить ли все функции.

::: danger

Пожалуйста, используйте эту опцию ТОЛЬКО для игры или тестирования.

Плагин ПОЛНОСТЬЮ поддерживает древовидную структуру, поэтому вам следует использовать приведенные ниже параметры и включать ТОЛЬКО ту функцию, которую вы хотите использовать.

Включение функций, которые вам не нужны, увеличит время разработки и сборки. (`markdown-it` должен проверять наличие дополнительных синтаксисов)

Кроме того, некоторые функции будут добавлять большие куски в ваш вывод (может достигать 2 МБ).

:::

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

### vpre

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

### lazyLoad

- Тип: `boolean`
- По умолчанию: `false`

Следует ли лениво загружать все изображения на странице собственным способом.

### mark

- Тип: `boolean`
- По умолчанию: `false`

Включить ли поддержку выделения.

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

### tex

- Тип: `KatexOptions | boolean`
- По умолчанию: `false`

Включить ли поддержку синтаксиса $\TeX$. Вы можете передать объект в конфигурацию $\KaTeX$.

Доступные варианты смотрите в [Документации Katex](https://katex.org/docs/options.html).

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
