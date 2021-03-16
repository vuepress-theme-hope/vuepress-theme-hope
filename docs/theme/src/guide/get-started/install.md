---
title: Install / Usage
icon: install
category: Get Started
tags:
  - install
---

## Install

Create a vuepress-theme-hope project in `[dir]` folder under the current project:

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn create vuepress-theme-hope [dir]
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npx create-vuepress-theme-hope [dir]
```
</CodeGroupItem>
</CodeGroup>

## Usage

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
