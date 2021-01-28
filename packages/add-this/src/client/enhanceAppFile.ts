import AddThis from "./AddThis";

import type { EnhanceApp } from "@mr-hope/vuepress-types";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("AddThis", AddThis);
};

export default enhanceApp;
