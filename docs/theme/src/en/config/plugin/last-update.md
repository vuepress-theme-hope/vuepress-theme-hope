---
category: config
tags:
  - plugin
  - config
---

# @mr-hope/last-update

This plugin will inject a readable last update time and a last update time timestamp into the page.

## Plugin description

The plugin is based on Git and will automatically read the file's last commit time and inject it into `lastUpdated` in a localized form. At the same time, it will inject a timestamp in `lastUpdatedTime` for use by other plugins.

## Configuration

### transformer

- Type: `(timestamp: number, lang: string) => string`
- Default value: `` `${moment(timestamp).format('LL')} ${moment(timestamp).format('HH:mm')}` ``

Time conversion function, by default, will use moment to automatically localize according to the current page language.

Such as: `2020年5月8日 16:05` `May 8, 2020 16:05`
