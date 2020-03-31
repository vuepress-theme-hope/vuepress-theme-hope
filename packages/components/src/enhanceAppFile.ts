import BackToTop from './BackToTop.vue';
import BreadCrumb from './BreadCrumb.vue';
import { EnhanceApp } from 'vuepress-types';
import MyBadge from './MyBadge.vue';
import PageFooter from './PageFooter.vue';
import Pagination from './Pagination.vue';
import ScreenFull from './ScreenFull.vue';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('BackToTop', BackToTop);
  Vue.component('BreadCrumb', BreadCrumb);
  Vue.component('MyBadge', MyBadge);
  Vue.component('Pagation', Pagination);
  Vue.component('PageFooter', PageFooter);
  Vue.component('ScreenFull', ScreenFull);
};

export default enhanceApp;
