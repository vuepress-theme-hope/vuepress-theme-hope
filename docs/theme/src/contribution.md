---
title: Contribution Guide
icon: creative
category:
  - FAQ
---

We always welcome everyone to contribute! Here is a guide for you.

<!-- more -->

## Clone and Install project

Use Git to clone the project to the local, and use `yarn` to install dependencies.

```sh
git clone git@github.com:vuepress-theme-hope/vuepress-theme-hope.git

yarn
```

::: tip

If you have not installed yarn, please install it using `npm i -g yarn`.

:::

## Project File structure

The project is a monorepo, managed by `lerna`.

- `docs`: place the documentation of each plugin and theme, each subfolder is a project
- `demo`: theme demo project
- `packages`: place the code of each plugin and theme, each subfolder is a project

```
.
├── .github → GitHub config
├── .husky → husky config
│
├── demo → Theme demo project
│
├── docs → document directory
│ ├── add-this → add-this plugin document
│ ├── blog → blog2 plugin document
│ ├── comment → comment2 plugin document
│ ├── components → @mr-hope/components plugin document
│ ├── copy-code → copy-code2 plugin document
│ ├── feed → feed2 plugin document
│ ├── lightgallery → lightgallery plugin document
│ ├── md-enhance → md-enhance plugin document
│ ├── photo-swipe → photo-swipe document
│ ├── pwa → pwa2 plugin document
│ ├── reading-time → reading-time2 plugin document
│ ├── sass-palette → sass-palette plugin document
│ ├── seo → seo2 plugin document
│ └── theme → theme document
│
├── packages → project source code
│ ├── add-this → add-this plugin
│ ├── blog2 → blog2 plugin
│ ├── comment2 → comment2 plugin
│ ├── components → @mr-hope/components plugin
│ ├── copy-code2 → copy-code2 plugin
│ ├── create → create-vuepress-theme-hope helper
│ ├── feed2 → feed2 plugin
│ ├── lightgallery → lightgallery plugin
│ ├── md-enhance → md-enhance plugin
│ ├── photo-swipe → photo-swipe plugin
│ ├── pwa2 → pwa2 plugin
│ ├── reading-time2 → reading-time2 plugin
│ ├── sass-palette → sass-palette plugin
│ ├── seo2 → seo2 plugin
│ ├── shared → shared file
│ ├── sitemap2 → sitemap2 plugin
│ └── theme → vuepress-theme-hope theme
│
├── scripts → command scripts
│
├── ... → some config files
│
├── LICENSE → License
├── package.json → root package.json
├── README.md → project intro
├── SECURITY.md → Security Policy
│
├── tsconfig.* → TypeScript config file
│
└── yarn.lock → yarn version lock file
```

## Document modification

You can find the corresponding project in the docs folder so you can modify the corresponding Markdown directly.

After ensuring that the `yarn run lint` and `yarn run lint:md` commands emit no errors, you can commit to GitHub to open a PR.

To preview the project locally, since the docs are using local themes and plugins, you need to build the local project through `yarn run build`, and then start it with the corresponding command `yarn run docs/<project abbreviation>:serve` in the root directory to start devServer.

## Project modification

The structure of each project is as follows:

```
.
├── lib → compiled output file
│ │
│ ├── client → client-side compiled code
│ │
│ └── node → Node.js side compiled code
│
└── src → source file
  │
  ├── client → client-side souce code
  │
  ├── node → Node.js side  soucecode
  │
  └── shared → Shared files between node and client
```

Since the client-side uses ES Module (import/export) and the Node.js side uses commonjs (require/exports), the code in the node and client folders cannot be cross-referenced.

- `client` folder stores the client code, compiled in esm format
- `node` folder stores the Node.js code, compiled in cjs format
- `shared` folder basically stores TypeScript types, and is compiled in cjs format. It can be referenced by the client and node folders.

For better performance, all plugins are packed and minified using rollup when they are published.

## Project operation and development

### How to build

- For better performance, all plugins are packed and minified using `rollup` when they are published.
- Use `cpx` package to copy and watch files in other formats from the source file to the output directory.

### Command

1. Build project: `yarn run build`

   It will execute the two commands `yarn run build:copy` and `yarn run build:ts`, corresponding to the two build steps.

1. Develop project: `yarn run dev`

   It will execute the two commands `yarn run dev:copy` and `yarn run dev:ts`, and execute and watch the two build steps.

1. Format project: `yarn run lint`

   It will execute the two commands `yarn run lint:eslint` and `yarn run lint:prettier`.

   If you modify Markdown, you also need to run the `yarn run lint:md` command.

::: warning

Please do not mix build and dev commands as they compile in completely different ways.

You may need to execute the `yarn run clean` command to clear the last build results.

:::

## Commit

The project uses `husky` and `lint-staged` to add Git Hooks for verification:

- In `precommit` stage: use `lint-staged` to check the changed code with the corresponding Linter

  This means that you need to ensure that your code is formatted by the project requirements and can pass Linter tests.

- In `commit-msg` stage: use `commitlint` to verify the commit comment.

  This means that you need to ensure that your commit comments comply with Semantic

::: tip

If you cannot pass the above Git Hooks, you will not be able to complete `git commit`.

If you have already contributed something, but cannot make a commit and don’t know how to fix it, you can add the `--no-verify` flag when committing to bypass Git Hooks.

:::
