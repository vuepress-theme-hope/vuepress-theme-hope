import BackToTop from "./BackToTop.vue";
import BreadCrumb from "./BreadCrumb.vue";
import CodeGroup from "./CodeGroup.vue";
import CodeGroupItem from "./CodeGroupItem.vue";
import MyBadge from "./MyBadge.vue";
import Pagination from "./Pagination.vue";
import ScreenFull from "./ScreenFull.vue";

import type { EnhanceApp } from "@mr-hope/vuepress-types";

import "@mr-hope/vuepress-shared/styles/reset.styl";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("BackToTop", BackToTop);
  Vue.component("BreadCrumb", BreadCrumb);
  Vue.component("CodeGroup", CodeGroup);
  Vue.component("CodeGroupItem", CodeGroupItem);
  Vue.component("MyBadge", MyBadge);
  Vue.component("Pagination", Pagination);
  Vue.component("ScreenFull", ScreenFull);
};

export default enhanceApp;
