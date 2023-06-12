---
title: 搜索
icon: search
category:
  - 功能
tag:
  - 功能
  - 搜索
---

主题对 <ProjectLink name="search-pro" path="/zh/">`vuepress-plugin-search-pro`</ProjectLink>、 [`@vuepress/plugin-docsearch`][docsearch] 和 [`@vuepress/plugin-search`][search] 提供了内置支持。你只需要添加并配置所需的搜索插件，就能够在导航栏获得一个搜索框。

如果你需要搜索插件，请通过 [**VuePress 配置文件**](../../cookbook/vuepress/config.md) 的 `plugins` 选项应用它。

::: warning

主题只是添加了上述搜索插件的支持，而并没有捆绑它们，你需要自己安装和调用。

:::

::: danger

**请勿**在主题选项中使用 `plugins.search`。

由于主题只能调用它捆绑的插件，因此主题选项中的 `plugins` 字段仅接受**特定**插件名称。

:::

<!-- more -->

## 使用 `vuepress-plugin-search-pro`

1. 安装 `vuepress-plugin-search-pro`

   ::: code-tabs#shell

   @tab pnpm

   ```bash
   pnpm add -D vuepress-plugin-search-pro
   ```

   @tab yarn

   ```bash
   yarn add -D vuepress-plugin-search-pro
   ```

   @tab npm

   ```bash
   npm i -D vuepress-plugin-search-pro
   ```

   :::

1. 从 `vuepress-plugin-search-pro` 导入 `searchProPlugin` 并将其应用至 `config.{ts,js}` 下的 `plugins` 选项.

   ::: code-tabs#language

   @tab TS

   ```ts
   // .vuepress/config.ts
   import { defineUserConfig } from "vuepress";
   import { searchProPlugin } from "vuepress-plugin-search-pro";

   export default defineUserConfig({
     plugins: [
       searchProPlugin({
         // 索引全部内容
         indexContent: true,
         // 为分类和标签添加索引
         customFields: [
           {
             getter: (page) => page.frontmatter.category,
             formatter: "分类：$content",
           },
           {
             getter: (page) => page.frontmatter.tag,
             formatter: "标签：$content",
           },
         ],
       }),
     ],
   });
   ```

   @tab JS

   ```js
   // .vuepress/config.js
   import { searchProPlugin } from "vuepress-plugin-search-pro";

   export default {
     plugins: [
       searchProPlugin({
         // 索引全部内容
         indexContent: true,
         // 为分类和标签添加索引
         customFields: [
           {
             getter: (page) => page.frontmatter.category,
             formatter: "分类：$content",
           },
           {
             getter: (page) => page.frontmatter.tag,
             formatter: "标签：$content",
           },
         ],
       }),
     ],
   };
   ```

   :::

::: info 更多

关于搜索插件的可用选项，详见 <ProjectLink name="search-pro" path="/zh/">插件文档</ProjectLink>。

:::

## 使用 `@vuepress/plugin-docsearch`

1. 你需要 [提交你的网站 URL](https://docsearch.algolia.com/apply/) 来加入 DocSearch 项目。

   当你的索引成功创建后， DocSearch 团队会将 apiKey 和 indexName 发送到你的邮箱。接下来，你就可以配置该插件，在 VuePress 中启用 DocSearch 了。

   或者，你也可以 [运行你自己的爬虫](https://docsearch.algolia.com/docs/run-your-own/) 来创建索引，然后使用你自己的 appId, apiKey 和 indexName 来配置该插件。

1. 为了正常的使用插件，你需要按照下列要求正确设置 Algolia Crawler。
   前往 [Algolia Crawler](https://crawler.algolia.com/admin/crawlers/) 来更新你的爬虫配置。

   ::: details 配置爬虫

   以下是配置选项和说明:

   ```js {36-50,58}
   new Crawler({
     appId: "YOUR_APP_ID",
     apiKey: "YOUR_API_KEY",
     rateLimit: 8,
     startUrls: [
       // 这是 Algolia 开始抓取网站的初始地址
       // 如果你的网站被分为数个独立部分，你可能需要在此设置多个入口链接
       "https://YOUR_WEBSITE_URL/",
     ],
     sitemaps: [
       // 如果你在使用 Sitemap 插件 (如: vuepress-plugin-sitemap2)，你可以提供 Sitemap 链接
       "https://YOUR_WEBSITE_URL/sitemap.xml",
     ],
     ignoreCanonicalTo: false,
     exclusionPatterns: [
       // 你可以通过它阻止 Algolia 抓取某些 URL
     ],
     discoveryPatterns: [
       // 这是 Algolia 抓取 URL 的范围
       "https://YOUR_WEBSITE_URL/**",
     ],
     // 爬虫执行的计划时间，可根据文档更新频率设置
     schedule: "at 02:00 every 1 day",
     actions: [
       // 你可以拥有多个 action，特别是你在一个域名下部署多个文档时
       {
         // 使用适当的名称为索引命名
         indexName: "YOUR_INDEX_NAME",
         // 索引生效的路径
         pathsToMatch: ["https://YOUR_WEBSITE_URL/**"],
         // 控制 Algolia 如何抓取你的站点
         recordExtractor: ({ $, helpers }) => {
           // 以下是适用于 vuepress-theme-hope 的默认选项选项
           // vuepress-theme-hope 默认的容器类名为 theme-hope-content
           return helpers.docsearch({
             recordProps: {
               lvl0: {
                 selectors: ".sidebar-heading.active",
                 defaultValue: "Documentation",
               },
               lvl1: ".theme-hope-content h1",
               lvl2: ".theme-hope-content h2",
               lvl3: ".theme-hope-content h3",
               lvl4: ".theme-hope-content h4",
               lvl5: ".theme-hope-content h5",
               lvl6: ".theme-hope-content h6",
               content: ".theme-hope-content p, .theme-hope-content li",
             },
             indexHeadings: true,
           });
         },
       },
     ],
     initialIndexSettings: {
       // 控制索引如何被初始化，这仅当索引尚未生成时有效
       // 你可能需要在修改后手动删除并重新生成新的索引
       YOUR_INDEX_NAME: {
         attributesForFaceting: ["type", "lang"],
         attributesToRetrieve: ["hierarchy", "content", "anchor", "url"],
         attributesToHighlight: ["hierarchy", "hierarchy_camel", "content"],
         attributesToSnippet: ["content:10"],
         camelCaseAttributes: ["hierarchy", "hierarchy_radio", "content"],
         searchableAttributes: [
           "unordered(hierarchy_radio_camel.lvl0)",
           "unordered(hierarchy_radio.lvl0)",
           "unordered(hierarchy_radio_camel.lvl1)",
           "unordered(hierarchy_radio.lvl1)",
           "unordered(hierarchy_radio_camel.lvl2)",
           "unordered(hierarchy_radio.lvl2)",
           "unordered(hierarchy_radio_camel.lvl3)",
           "unordered(hierarchy_radio.lvl3)",
           "unordered(hierarchy_radio_camel.lvl4)",
           "unordered(hierarchy_radio.lvl4)",
           "unordered(hierarchy_radio_camel.lvl5)",
           "unordered(hierarchy_radio.lvl5)",
           "unordered(hierarchy_radio_camel.lvl6)",
           "unordered(hierarchy_radio.lvl6)",
           "unordered(hierarchy_camel.lvl0)",
           "unordered(hierarchy.lvl0)",
           "unordered(hierarchy_camel.lvl1)",
           "unordered(hierarchy.lvl1)",
           "unordered(hierarchy_camel.lvl2)",
           "unordered(hierarchy.lvl2)",
           "unordered(hierarchy_camel.lvl3)",
           "unordered(hierarchy.lvl3)",
           "unordered(hierarchy_camel.lvl4)",
           "unordered(hierarchy.lvl4)",
           "unordered(hierarchy_camel.lvl5)",
           "unordered(hierarchy.lvl5)",
           "unordered(hierarchy_camel.lvl6)",
           "unordered(hierarchy.lvl6)",
           "content",
         ],
         distinct: true,
         attributeForDistinct: "url",
         customRanking: [
           "desc(weight.pageRank)",
           "desc(weight.level)",
           "asc(weight.position)",
         ],
         ranking: [
           "words",
           "filters",
           "typo",
           "attribute",
           "proximity",
           "exact",
           "custom",
         ],
         highlightPreTag:
           '<span class="algolia-docsearch-suggestion--highlight">',
         highlightPostTag: "</span>",
         minWordSizefor1Typo: 3,
         minWordSizefor2Typos: 7,
         allowTyposOnNumericTokens: false,
         minProximity: 1,
         ignorePlurals: true,
         advancedSyntax: true,
         attributeCriteriaComputedByMinProximity: true,
         removeWordsIfNoResults: "allOptional",
       },
     },
   });
   ```

   :::

   ::: warning

   Crawler 配置中 `initialIndexSettings.YOUR_INDEX_NAME.attributesForFaceting` 字段**必须**包含 `"lang"`，否则该插件将无法正常工作。

   :::

1. 安装 `@vuepress/plugin-docsearch`

   ::: code-tabs#shell

   @tab pnpm

   ```bash
   pnpm add -D @vuepress/plugin-docsearch@next
   ```

   @tab yarn

   ```bash
   yarn add -D @vuepress/plugin-docsearch@next
   ```

   @tab npm

   ```bash
   npm i -D @vuepress/plugin-docsearch@next
   ```

   :::

1. 从 `@vuepress/plugin-docsearch` 导入 `docsearchPlugin`，并在 `config.{ts,js}` 中的 `plugins` 应用。

   ::: code-tabs#language

   @tab TS

   ```ts
   // .vuepress/config.ts
   import { docsearchPlugin } from "@vuepress/plugin-docsearch";
   import { defineUserConfig } from "vuepress";

   export default defineUserConfig({
     plugins: [
       docsearchPlugin({
         // 你的选项
         // appId, apiKey 和 indexName 是必填的
       }),
     ],
   });
   ```

   @tab JS

   ```js
   // .vuepress/config.js
   import { docsearchPlugin } from "@vuepress/plugin-docsearch";

   export default {
     plugins: [
       docsearchPlugin({
         // 你的选项
         // appId, apiKey 和 indexName 是必填的
       }),
     ],
   };
   ```

   :::

::: info 更多

关于 DocSearch 搜索插件的可用选项，详见 [插件文档][docsearch]。

:::

### `@vuepress/plugin-docsearch` 本地化翻译

你可以通过插件选项中的 `locales` 配置多语言。

:::: details 中文多语言配置示例

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";

export default defineUserConfig({
  plugins: [
    docsearchPlugin({
      // ...

      locales: {
        "/zh/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
      },
    }),
  ],
});
```

@tab JS

```js
// .vuepress/config.js
import { docsearchPlugin } from "@vuepress/plugin-docsearch";

export default {
  plugins: [
    docsearchPlugin({
      // ...

      locales: {
        "/zh/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                openIssueText: "你认为该查询应该有结果？",
                openIssueLinkText: "点击反馈",
              },
            },
          },
        },
      },
    }),
  ],
};
```

:::

::::

## 使用 `@vuepress/plugin-search`

1. 安装 `@vuepress/plugin-search`

   ::: code-tabs#shell

   @tab pnpm

   ```bash
   pnpm add -D @vuepress/plugin-search@next
   ```

   @tab yarn

   ```bash
   yarn add -D @vuepress/plugin-search@next
   ```

   @tab npm

   ```bash
   npm i -D @vuepress/plugin-search@next
   ```

   :::

1. 从 `@vuepress/plugin-search` 导入 `searchPlugin` 并将其应用至 `config.{ts,js}` 下的 `plugins` 选项.

   ::: code-tabs#language

   @tab TS

   ```ts
   // .vuepress/config.ts
   import { searchPlugin } from "@vuepress/plugin-search";
   import { defineUserConfig } from "vuepress";

   export default defineUserConfig({
     plugins: [
       searchPlugin({
         // 你的选项
       }),
     ],
   });
   ```

   @tab JS

   ```js
   // .vuepress/config.js
   import { searchPlugin } from "@vuepress/plugin-search";

   export default {
     plugins: [
       searchPlugin({
         // 你的选项
       }),
     ],
   };
   ```

   :::

::: info 更多

关于搜索插件的可用选项，详见 [插件文档][search]。

:::

### `@vuepress/plugin-search` 本地化翻译

如果你正在提供中文文档，你可以将其设置到插件选项中的 `locales` 中。

:::: details 中文多语言配置

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  plugins: [
    searchPlugin({
      // ...

      locales: {
        "/zh/": {
          placeholder: "搜索",
        },
      },
    }),
  ],
});
```

@tab JS

```js
// .vuepress/config.js
import { searchPlugin } from "@vuepress/plugin-search";

export default {
  plugins: [
    searchPlugin({
      // ...

      locales: {
        "/zh/": {
          placeholder: "搜索",
        },
      },
    }),
  ],
};
```

:::

::::

[docsearch]: https://vuejs.press/zh/reference/plugin/docsearch.html
[search]: https://vuejs.press/zh/reference/plugin/search.html
