---
icon: valine
---

# Valine Config

## appId

- Type: `String`
- Required: true

Fill in the application appId in LeanCloud

## appKey

- Type: `String`
- Required: true

Fill in the application appKey in LeanCloud

## commet

- Type: `Boolean`
- Default: `true`

Comment Funtion

## visitor

- Type: `Boolean`
- Default: `true`

Pageviews FUntion

## pageSize

- Type: `Number`
- Default: `10`

Number of comment per page

## recordIP

- Type: `Boolean`
- Default: `false`

Whether to record the commenter IP

## More Config about valine

- **placeholder**

  - Type: `String`
  - Default: `'请留言'`

  Comment placeholder

- **meta**

  - Type: `String[]`
  - Default: `['nick','mail','link']`

  Commenter's info

- **requiredFields**

  - Type: `String []`
  - Default value: `['nick']`

  Set required fields

- **enableQQ**

  - Type: `Boolean`
  - Default value: `true`

  Whether to enable the nickname box to automatically obtain QQ nickname and QQ avatar

- **avatar**

  - Type: `String`
  - Default: `'retro'`

  Gravatar avatar display method.

  ::: tip Optional Values

  - `''`(Empty String): Gravatar Offical Pic
  - `mp`: Mistery
  - `identicon`
  - `monsterid`
  - `wavatar`
  - `retro`
  - `robohash`
  - `hide`

  See [Valine Avator Config](https://valine.js.org/avatar.html) for details.

  You can tell users to set their [Gravatar](http://cn.gravatar.com/).
  :::

- **emojiCDN**

  - Type: `String`
  - Required: No

  To set the emoji package CDN, please refer to [Valine Custom Emoticon Package](https://valine.js.org/emoji.html)

- **emojiMaps**

  - Type: `Object`
  - Default value: `null`

  To set the emoticon package mapping, please refer to [Valine Custom Emoticon Package](https://valine.js.org/emoji.html)
