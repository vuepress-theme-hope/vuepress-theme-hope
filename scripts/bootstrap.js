/*
 * @Author: Mr.Hope
 * @Date: 2019-11-05 13:10:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-05 13:32:49
 * @Description: Bootstrap package
 */

const fs = require('fs');
const path = require('path');
/** 主题当前版本 */
const baseVersion = require('../packages/vuepress-theme-hope/package.json')
  .version;

const packagesDir = path.resolve(__dirname, '../packages/');
const files = fs.readdirSync(packagesDir);

// eslint-disable-next-line max-lines-per-function
files.forEach(pkgName => {
  if (pkgName.charAt(0) === '.' || pkgName === 'vuepress-theme-hope') return;

  const desc = `${pkgName} plugin for vuepress-theme-hope`;
  const pkgPath = path.join(packagesDir, pkgName, 'package.json');

  // 生成 package.json
  if (!fs.existsSync(pkgPath)) {
    const pkgJSON = {
      name: `@mr-hope/vuepress-plugin-${pkgName}`,
      version: baseVersion,
      description: desc,
      main: 'index.js',
      publishConfig: {
        access: 'public'
      },
      repository: {
        type: 'git',
        url: 'git+https://github.com/Mister-Hope/vuepress-theme-hope.git'
      },
      keywords: ['vuepress-plugin', pkgName],
      author: 'Mr.Hope',
      license: 'MIT',
      bugs: {
        url: 'https://github.com/Mister-Hope/vuepress-theme-hope/issues'
      },
      homepage: `https://github.com/Mister-Hope/vuepress-theme-hope/packages/${pkgName}#readme`
    };

    fs.writeFileSync(pkgPath, JSON.stringify(pkgJSON, null, 2));
  }

  const readmePath = path.join(packagesDir, pkgName, 'readme.md');

  // 生成 readme
  if (!fs.existsSync(readmePath))
    fs.writeFileSync(
      readmePath,
      `# @mr-hope/vuepress-plugin-${pkgName}

[![Version](https://img.shields.io/npm/v/@mr-hope/vuepress-plugin-${pkgName}.svg?style=flat-square&logo=npm) ![Downloads](https://img.shields.io/npm/dm/@mr-hope/vuepress-plugin-${pkgName}.svg?style=flat-square&logo=npm) ![Size](https://img.shields.io/bundlephobia/min/@mr-hope/vuepress-plugin-${pkgName}?style=flat-square&logo=npm)](https://www.npmjs.com/package/@mr-hope/vuepress-plugin-${pkgName})

${desc}.

## Usage

\`\`\`bash
npm i @mr-hope/vuepress-plugin-${pkgName}
\`\`\`

---

vuepress-theme-hope 的 ${pkgName} 插件。

## 使用

\`\`\`bash
npm i @mr-hope/vuepress-plugin-${pkgName}
\`\`\`
`
    );
});
