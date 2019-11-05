/* eslint-disable no-console */
/*
 * @Author: Mr.Hope
 * @Date: 2019-10-17 19:57:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-05 12:16:23
 * @Description: 复制主题到文档
 */

const fs = require('fs');
const copy = require('../../scripts/copy');

// 删除并重新创建 theme 文件夹
try {
  fs.rmdirSync('./docs/.vuepress/theme', { recursive: true });
} catch (err) {
  console.log('theme 目录不存在');
}

fs.mkdirSync('./docs/.vuepress/theme');

// 复制需要的文件到相应文件夹
copy('./src', './docs/.vuepress/theme');
copy('./package.json', './docs/.vuepress/theme/package.json');

console.log('copy finished');
