/*
 * @Author: Mr.Hope
 * @Date: 2019-10-22 23:50:13
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-21 15:14:25
 * @Description: 注册 Flowchart
 */

import 'katex/dist/katex.min.css';
import './styles.styl';
import { EnhanceApp } from 'vuepress-types';
import FlowChart from './FlowChart.vue';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('FlowChart', FlowChart);
};

export default enhanceApp;
