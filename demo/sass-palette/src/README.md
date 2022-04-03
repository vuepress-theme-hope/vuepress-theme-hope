---
home: true
title: Home
heroImage: /logo.svg
heroText: vuepress-plugin-sass-palette
tagline: Sass palette plugin for VuePress2
footer: MIT Licensed | Copyright © 2021-present Mr.Hope
---

## 使用插件

### 安装

```bash
yarn add -D vuepress-plugin-sass-palette@next
```

### Usage

```ts
// Your plugin or theme entry
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import type { Plugin } from "@vuepress/core";

const yourPlugin: Plugin = (options, app) => {
  useSassPalettePlugin(app, {
    // plugin options
  });

  return {
    // your plugin api
  };
};

export default yourPlugin;
```
