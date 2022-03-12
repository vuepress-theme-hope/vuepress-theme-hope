---
title: Search
icon: search
category:
  - Feature
tag:
  - Feature
  - Search
---

The theme adds built-in support for [`@vuepress/search`][search] and [`@vuepress/docsearch`][docsearch].

::: warning

To keep the theme simple, we will not add these two plugins as dependencies , so install the needed plugin yourself.

:::

<!-- more -->

## use `@vuepress/search`

You can pass plugin options via `themeConfig.plugins.search`.

See [Plugin Docs][search] for the available options for search plugin.

## use `@vuepress/docsearch`

You can pass plugin options via `themeConfig.plugins.docsearch`.

In order to use the plugin properly, you need to pass in `apiKey`, `indexName` and `appId` correctly, and set up the Algolia Crawler correctly according to the following requirements.

::: details Crawler Config Example

```js {35-51,60}
new Crawler({
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
  rateLimit: 8,
  startUrls: [
    // These are urls which algolia start to craw
    // If your site is divided in to mutiple parts,
    // you may want to set mutiple entry links
    "https://YOUR_WEBSITE_URL/",
  ],
  sitemaps: [
    // if you are using sitemap plugins (e.g.: vuepress-plugin-sitemap2), you may provide one
    "https://YOUR_WEBSITE_URL/sitemap.xml",
  ],
  ignoreCanonicalTo: false,
  exclusionPatterns: [
    // You can use this to stop algolia crawing some paths
  ],
  discoveryPatterns: [
    // These are urls which algolia looking for,
    "https://YOUR_WEBSITE_URL/**",
  ],
  // Crawler schedule, set it according to your docs update frequency
  schedule: "at 02:00 every 1 day",
  actions: [
    // you may have mutiple actions, especially when you are deploying mutiple docs under one domain
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
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
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

See [Plugin Docs][docsearch] for the available options for docsearch plugin.

## Additional Info

::: note

You can also call plugins via `plugins` in the [VuePress config file](../../cookbook/vuepress/config.md).

:::

[docsearch]: https://v2.vuepress.vuejs.org/reference/plugin/docsearch.html
[search]: https://v2.vuepress.vuejs.org/reference/plugin/search.html
