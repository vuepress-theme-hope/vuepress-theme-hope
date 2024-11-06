import { join } from "node:path";

import { execaCommandSync } from "execa";

import type { PackageManager } from "../config/index.js";
import type { CreateLocale } from "../i18n/index.js";

export const getWorkflowContent = (
  packageManager: PackageManager,
  cwd: string,
  dir: string,
  { workflow }: CreateLocale,
): string =>
  `
name: ${workflow.name}

on:
  push:
    branches:
      - ${execaCommandSync("git branch --show-current", { cwd }).stdout.trim()}

permissions:
  contents: write

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          # ${workflow.submodule}
          # submodules: true

${
  packageManager === "pnpm"
    ? `\
      - name: ${workflow.setupPnpm}
        uses: pnpm/action-setup@v4
`
    : ""
}

      - name: ${workflow.setupNode}
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: ${packageManager}

      - name: ${workflow.install}
        run: |
          corepack enable
          ${
            packageManager === "npm"
              ? "npm ci"
              : `${packageManager} install --frozen-lockfile`
          }

      - name: ${workflow.build}
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: |-
          ${packageManager} run docs:build
          > ${join(dir, ".vuepress/dist/.nojekyll").replace(/\\/g, "/")}

      - name: ${workflow.deploy}
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # ${workflow.deploy}
          branch: gh-pages
          folder: ${join(dir, ".vuepress/dist").replace(/\\/g, "/")}
`;
