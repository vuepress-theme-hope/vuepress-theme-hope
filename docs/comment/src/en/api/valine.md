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

- **verify**

  - Type: `Boolean`
  - Default: `flase`

  Verification code on comment submit

- **notify**

  - Type: `Boolean`
  - Default: `true`

  Whether to send a message reply notification based on the left mailbox

  ::: tip
  When this option is set, the verification code function will be automatically turned on.
  :::
