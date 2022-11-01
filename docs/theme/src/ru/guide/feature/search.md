---
title: Поиск
icon: search
category:
  - Функция
tag:
  - Функция
  - Поиск
---

В тему добавлена встроенная поддержка [`@vuepress/plugin-search`][search] и [`@vuepress/plugin-docsearch`][docsearch]. Просто установите нужный плагин и настройте его, и вы получите окно поиска на панели навигации.

Чтобы использовать поисковый плагин, вам нужно применить его через `plugins` в [**файле конфигурации VuePress**](../../cookbook/vuepress/config.md).

::: warning

Тема просто добавляет поддержку вышеуказанных плагинов, она не объединяет их. Вам нужно установить и применить их самостоятельно.

:::

::: danger

**НЕ** используйте `plugins.search` в настройках темы.

Тема может применять ТОЛЬКО плагины, которые входят в ее состав, поэтому поле `plugins` в параметрах темы принимает ТОЛЬКО ОПРЕДЕЛЕННОЕ имя плагина.

:::

<!-- more -->

## Использование `@vuepress/plugin-search`

1. Установите `@vuepress/plugin-search`

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

1. Импортируйте `searchPlugin` из `@vuepress/plugin-search` и примените его в `plugins` под `config.{ts,js}`.

   ::: code-tabs#language

   @tab TS

   ```ts
   // .vuepress/config.ts
   import { searchPlugin } from "@vuepress/plugin-search";
   import { defineUserConfig } from "vuepress";

   export default defineUserConfig({
     plugins: [
       searchPlugin({
         // your options
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
         // your options
       }),
     ],
   };
   ```

   :::

::: info Более

Доступные параметры смотрите в [Документации по плагинам][search].

:::

## Используйте `@vuepress/plugin-docsearch`

1. Вам необходимо [отправить URL-адрес вашего сайта](https://docsearch.algolia.com/apply/), чтобы присоединиться к программе DocSearch.

   Команда DocSearch отправит apiKey и indexName на вашу электронную почту после создания индекса. Затем вы можете настроить этот плагин для включения DocSearch в VuePress.

   Кроме того, вы можете [запустить свой собственный поисковый робот](https://docsearch.algolia.com/docs/run-your-own/) для создания индекса, а затем использовать свой собственный appId, apiKey и indexName для настройки этого плагина.

1. Правильно настройте Algolia Crawler в соответствии со следующими требованиями. Вам следует перейти на [Algolia Crawler](https://crawler.algolia.com/admin/crawlers/), чтобы обновить конфигурацию вашего сканера.

   ::: details Настройка конфигурации сканера

   Вот параметры конфигурации и описания:

   ```js {35-51,60}
   new Crawler({
     appId: "YOUR_APP_ID",
     apiKey: "YOUR_API_KEY",
     rateLimit: 8,
     startUrls: [
       // These are urls which algolia start to craw
       // If your site is divided in to multiple parts,
       // you may want to set multiple entry links
       "https://YOUR_WEBSITE_URL/",
     ],
     sitemaps: [
       // if you are using sitemap plugins (e.g.: vuepress-plugin-sitemap2), you may provide one
       "https://YOUR_WEBSITE_URL/sitemap.xml",
     ],
     ignoreCanonicalTo: false,
     exclusionPatterns: [
       // You can use this to stop algolia crawling some paths
     ],
     discoveryPatterns: [
       // These are urls which algolia looking for,
       "https://YOUR_WEBSITE_URL/**",
     ],
     // Crawler schedule, set it according to your docs update frequency
     schedule: "at 02:00 every 1 day",
     actions: [
       // you may have multiple actions, especially when you are deploying multiple docs under one domain
       {
         // name the index with name you like
         indexName: "YOUR_INDEX_NAME",
         // paths where the index take effect
         pathsToMatch: ["https://YOUR_WEBSITE_URL/**"],
         // controls how algolia extracts records from your site
         recordExtractor: ({ $, helpers }) => {
           // The following are the default options for vuepress-theme-hope
           // vuepress-theme-hope default container class name is theme-hope-content
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
       // controls how index are initialized
       // only has effects before index are initialize
       // you may need to delete your index and recraw after modification
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

   Поле `initialIndexSettings.YOUR_INDEX_NAME.attributesForFaceting` **должно** содержать `"lang"`, иначе плагин не будет работать должным образом.

   :::

1. Установите `@vuepress/plugin-docsearch`

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

1. Импортируйте `docsearchPlugin` из `@vuepress/plugin-docsearch` и примените его в `plugins` в `config.{ts,js}`.

   ::: code-tabs#language

   @tab TS

   ```ts
   // .vuepress/config.ts
   import { docsearchPlugin } from "@vuepress/plugin-docsearch";
   import { defineUserConfig } from "vuepress";

   export default defineUserConfig({
     plugins: [
       docsearchPlugin({
         // your options
         // appId, apiKey and indexName are required
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
         // your options
         // appId, apiKey and indexName are required
       }),
     ],
   };
   ```

   :::

::: info Еще

Смотрите [Документацию по подключаемым модулям][docsearch], чтобы узнать, как использовать подключаемый модуль docsearch и его доступные параметры.

:::

[docsearch]: https://v2.vuepress.vuejs.org/reference/plugin/docsearch.html
[search]: https://v2.vuepress.vuejs.org/reference/plugin/search.html
