---
title: Troubleshooting
icon: check
category:
  - FAQ
---

## Ensure using latest version

Please make sure you are using the latest `vuepress` and `vuepress-theme-hope` V2 version, because some bugs you encountered may have been fixed in new versions.

You can update to the latest version by executing the following commands.

::: code-tabs#shell

@tab pnpm

```bash
pnpm add vuepress@next vuepress-theme-hope@next
```

@tab yarn

```bash
yarn add vuepress@next vuepress-theme-hope@next
```

@tab npm

```bash
npm i vuepress@next vuepress-theme-hope@next
```

:::

## Ensure Node version

`vuepress-theme-hope` only supports LTS version of Node.js, that is, currently, only the latest v14, v16 versions are supported.

You can check its version with `node -v`. If the first digit of the version number does not meet the requirements, please [download and install the LTS version of Node.js](../cookbook/tutorial/env.md#nodejs).

## Ensure having correct deps tree

In some cases, you may generate incorrect dependency tree after upgrading some dependencies, this is because both `vuepress` and `vue` consist of many packages named `@vuepress/xxx` and `@vue/xxx` constitute.

For VuePress to work correctly, there should only be one version of `@vuepress/xxx` `@vue/xxx` `vue` and `vue-router` in the whole project. Multiple versions of a package can cause different parts of the application to use different instances of Vue and the corresponding package, resulting in errors like `useXXX() is called without provider`.

Please run the following command to make sure your dependency tree is correct.

::: code-tabs#shell

@tab pnpm

```bash
pnpm i && pnpm up
```

@tab yarn

```bash
yarn && yarn upgrade
```

@tab npm

```bash
npm i && npm update
```

:::

::: tip npm version

If you're using npm, make sure you're using npm v8. You can get the npm version number by running the `npm -v` command.

If the major version number is less than 8 (i.e. the version number is not `8.x.x`), please run the `npm i -g npm` command to update npm to v8 and rerun the above command.

:::

## Ensure having correct config

Please confirm that there are no errors in your config file (such as red wavy lines), if so, please modify the config file according to the prompts until you correctly configured VuePress and themes.
