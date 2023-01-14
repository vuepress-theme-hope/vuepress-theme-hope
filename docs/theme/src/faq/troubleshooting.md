---
title: Troubleshooting
icon: check
category:
  - FAQ
---

## Ensure You have correct Environment

`vuepress-theme-hope` only supports node version of `^14.18.0 || >=16.0.0`.

If the ouput of `node -v` doesnot satisfy the requirement, you should [download and install the LTS version of Node.js](../cookbook/tutorial/env.md#nodejs).

Also, you should use a package manger satisfying the following requirements:

- npm: >= 8

  Check: `npm -v`

  Install: `npm i -g npm`

- yarn: >= 1.22.15

  Check: `yarn -v`

  Install: `npm i -g yarn`

- pnpm: >= 7

  Check: `yarn -v`

  Install: `npm i -g pnpm`

## Ensure using latest version

Please make sure you are using the latest `vuepress` and `vuepress-theme-hope` V2 version, because some bugs you encountered may have been fixed in new versions.

You can update to the latest version by executing the following commands.

::: code-tabs#shell

@tab pnpm

```bash
pnpm add @vuepress/client@next vuepress@next vuepress-theme-hope@next vue@latest -E
```

@tab yarn

```bash
yarn add vuepress@next vuepress-theme-hope@next -E
```

@tab npm

```bash
npm i vuepress@next vuepress-theme-hope@next -E
```

:::

::: warning

Any official packages starting with `@vuepress/` should be upgrade to the same version as VuePress.

I.E.: if you are using `@vuepress/plugin-search` and `@vuepress/utils` , you should ensure they have the same version number as `vuepress`.

Also, if you're using another third-party plugin, make sure it's compatible with the version of VuePress you're upgrading to.

:::

## Ensure having correct deps tree

In some cases, you may generate incorrect dependency tree after upgrading some dependencies, this is because both `vuepress` and `vue` have many packages named `@vuepress/xxx` and `@vue/xxx`.

To let VuePress work correctly, there should only be one version of `@vuepress/xxx` `@vue/xxx` `vue` and `vue-router` in the whole project. Multiple versions of a package can cause different parts of the application to use different instances of Vue and the corresponding package, resulting in errors like `useXXX() is called without provider`.

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

## Ensure having correct config

Please confirm that there are no errors in your config file (such as red wavy lines), if so, please modify the config file according to the prompts until you correctly configured VuePress and themes.
