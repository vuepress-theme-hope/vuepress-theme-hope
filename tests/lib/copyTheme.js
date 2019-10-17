/*
 * @Author: Mr.Hope
 * @Date: 2019-10-17 19:57:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-17 22:27:10
 * @Description: 复制主题
 */

const fs = require('fs');
const copy = require('./copy');

// 删除并重新创建 theme 文件夹
try {
  fs.rmdirSync('./tests/demo/.vuepress/theme', { recursive: true });
} catch (err) {
  console.log('theme 目录不存在');
}

fs.mkdirSync('./tests/demo/.vuepress/theme');

// 复制需要的文件到相应文件夹
['components', 'global-components', 'layouts', 'lib', 'styles', 'util', 'index.js', 'package.json'].forEach(x => {
  copy(`./${x}`, `./tests/demo/.vuepress/theme/${x}`);
});

console.log('copy finished');
