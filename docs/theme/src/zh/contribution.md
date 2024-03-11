---
title: 贡献指南
icon: lightbulb
category:
  - FAQ
---

我们永远欢迎你对项目进行贡献! 这里是一份相关指南。

<!-- more -->

## 克隆并安装项目

你应该预先安装 Node.js 和 Git，并使用 `corepack enable` 启用 corepack。

使用 Git 克隆项目到本地，并安装依赖:

```sh
git clone git@github.com:vuepress-theme-hope/vuepress-theme-hope.git
pnpm i
```

## 项目文件结构

本项目是一个 monorepo，使用 pnpm 管理。

- docs: 放置各插件与主题的文档，每个子文件夹为一个项目
- demo: 主题演示项目
- packages: 放置各插件与主题的代码，每个子文件夹为一个项目

```
.
├── .github → GitHub 配置
├── .husky → husky 配置
│
├── demo → 演示项目
│
├── docs → 文档目录
│ ├── components → components 插件文档
│ ├── lightgallery → lightgallery 插件文档
│ ├── md-enhance → md-enhance 插件文档
│ ├── sass-palette → sass-palette 插件文档
│ ├── shared → vuepress-shared 文档
│ ├── search-pro → search-pro 插件文档
│ └── theme → 主题文档
│
├── docs-shared → 文档的通用文件
|
├── packages → 项目源代码
│ ├── components → components 插件
│ ├── create → create-vuepress-theme-hope 助手
│ ├── lightgallery → lightgallery 插件
│ ├── md-enhance → md-enhance 插件
│ ├── sass-palette → sass-palette 插件
│ ├── search-pro → search-pro 插件
│ ├── shared → 共享文件
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
└── tsconfig.* → TypeScript 配置文件
```

## 文档修改

你可以直接在 docs 文件夹内找到对应项目，并修改对应的 Markdown。

确保 `pnpm lint` 与 `pnpm lint:md` 命令没有错误后，即可提交到 GitHub 发起 PR。

::: tip 预览文档

由于文档使用的是本地主题和插件，因此你需要先通过 `pnpm build` 构建本地项目。

之后在 `docs` 目录下的正确文档项目文件夹打开终端，运行 `pnpm docs:vite-dev` (使用 vite) 或 `pnpm docs:webpack-dev` (使用 webpack)。

:::

## 项目修改

每个项目的结构都大致如下:

```
.
├── lib → 编译后的输出文件
│    │
│    ├── client → 客户端侧代码
│    │
│    └── node → Node.js 侧代码
│
└── src → 源文件
     │
     ├── client → 客户端侧代码
     │
     ├── node → Node.js 侧代码
     │
     └── shared → 客户端和 Node.js 的共享文件
```

VuePress 同时运行在客户端和 Node 端。 Node 侧有像 `fs` 这样的 node 模块，而客户端运行在有`document``windows``navigator`等全局变量的浏览器中，你应该清楚一段代码运行在哪里。

- `client` 目录存储在浏览器中运行的代码
- `node` 目录存储在 Node.js 中运行的代码
- `shared` 目录存储在客户端和 Node 中使用的文件，因此代码不应引用任何浏览器全局变量或 node 模块。

为了更好的性能，所有插件在发布时都会使用 rollup 进行打包并压缩。

## 项目的运行与开发

1. 构建项目: `pnpm build`

   - 使用 rollup 打包并压缩代码，并输出到 `lib` 文件夹
   - 使用 `rollup-plugin-copy` 复制其他文件到 `lib` 文件夹

1. 开发项目: `pnpm dev`

   - 使用 `tsc` 编译 TypeScript 文件到 `lib` 文件夹
   - Use `cpx` 复制其他文件到 `lib` 文件夹

1. 格式化项目: `pnpm lint`

   它将使用 prettier、eslint 和 stylelint 格式化项目。

   如果你修改了 Markdown，你还需要运行 `pnpm lint:md` 命令。

::: warning

请不要混用构建和开发命令，因为它们的构建方式完全不同。

你可能需要执行 `pnpm clean` 命令来清除上一次的命令结果。

:::

## 提交

项目使用 `husky` 添加了额外的 Git Hooks 进行验证:

- 在 `precommit` 阶段我们使用 `lint-staged` 配合对应 Linter 对改动的代码进行检验

  这意味着你需要保证你的代码按照项目要求进行格式化，可以通过 Linter。

- 在 `commit-msg` 阶段我们使用 `commitlint` 对提交备注进行校验。

  这意味着你需要保证你的提交注释符合语义化提交 (Semantic)

::: tip

如果你不能通过上述 Git Hooks，你将无法完成 `git commit`。

如果你已经进行贡献了一些内容，但无法完成提交且不会修复，你可以在提交时添加 `--no-verify` Flag 绕过 Git Hooks。

:::
