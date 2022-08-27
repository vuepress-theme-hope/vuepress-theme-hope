import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execaCommandSync } from "execa";
import inquirer from "inquirer";

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url);

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(__filename);

import {
  checkGitInstalled,
  checkGitRepo,
  copy,
  ensureDirExistSync,
} from "../utils/index.js";

import type { CreateI18n, Lang } from "./i18n.js";
import type { PackageManager } from "../utils/index.js";

const getWorkflowContent = (
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
    ? `
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
          node-version: 16
          cache: ${packageManager}

      - name: ${lang === "简体中文" ? "安装依赖" : "Install Deps"}
        run: ${
          packageManager === "npm"
            ? "npm install"
            : `${packageManager} install --frozen-lockfile`
        }

      - name: ${lang === "简体中文" ? "构建文档" : "Build Docs"}
        env:
          NODE_OPTIONS: --max_old_space_size=4096
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

const getGitIgnorePath = (dir: string): string => `
node_modules/
${dir}/.vuepress/.cache/
${dir}/.vuepress/.temp/
${dir}/.vuepress/dist/
`;

const updateGitIgnore = (dir: string): void => {
  const gitignorePath = resolve(process.cwd(), ".gitignore");

  const gitignoreContent = existsSync(gitignorePath)
    ? readFileSync(gitignorePath, {
        encoding: "utf-8",
      })
    : "";

  writeFileSync(gitignorePath, `${gitignoreContent}${getGitIgnorePath(dir)}`, {
    encoding: "utf-8",
  });
};

export const generateTemplate = async (
  packageManager: PackageManager,
  dir: string,
  lang: Lang,
  message: CreateI18n
): Promise<void> => {
  const { i18n, workflow } = await inquirer.prompt<{
    i18n: boolean;
    workflow: boolean;
  }>([
    {
      name: "i18n",
      type: "confirm",
      message: message.i18nMessage,
      default: false,
    },
    {
      name: "workflow",
      type: "confirm",
      message: message.workflowMessage,
      default: true,
    },
  ]);

  console.log(message.template);

  const templateFolder = i18n
    ? "i18n"
    : lang === "简体中文"
    ? "zh-CN"
    : "en-US";

  copy(
    resolve(__dirname, "../template", templateFolder),
    resolve(process.cwd(), dir)
  );

  if (workflow) {
    const workflowDir = resolve(process.cwd(), ".github/workflows");

    ensureDirExistSync(workflowDir);

    writeFileSync(
      resolve(workflowDir, "deploy-docs.yml"),
      getWorkflowContent(packageManager, dir, lang),
      { encoding: "utf-8" }
    );
  }

  // git related
  const isGitRepo = checkGitRepo();

  if (isGitRepo) updateGitIgnore(dir);
  else if (checkGitInstalled()) {
    const { git } = await inquirer.prompt<{
      git: boolean;
    }>([
      {
        name: "git",
        type: "confirm",
        message: message.gitMessage,
        default: true,
      },
    ]);

    if (git) {
      execaCommandSync("git init");
      updateGitIgnore(dir);
    }
  }
};
