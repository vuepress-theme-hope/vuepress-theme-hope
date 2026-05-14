import { execSync } from "node:child_process";
import { join } from "node:path";

import type { PackageManager } from "../config/index.js";
import type { CreateLocale } from "../i18n/index.js";

export const getWorkflowContent = (
  packageManager: PackageManager,
  cwd: string,
  dir: string,
  { workflow }: CreateLocale,
): string => {
  const currentBranch = execSync("git branch --show-current", {
    cwd,
    encoding: "utf-8",
  }).trim();

  return `
name: ${workflow.name}

on:
  push:
    branches:
      - ${currentBranch}

permissions:
  contents: write

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6
        with:
          fetch-depth: 0
          # ${workflow.submodule}
          # submodules: true

${
  packageManager === "pnpm"
    ? `\
      - name: ${workflow.setupPnpm}
        uses: pnpm/action-setup@v6
`
    : ""
}

      - name: ${workflow.setupNode}
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: ${packageManager}

      - name: ${workflow.install}
        run: |
          corepack enable
          ${packageManager === "yarn" ? "yarn install --frozen-lockfile" : `${packageManager} ci`}

      - name: ${workflow.build}
        env:
          NODE_OPTIONS: --max_old_space_size=4096
        run: |-
          ${packageManager} run docs:build
          > ${join(dir, ".vuepress/dist/.nojekyll").replaceAll(String.raw`\\`, "/")}

      - name: ${workflow.deploy}
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # ${workflow.deploy}
          branch: gh-pages
          folder: ${join(dir, ".vuepress/dist").replaceAll(String.raw`\\`, "/")}
`;
};
