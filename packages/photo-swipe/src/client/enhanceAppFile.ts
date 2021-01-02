import { EnhanceApp } from "@mr-hope/vuepress-types";
import PhotoSwipeUI from "./PhotoSwipeUI.vue";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("PhotoSwipeUI", PhotoSwipeUI);
};

export default enhanceApp;
