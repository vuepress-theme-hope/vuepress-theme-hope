---
home: true
title: vuepress-plugin-md-enhance
heroImage: /logo.svg
heroText: vuepress-plugin-md-enhance
tagline: Enhancement for markdown in Vuepress
action:
  - text: Get Started 💡
    link: /en/guide/

  - text: Config 🛠
    link: /en/config/

features:
  - title: Superscript and subscript support
    details: Your markdown now suppport superscript and subscript
    link: /en/guide/sup-sub/
  - title: Footnote support
    details: Your markdown now suppport footnotes
    link: /en/guide/footnote/
  - title: DIY Align
    details: Let you decide to align paragraphs in the way you like
    link: /en/guide/align/
  - title: Mark Support
    details: Mark words and sentences in markdown easily
    link: /en/guide/flowchart/
  - title: Flowchart Support
    details: Create your flowchart in markdown easily
    link: /en/guide/flowchart/
  - title: Tex Support
    details: Markdown now have Tex Support so you can write yout formula easily
    link: /en/guide/tex/
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

### Install

```bash
npm i -D vuepress-plugin-md-enhance
```

### Usage

```js {3}
// .vuepress/config.js
module.exports = {
  plugin: ["md-enhance"],
};
```
