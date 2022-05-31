---
title: 故障排查
icon: check
category:
  - FAQ
---

## 确定使用最新版本

请确保你在使用最新的 `vuepress` 和 `vuepress-theme-hope` V2 版本，因为一些你遇到的 bug 可能已经在新版本中修复。

你可以通过执行下列命令来更新到最新版本。

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

## 确认 Node 版本

`vuepress-theme-hope` 仅支持 LTS 版本的 Node.js，也就是目前来说，只有最新的 v14, v16 版本受到支持。

你可以通过 `node -v` 查看它的版本，如果版本号第一位不满足要求，请 [下载并安装 LTS 版本的 Node.js](../cookbook/tutorial/env.md#nodejs)。

## 确认依赖树正确

在一些情况下，你可能会在升级某些依赖后生成错误的依赖树，这是因为 `vuepress` 和 `vue` 都由很多名为 `@vuepress/xxx` 和 `@vue/xxx` 的包构成。

为了让 VuePress 正确工作，在整个项目中，应该只能存在一个版本的 `@vuepress/xxx` `@vue/xxx` `vue` 与 `vue-router`。多个版本的包会导致应用的不同部分在使用不同的 Vue 与对应包实例，进而引发如 `useXXX() is called without provider` 之类的错误。

请运行以下命令确保你的依赖树没有问题。

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

::: tip npm 版本

如果你在使用 npm，请确定你在使用 npm v8 版本。你可以通过运行 `npm -v` 命令得到 npm 版本号。

如果主版本号小于 8 (即版本号并非 `8.x.x`)，请运行 `npm i -g npm` 命令更新 npm 至 v8 版本之后重新运行上述命令。

:::

## 确认配置正确

请确认你的配置文件没有出现错误 (如红色波浪线)，如果有，请根据提示修改配置文件直至你正确配置了 VuePress 与主题。
