---
icon: nav
category: layout
tags:
  - navbar
  - layout
---

# 导航栏

导航栏可能包含你的站点名称、[搜索框](#搜索框)、 [导航栏链接](#导航栏链接)、[多语言切换](https://v1.vuepress.vuejs.org/zh/guide/i18n.md)、[仓库链接](#git-仓库和编辑链接)，它们均取决于你的配置。

## 导航栏链接

你可以通过 `themeConfig.nav` 增加一些导航栏链接。

基础的配置项有 `text` 导航栏文字，`link` 导航栏链接， `icon` 导航栏图标:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: "主页", link: "/", icon: "home" },
      { text: "VuePress介绍", link: "/vuepress/", icon: "info" },
      { text: "Markdown介绍", link: "/markdown/", icon: "markdown" },
    ],
  },
};
```

当你提供了一个 `items` 数组而不是一个单一的 `link` 时，它将显示为下拉列表 :

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: "Languages",
        ariaLabel: "Language Menu",
        items: [
          { text: "Chinese", link: "/language/chinese/" },
          { text: "Japanese", link: "/language/japanese/" },
        ],
      },
    ],
  },
};
```

此外，你还可以通过嵌套的 `items` 来在下拉列表中设置分组:

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: "Languages",
        items: [
          {
            text: "Group1",
            items: [
              /*  */
            ],
          },
          {
            text: "Group2",
            items: [
              /*  */
            ],
          },
        ],
      },
    ],
  },
};
```

在导航栏分组中，你可以添加 `prefix` 字段为每一个子菜单链接添加一个前缀:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: "基础",
        icon: "info",
        prefix: "/basic/",
        items: [
          { text: "Markdown", link: "markdown", icon: "markdown" },
          { text: "VuePress", link: "vuepress/", icon: "vue" },
        ],
      },
    ],
  },
};
```

### 禁用导航栏

你可以使用 `themeConfig.navbar` 来禁用所有页面的导航栏:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    navbar: false,
  },
};
```

你也可以通过 `YAML front matter` 来禁用某个指定页面的导航栏:

```yaml
---
navbar: false
---

```

### 导航栏图标

你可以使用 `themeConfig.logo` 来配置导航栏的图标，请填入绝对路径。

当配置图标之后，在移动视图上，图标将取代先前的站点名称显示在导航栏上。

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    logo: "/logo.png",
  },
};
```

## 搜索框

### 内置搜索

你可以通过设置 `themeConfig.search: false` 来禁用默认的搜索框，或是通过 `themeConfig.searchMaxSuggestions` 来调整默认搜索框显示的搜索结果数量:

```js
module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10,
  },
};
```

你可以通过 `YAML front matter` 来对单独的页面禁用内置的搜索框:

```yaml
---
search: false
---

```

::: tip
内置搜索只会为页面的标题、`h2` 和 `h3` 构建搜索索引，如果你需要全文搜索，你可以使用 [Algolia 搜索](#Algolia-搜索)。
:::

### Algolia 搜索

你可以通过 `themeConfig.algolia` 选项来用 [Algolia 搜索](https://community.algolia.com/docsearch/) 替换内置的搜索框。要启用 Algolia 搜索，你需要至少提供 `apiKey` 和 `indexName`:

```js
module.exports = {
  themeConfig: {
    algolia: {
      apiKey: "<API_KEY>",
      indexName: "<INDEX_NAME>",
    },
  },
};
```

::: warning 注意
不同于开箱即用的 [内置搜索](#内置搜索)，[Algolia 搜索](https://community.algolia.com/docsearch/) 需要你在使用之前将你的网站提交给它们用于创建索引。
:::

更多选项请参考 [Algolia DocSearch 的文档](https://github.com/algolia/docsearch#docsearch-options)。

### 搜索占位符

你可以通过添加 `searchPlaceholder` 属性为搜索框定义一个占位符:

```js
module.exports = {
  themeConfig: {
    searchPlaceholder: "Search...",
  },
};
```

## Git 仓库和编辑链接

当你提供了 `themeConfig.repo` 选项，将会自动在每个页面的导航栏生成生成一个 GitHub 链接，以及在页面的底部生成一个 `"Edit this page"` 链接。

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: "vuejs/vuepress",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "查看源码",
    // 是否在导航栏右侧显示仓库链接，默认为 `true`
    repoDisplay: true,

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库:
    docsRepo: "vuejs/vuepress",
    // 假如文档不是放在仓库的根目录下:
    docsDir: "docs",
    // 假如文档放在一个特定的分支下:
    docsBranch: "master",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "帮助我们改善此页面！",
  },
};
```

你可以通过 `YAML front matter` 来禁用指定页面的编辑链接:

```yaml
---
editLink: false
---

```

## 主题色切换按钮

具体详情请见 [主题色](../feature/theme.md#主题色) 章节。

## 深色模式切换按钮

具体详情请见 [深色模式](../feature/theme.md#深色模式) 章节。

## 全屏按钮

具体详情请见 [全屏按钮](../feature/theme.md#全屏按钮) 章节。

## 案例

```js {4-18}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      // 可在每一项中添加 icon 字段来显示图标
      { text: "主页", link: "/zh/", icon: "home" },
      { text: "指南", link: "/zh/guide/", icon: "creative" },
      { text: "配置", link: "/zh/config/", icon: "code" },
      {
        text: "基础",
        icon: "info",
        prefix: "/zh/basic/",
        items: [
          { text: "Markdown", link: "markdown", icon: "markdown" },
          { text: "VuePress", link: "vuepress/", icon: "vue" },
        ],
      },
    ],
  },
};
```
