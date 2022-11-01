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

`vuepress-theme-hope` passes `plugins.comment` in theme options as plugin options to `vuepress-plugin-comment2`.

:::

<!-- more -->

## Enable <Badge text="Support page config" />

::: code-tabs#language

@tab TS

```ts {9,12}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      comment: {
        provider: "waline",

        // waline 模式下
        serverURL: "...", // your serverURL
      },
    },
  }),
});
```

@tab JS

```js {8,11}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      comment: {
        provider: "waline",

        // waline 模式下
        serverURL: "...", // your serverURL
      },
    },
  }),
};
```

:::

Comment feature is enabled globally by default, controlled by `plugins.comment.comment` options.

::: tip

For the complete config item of the plugin ,please see [plugin documentation][comment2].

:::

## Comment Provider

Currently you can choose from Giscus, Waline and Twikoo.

::: tip Comment service selection

- Giscus is recommended if your blog or documentation is primarily geared towards programmers.
- If your blog or documentation is for the general public, Waline is recommended.

:::

## Giscus

Giscus is a GitHub Discussion based commenting system that is easy to start.

### Preparation

1. You need to create a public repository and open discussion as a place to store comments
1. You need to install the [Giscus App](https://github.com/apps/giscus) to have permission to access the corresponding repository.

After completing the above steps, please go to the [Giscus page](https://giscus.app) to get your settings. You just need to fill in the repository and Discussion categories, then scroll to the "Enable giscus" section at the bottom of the page and copy the `data-repo`, `data-repo-id`, `data-category` and `data-category-id` four items as they are required.

### Config

Please pass `data-repo`, `data-repo-id`, `data-category` and `data-category-id` as plugin options as `repo`, `repoId`, `category` `categoryId`.

For other options, see [Giscus Config][comment2-giscus-config].

## Waline

### Get APP_ID and APP_Key

[Sign in](https://console.leancloud.app/login) or [sign up](https://console.leancloud.app/register) leancloud. Then create new application in Leancloud, and you will get APP ID / APP Key / APP Master Key.

After that, create a vercel app using the below button.

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

Then input your new GitHub repo name and set `LEAN_ID`, `LEAN_KEY` and `LEAN_MASTER_KEY` environment variables in the "Environment Variables" column. `APP ID` is the value of `LEAN_ID`, and `APP Key` to `LEAN_KEY`, `Master Key` to `LEAN_MASTER_KEY`.

Click `Deploy` button to deploy. It will show you deploy successfully after some time. Then config the vercel link in your theme options:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      comment: {
        provider: "waline",
        serverURL: "YOUR_SERVER_URL", // your server url
      },
    },
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      comment: {
        provider: "waline",
        serverURL: "YOUR_SERVER_URL", // your server url
      },
    },
  }),
};
```

:::

::: tip

Config will be listed on [Plugin Config][comment2-waline-config].

For more details, please see [Waline Docs](https://waline.js.org/en/)。

:::

## Twikoo

### Vercel Deployment

1. Apply for [MongoDB](https://www.mongodb.com/cloud/atlas/register) account
1. Create a free MongoDB database, the recommended region is `AWS / N. Virginia (us-east-1)`
1. Click CONNECT on the Clusters page, follow the steps to allow connections from all IP addresses ([Why?](https://vercel.com/support/articles/how-to-allowlist-deployment-ip-address)), create Database user, and record the database connection string, please change the `<password>` in the connection string to the database password
1. Sign up for a [Vercel](https://vercel.com/signup) account
1. Click the button below to deploy Twikoo to Vercel in one click

   [![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/imaegoo/twikoo/tree/dev/src/vercel-min)

1. Go to Settings - Environment Variables, add the environment variable `MONGODB_URI`, the value is the database connection string in step 3
1. Go to Overview, click the link under Domains, if the environment configuration is correct, you can see the prompt "Twikoo cloud function is running normally"
1. Vercel Domains (with `https://` prefix, for example `https://xxx.vercel.app`) is your environment ID

[comment2]: https://vuepress-theme-hope.github.io/v2/comment/
[comment2-giscus-config]: https://vuepress-theme-hope.github.io/v2/comment/config/giscus.html
[comment2-waline-config]: https://vuepress-theme-hope.github.io/v2/comment/config/waline.html
