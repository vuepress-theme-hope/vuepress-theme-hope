import { join } from "path";

import { bin } from "./bin";
import { checkForNextVersion } from "./checkVersion";

import type { Lang } from "./i18n";

export const getScript = (dir: string): Record<string, string> => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:build": `vuepress build ${dir}`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:clean-dev": `vuepress dev ${dir} --clean-cache`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:dev": `vuepress dev ${dir}`,
});

export const getWorkflowContent = (dir: string, lang: Lang): string =>
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
  bin === "pnpm"
    ? `
      - name: ${lang === "简体中文" ? "安装 pnpm" : "Install pnpm"}
        uses: pnpm/action-setup@v2
        with:
          version: 6
  `
    : ""
}

      - name: ${lang === "简体中文" ? "设置 Node.js" : "Setup Node.js"}
        uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: ${bin}

      - name: ${lang === "简体中文" ? "安装依赖" : "Install Deps"}
        run: ${
          bin === "npm" ? "npm install" : `${bin} install --frozen-lockfile`
        }

      - name: ${lang === "简体中文" ? "构建文档" : "Build Docs"}
        env:
          NODE_OPTIONS: --max_old_space_size=4096
        run: ${bin} run docs:build

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

export const getDevDependencies = async (): Promise<Record<string, string>> => {
  const [vuepressClientVersion, vueVersion, vuepressVersion, themeVersion] =
    await Promise.all([
      checkForNextVersion("@vuepress/client"),
      checkForNextVersion("vue"),
      checkForNextVersion("vuepress"),
      checkForNextVersion("vuepress-theme-hope"),
    ]);

  return {
    "@vuepress/client": `^${vuepressClientVersion}`,
    vue: `^${vueVersion}`,
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
