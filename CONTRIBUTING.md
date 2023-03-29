# Contribution Guide

We always welcome everyone to contribute! Here is a guide for you.

## Docs

- [English](https://theme-hope.vuejs.press/contribution.html)
- [简体中文](https://theme-hope.vuejs.press/zh/contribution.html)
- [Русский](https://theme-hope-ru.vuejs.press/contribution.html)

## Clone and Install Project

Use Git to clone the project to the local, and use `pnpm` to install dependencies.

```sh
git clone git@github.com:vuepress-theme-hope/vuepress-theme-hope.git

pnpm i
```

If you have not installed pnpm, please install it using the following command.

```sh
corepack enable
corepack prepare pnpm@latest --activate
```

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
│ ├── auto-catalog → auto-catalog plugin document
│ ├── blog → blog2 plugin document
│ ├── comment → comment2 plugin document
│ ├── components → components plugin document
│ ├── copy-code → copy-code2 plugin document
│ ├── feed → feed2 plugin document
│ ├── lightgallery → lightgallery plugin document
│ ├── md-enhance → md-enhance plugin document
│ ├── photo-swipe → photo-swipe document
│ ├── pwa → pwa2 plugin document
│ ├── reading-time → reading-time2 plugin document
│ ├── remove-pwa → remove-pwa plugin document
│ ├── rtl → rtl plugin document
│ ├── sass-palette → sass-palette plugin document
│ ├── shared → vuepress-shared document
│ ├── search-pro → search-pro plugin document
│ ├── seo → seo2 plugin document
│ └── theme → theme document
│
├── docs-shared → common files for docs
|
├── packages → project source code
│ ├── auto-catalog → auto-catalog plugin
│ ├── blog2 → blog2 plugin
│ ├── comment2 → comment2 plugin
│ ├── components → components plugin
│ ├── copy-code2 → copy-code2 plugin
│ ├── create → create-vuepress-theme-hope helper
│ ├── feed2 → feed2 plugin
│ ├── lightgallery → lightgallery plugin
│ ├── md-enhance → md-enhance plugin
│ ├── photo-swipe → photo-swipe plugin
│ ├── pwa2 → pwa2 plugin
│ ├── reading-time2 → reading-time2 plugin
│ ├── remove-pwa → remove-pwa plugin
│ ├── rtl → rtl plugin
│ ├── sass-palette → sass-palette plugin
│ ├── search-pro → search-pro plugin
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
└── tsconfig.* → TypeScript config file
```

## Document Modification

You can find the corresponding project in the docs directory so you can modify the corresponding Markdown directly.

After ensuring that the `pnpm lint` and `pnpm lint:md` commands emit no errors, you can commit to GitHub to open a PR.

### Preview Docs

Since the docs are using local themes and plugins, you need to build the local project through `pnpm build` first.

To start previewing, cd to the right project under `docs` directory, then run `pnpm docs:vite-dev` (using vite) or `pnpm docs:webpack-dev` (using webpack).

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
