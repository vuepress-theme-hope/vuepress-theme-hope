---
title: Feed Support
icon: rss
category: feature
tags:
  - feature
  - feed
---

The theme will enable feed generation support using [`@mr-hope/vuepress-plugin-feed`](https://vuepress-theme-hope.github.io/feed/) by default.

`@mr-hope/vuepress-plugin-feed` plugin will automatically generate feed in the following three formats for you

- Atom 1.0 (Default output: atom.xml)
- JSON 1.1 (Default output: feed.json)
- RSS 2.0 (Default output: rss.xml)

Considering that rare people stick to feed now, this plugin provides a minimal configuration to adjust the automatic generation of detailed feed files. And if you do not need this feature, you can set the `themeConfig.feed` to `false` to disable the plugin.

<!-- more -->

## Channel Settings

You can customize information of feed channel by setting the `channel` option.

We recommend you to set the following options:

- Convert the date when the feed was created to ISOString and write it to `channel.pubDate`
- Set the content update cycle (unit: minute) in `channel.ttl`

For detailed options and their values, please see [Feed Channel Config](https://vuepress-theme-hope.github.io/feed/config/channel/)

## Project Settings

By default, all articles will be added to the feed stream. You can control the generation of feed items for specific articles by configuring the feed options in frontmatter.

To remove a specific page from the feed, set `feed.enable` to `false` in the frontmatter of the page.

You can also add content directly to the feed plugin via `frontmatter.feed`. For detailed options and their default values, please see [Feed Item Config](https://vuepress-theme-hope.github.io/feed/config/item/)

## Output configuration

You can use the `output` in the configuration options to decide which feed file formats to output and their location.

For detailed options and their default values, see [Feed Output config](https://vuepress-theme-hope.github.io/feed/config/#output)
