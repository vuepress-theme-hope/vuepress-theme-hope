---
title: Install / Usage
icon: install
category: Get Started
tags:
  - install
---

## Use in new project

You can use [vuepress-theme-hope template](https://github.com/vuepress-theme-hope/vuepress-theme-hope-template) directly to start your VuePress journey.

## Use in existing project

### Installation

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D vuepress-theme-hope
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm i -D vuepress-theme-hope
```
</CodeGroupItem>
</CodeGroup>

### Usage

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  // your config here
});
```

::: tip

To minimize user configuration, vuepress-theme-hope provides some configuration options that need to be processed before being submitted to VuePress. At the same time, vuepress-theme-hope will also allow you to omit some configurations and automatically generate them for you.

For example, automatically generate multi-language options in the project configuration for you based on the multi-language options in your theme configuration, and automatically help you complete the localization work.

:::
