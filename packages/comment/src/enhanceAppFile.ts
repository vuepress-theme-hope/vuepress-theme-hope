import Comment from './Comment.vue';
import { EnhanceApp } from 'vuepress-types';
import PageInfo from './PageInfo.vue';

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component('Comment', Comment);
  Vue.component('PageInfo', PageInfo);
};

export default enhanceApp;
