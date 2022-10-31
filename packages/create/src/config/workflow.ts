import { join } from "node:path";

import type { Lang } from "./i18n.js";
import type { PackageManager } from "../utils/index.js";

export const getWorkflowContent = (
  packageManager: PackageManager,
  dir: string,
  lang: Lang
): string =>
  `
name: ${lang === "简体中文" ? "部署文档" : "Deploy Docs"}

on:
  push:
    branches:
      # ${
        lang === "简体中文"
          ? "确保这是你正在使用的分支名称"
          : "make sure this is the branch you are using"
      }
      - main

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          # ${
            lang === "简体中文"
              ? "如果你文档需要 Git 子模块，取消注释下一行"
              : "if your docs needs submodules, uncomment the following line"
          }
          # submodules: true

${
  packageManager === "pnpm"
    ? `\
      - name: ${lang === "简体中文" ? "安装 pnpm" : "Install pnpm"}
        uses: pnpm/action-setup@v2
        with:
          version: 7
          run_install: true
`
    : ""
}

      - name: ${lang === "简体中文" ? "设置 Node.js" : "Setup Node.js"}
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: ${packageManager}

${
  packageManager !== "pnpm"
    ? `\
      - name: ${lang === "简体中文" ? "安装依赖" : "Install Deps"}
        run: ${
          packageManager === "npm"
            ? "npm ci"
            : `${packageManager} install --frozen-lockfile`
        }
`
    : ""
}
      - name: ${lang === "简体中文" ? "构建文档" : "Build Docs"}
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: |-
          ${packageManager} run docs:build
          > ${join(dir, ".vuepress/dist/.nojekyll").replace(/\\/g, "/")}

      - name: ${lang === "简体中文" ? "部署文档" : "Deploy Docs"}
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # ${
            lang === "简体中文"
              ? "这是文档部署到的分支名称"
              : "This is the branch where the docs are deployed to"
          }
          branch: gh-pages
          folder: ${join(dir, ".vuepress/dist").replace(/\\/g, "/")}
`;
