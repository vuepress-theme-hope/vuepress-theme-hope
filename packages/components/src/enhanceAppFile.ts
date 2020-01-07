/*
 * @Author: Mr.Hope
 * @Date: 2020-01-07 09:12:52
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-07 14:57:32
 * @Description: 增强文件
 */

import BackToTop from './BackToTop.vue';
import BreadCrumb from './BreadCrumb.vue';
import { EnhanceApp } from 'vuepress-types';
import MyBadge from './MyBadge.vue';
import PageFooter from './PageFooter.vue';
import ScreenFull from './ScreenFull.vue';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('BackToTop', BackToTop);
  Vue.component('BreadCrumb', BreadCrumb);
  Vue.component('MyBadge', MyBadge);
  Vue.component('PageFooter', PageFooter);
  Vue.component('ScreenFull', ScreenFull);
};

export default enhanceApp;
