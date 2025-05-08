# Contribution Guide

We always welcome everyone to contribute! Here is a guide for you.

## Docs

- [English](https://theme-hope.vuejs.press/contribution.html)
- [简体中文](https://theme-hope.vuejs.press/zh/contribution.html)
- [Русский](https://theme-hope-ru.vuejs.press/contribution.html)

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
│ ├── shared → vuepress-shared document
│ └── theme → theme document
│
├── docs-shared → common files for docs
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

For better performance, all plugins are packed and minified using rollup when they are published.

## Project Development

1. Build project: `pnpm build`

   - Use rollup to bundle source files and minify them, and output results to `lib` folder
   - Use `rollup-plugin-copy` to copy other files to `lib` folder

1. Develop project: `pnpm dev`

   - Use `tsc` to compile ts file to `lib` folder
   - Use `cpx` to copy other files to `lib` folder

1. Format project: `pnpm lint`

   It will format the project using prettier, eslint and stylelint.

   If you modify Markdown, you also need to run the `pnpm lint:md` command.

Please do not mix build and dev commands as they compile in completely different ways.

You may need to execute the `pnpm clean` command to clear previous command result.

## Commit

The project uses `husky` to add Git Hooks for verification:

- In `precommit` stage: we use `lint-staged` to check the changed code with the corresponding Linter

  This means that you need to ensure that your code is formatted by the project requirements and can pass Linter tests.

- In `commit-msg` stage: we use `commitlint` to verify the commit comment.

  This means that you need to ensure that your commit comments comply with Semantic

If you cannot pass the above Git Hooks, you will not be able to complete `git commit`.

If you have already contributed something, but cannot make a commit and don’t know how to fix it, you can add the `--no-verify` flag when committing to bypass Git Hooks.
