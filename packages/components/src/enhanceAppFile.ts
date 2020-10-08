import VueCompositionAPI from "@vue/composition-api";

import BackToTop from "./BackToTop.vue";
import BreadCrumb from "./BreadCrumb.vue";
import MyBadge from "./MyBadge.vue";
import ScreenFull from "./ScreenFull.vue";

import { EnhanceApp } from "@mr-hope/vuepress-types";

// eslint-disable-next-line @typescript-eslint/naming-convention
const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.use(VueCompositionAPI);
  Vue.component("BackToTop", BackToTop);
  Vue.component("BreadCrumb", BreadCrumb);
  Vue.component("MyBadge", MyBadge);
  Vue.component("ScreenFull", ScreenFull);
};

export default enhanceApp;
