import BackToTop from "./BackToTop.vue";
import Badge from "./Badge.vue";
import BreadCrumb from "./BreadCrumb.vue";
import CodeGroup from "./CodeGroup.vue";
import CodeGroupItem from "./CodeGroupItem.vue";
import Pagination from "./Pagination.vue";
import ScreenFull from "./ScreenFull.vue";

import type { EnhanceApp } from "@mr-hope/vuepress-types";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("BackToTop", BackToTop);
  Vue.component("Badge", Badge);
  Vue.component("BreadCrumb", BreadCrumb);
  Vue.component("CodeGroup", CodeGroup);
  Vue.component("CodeGroupItem", CodeGroupItem);
  Vue.component("Pagination", Pagination);
  Vue.component("ScreenFull", ScreenFull);
};

export default enhanceApp;
