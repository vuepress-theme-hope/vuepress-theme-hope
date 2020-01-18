/*
 * @Author: Mr.Hope
 * @Date: 2020-01-08 20:40:27
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-18 16:15:39
 * @Description: 注册组件
 */

import Comment from './Comment.vue';
import { EnhanceApp } from 'vuepress-types';
import PageInfo from './PageInfo.vue';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('Comment', Comment);
  Vue.component('PageInfo', PageInfo);
};

export default enhanceApp;
