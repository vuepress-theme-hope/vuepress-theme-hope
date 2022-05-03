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

  - title: CodeGroup
    icon: code
    details: Group similar codes with tabs
    link: /guide/code-group.html

  - title: Custom Align
    icon: align
    details: Let you decide to align paragraphs in the way you like
    link: /guide/align.html

  - title: Superscript and subscript support
    icon: superscript
    details: Your Markdown now suppport superscript and subscript
    link: /guide/sup-sub.html

  - title: Footnote support
    icon: footnote
    details: Your Markdown now suppport footnotes
    link: /guide/footnote.html

  - title: Mark Support
    icon: write
    details: Mark words and sentences in Markdown
    link: /guide/mark.html

  - title: Tasklist Support
    icon: check
    details: Use tasklist in Markdown
    link: /guide/tasklist.html

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

  - title: Markdown snippet Support
    icon: markdown
    details: split your docs with different parts and improt them in Markdown
    link: /guide/md-import.html

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

:::: code-group

::: code-group-item pnpm

```bash
pnpm add -D vuepress-plugin-md-enhance@next
```

:::

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-md-enhance@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-md-enhance@next
```

:::

::::

### Usage

:::: code-group

::: code-group-item TS

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

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { mdEnhancePlugin } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhancePlugin({
      // your options
    }),
  ],
};
```

:::

::::

## Migrating from V1

For details, see [Migration Guide](./migration.md).
