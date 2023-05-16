---
title: 指南
icon: lightbulb
---

`vuepress-plugin-search-pro` 是一个强大的客户端搜索插件，可以为你的站点添加自定义索引与全文搜索功能。

::: warning 避免使用客户端搜索

尽管客户端搜索无需后端，易于在文档和博客中添加，但是对于大型站点来说，它会带来较为致命的缺点。使用客户端搜索意味着:

1. 你需要在构建阶段为你的网站建立索引，这会增长网站部署时间与网站的构建体积。
1. 用户在搜索前需要从你的服务器拉取整个索引，会为你的网站服务器带来额外的流量与带宽压力。
1. 用户必须等待搜索索引下载并在本地解析完毕才可以在本地遍历索引搜索，这会为用户消耗不必要的流量、同时让客户端增加不必要的计算量增加耗电。

所以你应该在条件允许的情况下，尽可能选择服务提供商为你的站点提供搜索服务，例如 [Algolia](https://www.algolia.com/)，或者选择开源工具在自己的服务器上加载搜索服务并定期为自己的网站生成索引。对于大型站点这很必要因为用户通过网络请求向搜索 API 发送搜索字词，并直接得到搜索结果。

特别提示，[DocSearch](https://docsearch.algolia.com/) 是 Algolia 为开源项目提供的免费搜索服务。如果你在创建开源项目文档或开源技术博客，你可 [申请它](https://docsearch.algolia.com/apply/)，并使用 [`@vuepress/plugin-docsearch`](https://vuejs.press/zh/reference/plugin/docsearch.html) 插件提供搜索。

只有当你在**不满足 DocSearch 申请条件**且**不愿意付费使用服务提供商**、**不具备自行构建搜索服务条件**时，你才应该使用客户端搜索。

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

默认情况下，搜索快捷键为 `Ctrl + K` 和 `Ctrl + /`。你可以通过 `hotkeys` 选项来自定义搜索快捷键，参见 [配置 → 快捷键](./config.md#hotkeys)。

## 开发服务器中的限制

搜索服务由 Worker 提供支持，在开发模式下我们无法捆绑 Worker 文件。

为了在开发模式下加载搜索索引，我们使用了带有 `type: "module"` 的现代 Worker，但是目前只有 Chrome 支持此功能，Firefox 和 Safari 不支持。 因此，如果你想尝试在 devServer 中搜索，你应该使用 Chrome，请参阅 [CanIUse](https://caniuse.com/mdn-api_worker_worker_options_type_parameter) 了解支持详情。

为了更好的性能，在开发模式下添加/编辑/删除 Markdown 内容不会触发搜索索引的更新。如果你正在校对或优化你的搜索结果，你可以通过设置 `hotReload: true` 选项来启用热重载，参见 [配置 → 热重载](./config.md#hotreload)。

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
