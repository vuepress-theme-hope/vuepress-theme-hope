import FlowChart from "./FlowChart.vue";
import Presentation from "./Presentation.vue";

import "katex/dist/katex.min.css";
import "./styles/container.styl";

import { EnhanceApp } from "@mr-hope/vuepress-types";

// eslint-disable-next-line @typescript-eslint/naming-convention
const enhanceApp: EnhanceApp = ({ Vue }) => {
  if (MARKDOWN_ENHANCE_OPTIONS.align || MARKDOWN_ENHANCE_OPTIONS.enableAll)
    void import("vuepress-plugin-md-enhance/src/styles/align.styl");
  if (MARKDOWN_ENHANCE_OPTIONS.footnote || MARKDOWN_ENHANCE_OPTIONS.enableAll)
    void import("vuepress-plugin-md-enhance/src/styles/footnote.styl");
  if (MARKDOWN_ENHANCE_OPTIONS.tex || MARKDOWN_ENHANCE_OPTIONS.enableAll)
    void import("vuepress-plugin-md-enhance/src/styles/tex.styl");

  if (MARKDOWN_ENHANCE_OPTIONS.flowchart || MARKDOWN_ENHANCE_OPTIONS.enableAll)
    Vue.component("FlowChart", FlowChart);
  if (
    MARKDOWN_ENHANCE_OPTIONS.presentation ||
    MARKDOWN_ENHANCE_OPTIONS.enableAll
  )
    Vue.component("Presentation", Presentation);
};

export default enhanceApp;
