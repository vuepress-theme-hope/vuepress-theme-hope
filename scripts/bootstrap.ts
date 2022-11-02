import { existsSync, writeFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { version } from "../package.json";

const packagesDir = resolve(process.cwd(), "packages");

const files = readdirSync(packagesDir);

files.forEach((pkgName) => {
  if (pkgName.charAt(0) === "." || pkgName === "theme") return;

  const desc = `${pkgName} plugin for VuePress`;
  const pkgPath = join(packagesDir, pkgName, "package.json");

  // generate package.json
  if (!existsSync(pkgPath)) {
    const pkgJSON = {
      name: `vuepress-plugin-${pkgName}`,
      version,
      description: desc,
      keywords: [
        "vuepress",
        "vuepress2",
        "vuepress-plugin",
        pkgName,
        "mr-hope",
      ],
      homepage: `https://github.com/vuepress-theme-hope/vuepress-theme-hope/packages/${pkgName}#readme`,
      bugs: {
        url: "https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues",
      },
      repository: {
        type: "git",
        url: "git+https://github.com/vuepress-theme-hope/vuepress-theme-hope.git",
        directory: `packages/${pkgName}`,
      },
      license: "MIT",
      author: {
        name: "Mr.Hope",
        email: "mister-hope@outlook.com",
        url: "https://mrhope.site",
      },
      type: "module",
      exports: {
        ".": "./lib/node/index.js",
        "./package.json": "./package.json",
      },
      main: "lib/node/index.js",
      types: "lib/node/index.d.ts",
      files: ["lib"],
      scripts: {
        build: "rollup -c",
        clean: "rimraf ./lib ./*.tsbuildinfo",
        dev: "pnpm dev:ts",
        "dev:ts": "tsc -b tsconfig.build.json --watch",
      },
      publishConfig: {
        access: "public",
      },
    };

    writeFileSync(pkgPath, `${JSON.stringify(pkgJSON, null, 2)}\n`);
  }

  const readmePath = join(packagesDir, pkgName, "README.md");

  // generate README.md
  if (!existsSync(readmePath))
    writeFileSync(
      readmePath,
      `# vuepress-plugin-${pkgName}

[![Version](https://img.shields.io/npm/v/vuepress-plugin-${pkgName}/next.svg?style=flat-square&logo=npm) ![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-${pkgName}.svg?style=flat-square&logo=npm) ![Size](https://img.shields.io/bundlephobia/min/vuepress-plugin-${pkgName}?style=flat-square&logo=npm)](https://www.npmjs.com/package/vuepress-plugin-${pkgName})

${desc}.

## Install

\`\`\`bash
# pnpm
pnpm add -D vuepress-plugin-${pkgName}@next
# npm
npm i -D vuepress-plugin-${pkgName}@next
# yarn
yarn add -D vuepress-plugin-${pkgName}@next
\`\`\`

---

## 安装

\`\`\`bash
# pnpm
pnpm add -D vuepress-plugin-${pkgName}@next
# npm
npm i -D vuepress-plugin-${pkgName}@next
# yarn
yarn add -D vuepress-plugin-${pkgName}@next
\`\`\`

`
    );
});
