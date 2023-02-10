---
title: Исправление проблем
icon: square-check
category:
  - FAQ
---

## Ensure running under correct environment

`vuepress-theme-hope` only supports node version of `^14.18.0 || >=16.0.0`.

If the ouput of `node -v` doesnot satisfy the requirement, you should [download and install the LTS version of Node.js](../cookbook/tutorial/env.md#nodejs).

Also, you should use package manger satisfying the following requirements:

- npm: >= 8

  Check: `npm -v`

  Install: `npm i -g npm`

- yarn: >= 1.22.15

  Check: `yarn -v`

  Install: `npm i -g yarn`

- pnpm: >= 7

  Check: `pnpm -v`

  Install: `npm i -g pnpm`

## Ensure using latest version and having correct deps tree

Please make sure you are using the latest `vuepress` and `vuepress-theme-hope` V2 version, because some bugs you encountered may have been fixed in new versions.

Also in some cases, you may generate incorrect dependency tree after upgrading some dependencies, this is because both `vuepress` and `vue` have many packages named `@vuepress/xxx` and `@vue/xxx`.

To let VuePress work correctly, there should only be one version of `@vuepress/xxx` `@vue/xxx` `vue` and `vue-router` in the whole project. Multiple versions of a package can cause different parts of the application to use different instances of Vue and the corresponding package, resulting in errors like `useXXX() is called without provider`.

::: warning

Any official packages starting with `@vuepress/` should be upgrade to the same version as VuePress.

I.E.: if you are using `@vuepress/plugin-search` and `@vuepress/utils` , you should ensure they have the same version number as `vuepress`.

Besides, any plugin inside `vuepress-theme-hope` should be the same version as vuepress-theme-hope.

Further more, if you're using another third-party plugin, make sure it's compatible with the version of VuePress you're upgrading to.

:::

You can execute the following command to make sure you are using the latest version and having correct deps tree.

::: code-tabs#shell

@tab pnpm

```bash
pnpm dlx vp-update
```

@tab yarn

```bash
yarn dlx vp-update
```

@tab npm

```bash
npx vp-update
```

:::

## Убедитесь, что у вас правильная конфигурация

Убедитесь, что в вашем файле конфигурации нет ошибок (например, красных волнистых линий), если это так, измените файл конфигурации в соответствии с подсказками, пока вы не настроите VuePress и темы правильно.
