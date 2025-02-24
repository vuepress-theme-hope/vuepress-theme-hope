---
title: 搜索
icon: search
category:
  - 功能
tag:
  - 功能
  - 搜索
---

主题对 [`@vuepress/plugin-docsearch`][docsearch] 、[@vuepress/plugin-slimsearch][slimsearch] 和 [`@vuepress/plugin-search`][search] 提供了内置支持。你只需要安装并配置所需的搜索插件，就能够在导航栏获得一个搜索框。

<!-- more -->

## 使用 `@vuepress/plugin-docsearch`

1. 你需要 [提交你的网站 URL](https://docsearch.algolia.com/apply/) 来加入 DocSearch 项目。

   当你的索引成功创建后， DocSearch 团队会将 apiKey 和 indexName 发送到你的邮箱。接下来，你就可以配置此插件，在 VuePress 中启用 DocSearch 了。

   或者，你也可以 [运行你自己的爬虫](https://docsearch.algolia.com/docs/run-your-own/) 来创建索引，然后使用你自己的 appId, apiKey 和 indexName 来配置此插件。

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
       // 如果你在使用 Sitemap 插件 (如: @vuepress/plugin-sitemap)，你可以提供 Sitemap 链接
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
           return helpers.docsearch({
             recordProps: {
               lvl0: {
                 selectors: [".vp-sidebar-link.active", "[vp-content] h1"],
                 defaultValue: "Documentation",
               },
               lvl1: "[vp-content] h1",
               lvl2: "[vp-content] h2",
               lvl3: "[vp-content] h3",
               lvl4: "[vp-content] h4",
               lvl5: "[vp-content] h5",
               lvl6: "[vp-content] h6",
               content: "[vp-content] p, [vp-content] li",
             },
             recordVersion: "v3",
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

   Crawler 配置中 `initialIndexSettings.YOUR_INDEX_NAME.attributesForFaceting` 字段**必须**包含 `"lang"`，否则此插件将无法正常工作。

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

1. 通过 `plugins.docsearch` 选项配置插件

   ```ts twoslash {7-10} title=".vuepress/config.ts"
   import { hopeTheme } from "vuepress-theme-hope";

   export default {
     theme: hopeTheme({
       plugins: {
         docsearch: {
           // 你的选项
           // appId, apiKey 和 indexName 是必填的
         },
       },
     }),
   };
   ```

::: info 更多

关于 DocSearch 搜索插件的可用选项，详见 [插件文档][docsearch]。

:::

## 使用 `@vuepress/plugin-slimsearch`

1. 安装 `@vuepress/plugin-slimsearch`

   ::: code-tabs#shell

   @tab pnpm

   ```bash
   pnpm add -D @vuepress/plugin-slimsearch@next
   ```

   @tab yarn

   ```bash
   yarn add -D @vuepress/plugin-slimsearch@next
   ```

   @tab npm

   ```bash
   npm i -D @vuepress/plugin-slimsearch@next
   ```

   :::

1. 在主题选项中配置 `plugins.slimsearch`。

   你可以将 `plugins.slimsearch` 设置为 `true` 来直接启用它，或者将其设置为一个对象来自定义插件。

   ```ts twoslash title=".vuepress/config.ts"
   import { hopeTheme } from "vuepress-theme-hope";

   export default {
     theme: hopeTheme({
       plugins: {
         // 插件选项
         slimsearch: {
           // ...
         },
         // 或 slimsearch: true,
       },
     }),
   };
   ```

::: info 更多

关于搜索插件的可用选项，详见 [插件文档][slimsearch]。

:::

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

1. Customize `plugins.search` in theme options.

1. 在主题选项中配置 `plugins.search`。

   ```ts twoslash title=".vuepress/config.ts"
   import { hopeTheme } from "vuepress-theme-hope";

   export default {
     theme: hopeTheme({
       plugins: {
         // 插件选项
         search: {
           // ...
         },
         // 或 search: true,
       },
     }),
   };
   ```

::: info 更多

关于搜索插件的可用选项，详见 [插件文档][search]。

:::

[docsearch]: https://ecosystem.vuejs.press/zh/plugins/search/docsearch.html
[search]: https://ecosystem.vuejs.press/zh/plugins/search/search.html
[slimsearch]: https://ecosystem.vuejs.press/zh/plugins/search/slimsearch.html
