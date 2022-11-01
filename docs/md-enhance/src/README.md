---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-md-enhance
tagline: Enhancement for Markdown in VuePress
actions:
  - text: Get Started 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config.html

features:
  - title: Custom Container
    icon: box
    details: Decorate Markdown content with styles
    link: /guide/container.html

  - title: Tabs
    icon: tab
    details: Group similar content with tabs and switch them together
    link: /guide/tabs.html

  - title: Code Tabs
    icon: code
    details: Group similar codes with tabs
    link: /guide/code-tabs.html

  - title: Custom Align
    icon: align
    details: Let you decide to align paragraphs in the way you like
    link: /guide/align.html

  - title: Attrs support
    icon: code
    details: Allow you to add attributes for Markdown content
    link: /guide/attrs.html

  - title: Superscript and subscript support
    icon: superscript
    details: Your Markdown now support superscript and subscript
    link: /guide/sup-sub.html

  - title: Footnote support
    icon: footnote
    details: Your Markdown now support footnotes
    link: /guide/footnote.html

  - title: Mark Support
    icon: write
    details: Mark words and sentences in Markdown
    link: /guide/mark.html

  - title: Tasklist Support
    icon: check
    details: Use tasklist in Markdown
    link: /guide/tasklist.html

  - title: image syntax
    icon: pic
    details: improve syntax to specify size and color scheme
    link: /guide/image.html

  - title: Chart Support
    icon: rank
    details: Display charts in Markdown
    link: /guide/chart.html

  - title: Flowchart Support
    icon: tree
    details: Create your flowchart in Markdown
    link: /guide/flowchart.html

  - title: Mermaid Support
    icon: diagram
    details: Add mermaid diagram in Markdown
    link: /guide/mermaid.html

  - title: Tex Support
    icon: tex
    details: Markdown now have Tex Support so you can write your formula
    link: /guide/tex.html

  - title: Include snippet Support
    icon: markdown
    details: split your docs with different parts and import them in Markdown
    link: /guide/include.html

  - title: Playground Support
    icon: code
    details: You can add playground in Markdown files
    link: /guide/playground.html

  - title: Vue playground Support
    icon: code
    details: Show living vue component in playground
    link: /guide/vue-playground.html

  - title: Code Demo Support
    icon: discover
    details: You can insert code demo easily
    link: /guide/demo/

  - title: Presentation Support
    icon: slides
    details: You can insert presentation in Markdown files directly
    link: /guide/presentation/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-md-enhance@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-md-enhance@next
```

@tab npm

```bash
npm i -D vuepress-plugin-md-enhance@next
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // your options
    }),
  ],
};
```

:::

## Migrating from V1

For details, see [Migration Guide](./migration.md).

## Advanced

This plugin exports the following Markdown-it plugin, and you can use them in other projects.

- align
- attrs
- container
- footnote
- imageLazyload
- imageMark
- imageSize
- imageTitle
- include
- mathjax
- katex
- mark
- stylize
- sub
- sup
- tasklist
- tex
- uml
