import BreadCrumb from './BreadCrumb.vue';
import MyBadge from './MyBadge.vue';
import PageFooter from './PageFooter.vue';

export default ({ Vue }) => {
  Vue.component('BreadCrumb', BreadCrumb);
  Vue.component('MyBadge', MyBadge);
  Vue.component('PageFooter', PageFooter);
};
