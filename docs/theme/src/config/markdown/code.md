---
title: Markdown Code Config
icon: b:markdown
order: 5
category:
  - Config
tag:
  - Markdown Config
  - Theme Config
---

The following options adds new code feature in Markdown, and can be set **under `markdown` property** in theme options.

## markdown.markdown.codeTabs

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Code Tabs](../../guide/markdown/code/code-tabs.md)
  - [@vuepress/plugin-markdown-tab → codeTabs][codeTabs]

Whether to enable tabs support.

## markdown.playground

- Type: `PlaygroundGlobalOptions`

  ```ts twoslash
  import type { CompilerOptions } from "typescript";

  interface PlaygroundCodeConfig {
    /**
     * Code block extension
     *
     * @description It's based on filename, not code fence language
     */
    ext: string;

    /** Code block content */
    content: string;
  }

  interface PlaygroundData {
    /** Title of Playground */
    title?: string;

    /**
     * Import map file name
     *
     * @default "import-map.json"
     */
    importMap?: string;

    /** Playground files info */
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

    /** hash key based on playground content */
    key: string;
  }

  interface PlaygroundOptions {
    /** Playground container name */
    name: string;

    /**
     * Playground component name
     *
     * @default "Playground"
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

  interface VuePresetPlaygroundOptions {
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

  interface UnoPresetPlaygroundOptions {
    /**
     * external playground service url
     *
     * @default "https://unocss.dev/play"
     */
    service?: string;
  }

  type BuiltInPlaygroundPreset = "ts" | "vue" | "unocss";

  interface PlaygroundGlobalOptions {
    /** Playground presets */
    presets: (BuiltInPlaygroundPreset | PlaygroundOptions)[];
    /** Playground config */
    config?: {
      ts?: TSPresetPlaygroundOptions;
      vue?: VuePresetPlaygroundOptions;
      unocss?: UnoPresetPlaygroundOptions;
    };
  }
  ```

- Required: No
- Details:
  - [Markdown → Playground](../../guide/markdown/code/playground.md)

Playground options.

## markdown.vuePlayground

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Vue Playground](../../guide/markdown/code/vue-playground.md)

Whether to enable vue playground support.

## markdown.sandpack

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Sandpack Playground](../../guide/markdown/code/sandpack.md)

Whether to enable sandpack playground support.

## markdown.demo

- Type: `CodeDemoGlobalOptions | boolean`
- Default: `false`
- Details:
  - [Markdown → Code Demo](../../guide/markdown/code/demo.md)

Whether to enable code demo support.

### markdown.demo.jsLib

- Type: `string[]`
- Required: No

External JS libraries for CodePen, JsFiddle only.

### markdown.demo.cssLib

- Type: `string[]`
- Required: No

External JS libraries for CodePen, JsFiddle only.

::: warning

The above two options are only used by third-party code demo service, you need to import these libraries in `head` to get it work.

:::

### markdown.demo.jsfiddle

- Type: `boolean`
- Default: `true`

Whether to display the JSFiddle button

### markdown.demo.codepen

- Type: `boolean`
- Default: `true`

Whether to display the CodePen button

### markdown.demo.codepenLayout

- Type: `"top" | "left" | "correct"`
- Default: `"left"`

CodePen editor layout

### markdown.demo.codepenEditors

- Type: `string`
- Default: `"101"`

CodePen editor status

[codeTabs]: https://ecosystem.vuejs.press/plugins/markdown/markdown-tab.html#codeTabs
