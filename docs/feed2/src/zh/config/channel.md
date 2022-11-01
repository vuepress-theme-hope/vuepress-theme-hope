---
title: 频道设置
icon: config
---

`channel` 选项用于配置 feed 的频道。可以配置的选项与默认值如下:

## channel.title

- 类型: `string`
- 默认值: `SiteConfig.title`

频道的标题

## channel.link

- 类型: `string`
- 默认值: 部署的网址 (通过 `options.hostname` 和 `context.base` 生成)

频道地址

## channel.description

- 类型: `string`
- 默认值: `SiteConfig.description`

频道描述信息

## channel.language

- 类型: `string`
- 默认值:
  - `siteConfig.locales['/'].locales`
  - 如果上述未提供，回退到 `"en-US"`

频道使用的语言

## channel.copyright

- 类型: `string`
- 默认值:
  - 尝试读取 channel 选项中的 `author.name` 生成 `Copyright by $author`
- 建议自行设置: **是**

频道版权信息

## channel.pubDate

- 类型: `string` (需是合法的 Date ISOString)
- 默认值: 每次插件构建时刻
- 建议自行设置: **是**

频道内容的发布时间

## channel.lastUpdated

- 类型: `string` (需是合法的 Date ISOString)
- 默认值: 每次插件构建时刻

频道内容的上次更新时间

## channel.ttl

- 类型: `number`
- 建议自行设置: **是**

内容有效时间，即获取后保持缓存而不进行新获取的时间

## channel.image

- 类型: `string`
- 建议自行设置: **是**

这是一个会在频道中使用的图片，建议设置正方形图片、尺寸最好不小于 512×512。

## channel.icon

- 类型: `string`
- 建议自行设置: **是**

一个代表频道的图标，建议设置正方形图片、尺寸最好不小于 128×128，背景色透明。

## channel.author

- 类型: `FeedAuthor`
- 建议自行设置: **是**

频道的作者。

::: details FeedAuthor 格式

```ts
interface FeedAuthor {
  /** 作者姓名 */
  name: string;
  /** 作者电子邮箱 */
  email?: string;
  /** 作者网站 */
  url?: string;
  /**
   * 作者头像地址
   *
   * 正方形，最好不小于 128×128，透明背景
   */
  avatar?: string;
}
```

:::

## channel.hub

- 类型: `string`

Websub 的链接。Websub 需要服务器后端，与 VuePress 主旨不符，如无特殊需要忽略即可。

::: info WebSub

有关信息，详见 [Websub](https://w3c.github.io/websub/#subscription-migration)。

:::
