---
title: Search
icon: search
category:
  - Feature
tag:
  - Feature
  - Search
---

The theme adds built-in support for [`@vuepress/plugin-search`][search] and [`@vuepress/plugin-docsearch`][docsearch]. Just install the plugin you want and config it, you will get a search box in navbar.

To use search plugin, you need to apply it via `plugins` in the [**VuePress config file**](../../cookbook/vuepress/config.md).

::: warning

The theme is just adding support for the above plugins, it does not bundle them. You need to install and apply them yourself.

:::

::: danger

**DO NOT** use `plugins.search` in theme options.

The theme can ONLY apply plugins it bundles, so `plugins` field in theme options ONLY accepts CERTAIN plugin name.

:::

<!-- more -->

## Use `@vuepress/plugin-search`

1. Install `@vuepress/plugin-search`

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

1. Import `searchPlugin` from `@vuepress/plugin-search` and apply it in `plugins` under `config.{ts,js}`.

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

::: info More

See [Plugin Docs][search] for available options.

:::

## Use `@vuepress/plugin-docsearch`

1. You need to [submit the URL of your site](https://docsearch.algolia.com/apply/) to join the DocSearch program.

   The DocSearch team will send apiKey and indexName to your email once the index is generated. Then you can configure this plugin to enable DocSearch in VuePress.

   Alternatively, you can [run your own crawler](https://docsearch.algolia.com/docs/run-your-own/) to generate the index, and then use your own appId, apiKey and indexName to configure this plugin.

1. Set up the Algolia Crawler correctly according to the following requirements. You should go to [Algolia Crawler](https://crawler.algolia.com/admin/crawlers/) to update your crawler config.

   ::: details Setting Crawler Config

   Here are config options and descriptions:

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

   `initialIndexSettings.YOUR_INDEX_NAME.attributesForFaceting` field **must** contain `"lang"`, otherwise the plugin will not work properly.

   :::

1. Install `@vuepress/plugin-docsearch`

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

1. Import `docsearchPlugin` from `@vuepress/plugin-docsearch` and apply it in `plugins` under `config.{ts,js}`.

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

::: info More

See [Plugin Docs][docsearch] for how to use docsearch plugin and its available options.

:::

[docsearch]: https://v2.vuepress.vuejs.org/reference/plugin/docsearch.html
[search]: https://v2.vuepress.vuejs.org/reference/plugin/search.html
