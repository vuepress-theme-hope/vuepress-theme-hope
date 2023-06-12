---
title: Plugins
icon: puzzle-piece
order: 5
category:
  - Cookbook
  - VuePress
tag:
  - Plugin
  - VuePress
---

With the help of [Plugin API](https://vuejs.press/reference/plugin-api.html), VuePress plugin can provide different features for you.

## Community Plugin

Community users have created lots of plugins and published them to [NPM](https://www.npmjs.com/search?q=keywords:vuepress-plugin). VuePress team also maintains some official plugins under the [@vuepress](https://www.npmjs.com/search?q=%40vuepress%20keywords%3Aplugin) scope. You should check the plugin's own documentation for detailed guide.

In general, you need to include the plugin in the [plugins](https://vuejs.press/reference/config.html#plugins) option to use it. For example, use the [@vuepress/plugin-google-analytics](https://vuejs.press/reference/plugin/google-analytics.html) to integrate Google Analytics:

```js
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";

export default {
  plugins: [
    googleAnalyticsPlugin({
      id: "G-XXXXXXXXXX",
    }),
  ],
};
```

::: tip
Most plugins can only be used once. If the same plugin is used multiple times, only the last one will take effect.

However, some plugins can be used multiple times (e.g. [@vuepress/plugin-container](https://vuejs.press/reference/plugin/container.html)), and you should check the documentation of the plugin itself for detailed guide.
:::

## Local Plugin

To use your own plugin but don't want to publish it, you can create a local plugin.

It is recommended to use the [Config File](./config.md#config-file) directly as a plugin, because [almost all the Plugin APIs are available](https://vuejs.press/reference/config.html#plugin-api), which would be more convenient in most cases.

But if you have too many things to do in your config file, you can consider extracting them into separate plugins, and use them in your config file:

```js
import myPlugin from "./path/to/my-plugin.js";

export default {
  plugins: [myPlugin()],
};
```

You can refer to [Advanced > Writing a Plugin](https://vuejs.press/advanced/plugin.html) for how to write your own plugin.
