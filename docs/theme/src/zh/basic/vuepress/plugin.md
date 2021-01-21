---
title: 插件
icon: plugin
category: basic
tags:
  - vuepress
---

## 介绍

插件通常会为 VuePress 添加全局功能。

整个插件系统的架构如下:

![插件系统架构](./assets/architecture.png)

## 使用插件

你可以通过在 `.vuepress/config.js` 中做一些配置来使用插件:

```js
module.exports = {
  plugins: [require("./my-plugin.js")],
};
```

### 使用来自依赖的插件

一个插件可以在以 `vuepress-plugin-xxx` 的形式发布到 npm，你可以这样使用它:

```js
module.exports = {
  plugins: ["vuepress-plugin-xx"],
};
```

同时，如果你的插件名以 `vuepress-plugin-` 开头，你可以使用缩写来省略这个前缀:

```js
module.exports = {
  plugins: ["xxx"],
};
```

和下面等价:

```js
module.exports = {
  plugins: ["vuepress-plugin-xxx"],
};
```

这也适用于 [Scoped Packages](https://docs.npmjs.com/misc/scope):

```js
module.exports = {
  plugins: ["@org/vuepress-plugin-xxx", "@vuepress/plugin-xxx"],
};
```

等价于:

```js
module.exports = {
  plugins: ["@org/xxx", "@vuepress/xxx"],
};
```

::: warning 注意

以 `@vuepress/plugin-` 开头的插件是官方维护的插件。

:::

## 插件的配置

通过`config.js`的`plugin`字段配置。

### Babel 式

插件可以通过在配置内的数组中封装名称和选项对象来指定选项:

```js
module.exports = {
  plugins: [
    [
      "vuepress-plugin-xxx",
      {
        /* options */
      },
    ],
  ],
};
```

由于这种风格和 [babeld Plugin/Preset Options](https://babeljs.io/docs/en/plugins#plugin-preset-options) 一致，我们称之为"Babel 风格"。

### 对象式

VuePress 也提供了一种更简单的方式来使用来自依赖的插件:

```js
module.exports = {
  plugins: {
    xxx: {
      /* options */
    },
  },
};
```

::: warning

由于某些插件可能存在多个实例，强烈推荐使用**babel 风格**写法。

:::

::: tip

可以通过显示地将选项设置成 `false` 来禁用一个插件:

- Babel 风格

```js
module.exports = {
  plugins: [
    ["xxx", false], // disabled.
  ],
};
```

- 对象风格

```js
module.exports = {
  plugins: {
    xxx: false, // disabled.
  },
};
```

:::

## 官方插件

- [active-header-links](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-active-header-links.html): 页面滚动时自动激活侧边栏链接
- [back-to-top](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-back-to-top.html): 添加返回顶部按钮
- [google-analytics](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-google-analytics.html): 添加 Google analytics
- [last-updated](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-last-updated.html): 更新时间
- [medium-zoom](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html): 图片缩放
- [nprogress](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-nprogress.html): 进度条
- [PWA](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html): 支持 Progressive Web App
- [register-component](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-register-components.html): 注册 components
- [search](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-search.html): 基于标题的搜索插件

::: tip

具体用法详见: [VuePress 插件](https://v1.vuepress.vuejs.org/zh/plugin/)

:::

## 社区插件

- [clean-urls](https://vuepress.github.io/zh/plugins/clean-urls.html): 在 VuePress 中使用简洁链接
- [container](https://vuepress.github.io/zh/plugins/container.html): 在 VuePress 中使用 Markdown 容器
- [copyright](https://vuepress.github.io/zh/plugins/copyright.html): 在 VuePress 中处理复制行为
- [dehydrate](https://vuepress.github.io/zh/plugins/dehydrate.html): 修改 VuePress 生成的 HTML 文件
- [git-log](https://vuepress.github.io/zh/plugins/git-log.html): 在 VuePress 中整合 git 日志
- [mathjax](https://vuepress.github.io/zh/plugins/mathjax.html): 在 VuePress 中使用 TeX 语法
- [migrate](https://vuepress.github.io/zh/plugins/migrate.html): 从其他网站迁移到 VuePress
- [named-chunks](https://vuepress.github.io/zh/plugins/named-chunks.html): 在 VuePress 中使用命名模块
- [redirect](https://vuepress.github.io/zh/plugins/redirect.html): 在 VuePress 中处理重定向
- [serve](https://vuepress.github.io/zh/plugins/serve.html): 在本地构建静态 VuePress 服务器
- [zooming](https://vuepress.github.io/zh/plugins/zooming.html): 使 VuePress 中的图片支持缩放(使用 zooming)

::: tip

文档详见: [VuePress 社区](https://vuepress.github.io/zh/)

:::
