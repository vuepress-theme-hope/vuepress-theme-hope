import { EnhanceApp } from "@mr-hope/vuepress-types";
import PhotoSwipeUI from "./PhotoSwipeUI.vue";

// eslint-disable-next-line @typescript-eslint/naming-convention
const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("PhotoSwipeUI", PhotoSwipeUI);
};

export default enhanceApp;
