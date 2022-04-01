import { join } from "path";

import { checkForNextVersion } from "./checkVersion";
import { detectYarn } from "./hasYarn";

import type { Lang } from "./i18n";

const EN_WORKFLOW = `
name: Deploy Docs

on:
  push:
    branches:
      # make sure this is the branch you are using
      - main

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          # if your docs needs submodules, uncomment the following line
          # submodules: true

      - uses: actions/cache@v3
        id: node-modules
        with:
          path: node_modules/
          key: \${{ runner.os }}-node-modules-\${{ hashFiles('yarn.lock') }}
          restore-keys: |
            \${{ runner.os }}-node-modules-

      - name: Install Deps
        if: steps.node-modules.outputs.cache-hit != 'true'
        run: yarn install --frozen-lockfile

      - name: Build Docs
        env:
          NODE_OPTIONS: --max_old_space_size=4096
        run: yarn run docs:build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # This is the branch where the docs are deployed to
          branch: gh-pages
          folder: VUEPRESS_DIST_FOLDER

`;

const ZH_WORKFLOW = `
name: 部署文档

on:
  push:
    branches:
      # 确保这是你正在使用的分支名称
      - main

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          # 如果你文档需要 Git 子模块，取消注释下一行
          # submodules: true

      - uses: actions/cache@v3
        id: node-modules
        with:
          path: node_modules/
          key: \${{ runner.os }}-node-modules-\${{ hashFiles('yarn.lock') }}
          restore-keys: |
            \${{ runner.os }}-node-modules-

      - name: Install Deps
        if: steps.node-modules.outputs.cache-hit != 'true'
        run: yarn install --frozen-lockfile

      - name: Build Docs
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: yarn run build:webpack

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # 这是文档部署到的分支名称
          branch: gh-pages
          folder: VUEPRESS_DIST_FOLDER

`;

export const bin = detectYarn() ? "yarn" : "npm";

export const getScript = (dir: string): Record<string, string> => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:build": `vuepress build ${dir}`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:clean-dev": `vuepress dev ${dir} --clean-cache`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:dev": `vuepress dev ${dir}`,
});

export const getWorkflowContent = (dir: string, lang: Lang): string =>
  (lang === "简体中文" ? ZH_WORKFLOW : EN_WORKFLOW).replace(
    "VUEPRESS_DIST_FOLDER",
    join(dir, ".vuepress/dist").replace(/\\/g, "/")
  );

export const getDevDependencies = async (): Promise<Record<string, string>> => {
  const vuepressVersion = await checkForNextVersion("vuepress", bin);
  const themeVersion = await checkForNextVersion("vuepress-theme-hope", bin);

  return {
    vuepress: `^${vuepressVersion}`,
    "vuepress-theme-hope": `^${themeVersion}`,
  };
};

export const getGitIgnorePath = (dir: string): string => `
node_modules/
${dir}/.vuepress/.cache/
${dir}/.vuepress/.temp/
${dir}/.vuepress/dist/
`;
