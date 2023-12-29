---
title: VuePress 配置
icon: gears
order: 4
category:
  - 教程
  - VuePress
tag:
  - 配置
  - VuePress
---

## 配置文件

如果没有任何配置，你的 VuePress 站点仅有一些最基础的功能。为了更好地自定义你的网站，让我们首先在你的文档目录下创建一个 `.vuepress` 目录，所有 VuePress 相关的文件都将会被放在这里。你的项目结构可能是这样:

```
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
├─ .gitignore
└─ package.json
```

VuePress 站点的基本配置文件是 `.vuepress/config.js` ，但也同样支持 TypeScript 配置文件。你可以使用 `.vuepress/config.ts` 来得到更好的类型提示。

一个基础的配置文件是这样的:

::: code-tabs#language

@tab TS

```ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // 站点配置
  lang: "zh-CN",
  title: "你好， VuePress ！",
  description: "这是我的第一个 VuePress 站点",

  // 主题
  theme: hopeTheme({
    // 主题配置
    logo: "https://vuejs.org/images/logo.png",
  }),
});
```

@tab JS

```js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  // 站点配置
  lang: "zh-CN",
  title: "你好， VuePress ！",
  description: "这是我的第一个 VuePress 站点",

  // 主题
  theme: hopeTheme({
    // 主题配置
    logo: "https://vuejs.org/images/logo.png",
  }),
};
```

:::

::: tip

前往 [配置参考](https://vuejs.press/zh/reference/config.html) 查看所有 VuePress 配置。

:::

## 配置作用域

### 站点配置

站点配置的意思是，无论你使用什么主题，这些配置项都可以生效。

我们知道，每一个站点都应该有它的 `lang`, `title` 和 `description` 等属性，因此 VuePress 内置支持了这些属性的配置。

### 主题配置

主题配置将会被 VuePress 主题来处理，所以它取决于你使用的主题是什么。

对于 `vuepress-theme-hope` 来说，你应该导入 `hopeTheme` 并设置 设置 `theme: hopeTheme(options)`。

::: warning

如果你没有设置 VuePress 配置的 `theme` 配置项，则代表使用的是默认主题。

:::

## 客户端配置文件

在大多数情况下，配置文件已经足够帮助你配置好你的 VuePress 站点。不过，有些时候用户们可能希望直接添加一些客户端代码。 VuePress 通过客户端配置文件来支持这种需求：

```
├─ docs
│  ├─ .vuepress
│  │  ├─ client.js   <--- 客户端配置文件
│  │  └─ config.js   <--- 配置文件
│  └─ README.md
├─ .gitignore
└─ package.json
```

一个基础的客户端配置文件是这样的：

```ts
import { defineClientConfig } from "@vuepress/client";

export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {},
  rootComponents: [],
});
```

::: tip

和配置文件不同，客户端配置文件不能通过命令行接口的选项来指定。

可以前往 [深入 > Cookbook > 客户端配置的使用方法](https://vuejs.press/zh/advanced/cookbook/usage-of-client-config.html) 来了解更多信息。

:::
