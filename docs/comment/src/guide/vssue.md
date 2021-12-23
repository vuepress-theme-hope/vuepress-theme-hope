---
icon: creative
---

# Using Vssue

## Choose a platform to use

Vssue can enable comments for your static pages via the `Issue System` of `GitHub`, `Gitlab`, `Bitbucket` or `Gitee`, and you can choose one of those platforms.

Go to [Supported Platforms - Set up OAuth App](./supported-platforms.md) for detailed instructions.

After this step, you will get `client id` and `client secret` of your OAuth App, which will be used for Vssue options:

- `owner`: the account / group that owns the repository
- `repo`: the name of the repository to store comments
- `clientId`: the `client id` of your oauth app
- `clientSecret`: the `client secret` of your oauth app (only required for some of the platforms)

## Vssue Config

This plugin uses [@vssue/vuepress-plugin-vssue](https://www.npmjs.com/package/@vssue/vuepress-plugin-vssue) to help use Vssue in VuePress.

### Use the plugin

<CodeGroup>
<CodeGroupItem title="js">

```js
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

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
export default {
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

</CodeGroupItem>
</CodeGroup>

::: tip

The only difference is that, you should set `platform` rather than the `api` package itself.

`@vssue/vuepress-plugin-vssue` will auto resolve the corresponding API package according to the value of `platform`:

- Platform `github` - API package `@vssue/api-github-v3`
- Platform `github-v4` - API package `@vssue/api-github-v4`
- Platform `gitlab` - API package `@vssue/api-gitlab-v4`
- Platform `bitbucket` - API package `@vssue/api-bitbucket-v2`
- Platform `gitee` - API package `@vssue/api-gitee-v5`

:::

### Use Vssue Component

`Vssue` has already been registered as a Vue component, and can be used in your VuePress Markdown directly.

```md
<!-- README.md -->

# Vssue Demo

<Vssue title="Vssue Demo" />
```

::: tip

You can go to the repository [meteorlxy/vssue-demo](https://github.com/meteorlxy/vssue-demo) to get the demo code.

:::

## Custom Style Variables

With the power of [palette.styl](https://vuepress.vuejs.org/config/#palette-styl) of VuePress, you can set the Vssue Style.

There are some predefined [Stylus variables](http://stylus-lang.com/docs/variables.html) of Vssue, and you can check them in `vssue/src/styles/_variables.styl`:

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

Set these variables in your `palette.styl` to override them:

```stylus
// .vuepress/styles/palette.styl

$vssue-theme-color = red
```

## Do not want to use our plugin

Vssue has tried to be SSR-friendly, so you can import Vssue directly in VuePress like other vue plugins / components without `@vssue/vuepress-plugin-vssue` (especially if you have customized the styles of Vssue).

But we still suggest you to use `@vssue/vuepress-plugin-vssue` in VuePress, which has already helped you make `<Vssue>` component client-only to avoid some potential issues.

If you do not want to use the plugin we provided, you may need to wrap `<Vssue>` component into `<ClientOnly>` component to avoid those potential issues, that is :

```vue
<ClientOnly>
  <Vssue />
</ClientOnly>
```

> See [Built-in Components - ClientOnly](https://vuepress.vuejs.org/guide/using-vue.html#clientonly) of VuePress
