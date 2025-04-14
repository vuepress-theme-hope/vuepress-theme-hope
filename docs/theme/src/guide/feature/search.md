---
title: Search
icon: search
category:
  - Feature
tag:
  - Feature
  - Search
---

The theme adds built-in support for [`@vuepress/plugin-docsearch`][docsearch], [@vuepress/plugin-meilisearch][meilisearch], [@vuepress/plugin-slimsearch][slimsearch] and [`@vuepress/plugin-search`][search]. Just install the plugin you want and config it, you will get a search box in navbar.

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

   ```ts twoslash {5-8} title=".vuepress/theme.ts"
   import { hopeTheme } from "vuepress-theme-hope";

   export default hopeTheme({
     plugins: {
       docsearch: {
         // plugin options here
         // appId, apiKey and indexName are required
       },
     },
   });
   ```

::: info More

See [plugin docs][docsearch] for how to use docsearch plugin and its available options.

:::

## Use `@vuepress/plugin-meilisearch`

::: tip

This requires you to have a own server running MeiliSearch.

:::

1. Pull latest meiliserch crawler docker image:

   ```sh
   docker pull getmeili/meilisearch:latest
   ```

   Then start the docker:

   ```sh
   docker run -it --rm \
     -p 7700:7700 \
     -v $(pwd)/meili_data:/meili_data \
     getmeili/meilisearch:latest
   ```

   ::: important Never expose Master Key

   On the first startup, a Master Key will be generated by default. It should only be used for internal server access, as it grants full operational permissions.

   **Do not expose this key**!

   :::

   ::: tip

   See <https://www.meilisearch.com/docs/guides/misc/docker> for details.

   If you don't have Docker installed, you may also [install MeiliSearch manually](https://www.meilisearch.com/docs/learn/self_hosted/getting_started_with_self_hosted_meilisearch#setup-and-installation).

   :::

1. Generate crawler config:

   Here is a sample of crawler configuration, which you should save, modify and pass to the crawler:

   ```json
   {
     "index_uid": "YOUR_INDEX_NAME",
     "start_urls": ["https://YOUR_WEBSITE_URL/"],
     "sitemap_urls": ["https://YOUR_WEBSITE_URL/sitemap.xml"],
     "selectors": {
       "lvl0": {
         "selectors": [".vp-sidebar-link.active", "[vp-content] h1"],
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

- `start_urls` and `sitemap_urls` (optional) shall be customized according to the website to be crawled.
- `selectors` field can be customized according to third-party theme DOM structure.
- You can add new fields to `custom_settings` according to your needs.

::: important

To let the plugin work:

- `lang` selector must be kept as is in `selectors` filed
- All fields that are currently in `custom_settings` must not be removed.

:::

Start scraping the document, `MEILISEARCH_HOST_URL` is the address of the host running MeiliSearch, `<MASTER_KEY>` is the master key, `<absolute-path-to-your-config-file>` is the absolute path to fetch the configuration file:

```sh
docker run -t --rm \
  --network=host \
  -e MEILISEARCH_HOST_URL='<MEILISEARCH_HOST_URL>' \
  -e MEILISEARCH_API_KEY='<MASTER_KEY>' \
  -v <absolute-path-to-your-config-file>:/docs-scraper/config.json \
  getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json
```

When the crawl is complete, MeiliSearch stores the crawled document in the specified index.

> See <https://www.meilisearch.com/docs/guides/front_end/search_bar_for_docs#scrape-your-content>

## Get search index and api key

To create an access key that only allows search operations, use the following request. The `indexes` array specifies which indexes this key can access, and `expiresAt` sets the key's expiration date.

```sh
curl \
  -X POST 'http://localhost:7700/keys' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <MASTER_KEY>' \
  --data-binary '{
    "description": "Search records key",
    "actions": ["search"],
    "indexes": ["YOUR_INDEX_NAME"],
    "expiresAt": "2025-01-01T00:00:00Z"
  }'
```

If successful, the response would look like this:

```json
{
  "name": null,
  "description": "Search records key",
  "key": "adaf72e2a6d6f428ec465bc786ec41de868bbd53121997e89ba2299e9566c88213",
  "uid": "b84d1be5-caa5-4752-b078-8f40be39051d",
  "actions": ["search"],
  "indexes": ["YOUR_INDEX_NAME"],
  "expiresAt": "2025-01-01T00:00:00Z",
  "createdAt": "2024-01-27T06:50:33.668329328Z",
  "updatedAt": "2024-01-27T06:50:33.668329328Z"
}
```

This key can be exposed and used externally as needed. Enter it in your plugin options.

```ts
meilisearchPlugin({
  host: "YOUR_HOST",
  apiKey: "adaf72e2a6d6f428ec465bc786ec41de868bbd53121997e89ba2299e9566c88213",
  indexUid: "YOUR_INDEX_NAME",
});
```

1. Install `@vuepress/plugin-meilisearch`

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

   ```ts twoslash {5-8} title=".vuepress/theme.ts"
   import { hopeTheme } from "vuepress-theme-hope";

   export default hopeTheme({
     plugins: {
       slimsearch: {
         // plugin options here
       },
       // or slimsearch: true,
     },
   });
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

   ```ts twoslash {5-8} title=".vuepress/theme.ts"
   import { hopeTheme } from "vuepress-theme-hope";

   export default hopeTheme({
     plugins: {
       search: {
         // plugin options here
       },
       // or search: true,
     },
   });
   ```

::: info More

See [plugin docs][search] for available options.

:::

[docsearch]: https://ecosystem.vuejs.press/plugins/search/docsearch.html
[meilisearch]: https://ecosystem.vuejs.press/plugins/search/meilisearch.html
[search]: https://ecosystem.vuejs.press/plugins/search/search.html
[slimsearch]: https://ecosystem.vuejs.press/plugins/search/slimsearch.html
