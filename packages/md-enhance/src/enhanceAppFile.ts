import 'katex/dist/katex.min.css';
import './styles.styl';
import { EnhanceApp } from 'vuepress-types';
import FlowChart from './FlowChart.vue';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('FlowChart', FlowChart);
};

export default enhanceApp;
