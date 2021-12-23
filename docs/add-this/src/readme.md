---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-add-this
tagline: AddThis plugin for vuepress
action:
  - text: Guide 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## How to use

### Install

<CodeGroup>
<CodeGroupItem title="yarn">

```bash
yarn add -D vuepress-plugin-add-this
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash
npm i -D vuepress-plugin-add-this
```

</CodeGroupItem>
</CodeGroup>

### Usage

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
module.exports = {
  plugins: [["add-this", { pubid: "your pubid" }]],
};
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
export default {
  plugins: [["add-this", { pubid: "your pubid" }]],
};
```

</CodeGroupItem>
</CodeGroup>
