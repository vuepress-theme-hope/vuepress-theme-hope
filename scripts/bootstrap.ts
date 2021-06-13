import { existsSync, writeFileSync, readdirSync } from "fs";
import { join, resolve } from "path";
import { version } from "../packages/theme/package.json";

const packagesDir = resolve(__dirname, "../packages/");
const files = readdirSync(packagesDir);

files.forEach((pkgName) => {
  if (pkgName.charAt(0) === "." || pkgName === "theme") return;

  const desc = `${pkgName} plugin for VuePress`;
  const pkgPath = join(packagesDir, pkgName, "package.json");

  // generate package.json
  if (!existsSync(pkgPath)) {
    const pkgJSON = {
      name: `@mr-hope/vuepress-plugin-${pkgName}`,
      version,
      description: desc,
      main: "node/index.js",
      types: "node/index.d.ts",
      publishConfig: {
        access: "public",
      },
      repository: {
        type: "git",
        url: "git+https://github.com/vuepress-theme-hope/vuepress-theme-hope.git",
        directory: `packages/${pkgName}`,
      },
      keywords: ["vuepress-plugin", "vuepress", pkgName, "mr-hope"],
      author: {
        email: "zhangbowang1998@gmail.com",
        name: "Mr.Hope",
        url: "https://mrhope.site",
      },
      license: "MIT",
      bugs: {
        url: "https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues",
      },
      homepage: `https://github.com/vuepress-theme-hope/vuepress-theme-hope/packages/${pkgName}#readme`,
    };

    writeFileSync(pkgPath, `${JSON.stringify(pkgJSON, null, 2)}\n`);
  }

  const readmePath = join(packagesDir, pkgName, "readme.md");

  // generate readme.md
  if (!existsSync(readmePath))
    writeFileSync(
      readmePath,
      `# @mr-hope/vuepress-plugin-${pkgName}

[![Version](https://img.shields.io/npm/v/@mr-hope/vuepress-plugin-${pkgName}.svg?style=flat-square&logo=npm) ![Downloads](https://img.shields.io/npm/dm/@mr-hope/vuepress-plugin-${pkgName}.svg?style=flat-square&logo=npm) ![Size](https://img.shields.io/bundlephobia/min/@mr-hope/vuepress-plugin-${pkgName}?style=flat-square&logo=npm)](https://www.npmjs.com/package/@mr-hope/vuepress-plugin-${pkgName})

${desc}.

## Usage

\`\`\`bash
yarn add @mr-hope/vuepress-plugin-${pkgName}
\`\`\`

Or

\`\`\`bash
npm i @mr-hope/vuepress-plugin-${pkgName}
\`\`\`

---

VuePress 的 ${pkgName} 插件。

## 使用

\`\`\`bash
yarn add @mr-hope/vuepress-plugin-${pkgName}
\`\`\`

或

\`\`\`bash
npm i @mr-hope/vuepress-plugin-${pkgName}
\`\`\`
`
    );
});
