---
title: 贡献指南
icon: creative
category:
  - FAQ
---

我们永远欢迎你对项目进行贡献! 这里是一份相关指南。

<!-- more -->

## 克隆并安装项目

使用 Git 克隆项目到本地，并使用 `yarn` 进行依赖的安装。

```sh
git clone git@github.com:vuepress-theme-hope/vuepress-theme-hope.git

yarn
```

::: tip

如果你并未安装 yarn，请使用 `npm i -g yarn` 安装它。

:::

## 项目文件结构

本项目是一个 monorepo，使用 `lerna` 管理。

- docs: 放置各插件与主题的文档，每个子文件夹为一个项目
- demo: 主题演示项目
- packages: 放置各插件与主题的代码，每个子文件夹为一个项目

```
.
├── .github → GitHub 配置
├── .husky → husky 配置
│
├── demo → 主题演示项目
│
├── docs → 文档目录
│ ├── add-this → add-this 插件文档
│ ├── blog → blog2 插件文档
│ ├── comment → comment2 插件文档
│ ├── components → @mr-hope/components 插件文档
│ ├── copy-code → copy-code2 插件文档
│ ├── feed → feed2 插件文档
│ ├── lightgallery → lightgallery 插件文档
│ ├── md-enhance → md-enhance 插件文档
│ ├── photo-swipe → photo-swipe 文档
│ ├── pwa → pwa2 插件文档
│ ├── reading-time → reading-time2 插件文档
│ ├── sass-palette → sass-palette 插件文档
│ ├── seo → seo2 插件文档
│ └── theme → 主题文档
│
├── packages → 项目源代码
│ ├── add-this → add-this 插件
│ ├── blog2 → blog2 插件
│ ├── comment2 → comment2 插件
│ ├── components → @mr-hope/components 插件
│ ├── copy-code2 → copy-code2 插件
│ ├── create → create-vuepress-theme-hope 助手
│ ├── feed2 → feed2 插件
│ ├── lightgallery → lightgallery 插件
│ ├── md-enhance → md-enhance 插件
│ ├── photo-swipe → photo-swipe 插件
│ ├── pwa2 → pwa2 插件
│ ├── reading-time2 → reading-time2 插件
│ ├── sass-palette → sass-palette 插件
│ ├── seo2 → seo2 插件
│ ├── shared → 共享文件
│ ├── sitemap2 → sitemap2 插件
│ └── theme → vuepress-theme-hope 主题
│
├── scripts → 命令脚本
│
├── ... → 一些配置文件
│
├── LICENSE → 协议
├── package.json → 项目根 package.json
├── README.md → 项目介绍
├── SECURITY.md → 安全政策文件
│
├── tsconfig.* → TypeScript 配置文件
│
└── yarn.lock → yarn 版本 lock 文件
```

## 文档修改

你可以直接在 docs 文件夹内找到对应项目，并修改对应的 Markdown。

确保 `yarn run lint` 与 `yarn run lint:md` 命令没有错误后，即可提交到 GitHub 发起 PR。

如果你想要本地预览项目，由于文档使用本地的主题与插件，你需要通过 `yarn run build` 构建本地项目，才能通过根目录下的对应命令 `yarn run docs/<项目简写>:serve` 启动开发服务器。

## 项目修改

每个项目的结构都大致如下:

```
.
├── lib → 编译后的输出文件
│ │
│ ├── client → 客户端侧代码
│ │
│ └── node → Node.js 侧代码
│
└── src → 源文件
  │
  ├── client → 客户端侧代码
  │
  ├── node → Node.js 侧代码
  │
  └── shared → 客户端和 Node.js 的共享文件
```

由于客户端一侧使用 ES Module (import/export)，而 Node.js 端一侧使用 commonjs (require/exports)，不能交叉引用 node 和 client 文件夹内的代码。

- `client` 文件夹存放客户端代码，使用 esm 格式编译
- `node` 文件夹存放 Node.js 端代码，使用 cjs 格式编译
- `shared` 文件夹主要存放 TypeScript 类型。它可以被 client 和 node 文件夹引用，并编译为 cjs 格式。

为了更好的性能，所有插件在发布时都会使用 rollup 进行打包并压缩。

## 项目的运行与开发

### 构建方式

- 为了更好的性能，所有插件在发布时都会使用 `rollup` 进行打包并压缩。
- 使用 `cpx` 提供的复制与文件监听命令，将其他格式的文件从源文件拷贝到输出目录。

### 命令

1. 构建项目: `yarn run build`

   它会执行 `yarn run build:copy` 和 `yarn run build:ts` 两个命令，对应前文的两种构建步骤。

1. 开发项目: `yarn run dev`

   它会执行 `yarn run dev:copy` 和 `yarn run dev:ts` 两个命令，执行并监听前文的两种构建步骤。

1. 格式化项目: `yarn run lint`

   它会执行 `yarn run lint:eslint` 和 `yarn run lint:prettier` 两个命令。

   如果你修改了 Markdown，你还需要运行 `yarn run lint:md` 命令。

::: warning

请不要混用构建和开发命令，因为它们的构建方式完全不同。

你可能需要执行 `yarn run clean` 命令来清除上一次的构建结果。

:::

## 提交

项目使用 `husky` 与 `lint-staged` 添加了额外的 Git Hooks 进行验证:

- 在 `precommit` 阶段使用 `lint-staged` 配合对应 Linter 对改动的代码进行检验

  这意味着你需要保证你的代码按照项目要求进行格式化，可以通过 Linter。

- 在 `commit-msg` 阶段使用 `commitlint` 对提交备注进行校验。

  这意味着你需要保证你的提交注释符合语义化提交 (Semantic)

::: tip

如果你不能通过上述 Git Hooks，你将无法完成 `git commit`。

如果你已经进行贡献了一些内容，但无法完成提交且不会修复，你可以在提交时添加 `--no-verify` Flag 绕过 Git Hooks。

:::
