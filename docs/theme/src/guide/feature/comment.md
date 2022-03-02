---
title: Comment Service
icon: comment
category:
  - Feature
tag:
  - Comment
  - Feature
---

`vuepress-theme-hope` implements the comment feature with built-in [`vuepress-plugin-comment2`][comment2].

::: info

`vuepress-theme-hope` provides `comment` options in `themeConfig.plugins` as plugin options to `vuepress-plugin-comment2`.

:::

<!-- more -->

## Enable <Badge text="Support page config" />

:::: code-group

::: code-group-item TS

```ts {7,10}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      comment: {
        type: "waline",

        // waline 模式下
        serverURL: "...", // your serverURL
      },
    },
  },
});
```

:::

::: code-group-item JS

```js {7,10}
// .vuepress/themeConfig.js
const { themeConfig } = require("vuepress-theme-hope");

module.exports = themeConfig({
  themeConfig: {
    plugins: {
      comment: {
        type: "waline",

        // waline 模式下
        serverURL: "...", // your serverURL
      },
    },
  },
});
```

:::

::::

Comment feature is enabled globally by default, the configuration key is `comment` in `themeConfig.plugins.comment`.

::: tip

For the complete config item of the plugin ,please see [plugin documentation][comment2].

:::

## Comment Provider

You can only choose Waline now.

::: tip

More options are on the way. Please be patient.

:::

<!-- You can choose from 2 comment service provider: Waline and Vssue.

::: tip Comparison between services

- Waline uses a backend server to support comment and pageview statistics, and you can comment without logging in to any account. It needs extra configuration on backend, and you can deploy on vercel for free.
- Vssue uses the issue panel of the code platform repo and requires the user to login or register the corresponding platform account.

If your site is for the general public rather than programmers, Waline is recommended.

::: -->

## Waline

### Get APP_ID and APP_Key

[Sign in](https://console.leancloud.app/login.html#/signin) or [sign up](https://console.leancloud.app/login.html#/signup) leancloud. Then create new application in Leancloud, and you will get APP ID / APP Key / APP Master Key.

After that, create a vercel app using the below button.

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/lizheming/waline/tree/master/example)

Then input your new GitHub repo name and set `LEAN_ID`, `LEAN_KEY` and `LEAN_MASTER_KEY` environment variables in the "Environment Variables" column. `APP ID` is the value of `LEAN_ID`, and `APP Key` to `LEAN_KEY`, `Master Key` to `LEAN_MASTER_KEY`.

Click `Deploy` button to deploy. It will show you deploy successfully after a minitues time. Then config the vercel link in your themeConfig:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      comment: {
        type: "waline",
        serverURL: "YOUR_SERVER_URL", // your server url
      },
    },
  },
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    plugins: {
      comment: {
        type: "waline",
        serverURL: "YOUR_SERVER_URL", // your server url
      },
    },
  },
});
```

:::

::::

::: tip

Config will be listed on [Plugin Config][comment2-waline-config].

For more details, please see [Waline Docs](https://waline.js.org/en/)。

:::

[comment2]: https://vuepress-theme-hope.github.io/v2/comment/
[comment2-waline-config]: https://vuepress-theme-hope.github.io/v2/comment/config/waline.html
