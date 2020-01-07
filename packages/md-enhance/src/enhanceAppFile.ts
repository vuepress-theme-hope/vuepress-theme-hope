/*
 * @Author: Mr.Hope
 * @Date: 2019-10-22 23:50:13
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-05 16:35:58
 * @Description: App Enhance File
 */

import './styles.styl';
import { EnhanceApp } from 'vuepress-types';
import FlowChart from './FlowChart.vue';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('FlowChart', FlowChart);
};

export default enhanceApp;
