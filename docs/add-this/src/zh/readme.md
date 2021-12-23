---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-add-this
tagline: 为 VuePress 提供 addthis 支持
action:
  - text: 快速上手 💡
    link: /zh/guide/
    type: primary

  - text: 配置 🛠
    link: /zh/config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## 使用插件

### 安装

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

### 使用

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
module.exports = {
  plugins: [["add-this", { pubid: "你的 pubid" }]],
};
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
export default {
  plugins: [["add-this", { pubid: "你的 pubid" }]],
};
```

</CodeGroupItem>
</CodeGroup>
