---
title: Comment Function
icon: commentfill
category: feature
tags:
  - comment
  - feature
---

`vuepress-theme-hope` implements the comment feature with built-in `@mr-hope/vuepress-plugin-comment`.

<!-- more -->

## Enable <Badge text="Support page config" />

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

Comment feature is enabled globally by default, the configuration key is `comment`.

::: tip

For the complete config item of the plugin ,please see [@mr-hope/vuepress-plugin-comment plugin documentation](https://vuepress-theme-hope.github.io/comment/).

:::

## Comment Provider

You can choose between Valine and Vssue.

::: tip Comparison between Valine and Vssue

- Valine uses leancloud to support pageview statistics, and you can comment without logging in to any account
- Vssue uses the issue panel of the code platform repo and requires the user to login or register the corresponding platform account.

If your site is for the general public rather than programmers, Valine is recommended.

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

Config will be listed on [Config](http://vuepress-theme-hope.github.io/comment/config/valine/).

Fill in the corresponding APP ID and APP Key, then Valine will be well configured.

::: tip

For Valine config and usage, please see [Valine Docs](https://valine.js.org)。

:::

## Vssue

### Choose a platform to use

Vssue can enable comments for your static pages via the `Issue System` of `GitHub`, `Gitlab`, `Bitbucket` or `Gitee`, and you can choose one of those platforms.

Go to [Supported Platforms - Set up OAuth App](http://vuepress-theme-hope.github.io/comment/guide/supported-platforms/) for detailed instructions.

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

`@vssue/vuepress-plugin-vssue` will auto resolve the corresponding API package according to the value of `platform`:

- Platform `github` - `@vssue/api-github-v3` API package
- Platform `github-v4` - `@vssue/api-github-v4` API package
- Platform `gitlab` - `@vssue/api-gitlab-v4` API package
- Platform `bitbucket` - `@vssue/api-bitbucket-v2` API package
- Platform `gitee` - `@vssue/api-gitee-v5` API package
- Platform `gitea` - `@vssue/api-gitea-v1` API package

:::

::: tip

You can go to the repository [meteorlxy/vssue-demo](https://github.com/meteorlxy/vssue-demo) to get the demo code.

:::
