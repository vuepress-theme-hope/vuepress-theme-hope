---
title: 指南
icon: lightbulb
---

`vuepress-plugin-search-pro` 是一个强大的客户端搜索插件，可以为你的站点添加自定义索引与全文搜索功能。

## 快速上手

### 索引范围

默认情况下，插件仅索引标题，文章摘要和你添加的自定义字段。如果你想要索引文章的全部内容，你可以通过设置 `indexContent: true` 来开启。

::: warning

当索引不基于单词的语言时，例如中文、日语或韩语，你需要设置 `indexOptions` 和 `indexLocaleOptions` 以执行正确的分词，详见[自定义索引生成](#自定义索引生成)。

:::

### 极致速度

通过 [`slimsearch`](https://mister-hope.github.io/slimsearch/)，`vuepress-plugin-search-pro` 的搜索速度极快，即使在大型站点上也是如此。

### 高亮与上下文

插件会高亮搜索结果中的关键词，并显示关键词周围的上下文。

### 自动搜索建议

插件会默认在搜索框输入时自动提示相关词作为搜索建议，如果你不需要这一行为，请设置 `autoSuggestions: false`。

### 查询和搜索的历史记录

插件将显示您最后输入的 5 个查询和您选择的最后 5 个搜索结果。此行为可以通过设置 `queryHistoryCount` 和 `resultHistoryCount` 选项来改变。你可以将它们设置为 `0` 来禁用它们。

### 完整键盘支持

插件支持键盘导航，你可以：

- 使用快捷键激活搜索框
- 使用 `↑` 和 `↓` 导航搜索结果和自动建议
- 使用 `Tab` 应用建议
- 使用 `Enter` 打开选中的结果
- 使用 `Esc` 关闭建议列表或搜索框

默认情况下，搜索快捷键为 `Ctrl + K` 和 `Ctrl + /`。你可以通过 `hotkeys` 选项来自定义搜索快捷键，参见 [配置 → 快捷键](./config.md#hotkeys)。

## 自定义索引

无论是主题开发者还是用户，在 Frontmatter 中或者通过 `extendsPage` 生命周期为页面添加额外数据是一个常见的操作。很多情况下，你可能希望把这些数据也编入索引，所以我们提供了 `customFields` 选项。

`customFields` 接受一个数组，其中每一项代表一项自定义搜索索引的配置项。每一个配置项包含两个部分:

- `getter`: 该自定义项目的获取器。此函数需要接受 `page` 对象作为参数，并以字符串 (单个)、字符串数组 (多个)、`null` (该项目缺失) 的形式返回该自定义项目的值。
- `formatter`: 一个字符串控制项目该如何在自定义搜索结果中显示，其中 `$content` 会替换成 `getter` 返回的项目值。如果你在使用多语言，你还可以将其设置为对象，以分别设置每一个语言的显示格式。

难以理解么？那我们来提供一个简单的例子。

::: info 在索引中添加作者

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

## 高级

### 自定义索引生成

如果你正在索引其他不使用“单词”的语言，如中文、日语或韩语，你应该设置 `indexOptions` 和 `indexLocaleOptions` 以执行正确的分词。

如果你正在构建中文文档，则可以使用 [nodejs-jieba](https://github.com/Mister-Hope/nodejs-jieba) 进行分词。 (日语和韩语没有内置词典，但你可以提供自己的词典，并使用 `nodejs-jieba` 拆分单词)。

如果你的文档只包含中文，你可以像这样对内容进行标记：

```ts
import { cut } from "nodejs-jieba";
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  lang: "zh-CN",

  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      indexOptions: {
        // 使用 nodejs-jieba 进行分词
        tokenize: (text, fieldName) =>
          fieldName === "id" ? [text] : cut(text, true),
      },
    }),
  ],
});
```

如果你需要在某些语言环境中进行分词，你可以设置 `indexLocaleOptions`:

```ts
import { cut } from "nodejs-jieba";
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
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
      indexContent: true,
      indexLocaleOptions: {
        "/zh/": {
          // 使用 nodejs-jieba 进行分词
          tokenize: (text, fieldName) =>
            fieldName === "id" ? [text] : cut(text, true),
        },
      },
    }),
  ],
});
```

::: tip

特别提示，我们没有办法在浏览器中使用分词功能，所以任何不基于单词的语言（如中文）的长文本搜索结果会明显表现不佳。

:::

### 自定义搜索选项

你可以通过在客户端配置文件中导入和调用 `defineSearchConfig` 来自定义搜索选项：

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineSearchConfig } from "vuepress-plugin-search-pro/client";

defineSearchConfig({
  // 此处放置搜索选项
});

export default defineClientConfig({
  // ...
});
```

::: note

由于搜索是在 Web Worker 中完成的，因此不支持设置选项为函数类型的值。

:::

### 通过 API 使用

如果你想要使用 API 来搜索，你可以从 `vuepress-plugin-search-pro/client` 中导入 `createSearchWorker` 来获取搜索结果:

```ts
import { createSearchWorker } from "vuepress-plugin-search-pro/client";

const { search, terminate } = createSearchWorker();

// 使用搜索 API
search("keyword").then((results) => {
  // 使用结果
});

// 当不需要时终止 Worker
terminate();
```

### 开发服务器中的限制

搜索服务由 Worker 提供支持，在开发模式下我们无法捆绑 Worker 文件。

为了在开发模式下加载搜索索引，我们使用了带有 `type: "module"` 的现代 Worker，但是目前 Safari 不支持此功能。 因此，如果你想尝试在 devServer 中搜索，你应该使用支持的浏览器，请参阅 [CanIUse](https://caniuse.com/mdn-api_worker_worker_options_type_parameter) 了解支持详情。

为了更好的性能，在开发模式下添加/编辑/删除 Markdown 内容不会触发搜索索引的更新。如果你正在校对或优化你的搜索结果，你可以通过设置 `hotReload: true` 选项来启用热重载，参见 [配置 → 热重载](./config.md#hotreload)。

### 与服务端搜索比较

客户端搜索有优点，比如没有后台服务，容易添加，但你应该知道它也有缺点。

::: warning 缺点

1. 你需要在构建阶段为你的网站建立索引，这会增长网站部署时间与网站的构建体积。
1. 用户在搜索前需要从你的服务器拉取整个索引，会为你的网站服务器带来额外的流量与带宽压力。这通常比在服务端搜索下执行一个网络请求获得结果要慢得多。
1. 为了进行一次搜索，用户必须等待搜索索引下载并在本地解析完毕。这会为用户消耗不必要的流量、同时增加客户端耗电。
1. 由于搜索是在用户设备上执行的，速度完全取决于设备性能。

:::

在大多数情况，如果你在构建一个大型站点，你应该选择服务提供商为你的站点提供搜索服务，例如 [Algolia](https://www.algolia.com/)，或者选择开源工具在自己的服务器上加载搜索服务并定期为自己的网站生成索引。对于大型站点这很必要因为用户通过网络请求向搜索 API 发送搜索字词，并直接得到搜索结果。

特别提示，[DocSearch](https://docsearch.algolia.com/) 是 Algolia 为开源项目提供的免费搜索服务。如果你在创建开源项目文档或开源技术博客，你可 [申请它](https://docsearch.algolia.com/apply/)，并使用 [`@vuepress/plugin-docsearch`](https://vuejs.press/zh/reference/plugin/docsearch.html) 插件提供搜索。
