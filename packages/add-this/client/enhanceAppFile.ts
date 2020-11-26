import { EnhanceApp } from "@mr-hope/vuepress-types";
import AddThis from "./AddThis.vue";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("AddThis", AddThis);
};

export default enhanceApp;
