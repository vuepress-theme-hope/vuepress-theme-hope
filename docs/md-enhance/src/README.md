---
home: true
title: Home
icon: home
heroImage: /logo.svg
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: vuepress-plugin-md-enhance
tagline: Enhancement for Markdown in VuePress
actions:
  - text: Get Started 💡
    link: ./guide/
    type: primary

  - text: Config 🛠
    link: ./config.html

highlights:
  - header: Out of box
    image: /assets/image/box.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/3-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/3-dark.svg
    highlights:
      - title: Links Check
        icon: clipboard-check
        details: Check markdown links
        link: ./guide/others.html#link-check

      - title: Full GFM Support
        icon: fab fa-github
        details: Support github flavored markdown
        link: ./guide/others.html#gfm

  - header: Marking contents
    image: /assets/image/marker.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/1-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/1-dark.svg
    bgImageStyle:
      background-repeat: repeat
      background-size: initial
    highlights:
      - title: Custom Container
        icon: box-archive
        details: Decorate Markdown content with styles
        link: ./guide/container.html

      - title: Attrs support
        icon: code
        details: Allow you to add attributes for Markdown content
        link: ./guide/attrs.html

      - title: Mark Support
        icon: highlighter
        details: Mark words and sentences in Markdown
        link: ./guide/mark.html

      - title: Stylize tokens
        icon: wand-magic-sparkles
        details: Stylize tokens into things you want
        link: ./guide/stylize.html

  - header: Writing articles
    image: /assets/image/edit.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/9-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/9-dark.svg
    highlights:
      - title: Custom Align
        icon: align-center
        details: Let you decide to align paragraphs in the way you like
        link: ./guide/align.html

      - title: Footnote support
        icon: quote-left
        details: Your Markdown now support footnotes
        link: ./guide/footnote.html

      - title: Include snippet Support
        icon: fab fa-markdown
        details: split your docs with different parts and import them in Markdown
        link: ./guide/include.html

      - title: Extended Image syntax
        icon: image
        details: Set size and color scheme for image and covert them to figure
        link: ./guide/image.html

  - header: Richer Your Contents
    image: /assets/image/module.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/2-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/2-dark.svg
    bgImageStyle:
      background-repeat: repeat
      background-size: initial
    highlights:
      - title: Tex Support
        icon: square-root-variable
        details: Markdown now have Tex Support so you can write your formula
        link: ./guide/tex.html

      - title: Presentation Support
        icon: person-chalkboard
        details: You can insert presentation in Markdown files directly
        link: ./guide/presentation/

      - title: Tabs
        icon: table-columns
        details: Group similar content with tabs and switch them together
        link: ./guide/tabs.html

      - title: Superscript and subscript support
        icon: superscript
        details: Your Markdown now support superscript and subscript
        link: ./guide/sup-sub.html

      - title: Tasklist Support
        icon: square-check
        details: Use tasklist in Markdown
        link: ./guide/tasklist.html

      - title: Card Support
        icon: square
        details: Add cards in Markdown
        link: ./guide/card.html

  - header: Inserting Charts in Markdown
    image: /assets/image/chart.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    highlights:
      - title: Chart Support
        icon: chart-simple
        details: Display charts in Markdown
        link: ./guide/chart.html

      - title: ECharts Support
        icon: bar-chart
        details: Display ECharts in Markdown
        link: ./guide/echarts.html

      - title: Flowchart Support
        icon: route
        details: Create your flowchart in Markdown
        link: ./guide/flowchart.html

      - title: Mermaid Support
        icon: chart-pie
        details: Add mermaid diagram in Markdown
        link: ./guide/mermaid.html

  - header: Showing your codes and works
    image: /assets/image/code.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/4-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/4-dark.svg
    highlights:
      - title: Code Tabs
        icon: code
        details: Group similar codes with tabs
        link: ./guide/code-tabs.html

      - title: Code Demo Support
        icon: laptop-code
        details: You can insert code demo easily
        link: ./guide/demo/

      - title: Playground Support
        icon: code
        details: You can add playground in Markdown files
        link: ./guide/playground.html

      - title: Vue playground Support
        icon: fab fa-vuejs
        details: Show living vue component in playground
        link: ./guide/vue-playground.html

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

## Install

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

## Usage

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
