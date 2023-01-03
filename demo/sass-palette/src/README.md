---
home: true
title: Home
heroImage: /logo.svg
heroText: vuepress-plugin-sass-palette
tagline: Sass palette plugin for VuePress2
actions:
  - text: Docs
    link: https://plugin-sass-palette.vuejs.press

footer: MIT Licensed | Copyright © 2021-present Mr.Hope
---

## 使用插件

### 安装

```bash
pnpm add -D vuepress-plugin-sass-palette@next
```

### Usage

```ts
// Your plugin or theme entry
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import type { PluginFunction } from "@vuepress/core";

export const yourPlugin =
  (options): PluginFunction =>
  (app) => {
    useSassPalettePlugin(app, {
      // plugin options
    });

    return {
      // your plugin api
    };
  };
```
