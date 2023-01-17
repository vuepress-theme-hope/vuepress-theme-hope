---
title: 指南
icon: lightbulb
---

`vuepress-plugin-search-pro` 是一个强大的客户端搜索插件，可以为你的站点添加自定义索引与全文搜索功能。

::: danger 尽量不要使用客户端搜索

你应该在条件允许的情况下，使用服务提供商为你的站点提供搜索服务，例如 [Algolia](https://www.algolia.com/)，尤其是对于大型站点。这样做的好处是服务提供商为你的网站建立索引，用户搜索时通过搜素 API 得到结果。特别提示，[DocSearch](https://docsearch.algolia.com/) 是 Algolia 为开源项目提供的免费搜索服务，如果条件符合你应该尝试申请此服务，并使用 [`@vuepress/plugin-docsearch`](https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html) 插件提供搜索。

只有当你在**使用不按流量计费且流量充足的托管服务**、**不满足 DocSearch 申请条件**且**不愿意付费使用服务提供商**时，你才应该使用客户端搜索。

使用客户端搜素有以下缺点:

1. 你需要在构建阶段为你的网站建立索引，这会增长网站部署时间与网站的构建体积。
1. 用户在搜索前需要从你的服务器拉取整个索引，会为你的网站服务器带来额外的流量与带宽压力。
1. 用户必须等待搜索索引下载并在本地解析完毕才可以在本地遍历索引搜索，这会为用户消耗不必要的流量、同时让客户端增加不必要的计算量增加耗电。

:::

## 直接使用

对于小型站点来说，通常情况下你需要一个开箱即用的全文搜索，你可以直接通过 `{ indexContent: true }` 调用 `vuepress-plugin-search-pro` 插件。

## 自定义索引

无论是主题开发者还是用户，在 Frontmatter 中或者通过 `extendsPage` 生命周期为页面添加额外数据是一个常见的操作。很多情况下，你可能希望把这些数据也编入索引，所以我们提供了 `customFields` 选项。

`customFields` 接受一个数组，其中每一项代表一项自定义搜索索引的配置项。每一个配置项包含两个部分:

- `getter`: 该自定义项目的获取器。此函数需要接受 `page` 对象作为参数，并以字符串 (单个)、字符串数组 (多个)、`null` (该项目缺失) 的形式返回该自定义项目的值。
- `formatter`: 一个字符串控制项目该如何在自定义搜索结果中显示，其中 `$content` 会替换成 `getter` 返回的项目值。如果你在使用多语言，你还可以将其设置为对象，以分别设置每一个语言的显示格式。

难以理解么？那我们来提供一个简单的例子。

::: tip 在索引中添加作者

假定你在 Frontmatter 中通过 `author` 添加作者:

```md
---
author: Your name
---

Markdown content...
```

你可以通过如下配置将作者添加到索引中:

```ts
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  plugins: [
    searchProPlugin({
      customFields: [
        {
          name: "author",
          getter: (page) => page.frontmatter.author,
          formatter: "作者：$content",
        },
      ],
    }),
  ],
});
```

很简单不是么？

:::

::: details 一个更加复杂但实际的例子

假设你在使用 `@vuepress/plugin-git` 插件，并且你在 Frontmatter 中通过 `category` 和 `tag` 为文章添加分类和标签。

如果你还在 `/zh/` 和 `/` 下分别放置了中文和英文，你需要进行如下配置:

```ts
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  // 我们假定你在使用如下多语言
  locales: {
    "/": {
      lang: "en-US",
    },
    "/zh/": {
      lang: "zh-CN",
    },
  },

  plugins: [
    searchProPlugin({
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: {
            "/": "Category: $content",
            "/zh/": "分类：$content",
          },
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: {
            "/": "Tag: $content",
            "/zh/": "标签：$content",
          },
        },
        {
          name: "updateTime",
          getter: (page) => page.data.git?.updateTime.toLocaleString(),
          formatter: {
            "/": "Update time: $content",
            "/zh/": "更新时间：$content",
          },
        },
      ],
    }),
  ],
});
```

:::

## 搜索快捷键

默认情况下，搜索快捷键为 `Ctrl + K`。你可以通过 `hotkeys` 选项来自定义搜索快捷键，参见 [配置 → 快捷键](./config.md#hotkeys)。

## 热更新

如果你正在校对或完善你的搜索结果，你可以通过设置 `hotReload: true` 选项来开启热更新，参见 [配置 → 热更新](./config.md#hotreload)。

## 多语言配置

你可以通过 `locales` 来新增特定语言的多语言配置或修改已支持语言的配置。

```ts
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  locales: {
    "/": {
      // 这是一个支持的语言
      lang: "zh-CN",
    },
    "/xx/": {
      // 这是一个没有收到插件支持的语言
      lang: "mm-NN",
    },
  },

  plugins: [
    searchProPlugin({
      locales: {
        "/": {
          // 覆盖 placeholder
          placeholder: "开始搜索",
        },

        "/xx/": {
          // 在这里完整设置 `mm-NN` 的多语言配置
        },
      },
    }),
  ],
});
```

具体的选项详见 [配置 → 多语言配置](./config.md#locales)。
