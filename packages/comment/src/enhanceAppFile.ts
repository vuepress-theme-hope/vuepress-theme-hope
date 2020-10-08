import VueCompositionAPI from "@vue/composition-api";
import { EnhanceApp } from "@mr-hope/vuepress-types";

// eslint-disable-next-line @typescript-eslint/naming-convention
const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.use(VueCompositionAPI);
};

export default enhanceApp;
