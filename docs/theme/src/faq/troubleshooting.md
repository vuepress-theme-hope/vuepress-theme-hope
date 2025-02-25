---
title: Troubleshooting
order: 2
icon: square-check
category:
  - FAQ
---

## Ensure running under correct environment

`vuepress-theme-hope` only supports node version of `^18.19.0 || >= 20.6.0`.

If the output of `node -v` does not satisfy the requirement, you should [download and install the LTS version of Node.js](../get-started/env.md#nodejs).

Also, you should use a package manager satisfying the following requirements (`pnpm@v10` recommended):

- pnpm: >= 7

  Check: `pnpm -v`

- npm: >= 8

  Check: `npm -v`

- yarn: >= 2

  Check: `yarn -v` (Also requires `nodeLinker: 'node-modules'` in `.yarnrc.yml`)

To use the correct package manager, run `corepack enable` (might need to run as Administrator on Windows), and run one of the following commend:

- npm: `corepack use npm@10`
- yarn: `corepack use yarn@4`
- pnpm: `corepack use pnpm@9`

## Ensure using the latest version and having correct deps tree

Please make sure you are using the latest `vuepress`, VuePress plugins and `vuepress-theme-hope` V2 version, because some bugs you encountered may have been fixed in new versions. Also in some cases, you may generate incorrect dependency tree after upgrading some dependencies. To let VuePress work correctly, there should only be one version of `vue` and `vuepress` in the whole project. Multiple versions of a package can cause different parts of the application to use different package, resulting in errors like `useXXX() is called without provider`.

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

## Ensure having correct config

Please confirm that there are no errors in your config file (such as red wavy lines), if so, please modify the config file according to the prompts until you correctly configured VuePress and themes.
