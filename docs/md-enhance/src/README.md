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
  - title: Links Check
    icon: clipboard-check
    details: Check markdown links
    link: /guide/others.html#link-check

  - title: Custom Container
    icon: box-archive
    details: Decorate Markdown content with styles
    link: /guide/container.html

  - title: Tabs
    icon: table-columns
    details: Group similar content with tabs and switch them together
    link: /guide/tabs.html

  - title: Code Tabs
    icon: code
    details: Group similar codes with tabs
    link: /guide/code-tabs.html

  - title: Custom Align
    icon: align-center
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
    icon: quote-left
    details: Your Markdown now support footnotes
    link: /guide/footnote.html

  - title: Mark Support
    icon: highlighter
    details: Mark words and sentences in Markdown
    link: /guide/mark.html

  - title: Tasklist Support
    icon: square-check
    details: Use tasklist in Markdown
    link: /guide/tasklist.html

  - title: image syntax
    icon: image
    details: improve syntax to specify size and color scheme
    link: /guide/image.html

  - title: Card Support
    icon: square
    details: Add cards in Markdown
    link: /guide/card.html

  - title: Chart Support
    icon: chart-simple
    details: Display charts in Markdown
    link: /guide/chart.html

  - title: Flowchart Support
    icon: route
    details: Create your flowchart in Markdown
    link: /guide/flowchart.html

  - title: Mermaid Support
    icon: chart-pie
    details: Add mermaid diagram in Markdown
    link: /guide/mermaid.html

  - title: Tex Support
    icon: square-root-variable
    details: Markdown now have Tex Support so you can write your formula
    link: /guide/tex.html

  - title: Include snippet Support
    icon: fab fa-markdown
    details: split your docs with different parts and import them in Markdown
    link: /guide/include.html

  - title: Playground Support
    icon: code
    details: You can add playground in Markdown files
    link: /guide/playground.html

  - title: Vue playground Support
    icon: fab fa-vuejs
    details: Show living vue component in playground
    link: /guide/vue-playground.html

  - title: Code Demo Support
    icon: laptop-code
    details: You can insert code demo easily
    link: /guide/demo/

  - title: Presentation Support
    icon: person-chalkboard
    details: You can insert presentation in Markdown files directly
    link: /guide/presentation/

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-md-enhance
```

@tab yarn

```bash
yarn add -D vuepress-plugin-md-enhance
```

@tab npm

```bash
npm i -D vuepress-plugin-md-enhance
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

<NetlifyBadge />

<script setup lang="ts">
import NetlifyBadge from "@NetlifyBadge";
</script>
