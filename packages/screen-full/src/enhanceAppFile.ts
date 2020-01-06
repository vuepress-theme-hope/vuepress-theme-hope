import { EnhanceApp } from 'vuepress-types';
import ScreenFull from './ScreenFull.vue';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('ScreenFull', ScreenFull);
};

export default enhanceApp;
