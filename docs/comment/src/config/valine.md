---
title: Valine Config
icon: valine
---

## appId

- Type: `string`
- Required: true

Fill in the application appId in LeanCloud

## appKey

- Type: `string`
- Required: true

Fill in the application appKey in LeanCloud

## comment

- Type: `boolean`
- Default: `true`

Comment Function

## visitor

- Type: `boolean`
- Default: `true`

Pageviews Function

## pageSize

- Type: `Number`
- Default: `10`

Number of comment per page

## recordIP

- Type: `boolean`
- Default: `false`

Whether to record the commenter IP

## More Config about valine

- **placeholder**

  - Type: `string`
  - Default: `'请留言'`

  Comment placeholder

- **meta**

  - Type: `string[]`
  - Default: `['nick','mail']`

  Commenter’s info

- **requiredFields**

  - Type: `string []`
  - Default value: `['nick']`

  Set required fields

- **enableQQ**

  - Type: `boolean`
  - Default value: `true`

  Whether automatically get QQ nickname and QQ avatar when detecting QQ number in nickname box

- **avatar**

  - Type: `string`
  - Default: `'retro'`

  Gravatar avatar display method.

  ::: tip Optional Values

  - `''`(Empty String): Gravatar Official Pic
  - `mp`: Mystery
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

  - Type: `string`
  - Required: No

  To set the emoji package CDN, please see [Valine Custom Emoticon Package](https://valine.js.org/emoji.html)

- **emojiMaps**

  - Type: `sbject`
  - Default value: `null`

  To set the emoticon package mapping, please see [Valine Custom Emoticon Package](https://valine.js.org/emoji.html)
