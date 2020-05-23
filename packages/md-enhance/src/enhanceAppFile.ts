import "katex/dist/katex.min.css";
import "./styles.styl";
import { EnhanceApp } from "@mr-hope/vuepress-types";
import FlowChart from "./FlowChart.vue";

// eslint-disable-next-line @typescript-eslint/naming-convention
const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("FlowChart", FlowChart);
};

export default enhanceApp;
