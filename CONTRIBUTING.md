# Contribution Guide

We always welcome everyone to contribute! Here is a guide for you.

## Docs

- [English](https://theme-hope.vuejs.press/contribution.html)
- [简体中文](https://theme-hope.vuejs.press/zh/contribution.html)

## Clone and Install Project

If you have not enabled corepack, run `corepack enable` first.

Use Git to clone the project to the local, and use `pnpm` to install dependencies.

```sh
git clone git@github.com:vuepress-theme-hope/vuepress-theme-hope.git

pnpm i
```

Note: Development requires latest LTS version of Node.js.

## Project File Structure

The project is a monorepo, managed by pnpm.

- `docs`: place the documentation of each plugin and theme, each subdirectory is a project
- `demo`: theme demo project
- `packages`: place the code of each plugin and theme, each subdirectory is a project

```
.
├── .github → GitHub config
├── .husky → husky config
│
├── demo → Demo projects
│
├── docs → document directory
│ ├── components → components plugin document
│ ├── lightgallery → lightgallery plugin document
│ ├── md-enhance → md-enhance plugin document
│ ├── shared → common files for docs
│ └── theme → theme document
|
├── packages → project source code
│ ├── components → components plugin
│ ├── create → create-vuepress-theme-hope helper
│ ├── lightgallery → lightgallery plugin
│ ├── md-enhance → md-enhance plugin
│ ├── shared → shared file
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
└── tsconfig.* → TypeScript config file
```

## Document Modification

You can find the corresponding project in the docs directory so you can modify the corresponding Markdown directly.

After ensuring that the `pnpm lint` and `pnpm lint:md` commands emit no errors, you can commit to GitHub to open a PR.

### Preview Docs

Since the docs are using local themes and plugins, you need to build the local project through `pnpm build` first.

To start previewing, cd to the right project under `docs` directory, then run `pnpm docs:vite-dev` (using Vite) or `pnpm docs:webpack-dev` (using Webpack).

## Project Modification

The structure of each project is as follows:

```
.
├── lib → compiled output file
│    │
│    ├── client → client-side compiled code
│    │
│    └── node → Node.js side compiled code
│
└── src → source file
     │
     ├── client → client-side source code
     │
     ├── node → Node.js side source code
     │
     └── shared → Shared files between node and client
```

VuePress is running both in client side and node side. Node side has node module like `fs`, while client side is running in browser which has `document` `windows` `navigator` etc. globals, you should be aware of where a piece of code is running.

- `client` directory stores code running in browser
- `node` directory stores code running in Node.js
- `shared` directory stores files that are used in both client and node, so code shall not reference any browser globals or node module.

For better performance, all plugins are packed and minified using tsdown when they are published.

## Project Development

1. Build project: `pnpm build`
   Bundles and minifies source files into the `dist` folder using `tsdown`. Static assets are also automatically copied to the `dist` folder during this process.

1. Develop project: `pnpm dev`
   Compiles and bundles source files into the `dist` folder via `tsdown` for development.

   ::: note Theme Bundle Mode
   The theme bundling logic differs from the standard process. It introduces a `hope-custom` export field to support theme component replacement via aliases. Consequently, extra scripts and build steps are implemented to provide both a standard client bundle and a compiled output that preserves these aliases.
   :::

1. Format project: `pnpm lint`
   Lints and formats the codebase using `oxlint`, `oxfmt`, and `stylelint`.

   ::: note Markdown Files
   If you modify Markdown files, you must also run the `pnpm lint:md` command.
   :::

## Commit

The project uses `husky` to add Git Hooks for verification:

- In `precommit` stage: we use `lint-staged` to check the changed code with the corresponding Linter

  This means that you need to ensure that your code is formatted by the project requirements and can pass Linter tests.

- In `commit-msg` stage: we use `commitlint` to verify the commit comment.

  This means that you need to ensure that your commit comments comply with Semantic

If you cannot pass the above Git Hooks, you will not be able to complete `git commit`.

If you have already contributed something, but cannot make a commit and don’t know how to fix it, you can add the `--no-verify` flag when committing to bypass Git Hooks.
