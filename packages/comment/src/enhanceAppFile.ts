/*
 * @Author: Mr.Hope
 * @Date: 2020-01-08 20:40:27
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-13 18:29:30
 * @Description: 增强文件
 */

import Comment from './Comment.vue';
import { EnhanceApp } from 'vuepress-types';
import PageInfo from './PageInfo.vue';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('Comment', Comment);
  Vue.component('PageInfo', PageInfo);
};

export default enhanceApp;
