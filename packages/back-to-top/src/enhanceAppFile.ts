import BackToTop from './BackToTop.vue';
import { EnhanceApp } from 'vuepress-types';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('BackToTop', BackToTop);
};

export default enhanceApp;
