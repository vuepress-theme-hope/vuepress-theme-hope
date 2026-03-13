---
title: Feed Support
icon: rss
order: 4
category:
  - Advanced
tag:
  - Advanced
  - Feed
---

The theme provides feed support via[`@vuepress/plugin-feed`][feed]. Install `@vuepress/plugin-feed` manually in your project to use this feature.

::: info
`vuepress-theme-hope` passes `plugins.feed` from theme options directly to `@vuepress/plugin-feed`.
:::

<!-- more -->

## Enable Feed Output

The `@vuepress/plugin-feed` plugin supports generating feed files in three formats:

- Atom 1.0
- JSON 1.1
- RSS 2.0

To enable specific formats, set `plugins.feed.atom`, `plugins.feed.json`, or `plugins.feed.rss` to `true` in the theme options. Multiple formats can be enabled simultaneously.

::: tip
RSS is the standard format. Atom and JSON are maintained for compatibility.
:::

## Channel Settings

Customize feed channel information via `plugins.feed.channel` in the theme options.

Recommended configurations:

- Set `channel.pubDate` with the feed creation date in ISOString format.
- Set `channel.ttl` for the content update period (in minutes).
- Set `channel.copyright` for copyright information (falls back to the theme's `copyright` option).
- Set `channel.author` for the channel author (falls back to the theme's `author` option).

::: info
By default, the channel title and description inherit the site's name and description. The plugin automatically generates the channel link and last update time.
:::

For detailed options, refer to the [Feed Channel Docs][feed-channel].

## Generation Control

By default, all articles are included in the feed stream.

To control feed generation for specific articles, configure the `feed` option in the page Frontmatter. See [Feed frontmatter Docs][feed-frontmatter].

To programmatically customize feed item generation, configure `plugins.feed.getter`. See [Feed Getter Docs][feed-getter].

### I18n Configuration

The plugin generates separate feeds for each configured language.

Use `plugins.feed.locales` to apply language-specific settings.

[feed]: https://ecosystem.vuejs.press/plugins/blog/feed/
[feed-channel]: https://ecosystem.vuejs.press/plugins/blog/feed/channel.html
[feed-frontmatter]: https://ecosystem.vuejs.press/plugins/blog/feed/frontmatter.html
[feed-getter]: https://ecosystem.vuejs.press/plugins/blog/feed/getter.html
