import PhotoSwipeUI from "./PhotoSwipeUI.vue";

import type { EnhanceApp } from "@mr-hope/vuepress-types";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("PhotoSwipeUI", PhotoSwipeUI);
};

export default enhanceApp;
