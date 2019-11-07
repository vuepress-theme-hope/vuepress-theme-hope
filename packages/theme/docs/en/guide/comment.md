---
icon: commentfill
---

# Comment Function

vuepress-theme-hope implements the comment with built-in `@mr-hope/vuepress-plugin-comment`.

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    comment: {
      type: 'valine', // Use Valine
      appId: '...', // your appId
      appKey: '...' // your appKey
    }
  }  
}
```

You can choose between Valine and Vssue.

## Valine

### Get APP_ID and APP_Key

[Click here](https://leancloud.cn/dashboard/login.html#/signup) to register or login in leancloud.

Create new application in Leancloud, and you will get APP ID/APP Key.

```js
options = {
  type: 'valine',
  appId: '...', // your appId
  appKey: '...' // your appKey
}
```

Config will be listed on [Config](http://comment.mrhope.site/en/api/valine.md).

::: tip
For Valine config and usage, please see [Valine Docs](https://valine.js.org)。
:::

## Vssue

### Choose a platform to use

Vssue can enable comments for your static pages via the `Issue System` of `Github`, `Gitlab`, `Bitbucket` or `Gitee`, and you can choose one of those platforms.

Go to [Supported Platforms - Set up OAuth App](http://comment.mrhope.site/en/guide/supported-platforms.md) for detailed instructions.

After this step, you will get `client id` and `client secret` of your OAuth App, which will be used for Vssue options:

- `owner`: the account / group that owns the repository
- `repo`: the name of the repository to store comments
- `clientId`: the `client id` of your oauth app
- `clientSecret`: the `client secret` of your oauth app (only required for some of the platforms)

### Use the plugin

```js
// .vuepress/config.js

module.exports = {
  plugins: {
    '@mr-hope/comment': {
      type: 'vssue',
      // set `platform` rather than `api`
      platform: 'github',

      // all other options of Vssue are allowed
      owner: 'OWNER_OF_REPO',
      repo: 'NAME_OF_REPO',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
    }
  }
}
```

::: tip
The only difference is that, you should set `platform` rather than the `api` package itself.

`@vssue/vuepress-plugin-vssue` will auto resolve the corresponding api package according to the value of `platform`:

- platform `github` - api package `@vssue/api-github-v3`
- platform `github-v4` - api package `@vssue/api-github-v4`
- platform `gitlab` - api package `@vssue/api-gitlab-v4`
- platform `bitbucket` - api package `@vssue/api-bitbucket-v2`
- platform `gitee` - api package `@vssue/api-gitee-v5`
:::

### Use Vssue Component

`Vssue` has already been registered as a Vue component, and can be used in your VuePress markdown directly.

```md
<!-- README.md -->

# Vssue Demo

<Vssue title="Vssue Demo" />
```

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

### Do not want to use our plugin?

Vssue has tried to be SSR-friendly, so you can import Vssue directly in VuePress like other vue plugins / components without `@vssue/vuepress-plugin-vssue` (especially if you have customized the styles of Vssue).

But we still suggest you to use `@vssue/vuepress-plugin-vssue` in VuePress, which has already helped you make `<Vssue>` component client-only to avoid some potential issues.

If you do not want to use the plugin we provided, you may need to wrap `<Vssue>` component into `<ClientOnly>` component to avoid those potential issues, i.e. :

```vue
<ClientOnly>
  <Vssue />
</ClientOnly>
```

> See [Built-in Components - ClientOnly](https://vuepress.vuejs.org/guide/using-vue.html#clientonly) of VuePress
