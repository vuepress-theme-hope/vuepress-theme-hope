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

   ```ts twoslash {5-8} title=".vuepress/theme.ts"
   import { hopeTheme } from "vuepress-theme-hope";

   export default hopeTheme({
     plugins: {
       docsearch: {
         // 你的选项
         // appId, apiKey 和 indexName 是必填的
       },
     },
   });
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

   ```ts twoslash {5-8} title=".vuepress/theme.ts"
   import { hopeTheme } from "vuepress-theme-hope";

   export default hopeTheme({
     plugins: {
       slimsearch: {
         // 插件选项
       },
       // 或 slimsearch: true,
     },
   });
   ```

::: info 更多

关于搜索插件的可用选项，详见 [插件文档][slimsearch]。

:::

## 使用 `@vuepress/plugin-meilisearch`

::: tip

这需要你拥有一个自己的服务器来运行 MeiliSearch。

:::

1. 首先拉取最新的 MeiliSearch Docker 镜像：

   ```sh
   docker pull getmeili/meilisearch:latest
   ```

1. 启动容器：

   ```sh :no-line-numbers
   docker run -it --rm \
     # 将容器名称设置为 "MeiliSearch"
     --name MeiliSearch \
     # 设置你自己的主密钥
     # 替换 <YOUR_MASTER_KEY> 为你自己的主密钥
     -e MEILI_MASTER_KEY='<YOUR_MASTER_KEY>' \
     # 切换到生产模式
     -e MEILI_ENV=production \
     # 禁用 MeiliSearch 分析
     -e MEILI_NO_ANALYTICS=1 \
     # 将 7700 端口映射到主机
     -p 7700:7700 \
     # 挂载索引数据库到主机
     # 你可以将路径更改为任何位置
     -v $(pwd)/meili_data:/meili_data \
     getmeili/meilisearch:latest
   ```

   此处 `<YOUR_MASTER_KEY>` 是你需要自行设置的 MeiliSearch 主密钥（需 >= 16 字节），用于访问 MeiliSearch API。

   ::: important 不要暴露主密钥

   搜索密钥可以生成供公共访问，仅允许执行搜索操作。

   你的主密钥应仅用于内部服务器访问（包括抓取），因为它授予完整的操作权限。不要混用它们，并且 **绝不要暴露此密钥**！

   :::

1. 拉取最新的 MeiliSearch 抓取器镜像：

   ```sh
   docker pull getmeili/docs-scraper:latest
   ```

1. 在你的服务器上为抓取器创建一个 `scraper.json` file：

   ```json :collapsed-lines=10
   {
     "index_uid": "<YOUR_INDEX_NAME>",
     "start_urls": ["https://<YOUR_WEBSITE_URL>/"],
     "sitemap_urls": ["https://<YOUR_WEBSITE_URL>/sitemap.xml"],
     "selectors": {
       "lvl0": {
         "selector": ".vp-sidebar-heading.active",
         "global": true,
         "default_value": "Documentation"
       },
       "lvl1": "[vp-content] h1",
       "lvl2": "[vp-content] h2",
       "lvl3": "[vp-content] h3",
       "lvl4": "[vp-content] h4",
       "lvl5": "[vp-content] h5",
       "lvl6": "[vp-content] h6",
       "content": "[vp-content] p, [vp-content] li",
       "lang": {
         "selector": "/html/@lang",
         "global": true,
         "type": "xpath"
       }
     },
     "custom_settings": {
       "searchableAttributes": [
         "hierarchy_radio_lvl0",
         "hierarchy_radio_lvl1",
         "hierarchy_radio_lvl2",
         "hierarchy_radio_lvl3",
         "hierarchy_radio_lvl4",
         "hierarchy_radio_lvl5",
         "hierarchy_lvl0",
         "hierarchy_lvl1",
         "hierarchy_lvl2",
         "hierarchy_lvl3",
         "hierarchy_lvl4",
         "hierarchy_lvl5",
         "hierarchy_lvl6",
         "content",
         "lang",
         "objectID",
         "page_rank",
         "level",
         "position"
       ],
       "displayedAttributes": [
         "hierarchy_radio_lvl0",
         "hierarchy_radio_lvl1",
         "hierarchy_radio_lvl2",
         "hierarchy_radio_lvl3",
         "hierarchy_radio_lvl4",
         "hierarchy_radio_lvl5",
         "hierarchy_lvl0",
         "hierarchy_lvl1",
         "hierarchy_lvl2",
         "hierarchy_lvl3",
         "hierarchy_lvl4",
         "hierarchy_lvl5",
         "hierarchy_lvl6",
         "anchor",
         "url",
         "lang",
         "content",
         "objectID"
       ],
       "filterableAttributes": ["lang"]
     }
   }
   ```

   - `index_uid` 应为你的索引分配一个唯一名称，用于搜索。
   - `start_urls` 和 `sitemap_urls`（可选）应根据要抓取的网站进行自定义。
   - `selectors` 字段可以根据第三方主题 DOM 结构进行自定义。
   - 你可以根据需要向 `custom_settings` 中添加新字段。

   ::: important 配置文件要求

   为了让插件正常工作：

   - `lang` 选择器必须在 `selectors` 字段中保持不变
   - `custom_settings` 中的所有当前字段不得删除。

   :::

1. 确保 MeiliSearch 正在运行，然后通过运行以下 Docker 命令来抓取文档：

   ```sh
   docker run -t --rm \
     --network=host \
     -e MEILISEARCH_HOST_URL='<MEILISEARCH_HOST_URL>' \
     -e MEILISEARCH_API_KEY='<MEILISEARCH_MASTER_KEY>' \
     -v <absolute-path-to-your-config-file>:/docs-scraper/config.json \
     getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json
   ```

   此处：

   - `<MEILISEARCH_HOST_URL>` 应为你的 MeiliSearch 实例的主机 URL
   - `<MEILISEARCH_MASTER_KEY>` 是你提供的主密钥。
   - `<absolute-path-to-your-config-file>` 是你创建的配置文件的绝对路径。

   抓取完成后，MeiliSearch 将更新现有索引以包含最新的文档内容。

1. 使用以下命令创建仅限搜索的访问密钥：

   ```sh
   curl \
     # 将 <YOUR_HOST> 替换为你的 MeiliSearch 主机 URL
     -X POST '<YOUR_HOST>/keys' \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer <MASTER_KEY>' \
     # 描述 f
     --data-binary '{
       "indexes": ["<YOUR_INDEX_NAME>"],
       "actions": ["search"],
       "expiresAt": null,
       "description": "Search key for <YOUR_INDEX_NAME>"
     }'
   ```

   此处：

   - `<YOUR_HOST>` 是你的 MeiliSearch 实例的主机 URL
   - `<MASTER_KEY>` 是 MeiliSearch 生成的主密钥
   - `<YOUR_INDEX_NAME>` 是你创建的索引名称
   - `actions` 指定此密钥可以执行的操作。在此情况下，设置为 `["search"]`，表示它只能执行搜索操作。
   - `expiresAt` 设置密钥的过期日期，允许你控制密钥的有效期限，`null` 表示永远不会过期。

   如果成功，响应将如下所示：

   ```json
   {
     "name": null,
     "description": "Search key for <YOUR_INDEX_NAME>",
     "key": "adaf72e2a6d6f428ec465bc786ec41de868bbd53121997e89ba2299e9566c88213",
     "uid": "b84d1be5-caa5-4752-b078-8f40be39051d",
     "actions": ["search"],
     "indexes": ["<YOUR_INDEX_NAME>"],
     "expiresAt": null,
     "createdAt": "2024-01-27T06:50:33.668329328Z",
     "updatedAt": "2024-01-27T06:50:33.668329328Z"
   }
   ```

   现在，你可以将 `key` 用于插件配置。

1. 安装 `@vuepress/plugin-meilisearch`

   ::: code-tabs#shell

   @tab pnpm

   ```bash
   pnpm add -D @vuepress/plugin-meilisearch@next
   ```

   @tab yarn

   ```bash
   yarn add -D @vuepress/plugin-meilisearch@next
   ```

   @tab npm

   ```bash
   npm i -D @vuepress/plugin-meilisearch@next
   ```

   :::

1. 在主题中设置插件选项

   ```ts twoslash {5-8} title=".vuepress/theme.ts"
   import { hopeTheme } from "vuepress-theme-hope";

   export default hopeTheme({
     plugins: {
       meilisearch: {
         host: "<MEILISEARCH_HOST_URL>",
         apiKey: "<YOUR_SEARCH_ONLY_KEY>",
         indexUid: "<YOUR_INDEX_NAME>",
       },
     },
   });
   ```

1. 使用 GitHub Actions 自动重新抓取

   将你的抓取器配置文件放在项目中的某个位置。

   然后转到 `Settings` -> `Secrets and variables` -> `Actions` 在你的 GitHub 仓库中。点击 `New repository secret` 并设置 `MEILISEARCH_MASTER_KEY` 为你自己的 MeiliSearch 主密钥。

   接下来在你的 GitHub Actions 工作流文件中添加一个新的步骤 `scrape`，它将在部署步骤之后运行。以下是操作示例：

   ```yml
   name: 部署和抓取

   on:
     push:
       branches:
         - main

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         # 在此处部署你的文档
         # ...

     scrape:
       needs: deploy
       runs-on: ubuntu-latest
       name: 重新抓取 MeiliSearch 文档
       steps:
         - 名称：Checkout
           uses: actions/checkout@v4

         - 名称：运行抓取器
           env：
             # 替换为你自己的 MeiliSearch 主机 URL
             HOST_URL: <YOUR_MEILISEARCH_HOST_URL>
             API_KEY: ${{ secrets.MEILISEARCH_MASTER_KEY }}
             # 替换为配置文件的路径
             CONFIG_FILE_PATH: ${{ github.workspace }}/<path/to/your/scraper/config.json>
           run: |
             docker run -t --rm \
               -e MEILISEARCH_HOST_URL=$HOST_URL \
               -e MEILISEARCH_API_KEY=$API_KEY \
               -v $CONFIG_FILE_PATH:/docs-scraper/config.json \
               getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json
   ```

   ::: tip 抓取器密钥

   为了保护你的 MeiliSearch 实例，你可以为抓取器创建一个具有有限权限的新密钥。与上面的搜索密钥类似，此密钥应仅对以下操作具有访问权限：`["indexes.create","indexes.delete","settings.update","documents.add"]`。

   :::

::: info 更多

关于搜索插件的可用选项，详见 [插件文档][meilisearch]。

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

1. 在主题选项中配置 `plugins.search`。

   ```ts twoslash {5-8} title=".vuepress/theme.ts"
   import { hopeTheme } from "vuepress-theme-hope";

   export default hopeTheme({
     plugins: {
       // 插件选项
       search: {
         // ...
       },
       // 或 search: true,
     },
   });
   ```

::: info 更多

关于搜索插件的可用选项，详见 [插件文档][search]。

:::

[docsearch]: https://ecosystem.vuejs.press/zh/plugins/search/docsearch.html
[meilisearch]: https://ecosystem.vuejs.press/zh/plugins/search/meilisearch.html
[search]: https://ecosystem.vuejs.press/zh/plugins/search/search.html
[slimsearch]: https://ecosystem.vuejs.press/zh/plugins/search/slimsearch.html
