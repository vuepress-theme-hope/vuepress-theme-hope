---
category: config
tags:
  - plugin
  - config
---

# @mr-hope/last-update

这个插件将会向 page 注入可阅读的最后更新时间与最后更新时间的时间戳。

## 插件说明

该插件基于 Git，会自动读取文件的上一次提交时间，并以本地化的形式，注入到 `lastUpdated` 上，同时，会将时间戳注入到 `lastUpdatedTime` 上，以供其他插件使用。

## 配置

### transformer

- 类型: `(timestamp: number, lang: string) => string`
- 默认值: `` `${moment(timestamp).format('LL')} ${moment(timestamp).format('HH:mm')}` ``

时间转换函数，默认情况下，会使用 moment 自动根据当前页面语言进行本地化。

如: `2020年5月8日 16:05` `May 8, 2020 16:05`
