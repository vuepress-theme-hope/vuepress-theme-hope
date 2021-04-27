---
title: 常见问题
icon: question
category: FAQ
---

## 官方 QQ 群

- [点击加入](https://jq.qq.com/?_wv=1027&k=rATJyxGK) (群号: 1003437555)

## 构建失败

请确保你使用的是最新版本主题，之后在禁用缓存的情况下重新运行开发服务器: `vuepress dev <你的文档地址> --no-cache`。

如果问题依然存在，请在 GitHub 上 [提一个 Issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues/new/choose)，并完整粘贴运行 `vuepress dev <你的文档地址> --debug` 时终端输出的内容，如果你的内容与页面显示相关，请一并附上相应的截图。

## `warning Overiding existing page xxx`

如果在开发过程启动时看到 `warning Overiding existing page xxx`，请检查文件结构。

你很有可能创建了两个具有相同路径的文件。

例如：`a/b.md` 和 `a/b/readme.md` 均会被生成为 `/a/b/`

这将导致其中一页内容丢失，也可能导致其他渲染问题。

## `xxx isn’t assign with a lang, and will return 'en-US' instead.`

如果在开发过程启动时看到 `xxx isn’t assign with a lang, and will return 'en-US' instead.`，请检查你是否为多语言配置的每个语言设置了语言项目。

如果你只有一个语言，请通过此方式设置语言

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  locales: {
    "/": {
      // 设置需要的语言
      lang: "zh-CN",
    },
  },
});
```

## 部分页面设置失效

你可以先重新查阅文档，看看该设置是否 **不支持页面配置**。

**支持页面配置** 意味着主题允许页面的配置能够覆盖全局的同名(同功能)配置，但并不是所有功能都满足此设置。为了项目的编译速度，有些项目在全局配置禁用后不会在编译阶段加载，它们就无法局部启用。

## 代码块在浅色模式 (日间模式) 下不正常

我猜这是你的问题，请你删除 `.vuepress/styles/palette.styl` 内的 `$codeBgColor`，主题的默认值是浅蓝色，而默认主题为墨蓝色。

## 访问部分链接 404

如果你使用了中文的分类或者标签，如:

```md
---
category: 软件
tags:
  - 谷歌浏览器
---
```

那么你直接访问 `/category/软件` 和 `/tag/谷歌浏览器/` 会被导航到 404 页面

这是 `vue-router` 在 `3.4.6` 引入的潜在破坏性更改。自 `3.4.6` 起，`vue-router` 要求所有非标准 URL 路径都必须先 `encodeURI` 再作为路径添加到 `router` 中。

主题使用 `@vuepress/plugin-blog` 进行博客支持，该问题应该在此插件中得到修正。Mr.Hope 已经提出了 [相关 Issue](https://github.com/vuepress/vuepress-plugin-blog/issues/95)，并提交了 [临时解决该问题的 PR](https://github.com/vuepress/vuepress-plugin-blog/pull/97)，但该 PR 并未被接受。

::: tip 临时解决方案

如果你在使用 yarn，你可以添加 `resolutions` 字段:

```json
{
  ...
  "resolutions": {
    "vue-router": "3.4.5"
  },
  ...
}
```

到你的 package.json 来临时解决这个问题。

:::

## TypeScript 错误

详见 [TypeScript 错误排查](typescript.md)
