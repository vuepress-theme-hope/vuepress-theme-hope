/*
 * @Author: Mr.Hope
 * @Date: 2019-10-17 19:57:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-17 22:09:24
 * @Description: 复制主题
 */

const fs = require('fs');
const copy = require('./copy');
const { resolve } = require('path');

// 删除并重新创建 theme 文件夹
fs.rmdirSync(resolve(__dirname, '../../', './tests/demo/.vuepress/theme'), { recursive: true });
fs.mkdirSync(resolve(__dirname, '../../', './tests/demo/.vuepress/theme'));

// 复制需要的文件到相应文件夹
copy(resolve(__dirname, '../../', './components'), resolve(__dirname, '../../', './tests/demo/.vuepress/theme/components'));
copy(resolve(__dirname, '../../', './global-components'), resolve(__dirname, '../../', './tests/demo/.vuepress/theme/global-components'));
copy(resolve(__dirname, '../../', './layouts'), resolve(__dirname, '../../', './tests/demo/.vuepress/theme/layouts'));
copy(resolve(__dirname, '../../', './lib'), resolve(__dirname, '../../', './tests/demo/.vuepress/theme/lib'));
copy(resolve(__dirname, '../../', './styles'), resolve(__dirname, '../../', './tests/demo/.vuepress/theme/styles'));
copy(resolve(__dirname, '../../', './util'), resolve(__dirname, '../../', './tests/demo/.vuepress/theme/util'));
copy(resolve(__dirname, '../../', './index.js'), resolve(__dirname, '../../', './tests/demo/.vuepress/theme/index.js'));
copy(resolve(__dirname, '../../', './package.json'), resolve(__dirname, '../../', './tests/demo/.vuepress/theme/package.json'));

console.log('copy finished');
