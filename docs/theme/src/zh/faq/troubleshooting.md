---
title: 故障排查
icon: square-check
order: 2
category:
  - FAQ
---

## 确认使用正确的环境

`vuepress-theme-hope` 仅支持当前的环境：

| 环境    | 版本要求    | 检查版本的方法 | 额外要求                                      |
| ------- | ----------- | -------------- | --------------------------------------------- |
| Node.js | `>= 20.6.0` | `node -v`      |                                               |
| pnpm    | `>= 7`      | `pnpm -v`      |                                               |
| npm     | `>= 8`      | `npm -v`       |                                               |
| yarn    | `>= 2`      | `yarn -v`      | `nodeLinker: 'node-modules'` in `.yarnrc.yml` |

如果你的 Node.js 版本不满足要求，你应该 [下载并安装 LTS 版本的 Node.js](../get-started/env.md#nodejs)。

要使用正确的包管理器，请运行 `corepack enable` (在 Windows 上需要以管理员身份运行)，然后运行以下命令之一：

- npm: `corepack use npm@11`
- yarn: `corepack use yarn@4`
- pnpm: `corepack use pnpm@10`

## 检查浏览器是否受支持

`vuepress-theme-hope` 官方承诺：

- 完全支持：最新 3 年版本的 Chrome、Firefox、Safari 和 Edge
- 可以被 polyfill：最新 5 年版本的上述浏览器

目前，默认支持以下浏览器：

- Chrome >= 87 (发布于 2020.11.17)
- Edge >= 88 (发布于 2021.01.22)
- Firefox >= 78 (发布于 2020.06.30)
- Safari >= 14.1 (发布于 2021.04.26)

## 确定使用最新版本与正确的依赖树

请确保你在使用最新的 VuePress V2 ，VuePress V2 插件以及 `vuepress-theme-hope` V2 版本，因为一些你遇到的 bug 可能已经在新版本中修复。

另外在一些情况下，你可能会在升级某些依赖后生成错误的依赖树。

为了让 VuePress 正确工作，在整个项目中，应该只能存在一个版本的 `vue` 和 `vuepress`。多个版本的包会导致应用的不同部分在使用不同的包，进而引发如 `useXXX() is called without provider` 之类的错误。

你可以通过执行下列命令来更新到最新版本。

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

## 确认配置正确

请确认你的配置文件没有出现错误 (如红色波浪线)，如果有，请根据提示修改配置文件直至你正确配置了 VuePress 与主题。
