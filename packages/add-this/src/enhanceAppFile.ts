import { EnhanceApp } from "@mr-hope/vuepress-types";
import AddThis from "./AddThis.vue";

// eslint-disable-next-line @typescript-eslint/naming-convention
const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("AddThis", AddThis);
};

export default enhanceApp;
