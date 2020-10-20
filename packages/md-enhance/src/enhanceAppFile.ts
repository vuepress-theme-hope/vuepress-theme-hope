import "katex/dist/katex.min.css";
import "./styles.styl";
import { EnhanceApp } from "@mr-hope/vuepress-types";
import FlowChart from "./FlowChart.vue";
import Reveal from "./Reveal.vue";

// eslint-disable-next-line @typescript-eslint/naming-convention
const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("FlowChart", FlowChart);
  Vue.component("Reveal", Reveal);
};

export default enhanceApp;
