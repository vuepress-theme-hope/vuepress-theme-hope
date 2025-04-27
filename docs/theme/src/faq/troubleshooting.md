---
title: Troubleshooting
order: 2
icon: square-check
category:
  - FAQ
---

## Ensure running under correct environment

`vuepress-theme-hope` only supports the current environment:

| Environment | Version Requirement | Ways to Check Version | Additional Requirement                        |
| ----------- | ------------------- | --------------------- | --------------------------------------------- |
| Node.js     | `>= 20.6.0`         | `node -v`             |                                               |
| pnpm        | `>= 7`              | `pnpm -v`             |                                               |
| npm         | `>= 8`              | `npm -v`              |                                               |
| yarn        | `>= 2`              | `yarn -v`             | `nodeLinker: 'node-modules'` in `.yarnrc.yml` |

If your Node.js version does not satisfy the requirement, you should [download and install the LTS version of Node.js](../get-started/env.md#nodejs).

To use the correct package manager, run `corepack enable` (need to run as Administrator on Windows), and run one of the following commands:

- npm: `corepack use npm@11`
- yarn: `corepack use yarn@4`
- pnpm: `corepack use pnpm@10`

## Check it the browser is supported

`vuepress-theme-hope` officially promises:

- Full support: latest 3 year versions of Chrome, Firefox, Safari and Edge
- Can be polyfilled: latest 5 year versions of the above browsers

Currently, the following browsers are supported by default

- Chrome >= 87 (released in 2020.11.17)
- Edge >= 88 (released in 2021.01.22)
- Firefox >= 78 (released in 2020.06.30)
- Safari >= 14.1 (released in 2021.04.26)

## Ensure using latest VuePress and its plugins with a correct deps tree

Make sure you are using the latest VuePress V2, latest VuePress V2 plugins and `vuepress-theme-hope` V2 version. Some bugs you encountered may have been fixed in new versions.

Also in some cases, you may generate incorrect dependency tree after upgrading.

To let VuePress work correctly, there should only be one version of `vue` and `vuepress` in the whole project. Multiple versions of a package can cause different parts of the application to use different package, resulting in errors like `useXXX() is called without provider`.

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

Please confirm that there are no errors in your config file (such as red wavy lines), if so, please modify the config file according to the prompts until you correctly configured VuePress, its plugins and our theme.
