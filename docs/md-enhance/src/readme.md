---
home: true
title: vuepress-plugin-md-enhance
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-md-enhance
tagline: Enhancement for markdown in VuePress
action:
  - text: Get Started 💡
    link: /guide/

  - text: Config 🛠
    link: /config/

features:
  - title: Superscript and subscript support
    details: Your markdown now suppport superscript and subscript
    link: /guide/sup-sub/

  - title: Footnote support
    details: Your markdown now suppport footnotes
    link: /guide/footnote/

  - title: DIY Align
    details: Let you decide to align paragraphs in the way you like
    link: /guide/align/

  - title: Mark Support
    details: Mark words and sentences in markdown
    link: /guide/flowchart/

  - title: Flowchart Support
    details: Create your flowchart in markdown
    link: /guide/flowchart/

  - title: Tex Support
    details: Markdown now have Tex Support so you can write your formula
    link: /guide/tex/

  - title: Code Demo Support
    details: You can insert code demo easily
    link: /guide/demo/

  - title: Presentation Support
    details: You can insert presentation in markdown files directly
    link: /guide/presentation/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

### Install

```bash
npm i -D vuepress-plugin-md-enhance
```

Or

```bash
yarn add -D vuepress-plugin-md-enhance
```

### Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // your options
      },
    ],
  ],
};
```
