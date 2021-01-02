import BackToTop from "./BackToTop.vue";
import BreadCrumb from "./BreadCrumb.vue";
import { EnhanceApp } from "@mr-hope/vuepress-types";
import MyBadge from "./MyBadge.vue";
import Pagination from "./Pagination.vue";
import ScreenFull from "./ScreenFull.vue";
import "@mr-hope/vuepress-shared/styles/reset.styl";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("BackToTop", BackToTop);
  Vue.component("BreadCrumb", BreadCrumb);
  Vue.component("MyBadge", MyBadge);
  Vue.component("Pagination", Pagination);
  Vue.component("ScreenFull", ScreenFull);
};

export default enhanceApp;
