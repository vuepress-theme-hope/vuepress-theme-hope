---
title: Comment Function
icon: comment
category: feature
tags:
  - comment
  - feature
---

`vuepress-theme-hope` implements the comment feature with built-in [`@mr-hope/vuepress-plugin-comment`](https://vuepress-theme-hope.github.io/comment/).

<!-- more -->

## Enable <Badge text="Support page config" />

<CodeGroup>
<CodeGroupItem title="js">

```js {7,10}
// .vuepress/themeConfig.js
const { themeConfig } = require("vuepress-theme-hope");

module.exports = themeConfig({
  themeConfig: {
    comment: {
      type: "waline", // "waline", "valine" 或 "vssue"

      // under waline
      serverURL: "...", // your serverUrl
    },
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts {7,10}
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    comment: {
      type: "waline", // "waline", "valine" 或 "vssue"

      // under waline
      serverURL: "...", // your serverUrl
    },
  },
});
```

</CodeGroupItem>
</CodeGroup>

Comment feature is enabled globally by default, the configuration key is `comment`.

::: tip

For the complete config item of the plugin ,please see [@mr-hope/vuepress-plugin-comment plugin documentation](https://vuepress-theme-hope.github.io/comment/).

:::

## Comment Provider

You can choose from 3 comment service provider: Waline, Vssue and Valine.

::: tip Comparison between services

- Waline uses a backend server to support comment and pageview statistics, and you can comment without logging in to any account. It needs extra configuration on backend, and you can deploy on vercel for free.
- Vssue uses the issue panel of the code platform repo and requires the user to login or register the corresponding platform account.
- Valine uses leancloud to support pageview statistics, and you can comment without logging in to any account

If your site is for the general public rather than programmers, Waline is recommended.

:::

## Waline

### Get APP_ID and APP_Key

[Sign in](https://console.leancloud.app/login.html#/signin) or [sign up](https://console.leancloud.app/login.html#/signup) leancloud. Then create new application in Leancloud, and you will get APP ID / APP Key / APP Master Key.

After that, create a vercel app using the below button.

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/lizheming/waline/tree/master/example)

Then input your new GitHub repo name and set `LEAN_ID`, `LEAN_KEY` and `LEAN_MASTER_KEY` environment variables in the "Environment Variables" column. `APP ID` is the value of `LEAN_ID`, and `APP Key` to `LEAN_KEY`, `Master Key` to `LEAN_MASTER_KEY`.

Click `Deploy` button to deploy. It will show you deploy successfully after a minitues time. Then config the vercel link in your themeConfig:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    comment: {
      type: "waline",
      serverURL: "YOUR_SERVER_URL", // your server url
    },
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    comment: {
      type: "waline",
      serverURL: "YOUR_SERVER_URL", // your server url
    },
  },
});
```

</CodeGroupItem>
</CodeGroup>

::: tip

Config will be listed on [Plugin Config](http://vuepress-theme-hope.github.io/comment/config/waline/).

For more details, please see [Waline Docs](https://waline.js.org/en/)。

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

<CodeGroup>
<CodeGroupItem title="js">

```js {7-17}
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    comment: {
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
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts {7-17}
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    comment: {
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
});
```

</CodeGroupItem>
</CodeGroup>

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

## Valine

### Get APP_ID and APP_Key

[Click here](https://leancloud.cn/dashboard/login.html#/signup) to register or login in leancloud.

Create new application in Leancloud, and you will get APP ID / APP Key.

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    comment: {
      type: "valine",
      appId: "...", // your appId
      appKey: "...", // your appKey
    },
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    comment: {
      type: "valine",
      appId: "...", // your appId
      appKey: "...", // your appKey
    },
  },
});
```

</CodeGroupItem>
</CodeGroup>

Config will be listed on [Config](http://vuepress-theme-hope.github.io/comment/config/valine/).

Fill in the corresponding APP ID and APP Key, then Valine will be well configured.

::: tip

For Valine config and usage, please see [Valine Docs](https://valine.js.org/en/)。

:::
