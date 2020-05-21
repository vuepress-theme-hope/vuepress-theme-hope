---
icon: commentfill
category: feature
tags:
  - comment
  - function
---

# Comment Function

vuepress-theme-hope implements the comment feature with built-in `@mr-hope/vuepress-plugin-comment`.

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    comment: {
      type: "valine", // Use Valine
      appId: "...", // your appId
      appKey: "...", // your appKey
    },
  },
};
```

Comment function <MyBadge text="Support page config" /> enabled globally by default, the configuration key is `comment`.

You can choose between Valine and Vssue.

::: tip
You can visit [@mr-hope/vuepress-plugin-comment plugin documentation](https://vuepress-comment.mrhope.site/en/) for more details
:::

## Valine

### Get APP_ID and APP_Key

[Click here](https://leancloud.cn/dashboard/login.html#/signup) to register or login in leancloud.

Create new application in Leancloud, and you will get APP ID / APP Key.

```js
{
  type: 'valine',
  appId: '...', // your appId
  appKey: '...' // your appKey
}
```

Config will be listed on [Config](http://vuepress-comment.mrhope.site/en/api/valine.html).

Fill in the corresponding APP ID and APP Key, then Valine will be well configured.

::: tip
For Valine config and usage, please see [Valine Docs](https://valine.js.org)。
:::

## Vssue

### Choose a platform to use

Vssue can enable comments for your static pages via the `Issue System` of `Github`, `Gitlab`, `Bitbucket` or `Gitee`, and you can choose one of those platforms.

Go to [Supported Platforms - Set up OAuth App](http://comment.mrhope.site/en/guide/supported-platforms.html) for detailed instructions.

After this step, you will get `client id` and `client secret` of your OAuth App, which will be used for Vssue options:

- `owner`: the account / group that owns the repository
- `repo`: the name of the repository to store comments
- `clientId`: the `client id` of your oauth app
- `clientSecret`: the `client secret` of your oauth app (only required for some of the platforms)

### Use the plugin

```js {5-15}
// .vuepress/config.js

module.exports = {
  plugins: {
    "@mr-hope/comment": {
      type: "vssue",
      // set `platform` rather than `api`
      platform: "github",

      // all other options of Vssue are allowed
      owner: "OWNER_OF_REPO",
      repo: "NAME_OF_REPO",
      clientId: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
    },
  },
};
```

::: tip
The only difference is that, you should set `platform` rather than the `api` package itself.

`@vssue/vuepress-plugin-vssue` will auto resolve the corresponding api package according to the value of `platform`:

- platform `github` - `@vssue/api-github-v3` api package
- platform `github-v4` - `@vssue/api-github-v4` api package
- platform `gitlab` - `@vssue/api-gitlab-v4` api package
- platform `bitbucket` - `@vssue/api-bitbucket-v2` api package
- platform `gitee` - `@vssue/api-gitee-v5` api package
- platform `gitea` - `@vssue/api-gitea-v1` api package

:::

::: tip
You can go to the repo [meteorlxy/vssue-demo](https://github.com/meteorlxy/vssue-demo) to get the demo code.
:::

### Custom Style Variables

With the power of [palette.styl](https://vuepress.vuejs.org/config/#palette-styl) of VuePress, you can set the [Variables of Vssue Style](./styles.md#use-variables-to-customize-vssue) easily.

There are some pre-defined [stylus variables](http://stylus-lang.com/docs/variables.html) of Vssue, and you can check them in `vssue/src/styles/_variables.styl`:

```stylus
// the main color
$vssue-theme-color

// the text color (used for common text)
$vssue-text-color

// the text light color (used for muted text, disabled text, etc)
$vssue-text-light-color

// the border color
$vssue-border-color

// the progress color
$vssue-progress-color

// the font size
$vssue-font-size

// the font family
$vssue-font-family

// the mobile breakpoint
$vssue-breakpoint-mobile

// the text direction (ltr / rtl) (used for RTL languages, e.g. Hebrew)
$vssue-direction
```

For example, Vssue use a "Vue green" (`#3eaf7c`) as the theme color, which is defined as the default value of variable `$vssue-theme-color`. You can change the theme color by setting `$vssue-theme-color` before import `vssue/src/styles/index.styl`.

By default, those Vssue variables are set to VuePress variables:

```stylus
// @vssue/vuepress-plugin-vssue/styles/index.styl

$vssue-theme-color ?= $accentColor
$vssue-text-color ?= $textColor
$vssue-border-color ?= $borderColor
$vssue-breakpoint-mobile ?= $MQMobile
```

If you want to override them, just set them in your `palette.styl`:

```stylus
// .vuepress/styles/palette.styl

$vssue-theme-color = red
```
