import VueCompositionAPI from "@vue/composition-api";
import PhotoSwipeUI from "./PhotoSwipeUI.vue";
import { EnhanceApp } from "@mr-hope/vuepress-types";

// eslint-disable-next-line @typescript-eslint/naming-convention
const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.use(VueCompositionAPI);
  Vue.component("PhotoSwipeUI", PhotoSwipeUI);
};

export default enhanceApp;
