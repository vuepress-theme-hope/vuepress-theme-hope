import BreadCrumb from './BreadCrumb.vue';
import { EnhanceApp } from 'vuepress-types';
import MyBadge from './MyBadge.vue';
import PageFooter from './PageFooter.vue';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('BreadCrumb', BreadCrumb);
  Vue.component('MyBadge', MyBadge);
  Vue.component('PageFooter', PageFooter);
};

export default enhanceApp;
