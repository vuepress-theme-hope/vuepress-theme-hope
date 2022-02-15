---
title: 常见问题
icon: question
category:
  - FAQ
---

## 官方 QQ 群

- [点击加入](https://jq.qq.com/?_wv=1027&k=rATJyxGK) (群号: 1003437555)

## 构建失败

请确保你使用的是最新版本主题，之后在禁用缓存的情况下重新运行开发服务器: `vuepress dev <你的文档地址> --no-cache`。

如果问题依然存在，请在 GitHub 上 [提一个讨论](https://github.com/vuepress-theme-hope/vuepress-theme-hope/discussions/new)，问题总是受欢迎的，无论**它们是否简单**。 您只需要确保两点：

1. 您已经尝试过搜索相关文档。

1. 你在讨论中提供了详细的描述。

   - 如果您不知道如何配置某些内容，请描述您想要的内容、搜索的内容或您希望看到指南的哪个部分 (以便我们改进我们的文档)

   - 如果您遇到问题，请提供相关的错误日志（通过运行 `vuepress dev <docs dir> --debug`）和屏幕截图。

如果你确定某些地方有问题，请在 GitHub 上 [提一个 Issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues/new/choose)，并完整指出问题的具体详情。

## `xxx isn’t assign with a lang, and will return 'en-US' instead.`

如果在开发过程启动时看到 `xxx isn’t assign with a lang, and will return 'en-US' instead.`，请检查你是否为多语言配置的每个语言设置了语言项目。

如果你只有一个语言，请通过此方式设置语言

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  locales: {
    "/": {
      // 设置正在使用的语言
      lang: "zh-CN",
    },
  },
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  locales: {
    "/": {
      // 设置正在使用的语言
      lang: "zh-CN",
    },
  },
});
```

:::

::::

## 部分页面设置失效

你可以先重新查阅文档，看看该设置是否 **不支持页面配置**。

**支持页面配置** 意味着主题允许页面的配置能够覆盖全局的同名(同功能)配置，但并不是所有功能都满足此设置。为了项目的编译速度，有些项目在全局配置禁用后不会在编译阶段加载，它们就无法局部启用。

## 代码块在浅色模式 (日间模式) 下不正常

我猜这是你的问题，请你删除 `.vuepress/styles/palette.styl` 内的 `$codeBgColor`，主题的默认值是浅蓝色，而默认主题为墨蓝色。
