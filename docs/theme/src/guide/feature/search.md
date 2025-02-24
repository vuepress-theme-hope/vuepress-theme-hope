---
title: Search
icon: search
category:
  - Feature
tag:
  - Feature
  - Search
---

The theme adds built-in support for [`@vuepress/plugin-docsearch`][docsearch], [@vuepress/plugin-slimsearch][slimsearch] and [`@vuepress/plugin-search`][search]. Just install the plugin you want and config it, you will get a search box in navbar.

<!-- more -->

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
       // if you are using sitemap plugins (e.g.: @vuepress/plugin-sitemap), you may provide one
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

1. Customize the plugin with `plugins.docsearch` in theme options.

   ```ts twoslash {7-10} title=".vuepress/config.ts"
   import { hopeTheme } from "vuepress-theme-hope";

   export default {
     theme: hopeTheme({
       plugins: {
         docsearch: {
           // plugin options here
           // appId, apiKey and indexName are required
         },
       },
     }),
   };
   ```

::: info More

See [plugin docs][docsearch] for how to use docsearch plugin and its available options.

:::

## Use `@vuepress/plugin-slimsearch`

1. Install `@vuepress/plugin-slimsearch`

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

1. Customize `plugins.slimsearch` in theme options.

   You can set `plugins.slimsearch` to `true` to enable it directly, or set it to an object to customize the plugin.

   ```ts twoslash title=".vuepress/config.ts"
   import { hopeTheme } from "vuepress-theme-hope";

   export default {
     theme: hopeTheme({
       plugins: {
         // plugin options
         slimsearch: {
           // ...
         },
         // or slimsearch: true,
       },
     }),
   };
   ```

::: info More

See [plugin docs][slimsearch] for available options.

:::

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

1. Customize `plugins.search` in theme options.

   ```ts twoslash title=".vuepress/config.ts"
   import { hopeTheme } from "vuepress-theme-hope";

   export default {
     theme: hopeTheme({
       plugins: {
         search: {
           // plugin options here
         },
         // or search: true,
       },
     }),
   };
   ```

::: info More

See [plugin docs][search] for available options.

:::

[docsearch]: https://ecosystem.vuejs.press/plugins/search/docsearch.html
[search]: https://ecosystem.vuejs.press/plugins/search/search.html
[slimsearch]: https://ecosystem.vuejs.press/plugins/search/slimsearch.html
