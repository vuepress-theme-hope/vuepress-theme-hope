---
icon: valine
---

# valine 配置

## appId

- 类型: `String`
- 必填: 是

填入 LeanCloud 中应用的 APP ID

## appKey

- 类型: `String`
- 必填: 是

填入 LeanCloud 中应用的 APP Key

## commet

- 类型: `Boolean`
- 默认值: `true`

留言功能

## visitor

- 类型: `Boolean`
- 默认值: `true`

文章访问量统计功能

## pageSize

- 类型: `Number`
- 默认值: `10`

评论列表分页，每页条数

## recordIP

- 类型: `Boolean`
- 默认值: `false`

是否记录评论者IP

## 更多 Valine配置项

- **placeholder**

  - 类型: `String`
  - 默认值: `'请留言'`

  评论框的 placeholder

- **meta**

  - 类型: `String[]`
  - 默认值: `['nick','mail','link']`

评论者相关属性

- **avatar**

  - 类型: `String`
  - 默认值: `'retro'`

  Gravatar 头像展示方式。

  ::: tip 可选值

  - ''(空字符串): Gravatar官方图形
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

- **verify**

  - 类型: `Boolean`
  - 默认值: `flase`

  评论提交验证码功能

- **notify**

  - 类型: `Boolean`
  - 默认值: `true`

  是否依据留下的邮箱发出留言回复通知。

  ::: tip
  设置此选项后会自动开启验证码功能，即 `valine.verify` 失效。
  :::
