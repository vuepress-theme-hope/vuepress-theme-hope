---
title: Config
icon: config
---

You can pass these options to the plugin:

## Enable all

- Type: `boolean`
- Default: `false`

Enable all features.

::: danger

Please use this option ONLY for playing or testing.

As time grows,`vupress-plugin-md-enhance` is becoming more powerful. It’s adding more syntax to Markdown parser and more code to output.

Enabling features you don’t need will increase dev and build time. (`markdown-it` has to check for extra syntaxs)

Also, presentation feature will add a 700KB size chunk (mostly is `reveal.js`) to your output.

Please use the options below and enable ONLY the feature you want to use.

:::

## lineNumbers

- Type: `boolean`
- Default: `true`

Whether to display the line number to the left of each code block.

## imageFix

- Type: `boolean`
- Default: `true`

Whether to fix image links containing special characters

## align

- Type: `boolean`
- Default: `false`

Whether to enable custom align.

## sup

- Type: `boolean`
- Default: `false`

Whether to enable the upper format support.

## sub

- Type: `boolean`
- Default: `false`

Whether to enable the lower corner format support.

## footnote

- Type: `boolean`
- Default: `false`

Whether to enable footnote format support.

## mark

- Type: `boolean`
- Default: `false`

Whether to enable mark support.

## tasklist

- Type: `TaskListOptions | boolean`
- Default: `false`

Whether to enable tasklist format support. You can pass an object to config task list.

```ts
interface TaskListOptions {
  /**
   * Whether use `<label>` to wrap text
   *
   * @default true
   */
  label?: boolean;
  /**
   * Whether place `<label>` after `<input>` or wrap `<input>`
   *
   * @default true
   */
  labelAfter?: boolean;
}
```

## tex

- Type: `KatexOptions | boolean`
- Default: `false`

Whether to enable $\TeX$ syntax support. You can pass an object to config $\KaTeX$.

## mermaid

- Type: `boolean`
- Default: `false`

Whether to enable [Mermaid](https://mermaid-js.github.io/mermaid/#/) support.

## flowchart

- Type: `boolean`
- Default: `false`

Whether to enable flowchart syntax support.

## demo

- Type: `CodeDemoGlobalOptions | boolean`
- Default: `false`

Whether to enable code demo support.

### demo.jsLib

- Type: `string[]`
- Required: No

CodePen, JsFiddle requires an external JS library for dating.

### demo.cssLib

- Type: `string[]`
- Required: No

CodePen, JsFiddle need an external CSS library for dating.

::: warning

The above two options are only used by third-party code demo service, you need to import these libraries in `head`.

:::

### demo.jsfiddle

- Type: `boolean`
- Default value: `true`

Whether to display the JSFiddle button

### demo.codepen

- Type: `boolean`
- Default value: `true`

Whether to display the CodePen button

### demo.codepenLayout

- Type: `"top" | "left" | "correct"`
- Default value: `"left"`

CodePen editor layout

### demo.codepenEditors

- Type: `string`
- Default value: `"101"`

CodePen editor status

### others

The following are the library links used by the third-party code demo service. Unless your environment cannot visit jsdelivr or the speed is slow, you probably don’t need to override the default values.

#### demo.babel

Default value: `"https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"`

#### demo.vue

Default value: `"https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"`

#### demo.react

Default value: `"https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"`

#### demo.reactDOM

Default value: `"https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"`

## presentation

- Type: `PresentationOptions | boolean`
- Default: `false`

Whether to enable presentation syntax support.

You can set it with an object, the object will be used to config reveal.js.

### presentation.plugins

- Type: `string[]`
- Required: No

Plugins you want to use on reveal.js.

Acceptable values are:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

### presentation.revealConfig

- Type: `Partial<RevealOptions>`
- Required: No

Config which you want to pass to reveal.js.
