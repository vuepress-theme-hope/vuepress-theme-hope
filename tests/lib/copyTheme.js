/*
 * @Author: Mr.Hope
 * @Date: 2019-10-17 19:57:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-17 20:43:28
 * @Description: 复制主题
 */

const fs = require('fs');
const copy = require('./copy');

// 删除并重新创建 theme 文件夹
fs.rmdirSync('./tests/demo/.vuepress/theme', { recursive: true });
fs.mkdirSync('./tests/demo/.vuepress/theme');

// 复制需要的文件到相应文件夹
copy('./components', './tests/demo/.vuepress/theme/components');
copy('./global-components', './tests/demo/.vuepress/theme/global-components');
copy('./layouts', './tests/demo/.vuepress/theme/layouts');
copy('./lib', './tests/demo/.vuepress/theme/lib');
copy('./styles', './tests/demo/.vuepress/theme/styles');
copy('./util', './tests/demo/.vuepress/theme/util');
copy('./index.js', './tests/demo/.vuepress/theme/index.js');
copy('./package.json', './tests/demo/.vuepress/theme/package.json');

console.log('copy finished');
