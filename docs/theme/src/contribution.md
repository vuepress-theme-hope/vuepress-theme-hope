---
title: Contribution Guide
icon: creative
category: FAQ
---

We welcome you to contribute! Here is a guide for you.

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
- demo: theme demo project
- packages: place the code of each plugin and theme, each subfolder is a project

```
.
├── .github → Github config
├── .husky → husky config
│
├── demo → Theme demo project
│
├── docs → document directory
│ ├── add-this → add-this document
│ ├── comment → comment document
│ ├── copy-code → copy-code document
│ ├── feed → feed document
│ ├── git → git document
│ ├── md-enhance → md-enhance document
│ ├── photo-swipe → photo-swipe document
│ ├── pwa → pwa document
│ ├── reading-time → reading-time document
│ ├── seo → seo document
│ ├── sitemap → sitemap document
│ └── theme → theme document
│
├── packages → project source code
│ ├── add-this → add-this plugin
│ ├── comment → comment plugin
│ ├── components → components plugin
│ ├── copy-code → copy-code plugin
│ ├── create → create-vuepress-theme-hope helper
│ ├── feed → feed plugin
│ ├── git → git plugin
│ ├── md-enhance → md-enhance plugin
│ ├── photo-swipe → photo-swipe plugin
│ ├── pwa → pwa plugin
│ ├── reading-time → reading-time plugin
│ ├── seo → seo plugin
│ ├── shared → shared file
│ ├── sitemap → sitemap plugin
│ ├── theme → vuepress-theme-hope theme
│ ├── theme-types → theme type definition
│ └── vuepress-types → vuepress type definition
│
├── scripts → command scripts
│
├── ... → some config files
│
├── LICENSE → License
├── package.json → root package.json
├── readme.md → project intro
├── SECURITY.md → Security Policy
│
├── tsconfig.* → TypeScript config file
│
└── yarn.lock → yarn version lock file
```

## Document modification

You can find the corresponding project in the docs folder so you can modify the corresponding Markdown directly.

After ensuring that the `yarn run lint` and `yarn run lint:md` commands emit no errors, you can commit to GitHub to open a PR.

If you want to preview the project locally, since the docs are using local themes and plugins, you need to build the local project through `yarn run build`, and then start it with the corresponding command `yarn run docs/<project abbreviation>:serve` in the root directory to start devServer.

## Project modification

The structure of each project is as follows:

```
.
├── lib → compiled output file
│ │
│ ├── client → client-side compiled code
│ │
│ ├── node → Node.js side compiled code
│ │
│ └── types → Type definition to be exported
│
└── src → source file
  │
  ├── client → client-side souce code
  │
  ├── node → Node.js side  soucecode
  │
  └── types → Type definition to be exported
```

Since VuePress@v1 requires the client to export the plugin API through `module.exports`, we cannot export other types in the plugin entry file, so we point the type entrance to `lib/types`.

Besides, since the client side uses ES Module (import/export) and the Node.js side uses commonjs (require/exports), the code in the node and client folders cannot be cross-referenced.

- `client` folder stores the client code, compiled in esm format
- `node` folder stores the Node.js code, compiled in cjs format
- `types` folder can only store TypeScript types. It can be referenced by the client and node folders, and finally exported as a type definition to other packages.

## Project operation and development

### How to build

- Use `build` and `watch` commands provided by TypeScript to compile ts files, and output the compiled js file to the output directory.
- Use `cpx` package to copy and watch files in other formats from the source file to the output directory.

### Command

1. Build project: `yarn run build`

   It will execute the two commands `yarn run build:copy` and `yarn run build:ts`, corresponding to the two build steps.

1. Develop project: `yarn run dev`

   It will execute the two commands `yarn run dev:copy` and `yarn run dev:ts`, and execute and watch the two build steps.

1. Format project: `yarn run lint`

   It will execute the two commands `yarn run lint:eslint` and `yarn run lint:prettier`.

   If you modify Markdown, you also need to run the `yarn run lint:md` command.

## Commit

The project uses `husky` and `lint-staged` to add Git Hooks for verification:

- In `precommit` stage: use `lint-staged` to check the changed code with the corresponding Linter

  This means that you need to ensure that your code is formatted by the project requirements and can pass Linter tests.

- In `commit-msg` stage: use `commitlint` to verify the commit comment.

  This means that you need to ensure that your commit comments comply with Semantic

::: tip

If you cannot pass the above Git Hooks, you will not be able to complete `git commit`.

If you have already contributed, but cannot complete the submission and don’t know how to fix it, you can add the `--no-verify` flag when committing to bypass Git Hooks.

:::
