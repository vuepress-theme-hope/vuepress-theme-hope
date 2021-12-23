---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-feed"
tagline: Feed plugin for vuepress
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
yarn add -D @mr-hope/vuepress-plugin-feed
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash
npm i -D @mr-hope/vuepress-plugin-feed
```

</CodeGroupItem>
</CodeGroup>

### Usage

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/feed",
      {
        // your options
      },
    ],
  ],
};
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
export default {
  plugins: [
    [
      "@mr-hope/feed",
      {
        // your options
      },
    ],
  ],
};
```

</CodeGroupItem>
</CodeGroup>
