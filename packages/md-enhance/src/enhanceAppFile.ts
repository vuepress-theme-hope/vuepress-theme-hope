import VueCompositionAPI from "@vue/composition-api";

import FlowChart from "./FlowChart.vue";
import "katex/dist/katex.min.css";
import "./styles.styl";

import { EnhanceApp } from "@mr-hope/vuepress-types";

// eslint-disable-next-line @typescript-eslint/naming-convention
const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.use(VueCompositionAPI);
  Vue.component("FlowChart", FlowChart);
};

export default enhanceApp;
