---
title: Valine 配置
icon: valine
---

## appId

- 类型: `string`
- 必填: 是

填入 LeanCloud 中应用的 APP ID

## appKey

- 类型: `string`
- 必填: 是

填入 LeanCloud 中应用的 APP Key

## comment

- 类型: `boolean`
- 默认值: `true`

留言功能

## visitor

- 类型: `boolean`
- 默认值: `true`

文章访问量统计功能

## pageSize

- 类型: `number`
- 默认值: `10`

评论列表分页，每页条数

## recordIP

- 类型: `boolean`
- 默认值: `false`

是否记录评论者 IP

## 更多 Valine 配置项

- **placeholder**

  - 类型: `string`
  - 默认值: `'请留言'`

  评论框的 placeholder

- **meta**

  - 类型: `string[]`
  - 默认值: `['nick','mail']`

评论者相关属性

- **requiredFields**

  - 类型: `string[]`
  - 默认值: `['nick']`

设置必填项

- **enableQQ**

  - 类型: `boolean`
  - 默认值: `true`

是否启用昵称框自动获取 QQ 昵称和 QQ 头像

- **avatar**

  - 类型: `string`
  - 默认值: `'retro'`

  Gravatar 头像展示方式。

  ::: tip 可选值

  - ''(空字符串): Gravatar 官方图形
  - `mp`: 神秘人(一个灰白头像)
  - `identicon`: 抽象几何图形
  - `monsterid`: 小怪物
  - `wavatar`
  - `retro`
  - `robohash`
  - `hide`

  具体相关说明详见 [Valine 头像配置](https://valine.js.org/avatar.html)

  你可以引导用户到 [Gravatar](http://cn.gravatar.com/) 去设置自己的头像。

  :::

- **emojiCDN**

  - 类型: `string`
  - 必填: 否

  设置表情包 CDN，请参考 [Valine 自定义表情包](https://valine.js.org/emoji.html)

- **emojiMaps**

  - 类型: `Object`
  - 默认值: `null`

  设置表情包映射，请参考 [Valine 自定义表情包](https://valine.js.org/emoji.html)
