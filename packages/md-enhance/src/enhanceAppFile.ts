/*
 * @Author: Mr.Hope
 * @Date: 2019-10-22 23:50:13
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-18 16:41:03
 * @Description: 注册 Flowchart
 */

import './styles.styl';
import { EnhanceApp } from 'vuepress-types';
import FlowChart from './FlowChart.vue';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('FlowChart', FlowChart);
};

export default enhanceApp;
